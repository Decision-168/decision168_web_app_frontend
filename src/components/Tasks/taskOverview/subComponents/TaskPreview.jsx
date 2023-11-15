import React from "react";
import { Paper, Box, Grid, Typography } from "@mui/material";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { Add, Edit } from "@mui/icons-material";
import TaskInfo from "../../subComponents/TaskInfo";
import PerfectScrollbar from "react-perfect-scrollbar";
import OverviewCardHeader from "./TaskOverviewCardHeader";
import CreateEditTaskForm from "../../createEditTask/CreateEditTaskForm";
import CreateSubTasksForm from "../../createEditSubtasks/CreateSubTasksForm";
import DuplicateDialog from "../../subComponents/DuplicateDialog";
import { useDispatch } from "react-redux";
import { openCnfModal } from "../../../../redux/action/confirmationModalSlice";
import { openModal } from "../../../../redux/action/modalSlice";
import ConfirmationDialog from "../../../common/ConfirmationDialog";
import ReduxDialog from "../../../common/ReduxDialog";
import SubtaskPreview from "../../subtaskOverview/subComponent/SubtaskPreview";
import CustomDialog from "../../../common/CustomDialog";
import CommentSection from "../../../project/projects-overview/comment-section";

export default function TaskPreview({ styles, filteredRow }) {
  const dispatch = useDispatch();
  const taskData = filteredRow[0];

  //Dailog code
  const [openSubTaskPreviewDailog, setOpenSubTaskPreviewDailog] = React.useState(false);
  const [filteredSubTask, setFilterSubTask] = React.useState(null);

  const handleSubTaskPreviewDialog = (subrowId) => {
    console.log(subrowId);
    const filteredSubTaskRow = filteredRow.reduce((result, row) => {
      const matchingSubrow = row.subRows.find((subrow) => subrow.id === subrowId);
      if (matchingSubrow) {
        result.push(matchingSubrow);
      }
      return result;
    }, []);

    console.log(filteredSubTaskRow);
    setFilterSubTask(filteredSubTaskRow);
    setOpenSubTaskPreviewDailog(true);
  };
  const handleCloseTaskPreviewDailog = () => {
    setOpenSubTaskPreviewDailog(false);
  };

  const handleAddTasksDialog = () => {
    dispatch(openModal("add-task"));
  };

  const handleAddSubTasksDialog = () => {
    dispatch(openModal("add-sub-tasks"));
  };

  const handleEditTaskDialog = () => {
    dispatch(openModal("edit-task"));
  };

  // const handleEditSubTaskDialog = () => {
  //   dispatch(openModal("edit-sub-task"));
  // };

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

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Paper elevation={0} sx={{ p: 2, bgcolor: "#F7F7F7" }}>
            <Box sx={{ height: "500px", overflow: "auto" }}>
              <PerfectScrollbar>
                <OverviewCardHeader title={`TASK:${taskData.title}`} btn1Text={"Add Task"} btn2Text={"Add Subtask"} btn3Text={"Edit Task"} btn1Icon={<Add />} btn2Icon={<Add />} btn3Icon={<Edit />} handleClick1={handleAddTasksDialog} handleClick2={handleAddSubTasksDialog} handleClick3={handleEditTaskDialog} handleDuplicate={handleDuplicateDialog} handleFileIt={handleFileItDialog} handleDelete={handleDeleteDialog} />
                <Grid container>
                  <Grid item xs={12}>
                    <Typography sx={styles.label}>Task Code:</Typography>
                    <Typography sx={styles.labelText}>{taskData.code}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography sx={styles.label}>Task Description :</Typography>
                    <Typography sx={styles.labelText}>{taskData.description}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography sx={styles.label}>Task Notes:</Typography>
                    <Typography sx={styles.labelText}>{taskData.note}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography sx={styles.label}>Tasks Links:</Typography>
                    <Typography sx={styles.labelText}>No Task Links!</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography sx={styles.label}>Tasks Files:</Typography>
                    <Typography sx={styles.labelText}>No Task Files!</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography sx={styles.label}>Subtasks:</Typography>
                    {/*  */}
                    <Box>
                      {taskData.subRows?.length > 0 ? (
                        taskData?.subRows.map((subrow, index) => (
                          <Box key={index} sx={styles.subtaskLinkWrapper}>
                            <ArrowCircleRightIcon sx={styles.subtaskIcon} />
                            <Typography onClick={() => handleSubTaskPreviewDialog(subrow.id)} sx={styles.subtaskLinkText}>
                              {subrow.code} : {subrow.description}
                            </Typography>
                          </Box>
                        ))
                      ) : (
                        <Typography sx={styles.labelText}>No SubTasks!</Typography>
                      )}
                    </Box>
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

      <ReduxDialog value="add-task" modalTitle="Add Task" showModalButton={false} modalSize="md">
        <CreateEditTaskForm editMode={false} />
      </ReduxDialog>

      <ReduxDialog value="edit-task" modalTitle="Edit Task" showModalButton={false} modalSize="md">
        <CreateEditTaskForm editMode={true} />
      </ReduxDialog>

      <ReduxDialog value="add-sub-tasks" modalTitle="Add Sub Task" showModalButton={false} modalSize="md">
        <CreateSubTasksForm />
      </ReduxDialog>

      <ReduxDialog value="duplicate-task" modalTitle="Copy Task" showModalButton={false} modalSize="sm">
        <DuplicateDialog />
      </ReduxDialog>

      <ConfirmationDialog value={"fileIt"} />

      <ConfirmationDialog value={"deleteTask"} />

      <CustomDialog handleClose={handleCloseTaskPreviewDailog} open={openSubTaskPreviewDailog} modalTitle="Subtask" redirectPath={"/subtasks-overview"} showModalButton={true} modalSize="lg">
        <SubtaskPreview styles={styles} filteredRow={filteredSubTask} />
      </CustomDialog>
    </>
  );
}
