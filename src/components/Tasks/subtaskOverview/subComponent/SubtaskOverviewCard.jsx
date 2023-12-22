import { Grid, Paper } from "@mui/material";
import React, { memo } from "react";
import { Edit } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { openCnfModal, closeCnfModal } from "../../../../redux/action/confirmationModalSlice";
import { openModal } from "../../../../redux/action/modalSlice";
import ConfirmationDialog from "../../../common/ConfirmationDialog";
import ReduxDialog from "../../../common/ReduxDialog";
import SubTaskOverviewCardHeader from "./SubTaskOverviewCardHeader";
import SubtakOverviewCardBody from "./SubtakOverviewCardBody";
import EditSubTasksForm from "../../createEditSubtasks/EditSubTasksForm";
import { patchDeleteSubtask } from "../../../../api/modules/TrashModule";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { fileItSubTask } from "../../../../api/modules/taskModule";
import DuplicateSubtaskDialog from "../../subComponents/DuplicateSubtaskDialog";

const SubtaskOverviewCard = ({ styles, subtask }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEditSubTasksDialog = () => {
    dispatch(openModal("edit-subtask"));
  };

  const handleDuplicateDialog = () => {
    dispatch(openModal("duplicate-overview-subtask"));
  };

  //File It
  const handleFileItDialog = () => {
    dispatch(
      openCnfModal({
        modalName: "fileItSubTaskInOverview",
        title: "Are you sure?",
        description: `You want to file the Subtask`,
      })
    );
  };

  const handleFileItSubTaskYes = async () => {
    const subtask_id = subtask?.stid;
    // const user_id = user?.reg_id;
    const user_id = 1; // for testing
    try {
      const response = await fileItSubTask(subtask_id, user_id);
      dispatch(closeCnfModal({ modalName: "fileItSubTaskInOverview" }));
      navigate("/all-tasks");
      toast.success(`${response.message}`);
    } catch (error) {
      toast.error(`${error?.response?.data?.error}`);
      console.error("Error in filing the Subtask in preview:", error);
    }
  };

  const handleDeleteDialog = () => {
    dispatch(
      openCnfModal({
        modalName: "deleteSubTaskInOverview",
        title: "Are you sure?",
        description: `You want to Delete the Subtask`,
      })
    );
  };

  const handleDeleteSubTaskYes = async () => {
    const subtask_id = subtask?.stid;
    // const user_id = user?.reg_id;
    const user_id = 1; // for testing
    try {
      const response = await patchDeleteSubtask(subtask_id, user_id);
      dispatch(closeCnfModal({ modalName: "deleteSubTaskInOverview" }));
      navigate("/all-tasks");
      toast.success(`${response.message}`);
    } catch (error) {
      toast.error(`${error?.response?.data?.error}`);
      console.error("Error in Deleteing the Subtask:", error);
    }
  };

  return (
    <Paper elevation={0} sx={{ p: 2 }}>
      <Grid container spacing={0}>
        <SubTaskOverviewCardHeader title={`Subtask: ${subtask?.stname}`} btn1Text={"Edit Task"} btn1Icon={<Edit />} handleClick1={handleEditSubTasksDialog} handleDuplicate={handleDuplicateDialog} handleFileIt={handleFileItDialog} handleDelete={handleDeleteDialog} />
        <SubtakOverviewCardBody styles={styles} subtask={subtask} />
      </Grid>

      <ReduxDialog value="edit-subtask" modalTitle="Edit Subtask" showModalButton={false} modalSize="md">
        <EditSubTasksForm />
      </ReduxDialog>

      <ReduxDialog value="duplicate-overview-subtask" modalTitle="Copy Task" showModalButton={false} modalSize="sm">
        <DuplicateSubtaskDialog subtaskData={subtask} closeModalName={"duplicate-overview-subtask"} />
      </ReduxDialog>

      <ConfirmationDialog value={"fileItSubTaskInOverview"} handleYes={handleFileItSubTaskYes} />

      <ConfirmationDialog value={"deleteSubTaskInOverview"} handleYes={handleDeleteSubTaskYes} />
    </Paper>
  );
};
export default memo(SubtaskOverviewCard);
