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
import React, { memo } from "react";
import { stringAvatar } from "../../../helpers/stringAvatar";
import {
  Add,
  CalendarMonth,
  ContentCopy,
  Delete,
  Edit,
  FolderOpenOutlined,
  History,
  KeyboardDoubleArrowRight,
  NoteAdd,
  Person,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { openCnfModal } from "../../../redux/action/confirmationModalSlice";
import { openModal } from "../../../redux/action/modalSlice";
import ProgressBar from "./ProgressBar";
import ConfirmationDialog from "../../common/ConfirmationDialog";
import { Link } from "react-router-dom";
const ViewProjectPopup = ({}) => {
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
  const projectData = [1, 2];
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
    dispatch(openModal("duplicate-kpi"));
  };

  const handleViewHistory = () => {
    dispatch(openModal("view-all-kpi-history"));
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
              {...stringAvatar("Dashboard Module")}
            </Avatar>
            <Typography
              sx={{
                color: "#343a40",
                fontWeight: "900",
                fontSize: "16px",
              }}
              textAlign={"start"}
            >
              Project: Dashboard Module
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
              //   onClick={() => dispatch(openModal("edit-kpi"))}
            >
              Edit Project
            </Button>
            <Button variant="contained" startIcon={<Add />} size="small">
              Add Task
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
            <Tooltip title="Duplicate" onClick={handleDuplicate}>
              <IconButton>
                <ContentCopy sx={{ fontSize: "20px" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="File It" onClick={handleFileIt}>
              <IconButton>
                <NoteAdd sx={{ fontSize: "20px" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete" onClick={handleDelete}>
              <IconButton>
                <Delete sx={{ fontSize: "20px" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="View History">
              <IconButton>
                <History
                  sx={{ fontSize: "20px" }}
                  onClick={handleViewHistory}
                />
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
            Account Creation Process such as <br />- Registration <br />-
            Registration through Social Media <br />- Login <br />- Login
            through Social Media <br />- Forgot password
          </Typography>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Typography sx={{ fontSize: 13, textAlign: "left" }}>
            Links & Comments :
          </Typography>
        </Grid>
        <Grid item xs={12} md={12} lg={12} mb={2}>
          <Grid container spacing={2}>
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
                  to={"https://dev.decision168.com/register"}
                >
                  https://dev.decision168.com/register
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} textAlign={"initial"}>
              <Typography
                sx={{
                  fontSize: 13,
                }}
              >
                registration link
              </Typography>
            </Grid>
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
                  to={"https://dev.decision168.com/login"}
                >
                  https://dev.decision168.com/login
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} textAlign={"initial"}>
              <Typography
                sx={{
                  fontSize: 13,
                }}
              >
                login link
              </Typography>
            </Grid>
          </Grid>
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
            icon={<Person sx={{ color: "#c7df19", fontSize: "14px" }} />}
            title={"Created By"}
            info={"Uzma Karjikar"}
          />
        </Grid>
        <Grid item xs={3} md={3} lg={3}>
          <CommonList
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
      {/* <ReduxDialog
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
      </ReduxDialog> */}
    </Box>
  );
};

export default memo(ViewProjectPopup);
