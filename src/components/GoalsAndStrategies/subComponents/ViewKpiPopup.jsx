import { Box, Grid, IconButton, Tooltip, useTheme } from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import {
  Add,
  AssignmentTurnedInOutlined,
  BusinessCenter,
  CalendarMonth,
  Edit,
  FolderOpenOutlined,
  Person,
  VisibilityOutlined,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { closeCnfModal, openCnfModal } from "../../../redux/action/confirmationModalSlice";
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
import moment from "moment";
import {
  CallFileItKPI,
  CallTrashKPI,
  getStrategyDetail,
  getViewHistoryDateStrategy,
} from "../../../api/modules/goalkpiModule";
import ProjectListOfDialog from "./ProjectListOfDialog";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../redux/action/userSlice";
import { toast } from "react-toastify";
const ViewKpiPopup = ({ kpi_id }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openProject, setOpenProject] = useState(false);

  //get user id
  const user = useSelector(selectUserDetails);
  const user_id = user?.reg_id;
  //get user id

  const [kpiDetail, setkpiDetail] = useState([]);
  const [kpiProDetails, setkpiProDetails] = useState([]);

  const fetchAllKPIData = async () => {
    try {
      const response = await getStrategyDetail(kpi_id);
      setkpiDetail(response.kpiRes);
      setkpiProDetails(response.projectRes);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllKPIData();
  }, [kpi_id]);

  //Check Button Visibility
  const [displayBtns, setdisplayBtns] = useState("no");

  useEffect(() => {
    const DisplayTitleWithActions = async () => {
      try {
        if (kpiDetail.screated_by == user_id) {
          setdisplayBtns("all");
        } else if (
          kpiDetail.get_goal_owner == user_id ||
          kpiDetail.get_portfolio_createdby_id == user_id ||
          kpiDetail.get_goal_manager == user_id
        ) {
          setdisplayBtns("some");
        } else {
          setdisplayBtns("no");
        }
      } catch (error) {
        console.error(error);
        setdisplayBtns("no");
      }
    };

    DisplayTitleWithActions();
  }, [kpiDetail, user_id]);
  //Check Button Visibility

  const [allKPIHist, setallKPIHist] = useState([]);

  useEffect(() => {
    const fetchKPIAllHistoryData = async () => {
      try {
        const hresponse = await getViewHistoryDateStrategy(kpi_id);
        setallKPIHist(hresponse.history_dates);
      } catch (error) {
        console.error(error);
      }
    };

    fetchKPIAllHistoryData();
  }, [kpi_id]);

  const formatDate = (timestamp) => {
    // Check if the timestamp is valid
    if (!timestamp) {
      return "No Date";
    }

    // Assuming your timestamp is in milliseconds
    const formattedDate = moment(timestamp).format("D MMM, YYYY");
    return formattedDate;
  };

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
  
  const handleKpiFileItYes = async () => {  
    try {
      const response = await CallFileItKPI(kpiDetail.sid, user_id);
      dispatch(closeCnfModal({ modalName: "fileItKPI" }));
      toast.success(`${response.message}`);
      navigate(`/goal-overview/${kpiDetail.gid}`);
    } catch (error) {
      toast.error(`${error.response?.data?.error}`);
      console.error(error);
    }
  };

  const handleKpiDeleteYes = async () => {    
    try {
      const response = await CallTrashKPI(kpiDetail.sid, user_id);
      dispatch(closeCnfModal({ modalName: "deleteKPI" }));
      toast.success(`${response.message}`);
      navigate(`/goal-overview/${kpiDetail.gid}`);
    } catch (error) {
      toast.error(`${error.response?.data?.error}`);
      console.error(error);
    }
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
          title={`KPI: ${kpiDetail.sname}`}
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
          description={kpiDetail?.sdes ? kpiDetail?.sdes : "No Description!"}
          progressHeading={`Status : Done: ${kpiDetail.kpi_total_pro_progress_done} Total: ${kpiDetail.kpi_total_pro_progress}`}
          progressPercentage={kpiDetail.kpi_progress}
          displayBtns={displayBtns}
        />
        <Grid item xs={3} md={3} lg={3}>
          <GridList
            icon={<CalendarMonth sx={{ color: "#c7df19", fontSize: "14px" }} />}
            title={"Created Date"}
            info={formatDate(kpiDetail?.screated_date)}
          />
        </Grid>
        <Grid item xs={3} md={3} lg={3}>
          <GridList
            icon={
              <FolderOpenOutlined sx={{ color: "#c7df19", fontSize: "14px" }} />
            }
            title={"Goal"}
            info={kpiDetail?.get_goal_name}
          />
        </Grid>
        <Grid item xs={3} md={3} lg={3}>
          <GridList
            icon={
              <BusinessCenter sx={{ color: "#c7df19", fontSize: "14px" }} />
            }
            title={"Department"}
            info={kpiDetail?.get_dept_name}
          />
        </Grid>
        <Grid item xs={3} md={3} lg={3}>
          <GridList
            icon={<Person sx={{ color: "#c7df19", fontSize: "14px" }} />}
            title={"Created By"}
            info={kpiDetail?.get_created_by_name}
          />
        </Grid>
        {!window.location.pathname.startsWith("/kpi-overview/") && (
          <ProjectListOfDialog
            heading={"Projects"}
            title={"PROJECT"}
            data={kpiProDetails}
            handleOpen={handleProjectOpen}
          />
        )}
      </Grid>
      <ConfirmationDialog value={"fileItKPI"} handleYes={handleKpiFileItYes} />
      <ConfirmationDialog value={"deleteKPI"} handleYes={handleKpiDeleteYes} />
      <ReduxDialog
        value="edit-kpi"
        modalTitle="Edit KPI"
        showModalButton={false}
        modalSize="sm"
      >
        <EditKPIPopup kpiData={kpiDetail} fetchAllKPIDataFun={fetchAllKPIData}/>
      </ReduxDialog>
      <ReduxDialog
        value="duplicate-kpi"
        modalTitle="Copy KPI"
        showModalButton={false}
        modalSize="sm"
      >
        <DuplicateKPI kpiData={kpiDetail}/>
      </ReduxDialog>
      <ReduxDialog
        value="view-all-kpi-history"
        modalTitle="HISTORY"
        showModalButton={false}
        modalSize="md"
      >
        <OverallHistory
          allHist={allKPIHist}
          name={kpiDetail?.sname}
          type={"kpi"}
          id={kpiDetail?.sid}
        />
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
