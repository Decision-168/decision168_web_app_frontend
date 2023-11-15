import { Box, Grid, IconButton } from "@mui/material";
import React, { memo, useState } from "react";
import {
  Add,
  BusinessCenter,
  CalendarMonth,
  Edit,
  Person,
  VisibilityOutlined,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { openCnfModal } from "../../../redux/action/confirmationModalSlice";
import { openModal } from "../../../redux/action/modalSlice";
import ViewKpiPopup from "./ViewKpiPopup";
import CustomDialog from "../../common/CustomDialog";
import ConfirmationDialog from "../../common/ConfirmationDialog";
import ReduxDialog from "../../common/ReduxDialog";
import DuplicateDialog from "./DuplicateDialog";
import Goal from "../portfolio-goals/create-goals/subComponents/Goal";
import KPIs from "../portfolio-goals/create-goals/subComponents/KPIs";
import OverallHistory from "./history-section/OverallHistory";
import GridList from "./GridList";
import TitleWithActions from "./TitleWithActions";
import { description } from "./style-functions";
import HiddenListOfDialog from "./HiddenListOfDialog";
const ViewGoalsPopup = ({}) => {
  const [openKPI, setOpenKPI] = useState(false);
  const [inputFields, setInputFields] = useState([]);

  const handleAddClick = () => {
    setInputFields([...inputFields, { KPI: "", Description: "" }]);
  };
  const handleKPIClose = () => {
    setOpenKPI(false);
  };
  const handleKPIOpen = () => {
    setOpenKPI(true);
  };

  const dispatch = useDispatch();

  const handleFileIt = () => {
    dispatch(
      openCnfModal({
        modalName: "fileItGoal",
        title: "Are you sure?",
        description: "You want to File it!",
      })
    );
  };
  const handleDelete = () => {
    dispatch(
      openCnfModal({
        modalName: "deleteGoal",
        title: "Are you sure?",
        description: "You want to Delete!",
      })
    );
  };

  const handleDuplicate = () => {
    dispatch(openModal("duplicate-goal"));
  };

  const handleViewHistory = () => {
    dispatch(openModal("view-all-history"));
  };
  const handleCreateGoal = () => {
    dispatch(openModal("edit-goals"));
  };
  const handleCreateKPI = () => {
    dispatch(openModal("create-kpis"));
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
          title={"GOAL: Demo Goal"}
          handleClick1={handleCreateGoal}
          handleClick2={handleCreateKPI}
          handleDelete={handleDelete}
          handleDuplicate={handleDuplicate}
          handleFileIt={handleFileIt}
          handleViewHistory={handleViewHistory}
          btn1Text={"Edit Goal"}
          btn2Text={"Add KPIs"}
          btn1Icon={<Edit />}
          btn2Icon={<Add />}
          description={description}
          progressHeading={"Progress :"}
        />
        <Grid item xs={3} md={3} lg={3}>
          <GridList
            icon={<CalendarMonth sx={{ color: "#c7df19", fontSize: "14px" }} />}
            title={"Start Date"}
            info={"6 Nov, 2023"}
          />
        </Grid>
        <Grid item xs={3} md={3} lg={3}>
          <GridList
            icon={<CalendarMonth sx={{ color: "#c7df19", fontSize: "14px" }} />}
            title={"End Date"}
            info={"31 Dec, 2023"}
          />
        </Grid>
        <Grid item xs={3} md={3} lg={3}>
          <GridList
            icon={
              <BusinessCenter sx={{ color: "#c7df19", fontSize: "14px" }} />
            }
            title={"Department"}
            info={"Research & Development"}
          />
        </Grid>
        <Grid item xs={3} md={3} lg={3}>
          <GridList
            icon={<Person sx={{ color: "#c7df19", fontSize: "14px" }} />}
            title={"Created By"}
            info={"Uzma Karjikar"}
          />
        </Grid>

        {window.location.pathname !== "/goal-overview" && (
          <HiddenListOfDialog
            heading={"KPIs"}
            title={"KPI"}
            value={"ABC Strategy 3"}
          >
            <IconButton aria-label="view" size="small" onClick={handleKPIOpen}>
              <VisibilityOutlined fontSize="small" />
            </IconButton>
          </HiddenListOfDialog>
        )}
      </Grid>
      <CustomDialog
        handleClose={handleKPIClose}
        open={openKPI}
        modalTitle="ABC Strategy 3"
        redirectPath={"/kpi-overview"}
        showModalButton={true}
        modalSize="md"
      >
        <ViewKpiPopup />
      </CustomDialog>
      <ConfirmationDialog value={"fileItGoal"} />
      <ConfirmationDialog value={"deleteGoal"} />
      <ReduxDialog
        value="view-all-history"
        modalTitle="HISTORY"
        showModalButton={false}
        modalSize="md"
      >
        <OverallHistory />
      </ReduxDialog>
      <ReduxDialog
        value="duplicate-goal"
        modalTitle="Copy Goal"
        showModalButton={false}
        modalSize="sm"
      >
        <DuplicateDialog />
      </ReduxDialog>
      <ReduxDialog
        value="edit-goals"
        modalTitle="Edit Goal"
        showModalButton={false}
        modalSize="md"
      >
        <Goal individual={true} />
      </ReduxDialog>
      <ReduxDialog
        value="create-kpis"
        modalTitle="Add KPIs"
        showModalButton={false}
        modalSize="sm"
      >
        <KPIs
          individual={true}
          inputFields={inputFields}
          setInputFields={setInputFields}
          handleAddClick={handleAddClick}
        />
      </ReduxDialog>
    </Box>
  );
};
export default memo(ViewGoalsPopup);
