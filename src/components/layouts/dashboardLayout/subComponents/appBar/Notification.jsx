import { Grid, Typography, Box, IconButton, Chip } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import EventIcon from "@mui/icons-material/Event";
import moment from "moment";
import CustomAvatar from "../../../../common/CustomAvatar";

export default function Notification({ type, taskCode, TaskName, ProjectName, taskDueDate, handleRemove }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={2} lg={2}>
        <CustomAvatar backColor="#383838" name={type} />
      </Grid>
      <Grid item xs={12} md={8} lg={8} sx={{ textWrap: "wrap", color: "#74788d", textAlign: "left" }}>
        {taskCode ? <Chip label={taskCode} sx={{ fontSize: "10px", height: "18px" }} /> : null}

        <Typography variant="body1" sx={{ fontSize: "12px", m: 1 }}>
          {TaskName}
        </Typography>
        <Typography variant="body1" sx={{ fontSize: "12px", fontWeight: "700", m: 1 }}>
          {ProjectName}
        </Typography>

        {taskDueDate ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              m: 1,
            }}>
            <EventIcon sx={{ mr: 0.5, fontSize: "12px" }} />
            <Typography variant="body1" sx={{ fontSize: "12px", textAlign: "left" }}>
              {moment(taskDueDate).format("YYYY-MM-DD")}
            </Typography>
          </Box>
        ) : null}
      </Grid>
      <Grid item xs={12} md={2} lg={2}>
        <IconButton size="small" sx={{ bgcolor: "#eff2f7", fontSize:"1rem" }} onClick={handleRemove}>
          <CloseIcon fontSize= "inherite"  />
        </IconButton>
      </Grid>
    </Grid>
  );
}
