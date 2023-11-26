import React from "react";
import { Box, Paper, Stack, Typography, Button, Avatar } from "@mui/material";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CardRow from "./CardRow";
import { Link } from "react-router-dom";
import NoDataFound from "../../common/NoDataFound";
import { useSelector } from "react-redux";
import PerfectScrollbar from "react-perfect-scrollbar";
import { getAlertNotificationsAsync, selectAlertNotifications } from "../../../redux/action/dashboardSlice";
import { selectUserDetails } from "../../../redux/action/userSlice";
import { updateAlertsAndNotifications } from "../../../api/modules/dashboardModule";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

export default function MyAlertsCard() {
  const data = useSelector(selectAlertNotifications);
  const arrays = [data?.NewTasksResult, data?.NewSubtaskResult, data?.OverdueTasksResult, data?.OverdueSubtaskResult, data?.SentToReviewTasksResult, data?.ReviewDeniedTasksResult, data?.ReviewApprovedTasksResult, data?.SentToReviewSubtasksResult, data?.ReviewDeniedSubtasksResult, data?.ReviewApprovedSubtasksResult, data?.ReviewArriveTasksResult, data?.ReviewArriveSubtasksResult, data?.PendingProjectRequestResult, data?.PortfolioAcceptedResult, data?.ProjectAcceptedResult, data?.ProjectAcceptedInviteResult, data?.MembershipRequestedResult, data?.PendingGoalRequestResult, data?.ProjectFilesResult, data?.TasksFilesResult, data?.SubtasksFilesResult, data?.NewProjectCommentResult];
  const areAllArraysEmpty = arrays.every((array) => array?.length === 0);
  const user = useSelector(selectUserDetails);
  const dispatch = useDispatch();

  const handleRemove = async (id, userId, type) => {
    const response = await updateAlertsAndNotifications(id, userId, type);
    if (response.status === 200) {
      toast.success(`${response?.data?.message}`);
      dispatch(getAlertNotificationsAsync(userId));
    }
  };

  return (
    <Paper elevation={0}>
      <Stack direction="row" justifyContent="space-between" alignItems="start" spacing={2} p={2}>
        <Box component="span" flexGrow={1}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} py={2} sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Typography component="div" variant="subtitle2">
              My Alerts
            </Typography>
            {!areAllArraysEmpty && (
              <Button component={Link} to="/dashboard" variant="outlined" size="small" startIcon={<ArrowForwardIcon />}>
                view all
              </Button>
            )}
          </Stack>
        </Box>

        <Box py={1}>
          <Avatar sx={{ bgcolor: "#1A1A1A" }}>
            <AssignmentTurnedInIcon />
          </Avatar>
        </Box>
      </Stack>
      <Box>
        {areAllArraysEmpty ? (
          <NoDataFound message="No Alerts" />
        ) : (
          <>
            <PerfectScrollbar sx={{}}>
              <Box sx={{ maxHeight: "400px" }}>
                <Box>{data?.NewTasksResult?.length > 0 && data?.NewTasksResult?.map((task) => <CardRow key={task?.tid} type="New Task" text={task?.tname} cardType="My Alerts" handleOpen={""} handleRemove={() => handleRemove(task?.tid, 1, "newtasks")} />)}</Box>
                <Box>{data?.NewSubtaskResult?.length > 0 && data?.NewSubtaskResult?.map((subtask) => <CardRow key={subtask?.stid} type="New Subtask" text={subtask?.stname} cardType="My Alerts" handleOpen={""} handleRemove={() => handleRemove(subtask?.stid, 1, "newsubtasks")} />)}</Box>
                <Box>{data?.OverdueTasksResult?.length > 0 && data?.OverdueTasksResult?.map((overdueTask) => <CardRow key={overdueTask?.tid} type="Overdue Task" text={overdueTask?.tname} cardType="My Alerts" handleOpen={""} handleRemove={() => handleRemove(overdueTask?.tid, 1, "overduetasks")} />)}</Box>
                <Box>{data?.OverdueSubtaskResult?.length > 0 && data?.OverdueSubtaskResult?.map((overdueSubtask) => <CardRow key={overdueSubtask?.stid} type="Overdue Subtask" text={overdueSubtask?.stname} cardType="My Alerts" handleOpen={""} handleRemove={() => handleRemove(overdueSubtask?.stid, 1, "overduesubtasks")} />)}</Box>
                <Box>{data?.SentToReviewTasksResult?.length > 0 && data?.SentToReviewTasksResult?.map((reviewTask) => <CardRow key={reviewTask?.tid} type="Sent To Review Task" text={reviewTask?.tname} cardType="My Alerts" handleOpen={""} handleRemove={() => handleRemove(reviewTask?.tid, 1, "reviewtasks")} />)}</Box>
                <Box>{data?.SentToReviewSubtasksResult?.length > 0 && data?.SentToReviewSubtasksResult?.map((reviewSubtask) => <CardRow key={reviewSubtask?.stid} type="Sent To Review Subtask" text={reviewSubtask?.stname} cardType="My Alerts" handleOpen={""} handleRemove={() => handleRemove(reviewSubtask?.stid, 1, "reviewsubtasks")} />)}</Box>
                <Box>{data?.ReviewArriveTasksResult?.length > 0 && data?.ReviewArriveTasksResult?.map((reviewArriveTask) => <CardRow key={reviewArriveTask?.tid} type="Review Arrived Task" text={reviewArriveTask?.tname} cardType="My Alerts" handleOpen={""} handleRemove={() => handleRemove(reviewArriveTask?.stid, 1, "reviewarrivetasks")} />)}</Box>
                <Box>{data?.ReviewArriveSubtasksResult?.length > 0 && data?.ReviewArriveSubtasksResult?.map((reviewArriveSubtask) => <CardRow key={reviewArriveSubtask?.stid} type="Review Arrived Subtask" text={reviewArriveSubtask?.stname} cardType=" My Alerts" handleOpen={""} handleRemove={() => handleRemove(reviewArriveSubtask?.stid, 1, "reviewarrivesubtasks")} />)}</Box>
                {/* not sure aboute object properties */}
                <Box>{data?.PendingProjectRequestResult?.length > 0 && data?.PendingProjectRequestResult?.map((pendingPR) => <CardRow key={pendingPR?.pm_id} type="Pending Project Request" text={pendingPR?.pname} cardType="My Alerts" handleOpen={""} handleRemove={() => handleRemove(pendingPR?.pm_id, 1, "pendingprojectrequest")} />)}</Box>
                <Box>{data?.PortfolioAcceptedResult?.length > 0 && data?.PortfolioAcceptedResult?.map((acceptedPortfolio) => <CardRow key={acceptedPortfolio?.pim_id} type="Accepted Portfolio" text={acceptedPortfolio?.pname} cardType="My Alerts" handleOpen={""} handleRemove={() => handleRemove(acceptedPortfolio?.pim_id, 1, "portfolioaccepted")} />)}</Box>
                <Box>{data?.ProjectAcceptedResult?.length > 0 && data?.ProjectAcceptedResult?.map((acceptedProject) => <CardRow key={acceptedProject?.pm_id} type="Accepted Project" text={acceptedProject?.pname} cardType="My Alerts" handleOpen={""} handleRemove={() => handleRemove(acceptedProject?.pm_id, 1, "projectaccepted")} />)}</Box>
                <Box>{data?.ProjectAcceptedInviteResult?.length > 0 && data?.ProjectAcceptedInviteResult?.map((prAcceptedInv) => <CardRow key={prAcceptedInv?.im_id} type="Project Accepted invite" text={prAcceptedInv?.pname} cardType="My Alerts" handleOpen={""} handleRemove={() => handleRemove(prAcceptedInv?.im_id, 1, "projectacceptedinvite")} />)}</Box>
                {/* not sure about object properties */}
                <Box>{data?.MembershipRequestedResult?.length > 0 && data?.MembershipRequestedResult?.map((msReq) => <CardRow key={msReq?.req_id} type="Membership requested" text={msReq?.pname} cardType="My Alerts" handleOpen={""} handleRemove={() => handleRemove(msReq?.req_id, 1, "membershiprequested")} />)}</Box>
                <Box>{data?.PendingGoalRequestResult?.length > 0 && data?.PendingGoalRequestResult?.map((penGoal) => <CardRow key={penGoal?.gmid} type="Pending Goal" text={penGoal?.gname} cardType="My Alerts" handleOpen={""} handleRemove={() => handleRemove(penGoal?.gmid, 1, "pendinggoalrequest")} />)}</Box>
                <Box>{data?.ProjectFilesResult?.length > 0 && data?.ProjectFilesResult?.map((prFile) => <CardRow key={prFile?.pfile_id} type="Project File" text={prFile?.pfile} cardType="My Alerts" handleOpen={""} handleRemove={() => handleRemove(prFile?.pfile_id, 1, "projectfiles")} />)}</Box>
                <Box>{data?.TasksFilesResult?.length > 0 && data?.TasksFilesResult?.map((tFile) => <CardRow key={tFile?.tid} type="Task File" text={tFile?.tfile} cardType="My Alerts" handleOpen={""} handleRemove={() => handleRemove(tFile?.tid, 1, "tasksfiles")} />)}</Box>
                <Box>{data?.SubtasksFilesResult?.length > 0 && data?.SubtasksFilesResult?.map((stFile) => <CardRow key={stFile?.stid} type="Subtask File" text={stFile?.stfile} cardType="My Alerts" handleOpen={""} handleRemove={() => handleRemove(stFile?.stid, 1, "subtasksfiles")} />)}</Box>
                <Box>{data?.NewProjectCommentResult?.length > 0 && data?.NewProjectCommentResult?.map((prComm) => <CardRow key={prComm?.cid} type="New Project comment" text={prComm?.message} cardType="My Alerts" handleOpen={""} handleRemove={() => handleRemove(prComm?.cid, 1, "newprojectcomment")} />)}</Box>
                <Box>{data?.ReviewDeniedTasksResult?.length > 0 && data?.ReviewDeniedTasksResult?.map((reviewDeniedTask) => <CardRow key={reviewDeniedTask?.tid} type="Review Denied Task" text={reviewDeniedTask?.tname} cardType="My Alerts" handleOpen={""} handleRemove={() => handleRemove(reviewDeniedTask?.tid, 1, "reviewtasks")} />)}</Box>
                <Box>{data?.ReviewDeniedSubtasksResult?.length > 0 && data?.ReviewDeniedSubtasksResult?.map((reviewDeniedSubtask) => <CardRow key={reviewDeniedSubtask?.stid} type="Review Denied Subtask" text={reviewDeniedSubtask?.stname} cardType="My Alerts" handleOpen={""} handleRemove={() => handleRemove(reviewDeniedSubtask?.stid, 1, "reviewsubtasks")} />)}</Box>
                <Box>{data?.ReviewApprovedTasksResult?.length > 0 && data?.ReviewApprovedTasksResult?.map((reviewApprovedTask) => <CardRow key={reviewApprovedTask?.tid} type="Review Approved Task" text={reviewApprovedTask?.tname} cardType="My Alerts" handleOpen={""} handleRemove={() => handleRemove(reviewApprovedTask?.tid, 1, "reviewtasks")} />)}</Box>
                <Box>{data?.ReviewApprovedSubtasksResult?.length > 0 && data?.ReviewApprovedSubtasksResult?.map((reviewApprovedSubtask) => <CardRow key={reviewApprovedSubtask?.stid} type="Review Approved Subtask" text={reviewApprovedSubtask?.stname} cardType="My Alerts" handleOpen={""} handleRemove={() => handleRemove(reviewApprovedSubtask?.stid, 1, "reviewsubtasks")} />)}</Box>
              </Box>
            </PerfectScrollbar>
          </>
        )}
      </Box>
    </Paper>
  );
}
