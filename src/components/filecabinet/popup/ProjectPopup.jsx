import { Avatar, Box, Grid, IconButton, Tooltip, Typography, useTheme } from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import {
  CalendarMonth,
  Delete,
  FolderOpenOutlined,
  KeyboardDoubleArrowRight,
  Person,
} from "@mui/icons-material";
import ArchiveIcon from '@mui/icons-material/Archive';
import { Link } from "react-router-dom";
import GridList from "../../GoalsAndStrategies/subComponents/GridList";
import { stringAvatar } from "../../../helpers/stringAvatar";
import ProgressBar from "../subComponents/ProgressBar";
import { getProjectData, getUserData } from "../../../api/modules/FileCabinetModule";
import { closeCnfModal, openCnfModal } from "../../../redux/action/confirmationModalSlice";
import { useDispatch } from "react-redux";
import ConfirmationDialog from "../../common/ConfirmationDialog";
import { toast } from "react-toastify";
import { patchArchiveProject } from "../../../api/modules/ArchiveModule";
const ProjectPopup = ({ nodes, regId, portfolioId, handleClose, fetchTreeData }) => {
  const [projectData, setProjectData] = useState([]);
  const [userData, setUserData] = useState([]);

  const [module, setModule] = useState(null);
  const dispatch = useDispatch();

  // Project Data ----------------------------------------------
  const fetchProjectData = async () => {
    try {
      const response = await getProjectData(nodes?.table_id);
      setProjectData(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProjectData();
  }, [nodes]);

  const projectStartDate = new Date(projectData.pcreated_date);
  const formattedProjectStartDate = `${projectStartDate.getDate()} ${projectStartDate.toLocaleString('default', { month: 'short' })}, ${projectStartDate.getFullYear()}`;
  const projectType = projectData.ptype;
  const links = projectData.plink;
  const link_comments = projectData.plink_comment;

  // Creater (User) Data ----------------------------------------------
  const fetchUserData = async () => {
    try {
      const response = await getUserData(projectData?.pcreated_by);
      setUserData(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [projectData]);

  const userName = `${userData?.first_name} ${userData?.last_name}`;

  const handleArchive = () => {
    setModule('archive');
    dispatch(
      openCnfModal({
        modalName: "archiveProject",
        title: "Are you sure?",
        description: "You want to Archive!",
      })
    );
  };
  const handleDelete = () => {
    setModule('delete');
    dispatch(
      openCnfModal({
        modalName: "deleteProject",
        title: "Are you sure?",
        description: "You want to Delete!",
      })
    );
  };

  const handleYes = async () => {
    if(module == 'archive') {
      try {
        const response = await patchArchiveProject(projectData?.pid, regId);
        fetchTreeData()
        dispatch(closeCnfModal({ modalName: 'archiveProject' }));
        handleClose()
        toast.success(`${response.message}`);
      } catch (error) {
        dispatch(closeCnfModal({ modalName: 'archiveProject' }));
        handleClose()
        toast.error(`${error.response?.error}`);
      };
    }else if(module == 'delete') {
      try {
        const response = await deleteProject(projectData?.pid, regId);
        fetchTreeData()
        dispatch(closeCnfModal({ modalName: 'deleteProject' }));
        handleClose()
        toast.success(`${response.message}`);
      } catch (error) {
        dispatch(closeCnfModal({ modalName: 'deleteProject' }));
        handleClose()
        toast.error(`${error.response?.error}`);
      };
    }
  };

  // --------End ---------------------------------
  
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
              aria-label="project"
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
              PROJECT: {nodes.name}
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
            Status :- Done: 4 Total: 11
          </Typography>
          <ProgressBar />
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Typography
            sx={{ fontSize: 14, color: "#212934", textAlign: "start" }}
          >
            Description :
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
          <Typography sx={{ fontSize: 13, textAlign: "left" }}>
            Links & Comments :
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

        <Grid item xs={3} md={3} lg={3}>
          <GridList
            icon={<CalendarMonth sx={{ color: "#c7df19", fontSize: "14px" }} />}
            title={"Created Date"}
            info={formattedProjectStartDate}
          />
        </Grid>
        <Grid item xs={3} md={3} lg={3}>
          <GridList
            icon={<Person sx={{ color: "#c7df19", fontSize: "14px" }} />}
            title={"Created By"}
            info={userName}
          />
        </Grid>
        <Grid item xs={3} md={3} lg={3}>
          <GridList
            icon={
              <FolderOpenOutlined sx={{ color: "#c7df19", fontSize: "14px" }} />
            }
            title={"Type"}
            info={
              projectType === 'content' ? 'Content' :
              projectType === 'goal_strategy' ? 'Goals & Strategies' :
              'Project'
            }
          />
        </Grid>
      </Grid>
      <ConfirmationDialog value={"archiveProject"} handleYes={handleYes} />
      <ConfirmationDialog value={"deleteProject"} handleYes={handleYes} />
    </Box>
  );
};

export default memo(ProjectPopup);
