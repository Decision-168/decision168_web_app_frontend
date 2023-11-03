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
import React from "react";
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
import { openModal } from "../../../../redux/action/modalSlice";
import { useDispatch } from "react-redux";

const ViewGoalsPopup = () => {
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
            <Tooltip title="Duplicate">
              <IconButton>
                <ContentCopy sx={{ fontSize: "20px" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="File It">
              <IconButton>
                <NoteAdd sx={{ fontSize: "20px" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton>
                <Delete sx={{ fontSize: "20px" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="View History">
              <IconButton>
                <History sx={{ fontSize: "20px" }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Typography sx={{ fontSize: 14, color: "#212934",textAlign:'start' }}>
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
    </Box>
  );
};

export default ViewGoalsPopup;
