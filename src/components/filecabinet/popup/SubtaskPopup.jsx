import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import { Delete, KeyboardDoubleArrowRight } from "@mui/icons-material";
import ArchiveIcon from "@mui/icons-material/Archive";
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
import {
  getPortfolioData,
  getProjectData,
  getSubtaskData,
  getTaskData,
  getUserData,
} from "../../../api/modules/FileCabinetModule";
import {
  closeCnfModal,
  openCnfModal,
} from "../../../redux/action/confirmationModalSlice";
import { useDispatch } from "react-redux";
import ConfirmationDialog from "../../common/ConfirmationDialog";
import { toast } from "react-toastify";
import { patchArchiveSubtask } from "../../../api/modules/ArchiveModule";
import { patchDeleteSubtask } from "../../../api/modules/TrashModule";
const SubtaskPopup = ({
  nodes,
  regId,
  portfolioId,
  handleClose,
  fetchTreeData,
}) => {
  const [userData, setUserData] = useState([]);
  const [subtaskData, setSubtaskData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [assigneeData, setAssigneeData] = useState([]);
  const [portfolioData, setPortfolioData] = useState([]);
  const [taskData, setTaskData] = useState([]);

  const [module, setModule] = useState(null);
  const dispatch = useDispatch();

  // Subtask Data ----------------------------------------------
  const fetchSubtaskData = async () => {
    try {
      const response = await getSubtaskData(nodes?.table_id);
      setSubtaskData(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSubtaskData();
  }, [nodes]);

  const subtaskStartDate = new Date(subtaskData.stcreated_date);
  const formattedSubtaskStartDate = `${subtaskStartDate.getDate()} ${subtaskStartDate.toLocaleString(
    "default",
    { month: "short" }
  )}, ${subtaskStartDate.getFullYear()}`;
  const subtaskDueDate = new Date(subtaskData.stdue_date);
  const formattedSubtaskDueDate = `${subtaskDueDate.getDate()} ${subtaskDueDate.toLocaleString(
    "default",
    { month: "short" }
  )}, ${subtaskDueDate.getFullYear()}`;
  const links = subtaskData?.stlink;
  const link_comments = subtaskData?.stlink_comment;
  const subtaskCode = subtaskData?.stcode;
  const subtaskNote = subtaskData?.stnote;
  const subtaskFiles = subtaskData?.stfile;
  const subtaskStatus = subtaskData?.ststatus;
  const subtaskPriority = subtaskData?.stpriority;

  // Task Data ----------------------------------------------
  const fetchTaskData = async () => {
    try {
      const response = await getTaskData(subtaskData?.tid);
      setTaskData(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTaskData();
  }, [subtaskData]);

  // Project Data ----------------------------------------------
  const fetchProjectData = async () => {
    try {
      const response = await getProjectData(subtaskData?.stproject_assign);
      setProjectData(response);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProjectData();
  }, [subtaskData]);

  // Creater (User) Data ----------------------------------------------
  const fetchUserData = async () => {
    try {
      const response = await getUserData(subtaskData?.stcreated_by);
      setUserData(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [subtaskData]);

  const userName = `${userData?.first_name} ${userData?.last_name}`;

  // Assignee (User) Data ----------------------------------------------
  const fetchAssigneeData = async () => {
    try {
      const response = await getUserData(subtaskData?.stassignee);
      setAssigneeData(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAssigneeData();
  }, [subtaskData]);

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
  }, [subtaskData]);

  const handleArchive = () => {
    setModule("archive");
    dispatch(
      openCnfModal({
        modalName: "archiveSubtask",
        title: "Are you sure?",
        description: "You want to Archive!",
      })
    );
  };
  const handleDelete = () => {
    setModule("delete");
    dispatch(
      openCnfModal({
        modalName: "deleteSubtask",
        title: "Are you sure?",
        description: "You want to Delete!",
      })
    );
  };

  const handleYes = async () => {
    if (module == "archive") {
      try {
        const response = await patchArchiveSubtask(subtaskData?.stid, regId);
        fetchTreeData();
        dispatch(closeCnfModal({ modalName: "archiveSubtask" }));
        handleClose();
        toast.success(`${response.message}`);
      } catch (error) {
        dispatch(closeCnfModal({ modalName: "archiveSubtask" }));
        handleClose();
        toast.error(`${error.response?.error}`);
      }
    } else if (module == "delete") {
      try {
        const response = await patchDeleteSubtask(subtaskData?.stid, regId);
        fetchTreeData();
        dispatch(closeCnfModal({ modalName: "deleteSubtask" }));
        handleClose();
        toast.success(`${response.message}`);
      } catch (error) {
        dispatch(closeCnfModal({ modalName: "deleteSubtask" }));
        console.log(error);
        handleClose();
        toast.error(`${error.response?.error}`);
      }
    }
  };

  // ----End ------------------------------------

  const theme = useTheme();
  const CommonLinks = ({ link, linkName }) => {
    return (
      <>
        <Grid item xs={6}>
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
        <Grid item xs={6} textAlign={"initial"}>
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
              aria-label="subtask"
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
              SUBTASK: {nodes.name}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={12} lg={8}></Grid>
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
            Subtask Code : {subtaskCode}
          </Typography>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Typography
            sx={{ fontSize: 14, color: "#212934", textAlign: "start" }}
          >
            Task : {taskData.tname}
          </Typography>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Typography
            sx={{ fontSize: 14, color: "#212934", textAlign: "start" }}
          >
            Subtask Description :
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
            Subtask Notes :
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
            {subtaskNote}
          </Typography>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Typography sx={{ fontSize: 13, textAlign: "left" }}>
            Subtask Links :
          </Typography>
        </Grid>
        <Grid item xs={12} md={12} lg={12} mb={2}>
          <Grid container spacing={2}>
            {links &&
              links
                .split(",")
                .map((link, index) => (
                  <CommonLinks
                    key={index}
                    link={link}
                    linkName={
                      link_comments.split(",")[index] &&
                      link_comments.split(",")[index]
                    }
                  />
                ))}
          </Grid>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Typography
            sx={{ fontSize: 14, color: "#212934", textAlign: "start" }}
          >
            Subtask Files :
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
                {subtaskFiles &&
                  subtaskFiles.split(",").map((file, index) => (
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
                Due Date : {formattedSubtaskDueDate}
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
                Created Date : {formattedSubtaskStartDate}
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
                Priority : {subtaskPriority}
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
                Status : {subtaskStatus}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <ConfirmationDialog value={"archiveSubtask"} handleYes={handleYes} />
      <ConfirmationDialog value={"deleteSubtask"} handleYes={handleYes} />
    </Box>
  );
};

export default memo(SubtaskPopup);
