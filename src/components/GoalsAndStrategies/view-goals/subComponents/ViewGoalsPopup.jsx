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
import { stringAvatar } from "../../../../helpers/stringAvatar";
import {
  Add,
  CalendarMonth,
  ContentCopy,
  Delete,
  Edit,
  History,
  NoteAdd,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import ConfirmationDialog from "../../../common/ConfirmationDialog";
import {
  openCnfModal,
} from "../../../../redux/action/confirmationModalSlice";
import { openModal } from "../../../../redux/action/modalSlice";
import DuplicateDialog from "../../goals-overview/subComponents/DuplicateDialog";
import ReduxDialog from "../../../common/ReduxDialog";

const ViewGoalsPopup = ({ popup }) => {
  const theme = useTheme();
  const CommonList = ({ icon, title, info }) => {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
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

  const handleDuplicate=()=>{
    dispatch(openModal("duplicate-goal"));
  }

  const handleViewHistory=()=>{
        dispatch(openModal("view-all-history"));
  }
  return (
    <Box sx={{ flexGrow: 1, width: "100%", background: "white", p: 2 }} mb={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={12}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              flexDirection: "row",
              pt: 1,
              pb: 1,
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
                <History sx={{ fontSize: "20px" }} onClick={handleViewHistory} />
              </IconButton>
            </Tooltip>
          </Box>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Typography
            sx={{ fontSize: 14, color: "#212934", textAlign: "start" }}
          >
            Description :
          </Typography>
        </Grid>
        <Grid item xs={3} md={3} lg={3}>
          <CommonList
            icon={<CalendarMonth sx={{ color: "#c7df19", fontSize: "14px" }} />}
            title={"Start Date"}
            info={"20 Mar, 2023"}
          />
        </Grid>
        <Grid item xs={3} md={3} lg={3}>
          <CommonList
            icon={<CalendarMonth sx={{ color: "#c7df19", fontSize: "14px" }} />}
            title={"Start Date"}
            info={"20 Mar, 2023"}
          />
        </Grid>
        <Grid item xs={3} md={3} lg={3}>
          <CommonList
            icon={<CalendarMonth sx={{ color: "#c7df19", fontSize: "14px" }} />}
            title={"Start Date"}
            info={"20 Mar, 2023"}
          />
        </Grid>
        <Grid item xs={3} md={3} lg={3}>
          <CommonList
            icon={<CalendarMonth sx={{ color: "#c7df19", fontSize: "14px" }} />}
            title={"Start Date"}
            info={"20 Mar, 2023"}
          />
        </Grid>
      </Grid>
      <ConfirmationDialog value={"fileItGoal"} />
      <ConfirmationDialog value={"deleteGoal"} />
      <ReduxDialog
        value="duplicate-goal"
        modalTitle="Copy Goal"
        showModalButton={false}
        modalSize="sm"
      >
        <DuplicateDialog />
      </ReduxDialog>
    </Box>
  );
};

export default memo(ViewGoalsPopup);
