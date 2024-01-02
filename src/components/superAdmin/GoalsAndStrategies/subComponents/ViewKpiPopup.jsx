import { Box, Grid, IconButton, Tooltip, useTheme } from "@mui/material";
import React, { memo, useState } from "react";
import {
  Add,
  AssignmentTurnedInOutlined,
  BusinessCenter,
  CalendarMonth,
  Edit,
  Person,
  VisibilityOutlined,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { openCnfModal } from "../../../redux/action/confirmationModalSlice";
import { openModal } from "../../../redux/action/modalSlice";
import ConfirmationDialog from "../../common/ConfirmationDialog";
import ReduxDialog from "../../common/ReduxDialog";
import EditKPIPopup from "./EditKPIPopup";
import DuplicateKPI from "../goals-overview/Kpi/subComponents/DuplicateKPI";
import ViewProjectPopup from "./ViewProjectPopup";
import CustomDialog from "../../common/CustomDialog";
import OverallHistory from "./history-section/OverallHistory";
import GridList from "./GridList";
import HiddenListOfDialog from "./HiddenListOfDialog";
import TitleWithActions from "./TitleWithActions";
import { description1 } from "./style-functions";
import CreateProject from "../../project/Dialogs/CreateProject";
import { useNavigate } from "react-router";
const ViewKpiPopup = ({}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openProject, setOpenProject] = useState(false);

  const handleProjectClose = () => {
    setOpenProject(false);
  };
  const handleProjectOpen = () => {
    setOpenProject(true);
  };
  const handleFileIt = () => {
    dispatch(
      openCnfModal({
        modalName: "fileItKPI",
        title: "Are you sure?",
        description: "You want to File it!",
      })
    );
  };
  const handleDelete = () => {
    dispatch(
      openCnfModal({
        modalName: "deleteKPI",
        title: "Are you sure?",
        description: "You want to Delete!",
      })
    );
  };

  const handleDuplicate = () => {
    dispatch(openModal("duplicate-kpi"));
  };

  const handleViewHistory = () => {
    dispatch(openModal("view-all-kpi-history"));
  };
  const handleEditKPI = () => {
    dispatch(openModal("edit-kpi"));
  };
  const handleAddProject = () => {
    dispatch(openModal("create-project"));
  };
  const handleViewTasks = () => {
    navigate("/project-tasks-list");
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
          title={"KPI: ABC Strategy 3"}
          handleClick1={handleEditKPI}
          handleClick2={handleAddProject}
          handleDelete={handleDelete}
          handleDuplicate={handleDuplicate}
          handleFileIt={handleFileIt}
          handleViewHistory={handleViewHistory}
          btn1Text={"Edit KPI"}
          btn2Text={"Add Project"}
          btn1Icon={<Edit />}
          btn2Icon={<Add />}
          description={description1}
          progressHeading={"Status : Done: 4 Total: 18"}
        />
        <Grid item xs={3} md={3} lg={3}>
          <GridList
            icon={<CalendarMonth sx={{ color: "#c7df19", fontSize: "14px" }} />}
            title={"Created Date"}
            info={"6 Nov, 2023"}
          />
        </Grid>

        <Grid item xs={3} md={3} lg={3}>
          <GridList
            icon={
              <BusinessCenter sx={{ color: "#c7df19", fontSize: "14px" }} />
            }
            title={"Progress"}
            info={"In Progress"}
          />
        </Grid>
        <Grid item xs={3} md={3} lg={3}>
          <GridList
            icon={<Person sx={{ color: "#c7df19", fontSize: "14px" }} />}
            title={"Created By"}
            info={"Uzma Karjikar"}
          />
        </Grid>
        {window.location.pathname !== "/kpi-overview" && (
          <HiddenListOfDialog
            heading={"Projects"}
            title={"PROJECT"}
            value={"Dashboard Module"}
          >
            <Tooltip title="View All Tasks" placement="top">
              <IconButton
                aria-label="view"
                size="small"
                onClick={handleViewTasks}
              >
                <AssignmentTurnedInOutlined fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Preview Project" placement="top">
              <IconButton
                aria-label="view"
                size="small"
                onClick={handleProjectOpen}
              >
                <VisibilityOutlined fontSize="small" />
              </IconButton>
            </Tooltip>
          </HiddenListOfDialog>
        )}
      </Grid>
      <ConfirmationDialog value={"fileItKPI"} />
      <ConfirmationDialog value={"deleteKPI"} />
      <ReduxDialog
        value="edit-kpi"
        modalTitle="Edit KPI"
        showModalButton={false}
        modalSize="sm"
      >
        <EditKPIPopup />
      </ReduxDialog>
      <ReduxDialog
        value="duplicate-kpi"
        modalTitle="Copy KPI"
        showModalButton={false}
        modalSize="sm"
      >
        <DuplicateKPI />
      </ReduxDialog>
      <ReduxDialog
        value="view-all-kpi-history"
        modalTitle="HISTORY"
        showModalButton={false}
        modalSize="md"
      >
        <OverallHistory />
      </ReduxDialog>
      <CustomDialog
        handleClose={handleProjectClose}
        open={openProject}
        modalTitle="Dashboard Module"
        redirectPath={"/projects-overview"}
        showModalButton={true}
        modalSize="md"
      >
        <ViewProjectPopup />
      </CustomDialog>
      <ReduxDialog
        value="create-project"
        modalTitle="Create New Project"
        showModalButton={false}
        modalSize="md"
      >
        <CreateProject flag="add" />
      </ReduxDialog>
    </Box>
  );
};

export default memo(ViewKpiPopup);
