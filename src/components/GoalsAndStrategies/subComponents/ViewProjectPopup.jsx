import { Box, Grid, Typography, useTheme } from "@mui/material";
import React, { memo } from "react";
import {
  Add,
  CalendarMonth,
  Edit,
  FolderOpenOutlined,
  KeyboardDoubleArrowRight,
  Person,
  Visibility,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { openCnfModal } from "../../../redux/action/confirmationModalSlice";
import { openModal } from "../../../redux/action/modalSlice";
import ConfirmationDialog from "../../common/ConfirmationDialog";
import { Link, useNavigate } from "react-router-dom";
import ReduxDialog from "../../common/ReduxDialog";
import DuplicateProject from "../kpi-overview/project-section/DuplicateProject";
import OverallHistory from "./history-section/OverallHistory";
import GridList from "./GridList";
import TitleWithActions from "./TitleWithActions";
import { description2 } from "./style-functions";
import CreateProject from "../../project/Dialogs/CreateProject";
import CreateEditTaskForm from "../../Tasks/createEditTask/CreateEditTaskForm";
const ViewProjectPopup = ({}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleFileIt = () => {
    dispatch(
      openCnfModal({
        modalName: "fileItProject",
        title: "Are you sure?",
        description: "You want to File it!",
      })
    );
  };
  const handleDelete = () => {
    dispatch(
      openCnfModal({
        modalName: "deleteProject",
        title: "Are you sure?",
        description: "You want to Delete!",
      })
    );
  };

  const handleDuplicate = () => {
    dispatch(openModal("duplicate-project"));
  };

  const handleViewHistory = () => {
    dispatch(openModal("view-project-history"));
  };
  const handleEditProject = () => {
    dispatch(openModal("edit-project"));
  };
  const handleAddTask = () => {
    dispatch(openModal("create-new-task"));
  };
  const handleViewAllTask = () => {
    navigate("/project-tasks-list");
  };
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
        <TitleWithActions
          title={"Project: Dashboard Module"}
          handleClick1={handleEditProject}
          handleClick2={handleAddTask}
          handleClick3={handleViewAllTask}
          handleDelete={handleDelete}
          handleDuplicate={handleDuplicate}
          handleFileIt={handleFileIt}
          handleViewHistory={handleViewHistory}
          btn1Text={"Edit Project"}
          btn2Text={"Add Task"}
          btn3Text={"View All Tasks"}
          btn1Icon={<Edit />}
          btn2Icon={<Add />}
          btn3Icon={<Visibility />}
          description={description2}
          progressHeading={"Status :- Done: 4 Total: 11"}
        />
        <Grid item xs={12} md={12} lg={12}>
          <Typography sx={{ fontSize: 13, textAlign: "left" }}>
            Links & Comments :
          </Typography>
        </Grid>
        <Grid item xs={12} md={12} lg={12} mb={2}>
          <Grid container spacing={2}>
            <CommonLinks
              link={"https://dev.decision168.com/register"}
              linkName={"registration link"}
            />
            <CommonLinks
              link={"https://dev.decision168.com/login"}
              linkName={"login link"}
            />
          </Grid>
        </Grid>

        <Grid item xs={3} md={3} lg={3}>
          <GridList
            icon={<CalendarMonth sx={{ color: "#c7df19", fontSize: "14px" }} />}
            title={"Created Date"}
            info={"6 Nov, 2023"}
          />
        </Grid>
        <Grid item xs={3} md={3} lg={3}>
          <GridList
            icon={<Person sx={{ color: "#c7df19", fontSize: "14px" }} />}
            title={"Created By"}
            info={"Uzma Karjikar"}
          />
        </Grid>
        <Grid item xs={3} md={3} lg={3}>
          <GridList
            icon={
              <FolderOpenOutlined sx={{ color: "#c7df19", fontSize: "14px" }} />
            }
            title={"Type"}
            info={"Goals & Strategies"}
          />
        </Grid>
      </Grid>
      <ConfirmationDialog value={"fileItProject"} />
      <ConfirmationDialog value={"deleteProject"} />
      <ReduxDialog
        value="duplicate-project"
        modalTitle="Copy Project"
        showModalButton={false}
        modalSize="sm"
      >
        <DuplicateProject />
      </ReduxDialog>

      <ReduxDialog
        value="view-project-history"
        modalTitle="HISTORY"
        showModalButton={false}
        modalSize="md"
      >
        <OverallHistory />
      </ReduxDialog>
      <ReduxDialog
        value="edit-project"
        modalTitle="Edit Project"
        showModalButton={false}
        modalSize="md"
      >
        <CreateProject flag="edit" />
      </ReduxDialog>
      <ReduxDialog
        value="create-new-task"
        modalTitle="Create New Task"
        showModalButton={false}
        modalSize="md"
      >
        <CreateEditTaskForm editMode={false} />
      </ReduxDialog>
    </Box>
  );
};

export default memo(ViewProjectPopup);
