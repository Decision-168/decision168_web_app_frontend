import { Grid, Paper } from "@mui/material";
import React, { memo } from "react";
import { Edit } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { openCnfModal } from "../../../../redux/action/confirmationModalSlice";
import { openModal } from "../../../../redux/action/modalSlice";
import ConfirmationDialog from "../../../common/ConfirmationDialog";
import ReduxDialog from "../../../common/ReduxDialog";
import SubTaskOverviewCardHeader from "./SubTaskOverviewCardHeader";
import SubtakOverviewCardBody from "./SubtakOverviewCardBody";
import DuplicateDialog from "../../subComponents/DuplicateDialog";
import EditSubTasksForm from "../../createEditSubtasks/EditSubTasksForm";

const SubtaskOverviewCard = ({ styles, subtask }) => {
  const dispatch = useDispatch();

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

  return (
    <Paper elevation={0} sx={{ p: 2 }}>
      <Grid container spacing={0}>
        <SubTaskOverviewCardHeader title={`SubTask: ${subtask?.stname}`}  btn1Text={"Edit Task"} btn1Icon={<Edit />} handleClick1={handleEditSubTasksDialog} handleDuplicate={handleDuplicateDialog} handleFileIt={handleFileItDialog} handleDelete={handleDeleteDialog} />
        <SubtakOverviewCardBody styles={styles} subtask={subtask}/>
      </Grid>

      <ReduxDialog value="edit-subtask" modalTitle="Edit Subtask" showModalButton={false} modalSize="md">
        <EditSubTasksForm />
      </ReduxDialog>

      <ReduxDialog value="duplicate-task" modalTitle="Copy Task" showModalButton={false} modalSize="sm">
        <DuplicateDialog />
      </ReduxDialog>

      <ConfirmationDialog value={"fileIt"} />

      <ConfirmationDialog value={"deleteTask"} />
    </Paper>
  );
};
export default memo(SubtaskOverviewCard);
