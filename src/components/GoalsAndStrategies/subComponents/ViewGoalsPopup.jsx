import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import React, { memo, useState } from "react";
import { stringAvatar } from "../../../helpers/stringAvatar";
import {
  Add,
  BusinessCenter,
  CalendarMonth,
  ContentCopy,
  Delete,
  Edit,
  History,
  NoteAdd,
  Person,
  VisibilityOutlined,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { openCnfModal } from "../../../redux/action/confirmationModalSlice";
import { openModal } from "../../../redux/action/modalSlice";
import ProgressBar from "./ProgressBar";
import ViewKpiPopup from "./ViewKpiPopup";
import CustomDialog from "../../common/CustomDialog";
import ConfirmationDialog from "../../common/ConfirmationDialog";
import ReduxDialog from "../../common/ReduxDialog";
import OverallHistory from "../goals-overview/goal-history/OverallHistory";
import DuplicateDialog from "./DuplicateDialog";
import Goal from "../create-goals/subComponents/Goal";
import KPIs from "../create-goals/subComponents/KPIs";
const ViewGoalsPopup = ({}) => {
  const theme = useTheme();
  const [openKPI, setOpenKPI] = useState(false);

  const handleKPIClose = () => {
    setOpenKPI(false);
  };
  const handleKPIOpen = () => {
    setOpenKPI(true);
  };

  const dispatch = useDispatch();

  const kpiData = [1, 2];
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
  const [inputFields, setInputFields] = useState([]);

  const handleAddClick = () => {
    setInputFields([...inputFields, { KPI: "", Description: "" }]);
  };
  const CommonList = ({ icon, title, info }) => {
    return (
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
          {icon}
          <Typography sx={{ fontSize: 14, color: "#212934", ml: 1 }}>
            {title}
          </Typography>
        </Box>

        <Typography sx={{ fontSize: 13, color: "#74788d" }}>{info}</Typography>
      </Box>
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
              sx={{ bgcolor: theme.palette.primary.main, mr: 1 }}
              aria-label="goal"
            >
              {...stringAvatar("Demo Goal")}
            </Avatar>
            <Typography
              sx={{
                color: "#343a40",
                fontWeight: "900",
                fontSize: "16px",
              }}
              textAlign={"start"}
            >
              GOAL: Demo Goal
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6} md={6} lg={6}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              pt: 1,
              pb: 1,
            }}
          >
            <Button
              variant="contained"
              startIcon={<Edit />}
              size="small"
              sx={{ mr: 1 }}
              onClick={() => dispatch(openModal("create-goals"))}
            >
              Edit Goal
            </Button>
            <Button
              variant="contained"
              startIcon={<Add />}
              size="small"
              onClick={() => dispatch(openModal("create-kpis"))}
            >
              Add KPIs
            </Button>
          </Box>
        </Grid>
        <Grid item xs={6} md={6} lg={6}>
          <Box
            sx={{
              display: "flex",
              alignItems: "bottom",
              justifyContent: "end",
              flexDirection: "row",
            }}
          >
            <Tooltip title="Duplicate">
              <IconButton onClick={handleDuplicate}>
                <ContentCopy sx={{ fontSize: "20px" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="File It">
              <IconButton onClick={handleFileIt}>
                <NoteAdd sx={{ fontSize: "20px" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton onClick={handleDelete}>
                <Delete sx={{ fontSize: "20px" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="View History">
              <IconButton onClick={handleViewHistory}>
                <History sx={{ fontSize: "20px" }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Typography
            sx={{ fontSize: 14, color: "#212934", textAlign: "start" }}
          >
            Progress :
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
            MANAGEMENT, ACCOUNTABILITY, & PRODUCTIVITY Use this platform to
            reclaim time, gain brand exposure, and to focus on what’s important
            for you to build an innovative business and manage your personal or
            professional life – or both. The DECISION 168 team is on a mission
            to Empower Small Businesses, Entrepreneurs, and Individuals. Through
            the relationships and experience of our network, we will make a
            difference together. Our goal is to help people across the world
            perform and function at their highest levels and utilize their
            unique talents, so that they may make an impact within their
            communities and beyond.
          </Typography>
        </Grid>
        <Grid item xs={3} md={3} lg={3}>
          <CommonList
            icon={<CalendarMonth sx={{ color: "#c7df19", fontSize: "14px" }} />}
            title={"Start Date"}
            info={"6 Nov, 2023"}
          />
        </Grid>
        <Grid item xs={3} md={3} lg={3}>
          <CommonList
            icon={<CalendarMonth sx={{ color: "#c7df19", fontSize: "14px" }} />}
            title={"End Date"}
            info={"31 Dec, 2023"}
          />
        </Grid>
        <Grid item xs={3} md={3} lg={3}>
          <CommonList
            icon={
              <BusinessCenter sx={{ color: "#c7df19", fontSize: "14px" }} />
            }
            title={"Department"}
            info={"Research & Development"}
          />
        </Grid>
        <Grid item xs={3} md={3} lg={3}>
          <CommonList
            icon={<Person sx={{ color: "#c7df19", fontSize: "14px" }} />}
            title={"Created By"}
            info={"Uzma Karjikar"}
          />
        </Grid>

        {window.location.pathname !== "/goal-overview" && (
          <>
            <Grid item xs={12} md={12} lg={12}>
              <Typography
                sx={{
                  color: "#495057",
                  fontSize: 15,
                  fontWeight: "600",
                  ml: 0.5,
                  textAlign: "left",
                }}
              >
                KPIs
              </Typography>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              {kpiData.map((item, index) => {
                return (
                  <Grid
                    container
                    key={index}
                    p={1}
                    sx={{ borderBottom: "1px solid #f5f5f5" }}
                  >
                    <Grid item xs={7} md={7} lg={7} textAlign={"left"}>
                      <Typography
                        sx={{
                          fontSize: 13,
                          display: "inline",
                          fontWeight: "700",
                          textAlign: "left",
                        }}
                      >
                        KPI:
                        <Typography
                          sx={{
                            fontSize: 13,
                            mx: 1,

                            display: "inline",
                          }}
                        >
                          ABC Strategy 3
                        </Typography>
                      </Typography>
                    </Grid>
                    <Grid xs={4} alignSelf={"center"}>
                      <ProgressBar />
                    </Grid>
                    <Grid xs={1}>
                      <IconButton
                        aria-label="view"
                        size="small"
                        onClick={handleKPIOpen}
                      >
                        <VisibilityOutlined fontSize="small" />
                      </IconButton>
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
          </>
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
        value="create-goals"
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
