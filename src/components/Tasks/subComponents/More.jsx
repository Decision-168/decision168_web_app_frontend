import React from "react";
import { Menu, MenuItem, Fade } from "@mui/material";
import CreateEditTaskForm from "../createEditTask/CreateEditTaskForm";
import ReduxDialog from "../../common/ReduxDialog";
import { useDispatch } from "react-redux";
import { openModal } from "../../../redux/action/modalSlice";
import CreateSubTasksForm from "../createEditSubtasks/CreateSubTasksForm";
import DuplicateDialog from "./DuplicateDialog";
import EditSubTasksForm from "../createEditSubtasks/EditSubTasksForm";
import ConfirmationDialog from "../../common/ConfirmationDialog";
import { openCnfModal, closeCnfModal } from "../../../redux/action/confirmationModalSlice";
import { patchDeleteSubtask, patchDeleteTask } from "../../../api/modules/TrashModule";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../redux/action/userSlice";
import { fileItSubTask, fileItTask } from "../../../api/modules/taskModule";

export default function More({ rowId, isParentRow, fetchData, anchorEl, setAnchorEl }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUserDetails);
  const open = Boolean(anchorEl);

  const handleMoreClose = () => {
    setAnchorEl(null);
  };

  const handleEditTaskDialog = (rowId) => {
    dispatch(openModal("edit-task"));
    handleMoreClose();
  };

  const handleAddSubTasksDialog = (rowId) => {
    dispatch(openModal("add-sub-tasks"));
    handleMoreClose();
  };

  const handleEditSubTaskDialog = (rowId) => {
    dispatch(openModal("edit-sub-task"));
    handleMoreClose();
  };

  const handleDuplicateDialog = (rowId) => {
    dispatch(openModal("duplicate-task"));
    handleMoreClose();
  };

  //File It
  const handleFileItDialog = (rowId) => {
    if (isParentRow) {
      dispatch(
        openCnfModal({
          modalName: "fileItTask",
          title: "Are you sure?",
          description: `You want to file the Task`,
        })
      );
    } else {
      dispatch(
        openCnfModal({
          modalName: "fileItSubTask",
          title: "Are you sure?",
          description: `You want to file the Subtask`,
        })
      );
    }
    handleMoreClose();
  };

  const handleFileItTaskYes = async () => {
    const task_id = rowId;
    // const user_id = user?.reg_id;
    const user_id = 1; // for testing
    try {
      const response = await fileItTask(task_id, user_id);
      fetchData();
      dispatch(closeCnfModal({ modalName: "fileItTask" }));
      toast.success(`${response.message}`);
    } catch (error) {
      toast.error(`${error?.response?.data?.error}`);
      console.error("Error in filing the task:", error);
    }
  };

  const handleFileItSubTaskYes = async () => {
    const subtask_id = rowId;
    // const user_id = user?.reg_id;
    const user_id = 1; // for testing
    try {
      const response = await fileItSubTask(subtask_id, user_id);
      fetchData();
      dispatch(closeCnfModal({ modalName: "fileItSubTask" }));
      toast.success(`${response.message}`);
    } catch (error) {
      toast.error(`${error?.response?.data?.error}`);
      console.error("Error in filing the Subtask:", error);
    }
  };

  //Delete
  const handleDeleteDialog = () => {
    if (isParentRow) {
      dispatch(
        openCnfModal({
          modalName: "deleteTask",
          title: "Are you sure?",
          description: `You want to Delete the Task`,
        })
      );
    } else {
      dispatch(
        openCnfModal({
          modalName: "deleteSubTask",
          title: "Are you sure?",
          description: `You want to Delete the Subtask`,
        })
      );
    }
    handleMoreClose();
  };

  const handleDeleteTaskYes = async () => {
    const task_id = rowId;
    // const user_id = user?.reg_id;
    const user_id = 1; // for testing
    try {
      const response = await patchDeleteTask(task_id, user_id);
      fetchData();
      dispatch(closeCnfModal({ modalName: "deleteTask" }));
      toast.success(`${response.message}`);
    } catch (error) {
      toast.error(`${error?.response?.data?.error}`);
      console.error("Error in Deleteing the task:", error);
    }
  };

  const handleDeleteSubTaskYes = async () => {
    const subtask_id = rowId;
    // const user_id = user?.reg_id;
    const user_id = 1; // for testing
    try {
      const response = await patchDeleteSubtask(subtask_id, user_id);
      fetchData();
      dispatch(closeCnfModal({ modalName: "deleteSubTask" }));
      toast.success(`${response.message}`);
    } catch (error) {
      toast.error(`${error?.response?.data?.error}`);
      console.error("Error in Deleteing the task:", error);
    }
  };

  return (
    <>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleMoreClose}
        TransitionComponent={Fade}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {isParentRow ? (
          <>
            <MenuItem onClick={() => handleEditTaskDialog(rowId)} sx={{ fontSize: "13px" }}>
              Edit Task
            </MenuItem>
            <MenuItem onClick={() => handleAddSubTasksDialog(rowId)} sx={{ fontSize: "13px" }}>
              Add Subtask
            </MenuItem>
          </>
        ) : (
          <MenuItem onClick={() => handleEditSubTaskDialog(rowId)} sx={{ fontSize: "13px" }}>
            Edit Subtask
          </MenuItem>
        )}

        <MenuItem onClick={() => handleDuplicateDialog(rowId)} sx={{ fontSize: "13px" }}>
          Duplicate
        </MenuItem>
        <MenuItem onClick={() => handleFileItDialog(rowId)} sx={{ fontSize: "13px" }}>
          File It
        </MenuItem>
        <MenuItem onClick={() => handleDeleteDialog(rowId)} sx={{ fontSize: "13px" }}>
          Delete {isParentRow ? "Task" : "Subtask"}
        </MenuItem>
      </Menu>

      <ReduxDialog value="edit-task" modalTitle="Edit Task" showModalButton={false} modalSize="md">
        <CreateEditTaskForm editMode={true} />
      </ReduxDialog>

      <ReduxDialog value="add-sub-tasks" modalTitle="Add Sub Task" showModalButton={false} modalSize="md">
        <CreateSubTasksForm />
      </ReduxDialog>

      <ReduxDialog value="edit-sub-task" modalTitle="Edit Sub Task" showModalButton={false} modalSize="md">
        <EditSubTasksForm />
      </ReduxDialog>

      <ReduxDialog value="duplicate-task" modalTitle="Copy Task" showModalButton={false} modalSize="sm">
        <DuplicateDialog />
      </ReduxDialog>

      <ConfirmationDialog value={"fileItTask"} handleYes={handleFileItTaskYes} />
      <ConfirmationDialog value={"fileItSubTask"} handleYes={handleFileItSubTaskYes} />
      <ConfirmationDialog value={"deleteTask"} handleYes={handleDeleteTaskYes} />
      <ConfirmationDialog value={"deleteSubTask"} handleYes={handleDeleteSubTaskYes} />
    </>
  );
}
