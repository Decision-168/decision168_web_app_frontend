import { Avatar, Box, Grid, IconButton, Tooltip, Typography, useTheme } from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import { Delete, KeyboardDoubleArrowRight } from "@mui/icons-material";
import ArchiveIcon from '@mui/icons-material/Archive';
import { Link } from "react-router-dom";
import { stringAvatar } from "../../../helpers/stringAvatar";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import BadgeIcon from "@mui/icons-material/Badge";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LowPriorityIcon from "@mui/icons-material/LowPriority";
import PersonIcon from "@mui/icons-material/Person";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import { getPortfolioData, getProjectData, getTaskData, getTaskSubtaskData, getUserData } from "../../../api/modules/FileCabinetModule";
import { closeCnfModal, openCnfModal } from "../../../redux/action/confirmationModalSlice";
import { useDispatch } from "react-redux";
import ConfirmationDialog from "../../common/ConfirmationDialog";
import { toast } from "react-toastify";
import { patchArchiveTask } from "../../../api/modules/ArchiveModule";
const TaskPopup = ({ nodes, regId, portfolioId, handleClose, fetchTreeData }) => {
  const [taskData, setTaskData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [subtaskData, setSubtaskData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [assigneeData, setAssigneeData] = useState([]);
  const [portfolioData, setPortfolioData] = useState([]);

  const [module, setModule] = useState(null);
  const dispatch = useDispatch();

    // Task Data ----------------------------------------------
    const fetchTaskData = async () => {
      try {
        const response = await getTaskData(nodes?.table_id);
        setTaskData(response);
      } catch (error) {
        console.error(error);
      }
    };
  
    useEffect(() => {
      fetchTaskData();
    }, [nodes]);
  
    const taskStartDate = new Date(taskData.tcreated_date);
    const formattedTaskStartDate = `${taskStartDate.getDate()} ${taskStartDate.toLocaleString('default', { month: 'short' })}, ${taskStartDate.getFullYear()}`;
    const taskDueDate = new Date(taskData.tdue_date);
    const formattedTaskDueDate = `${taskDueDate.getDate()} ${taskDueDate.toLocaleString('default', { month: 'short' })}, ${taskDueDate.getFullYear()}`;
    const links = taskData?.tlink;
    const link_comments = taskData?.tlink_comment;
    const taskCode = taskData?.tcode;
    const taskNote = taskData?.tnote;
    const taskFiles = taskData?.tfile;
    const taskStatus = taskData?.tstatus;
    const taskPriority = taskData?.tpriority;

    // Subtask Data ----------------------------------------------
    const fetchTaskSubtaskData = async () => {
      try {
        const response = await getTaskSubtaskData(regId,taskData?.tid,taskData?.dept_id,portfolioId);
        setSubtaskData(response);
      } catch (error) {
        console.error(error);
      }
    };
  
    useEffect(() => {
      fetchTaskSubtaskData();
    }, [taskData]);

    // Project Data ----------------------------------------------
  const fetchProjectData = async () => {
    try {
      const response = await getProjectData(taskData?.tproject_assign);
      setProjectData(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProjectData();
  }, [taskData]);
  
    // Creater (User) Data ----------------------------------------------
    const fetchUserData = async () => {
      try {
        const response = await getUserData(taskData?.tcreated_by);
        setUserData(response);
      } catch (error) {
        console.error(error);
      }
    };
  
    useEffect(() => {
      fetchUserData();
    }, [taskData]);
  
    const userName = `${userData?.first_name} ${userData?.last_name}`;

    // Assignee (User) Data ----------------------------------------------
    const fetchAssigneeData = async () => {
      try {
        const response = await getUserData(taskData?.tassignee);
        setAssigneeData(response);
      } catch (error) {
        console.error(error);
      }
    };
  
    useEffect(() => {
      fetchAssigneeData();
    }, [taskData]);
  
    const assigneeName = `${assigneeData?.first_name} ${assigneeData?.last_name}`;

    // Portfolio Data ----------------------------------------------
  const fetchPortfolioData = async () => {
    try {
      const response = await getPortfolioData(portfolioId);
      setPortfolioData(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPortfolioData();
  }, [taskData]);

  const handleArchive = () => {
    setModule('archive');
    dispatch(
      openCnfModal({
        modalName: "archiveTask",
        title: "Are you sure?",
        description: "You want to Archive!",
      })
    );
  };
  const handleDelete = () => {
    setModule('delete');
    dispatch(
      openCnfModal({
        modalName: "deleteTask",
        title: "Are you sure?",
        description: "You want to Delete!",
      })
    );
  };

  const handleYes = async () => {
    if(module == 'archive') {
      try {
        const response = await patchArchiveTask(taskData?.tid, regId);
        fetchTreeData()
        dispatch(closeCnfModal({ modalName: 'archiveTask' }));
        handleClose()
        toast.success(`${response.message}`);
      } catch (error) {
        dispatch(closeCnfModal({ modalName: 'archiveTask' }));
        handleClose()
        toast.error(`${error.response?.error}`);
        console.log(error)
      };
    }else if(module == 'delete') {
      try {
        const response = await deleteTask(taskData?.tid, regId);
        fetchTreeData()
        dispatch(closeCnfModal({ modalName: 'deleteTask' }));
        handleClose()
        toast.success(`${response.message}`);
      } catch (error) {
        dispatch(closeCnfModal({ modalName: 'deleteTask' }));
        handleClose()
        toast.error(`${error.response?.error}`);
      };
    }
  };

  // ---- End -----------------------------

  const theme = useTheme();
  // const subtaskData = [1, 2];
  const CommonLinks = ({ link, linkName }) => {
    return (
      <>
        <Grid item xs={7}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "start",
            }}
          >
            <KeyboardDoubleArrowRight
              sx={{ color: "#c7df19", fontSize: 15, mr: 1 }}
            />
            <Typography
              sx={{ fontSize: 13, cursor: "pointer", color: "#212934" }}
              component={Link}
              to={link}
            >
              {link}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={5} textAlign={"initial"}>
          <Typography
            sx={{
              fontSize: 13,
            }}
          >
            {linkName}
          </Typography>
        </Grid>
      </>
    );
  };
  return (
    <Box
      sx={{
        flexGrow: 1,
        width: "100%",
        background: "white",
        p: 2,
        borderRadius: 1,
      }}
      mb={2}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={12}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              flexDirection: "row",
            }}
          >
            <Avatar
              sx={{ bgcolor: theme.palette.secondary.main, mr: 1 }}
              aria-label="task"
            >
              {...stringAvatar(nodes.name)}
            </Avatar>
            <Typography
              sx={{
                color: "#343a40",
                fontWeight: "900",
                fontSize: "16px",
              }}
              textAlign={"start"}
            >
              TASK: {nodes.name}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={12} lg={8}>
        </Grid>
        <Grid item xs={12} md={12} lg={4}>
          <Box
            sx={{
              display: "flex",
              alignItems: "bottom",
              justifyContent: "end",
              flexDirection: "row",
            }}
          >
            <Tooltip arrow title="Archive">
              <IconButton onClick={() => handleArchive()}>
                <ArchiveIcon sx={{ fontSize: "20px" }} />
              </IconButton>
            </Tooltip>
            <Tooltip arrow title="Delete">
              <IconButton onClick={() => handleDelete()}>
                <Delete sx={{ fontSize: "20px" }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Typography
            sx={{ fontSize: 14, color: "#212934", textAlign: "start" }}
          >
            Task Code : {taskCode}
          </Typography>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Typography
            sx={{ fontSize: 14, color: "#212934", textAlign: "start" }}
          >
            Task Description :
          </Typography>
          <Typography
            sx={{
              color: "#74788d",
              whiteSpace: "pre-wrap",
              textAlign: "start",
              p: 1,
              fontSize: 13,
            }}
          >
            {nodes.description}
          </Typography>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Typography
            sx={{ fontSize: 14, color: "#212934", textAlign: "start" }}
          >
            Task Notes :
          </Typography>
          <Typography
            sx={{
              color: "#74788d",
              whiteSpace: "pre-wrap",
              textAlign: "start",
              p: 1,
              fontSize: 13,
            }}
          >
            {nodes.taskNote}
          </Typography>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Typography sx={{ fontSize: 13, textAlign: "left" }}>
            Tasks Links :
          </Typography>
        </Grid>
        <Grid item xs={12} md={12} lg={12} mb={2}>
          <Grid container spacing={2}>
          {links && links.split(',').map((link, index) => (
              <CommonLinks
              key={index}
              link={link}
              linkName={link_comments.split(',')[index] && ( link_comments.split(',')[index] )}
            /> 
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Typography
            sx={{ fontSize: 14, color: "#212934", textAlign: "start" }}
          >
            Task Files :
          </Typography>
          <Typography
            sx={{
              color: "#74788d",
              textAlign: "start",
              p: 1,
              fontSize: 13,
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
              {taskFiles && taskFiles.split(',').map((file, index) => (
                <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "start",
                }}
              >
                <KeyboardDoubleArrowRight
                  sx={{ color: "#c7df19", fontSize: 15, mr: 1 }}
                />
                <Typography sx={{ fontSize: 13, color: "#212934" }}>
                  {file}
                </Typography>
              </Box>
            ))}
              </Grid>
            </Grid>
          </Typography>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Typography
            sx={{ fontSize: 14, color: "#212934", textAlign: "start" }}
          >
            Subtasks :
          </Typography>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          {subtaskData.map((item, index) => {
            return (
              <Grid container key={index}>
                <Grid item xs={12} md={12} lg={12} textAlign={"left"}>
                  <Typography
                    sx={{
                      fontSize: 13,
                      display: "flex",
                      fontWeight: "700",
                      textAlign: "left",
                      alignItems: "center",
                    }}
                  >
                    <CheckCircleOutlineRoundedIcon
                      fontSize="small"
                      sx={{ color: "#C7DF19", mr: 1 }}
                    />
                    {item.stcode} :
                    <Typography
                      sx={{
                        fontSize: 13,
                        mx: 1,
                        display: "inline",
                      }}
                    >
                      {item.stname}
                    </Typography>
                  </Typography>
                </Grid>
              </Grid>
            );
          })}
        </Grid>

        <Grid item xs={6} md={6} lg={6}>
          <Box
            sx={{
              display: "flex",
              alignItems: "start",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <HomeRepairServiceIcon
                fontSize="small"
                sx={{ color: "#C7DF19", mr: 1 }}
              />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Typography sx={{ fontSize: 13, color: "#74788d", ml: 1 }}>
                  Project:{" "}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: 13,
                    color: "#212934",
                    ml: 1,
                  }}
                >
                  {projectData.pname}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6} md={6} lg={6}>
          <Box
            sx={{
              display: "flex",
              alignItems: "start",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <BadgeIcon fontSize="small" sx={{ color: "#C7DF19", mr: 1 }} />
              <Typography sx={{ fontSize: 13, color: "#74788d", ml: 1 }}>
                {portfolioData.portfolio_name}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6} md={6} lg={6}>
          <Box
            sx={{
              display: "flex",
              alignItems: "start",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <AssignmentIndIcon
                fontSize="small"
                sx={{ color: "#C7DF19", mr: 1 }}
              />
              <Typography sx={{ fontSize: 13, color: "#74788d", ml: 1 }}>
                Assigned To : {assigneeName}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6} md={6} lg={6}>
          <Box
            sx={{
              display: "flex",
              alignItems: "start",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <CalendarTodayIcon
                fontSize="small"
                sx={{ color: "#C7DF19", mr: 1 }}
              />
              <Typography sx={{ fontSize: 13, color: "#74788d", ml: 1 }}>
                Due Date : {formattedTaskDueDate}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6} md={6} lg={6}>
          <Box
            sx={{
              display: "flex",
              alignItems: "start",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <CalendarMonthIcon
                fontSize="small"
                sx={{ color: "#C7DF19", mr: 1 }}
              />
              <Typography sx={{ fontSize: 13, color: "#74788d", ml: 1 }}>
                Created Date : {formattedTaskStartDate}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6} md={6} lg={6}>
          <Box
            sx={{
              display: "flex",
              alignItems: "start",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <LowPriorityIcon
                fontSize="small"
                sx={{ color: "#C7DF19", mr: 1 }}
              />
              <Typography sx={{ fontSize: 13, color: "#74788d", ml: 1 }}>
                Priority : {taskPriority}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6} md={6} lg={6}>
          <Box
            sx={{
              display: "flex",
              alignItems: "start",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <PersonIcon fontSize="small" sx={{ color: "#C7DF19", mr: 1 }} />
              <Typography sx={{ fontSize: 13, color: "#74788d", ml: 1 }}>
                Created By : {userName}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6} md={6} lg={6}>
          <Box
            sx={{
              display: "flex",
              alignItems: "start",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <PrivacyTipIcon
                fontSize="small"
                sx={{ color: "#C7DF19", mr: 1 }}
              />
              <Typography sx={{ fontSize: 13, color: "#74788d", ml: 1 }}>
                Status : {taskStatus}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <ConfirmationDialog value={"archiveTask"} handleYes={handleYes} />
      <ConfirmationDialog value={"deleteTask"} handleYes={handleYes} />
    </Box>
  );
};

export default memo(TaskPopup);
