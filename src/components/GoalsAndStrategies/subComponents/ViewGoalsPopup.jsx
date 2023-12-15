import { Box, Grid, IconButton } from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import {
  Add,
  BusinessCenter,
  CalendarMonth,
  Edit,
  Person,
  VisibilityOutlined,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import {
  closeCnfModal,
  openCnfModal,
} from "../../../redux/action/confirmationModalSlice";
import { openModal } from "../../../redux/action/modalSlice";
import ViewKpiPopup from "./ViewKpiPopup";
import CustomDialog from "../../common/CustomDialog";
import ConfirmationDialog from "../../common/ConfirmationDialog";
import ReduxDialog from "../../common/ReduxDialog";
import DuplicateDialog from "./DuplicateDialog";
import Goal from "../portfolio-goals/create-goals/subComponents/Goal";
// import KPIs from "../portfolio-goals/create-goals/subComponents/KPIs";
import OverallHistory from "./history-section/OverallHistory";
import GridList from "./GridList";
import TitleWithActions from "./TitleWithActions";
import { description } from "./style-functions";
import HiddenListOfDialog from "./HiddenListOfDialog";
import moment from "moment";
import {
  CallFileItGoal,
  CallTrashGoal,
  getGoalDetail,
  getViewHistoryDateGoal,
} from "../../../api/modules/goalkpiModule";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../redux/action/userSlice";
import KPIs from "../portfolio-goals/create-goals/subComponents/KPIs";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const ViewGoalsPopup = ({ goalID, id }) => {
  const navigate = useNavigate();
  const gid = goalID;

  //get user id
  const user = useSelector(selectUserDetails);
  const user_id = user?.reg_id;
  //get user id

  const formatDate = (timestamp) => {
    // Check if the timestamp is valid
    if (!timestamp) {
      return "No Date";
    }

    // Assuming your timestamp is in milliseconds
    const formattedDate = moment(timestamp).format("D MMM, YYYY");
    return formattedDate;
  };

  //get goal & kpi detail
  const [gdetail, setgdetail] = useState([]);
  const [kpidetails, setkpidetails] = useState([]);

  useEffect(() => {
    const fetchAllGoalData = async () => {
      try {
        const response = await getGoalDetail(gid);
        setgdetail(response.goalRes);
        setkpidetails(response.GoalsAllStrategiesListRes);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllGoalData();
  }, []);
  //get goal & kpi detail

  //Check Button Visibility
  const [displayBtns, setdisplayBtns] = useState("no");

  useEffect(() => {
    const DisplayTitleWithActions = async () => {
      try {
        if (gdetail.gcreated_by == user_id) {
          setdisplayBtns("all");
        } else if (
          gdetail.get_portfolio_createdby_id == user_id ||
          gdetail.gmanager == user_id
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
  }, []);
  //Check Button Visibility

  const [allHist, setallHist] = useState([]);

  useEffect(() => {
    const fetchAllHistoryData = async () => {
      try {
        const hresponse = await getViewHistoryDateGoal(gid);
        setallHist(hresponse.history_dates);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllHistoryData();
  }, []);

  const [openKPI, setOpenKPI] = useState(false);
  const [inputFields, setInputFields] = useState([{ sname: "", sdes: "" }]);

  const [getkpi_id, setkpi_id] = useState([]);
  const [getkpi_sname, setkpi_sname] = useState([]);

  const handleAddClick = () => {
    setInputFields([...inputFields, { sname: "", sdes: "" }]);
  };
  const handleKPIClose = () => {
    setOpenKPI(false);
  };
  const handleKPIOpen = (sid, sname) => {
    setkpi_id(sid);
    setkpi_sname(sname);
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

  const handleGoalFileItYes = async () => {
    try {
      const response = await CallFileItGoal(gdetail.gid, "1"); //user_id
      dispatch(closeCnfModal({ modalName: "fileItGoal" }));
      toast.success(`${response.message}`);
      navigate("/portfolio-goals");
    } catch (error) {
      toast.error(`${error.response?.data?.error}`);
      console.error(error);
    }
  };

  const handleGoalDeleteYes = async () => {
    try {
      const response = await CallTrashGoal(gdetail.gid, "1"); //user_id
      dispatch(closeCnfModal({ modalName: "deleteGoal" }));
      toast.success(`${response.message}`);
      navigate("/portfolio-goals");
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
          title={`GOAL: ${gdetail.gname}`}
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
          description={gdetail?.gdes ? gdetail?.gdes : "No Description!"}
          progressHeading={"Progress :"}
          progressPercentage={gdetail.progress}
          displayBtns={"all"}
        />
        <Grid item xs={3} md={3} lg={3}>
          <GridList
            icon={<CalendarMonth sx={{ color: "#c7df19", fontSize: "14px" }} />}
            title={"Start Date"}
            info={formatDate(gdetail.gstart_date)}
          />
        </Grid>
        <Grid item xs={3} md={3} lg={3}>
          <GridList
            icon={<CalendarMonth sx={{ color: "#c7df19", fontSize: "14px" }} />}
            title={"End Date"}
            info={formatDate(gdetail.gend_date)}
          />
        </Grid>
        <Grid item xs={3} md={3} lg={3}>
          <GridList
            icon={
              <BusinessCenter sx={{ color: "#c7df19", fontSize: "14px" }} />
            }
            title={"Department"}
            info={gdetail.get_dept_name}
          />
        </Grid>
        <Grid item xs={3} md={3} lg={3}>
          <GridList
            icon={<Person sx={{ color: "#c7df19", fontSize: "14px" }} />}
            title={"Created By"}
            info={gdetail.get_created_by_name}
          />
        </Grid>

        {!window.location.pathname.startsWith("/goal-overview/") && (
          <HiddenListOfDialog
            heading={"KPIs"}
            title={"KPI"}
            data={kpidetails}
            handleOpen={handleKPIOpen}
          />
        )}
      </Grid>
      <CustomDialog
        handleClose={handleKPIClose}
        open={openKPI}
        modalTitle={getkpi_sname}
        redirectPath={`/kpi-overview/${getkpi_id}`}
        showModalButton={true}
        modalSize="md"
      >
        <ViewKpiPopup kpi_id={getkpi_id} />
      </CustomDialog>
      <ConfirmationDialog
        value={"fileItGoal"}
        handleYes={handleGoalFileItYes}
      />
      <ConfirmationDialog
        value={"deleteGoal"}
        handleYes={handleGoalDeleteYes}
      />
      <ReduxDialog
        value="view-all-history"
        modalTitle="HISTORY"
        showModalButton={false}
        modalSize="md"
      >
        <OverallHistory
          allHist={allHist}
          name={gdetail.gname}
          type={"goal"}
          id={gdetail.gid}
        />
      </ReduxDialog>
      <ReduxDialog
        value="duplicate-goal"
        modalTitle="Copy Goal"
        showModalButton={false}
        modalSize="sm"
      >
        <DuplicateDialog goalData={gdetail} />
      </ReduxDialog>
      <ReduxDialog
        value="edit-goals"
        modalTitle="Edit Goal"
        showModalButton={false}
        modalSize="md"
      >
        <Goal passGID={gdetail.gid} individual={true} />
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
          passGID={gdetail.gid}
          passGDEPT={gdetail.gdept}
        />
      </ReduxDialog>
    </Box>
  );
};
export default memo(ViewGoalsPopup);
