import { Grid, Paper } from "@mui/material";
import React, { memo } from "react";
import { Add, Edit } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { openCnfModal } from "../../../../redux/action/confirmationModalSlice";
import { openModal } from "../../../../redux/action/modalSlice";
import ConfirmationDialog from "../../../common/ConfirmationDialog";
import ReduxDialog from "../../../common/ReduxDialog";
import OverviewCardHeader from "./TaskOverviewCardHeader";
import OverviewCardBody from "./TaskOverviewCardBody";
import CreateEditTaskForm from "../../createEditTask/CreateEditTaskForm";
import CreateSubTasksForm from "../../createEditSubtasks/CreateSubTasksForm";
import DuplicateDialog from "../../subComponents/DuplicateDialog";

const TaskOverviewCard = ({ styles, task }) => {
  const dispatch = useDispatch();

  const handleAddTasksDialog = () => {
    dispatch(openModal("add-task"));
  };

  const handleAddSubTasksDialog = () => {
    dispatch(openModal("add-sub-tasks"));
  };

  const handleEditTaskDialog = () => {
    dispatch(openModal("edit-task"));
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

  return (
    <Paper elevation={0} sx={{ p: 2 }}>
      <Grid container spacing={0}>
        <OverviewCardHeader title={`Task: ${task?.tname}`} btn1Text={"Add Task"} btn2Text={"Add Subtask"} btn3Text={"Edit Task"} btn1Icon={<Add />} btn2Icon={<Add />} btn3Icon={<Edit />} handleClick1={handleAddTasksDialog} handleClick2={handleAddSubTasksDialog} handleClick3={handleEditTaskDialog} handleDuplicate={handleDuplicateDialog} handleFileIt={handleFileItDialog} handleDelete={handleDeleteDialog} />
        <OverviewCardBody styles={styles} task={task} />
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

      {/* <ReduxDialog value="edit-sub-task" modalTitle="Edit Sub Task" showModalButton={false} modalSize="md">
        <EditSubTasksForm />
      </ReduxDialog> */}

      <ReduxDialog value="duplicate-task" modalTitle="Copy Task" showModalButton={false} modalSize="sm">
        <DuplicateDialog />
      </ReduxDialog>

      <ConfirmationDialog value={"fileIt"} />

      <ConfirmationDialog value={"deleteTask"} />
    </Paper>
  );
};
export default memo(TaskOverviewCard);
