import React from "react";
import { Paper, Box, Grid, Typography } from "@mui/material";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { Add, Edit } from "@mui/icons-material";
import TaskInfo from "../../subComponents/TaskInfo";
import PerfectScrollbar from "react-perfect-scrollbar";
import OverviewCardHeader from "../../taskOverview/subComponents/TaskOverviewCardHeader";
import CreateEditTaskForm from "../../createEditTask/CreateEditTaskForm";
import CreateSubTasksForm from "../../createEditSubtasks/CreateSubTasksForm";
import DuplicateDialog from "../../subComponents/DuplicateDialog";
import { useDispatch } from "react-redux";
import { openCnfModal } from "../../../../redux/action/confirmationModalSlice";
import { openModal } from "../../../../redux/action/modalSlice";
import ConfirmationDialog from "../../../common/ConfirmationDialog";
import ReduxDialog from "../../../common/ReduxDialog";
import EditSubTasksForm from "../../createEditSubtasks/EditSubTasksForm";
import SubTaskOverviewCardHeader from "./SubTaskOverviewCardHeader";
import CommentSection from "../../../project/projects-overview/comment-section";

export default function SubtaskPreview({ styles, filteredRow }) {
  const dispatch = useDispatch();
  console.log(filteredRow);
  const subTask = filteredRow ? filteredRow[0] : null;
  console.log(subTask);

  const handleEditSubTasksDialog = () => {
    dispatch(openModal("edit-subtask"));
  };

  const handleDuplicateDialog = () => {
    dispatch(openModal("duplicate-task"));
  };

  const handleFileItDialog = () => {
    dispatch(
      openCnfModal({
        modalName: "fileIt",
        title: "Are you sure?",
        description: `You want to file the Task`,
      })
    );
  };

  const handleDeleteDialog = () => {
    dispatch(
      openCnfModal({
        modalName: "deleteTask",
        title: "Are you sure?",
        description: `You want to Delete the Task`,
      })
    );
  };

  const handleSubTasksPreviewDialog = () => {
    dispatch(openModal("subtask-preview"));
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Paper elevation={0} sx={{ p: 2, bgcolor: "#F7F7F7" }}>
            <Box sx={{ height: "500px", overflow: "auto" }}>
              <PerfectScrollbar>
                <SubTaskOverviewCardHeader title={`SUBTASK: ${subTask?.title}`} btn1Text={"Edit Subtask"} btn1Icon={<Edit />} handleClick1={handleEditSubTasksDialog} handleDuplicate={handleDuplicateDialog} handleFileIt={handleFileItDialog} handleDelete={handleDeleteDialog} />
                <Grid container>
                  <Grid item xs={12}>
                    <Typography sx={styles.label}>Subtask Code:</Typography>
                    <Typography sx={styles.labelText}>{subTask?.code}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography sx={styles.label}>Subtask Description :</Typography>
                    <Typography sx={styles.labelText}>{subTask?.description}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography sx={styles.label}>Subtask Notes:</Typography>
                    <Typography sx={styles.labelText}>{subTask?.note}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography sx={styles.label}>Subtask Links:</Typography>
                    <Typography sx={styles.labelText}>No Task Links!</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography sx={styles.label}>Subtask Files:</Typography>
                    <Typography sx={styles.labelText}>No Task Files!</Typography>
                  </Grid>
                </Grid>
                <TaskInfo styles={styles} />
              </PerfectScrollbar>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Paper elevation={0} sx={{ p: 1, bgcolor: "#F7F7F7" }}>
            <CommentSection />
          </Paper>
        </Grid>
      </Grid>

      <ReduxDialog value="edit-subtask" modalTitle="Edit Sub Task" showModalButton={false} modalSize="lg">
        <EditSubTasksForm />
      </ReduxDialog>

      <ReduxDialog value="duplicate-task" modalTitle="Copy Task" showModalButton={false} modalSize="sm">
        <DuplicateDialog />
      </ReduxDialog>

      <ConfirmationDialog value={"fileIt"} />

      <ConfirmationDialog value={"deleteTask"} />
    </>
  );
}
