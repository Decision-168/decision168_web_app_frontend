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
  AssignmentTurnedInOutlined,
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
import ConfirmationDialog from "../../common/ConfirmationDialog";
import ReduxDialog from "../../common/ReduxDialog";
import EditKPIPopup from "./EditKPIPopup";
import DuplicateKPI from "../goals-overview/Kpi/DuplicateKPI";
import OverallHistory from "../kpi-overview/kpi-history/OverallHistory";
import ViewProjectPopup from "./ViewProjectPopup";
import CustomDialog from "../../common/CustomDialog";
const ViewKpiPopup = ({}) => {
  const theme = useTheme();
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
  const dispatch = useDispatch();
  const kpiData = [1, 2];
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
    const [openProject, setOpenProject] = useState(false);

    const handleProjectClose = () => {
      setOpenProject(false);
    };
    const handleProjectOpen = () => {
      setOpenProject(true);
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
              {...stringAvatar("ABC Strategy 3")}
            </Avatar>
            <Typography
              sx={{
                color: "#343a40",
                fontWeight: "900",
                fontSize: "16px",
              }}
              textAlign={"start"}
            >
              KPI: ABC Strategy 3
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
              onClick={() => dispatch(openModal("edit-kpi"))}
            >
              Edit KPI
            </Button>
            <Button variant="contained" startIcon={<Add />} size="small">
              Add Project
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
            Status : Done: 4 Total: 18
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
            Development of D168 Platform. Development is a process that creates
            growth, progress, positive change or the addition of physical,
            economic, environmental, social and demographic components.
          </Typography>
        </Grid>
        <Grid item xs={3} md={3} lg={3}>
          <CommonList
            icon={<CalendarMonth sx={{ color: "#c7df19", fontSize: "14px" }} />}
            title={"Created Date"}
            info={"6 Nov, 2023"}
          />
        </Grid>

        <Grid item xs={3} md={3} lg={3}>
          <CommonList
            icon={
              <BusinessCenter sx={{ color: "#c7df19", fontSize: "14px" }} />
            }
            title={"Progress"}
            info={"In Progress"}
          />
        </Grid>
        <Grid item xs={3} md={3} lg={3}>
          <CommonList
            icon={<Person sx={{ color: "#c7df19", fontSize: "14px" }} />}
            title={"Created By"}
            info={"Uzma Karjikar"}
          />
        </Grid>
        {window.location.pathname !== "/kpi-overview" && (
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
                Projects
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
                        PROJECT:
                        <Typography
                          sx={{
                            fontSize: 13,
                            mx: 1,

                            display: "inline",
                          }}
                        >
                          Dashboard Module
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
                        // onClick={handleKPIOpen}
                      >
                        <AssignmentTurnedInOutlined fontSize="small" />
                      </IconButton>
                      <IconButton
                        aria-label="view"
                        size="small"
                        onClick={handleProjectOpen}
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
        // redirectPath={"/kpi-overview"}
        showModalButton={true}
        modalSize="md"
      >
        <ViewProjectPopup />
      </CustomDialog>
    </Box>
  );
};

export default memo(ViewKpiPopup);
