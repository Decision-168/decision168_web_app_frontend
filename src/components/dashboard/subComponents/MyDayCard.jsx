import React from "react";
import { Box, Paper, Stack, Typography, Button, Avatar } from "@mui/material";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CardRow from "./CardRow";
import { Link } from "react-router-dom";
import NoDataFound from "../../common/NoDataFound";

export default function MyDayCard({ TodayTasksResult, TodaySubtasksResult }) {
  const areBothArraysEmpty = TodayTasksResult?.length === 0 && TodaySubtasksResult?.length === 0;
  return (
    <Paper elevation={0}>
      <Stack direction="row" justifyContent="space-between" alignItems="start" spacing={2} p={2}>
        <Box component="span" flexGrow={1}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} py={2} sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Typography component="div" variant="subtitle2">
              My Day
            </Typography>
            {!areBothArraysEmpty && (
              <Button component={Link} to="/dashboard" variant="outlined" size="small" startIcon={<ArrowForwardIcon />}>
                view all
              </Button>
            )}
          </Stack>

          <Box>
            {areBothArraysEmpty ? (
              <NoDataFound message="No tasks or subtasks for today" />
            ) : (
              <>
                <Box>{TodayTasksResult?.length > 0 && TodayTasksResult?.map((task) => <CardRow key={task?.tid} type="Task" text={task?.tname} cardType="My Day" handleOpen={""} />)}</Box>
                <Box>{TodaySubtasksResult?.length > 0 && TodaySubtasksResult?.map((subtask) => <CardRow key={subtask?.stid} type="Subtask" text={subtask?.stname} cardType="My Day" handleOpen={""} />)}</Box>
              </>
            )}
          </Box>
        </Box>

        <Box py={1}>
          <Avatar sx={{ bgcolor: "#1A1A1A" }}>
            <AssignmentTurnedInIcon />
          </Avatar>
        </Box>
      </Stack>
    </Paper>
  );
}
