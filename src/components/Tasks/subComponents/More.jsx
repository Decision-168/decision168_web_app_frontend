import React from "react";
import { Menu, MenuItem, Fade } from "@mui/material";
import CreateEditTaskForm from "../createEditTask/CreateEditTaskForm";
import ReduxDialog from "../../common/ReduxDialog";
import { useDispatch } from "react-redux";
import { openModal } from "../../../redux/action/modalSlice";
import CreateEditSubTasksForm from "../createEditSubtasks/CreateEditSubTasksForm";
import ConfirmationDialog from "../../common/ConfirmationDialog";
import { openCnfModal, closeCnfModal } from "../../../redux/action/confirmationModalSlice";
import { patchDeleteSubtask, patchDeleteTask } from "../../../api/modules/TrashModule";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../redux/action/userSlice";
import { fileItSubTask, fileItTask } from "../../../api/modules/taskModule";
import DuplicateTaskDialog from "./DuplicateTaskDialog";
import DuplicateSubtaskDialog from "./DuplicateSubtaskDialog";

export default function More({ rowId, task, subTask, isParentRow, fetchData, currentPage, anchorEl, setAnchorEl, passTaskIdToParent }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUserDetails);
  const open = Boolean(anchorEl);

  const handleMoreClose = () => {
    setAnchorEl(null);
  };

  const handleEditTaskDialog = () => {
    dispatch(openModal("edit-task"));
    handleMoreClose();
  };

  const handleAddSubTasksDialog = () => {
    dispatch(openModal("add-sub-tasks"));
    handleMoreClose();
  };

  const handleEditSubTaskDialog = (rowId) => {
    dispatch(openModal("edit-subtask"));
    handleMoreClose();
  };

  //Duplicate Task
  const handleDuplicateDialog = () => {
    if (isParentRow) {
      dispatch(openModal("duplicate-task"));
    } else {
      dispatch(openModal("duplicate-subtask"));
    }
    handleMoreClose();
  };

  //File It
  const handleFileItDialog = () => {
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
    const user_id = user?.reg_id;
    try {
      const response = await fileItTask(task_id, user_id);
      if (currentPage) {
        fetchData(currentPage);
      } else {
        fetchData();
      }
      dispatch(closeCnfModal({ modalName: "fileItTask" }));
      toast.success(`${response.message}`);
    } catch (error) {
      toast.error(`${error?.response?.data?.error}`);
    }
  };

  const handleFileItSubTaskYes = async () => {
    passTaskIdToParent(task?.tid);
    const subtask_id = rowId;
    const user_id = user?.reg_id;
    try {
      const response = await fileItSubTask(subtask_id, user_id);
      if(currentPage){
        fetchData(currentPage);
      }else{
        fetchData();
      }



      dispatch(closeCnfModal({ modalName: "fileItSubTask" }));
      toast.success(`${response.message}`);
    } catch (error) {
      toast.error(`${error?.response?.data?.error}`);
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
    const user_id = user?.reg_id;

    try {
      const response = await patchDeleteTask(task_id, user_id);
      if (currentPage) {
        fetchData(currentPage);
      } else {
        fetchData();
      }
      dispatch(closeCnfModal({ modalName: "deleteTask" }));
      toast.success(`${response.message}`);
    } catch (error) {
      toast.error(`${error?.response?.data?.error}`);
    }
  };

  const handleDeleteSubTaskYes = async () => {
    const subtask_id = rowId;
    const user_id = user?.reg_id;
    try {
      const response = await patchDeleteSubtask(subtask_id, user_id);
      if (currentPage) {
        fetchData(currentPage);
      } else {
        fetchData();
      }
      dispatch(closeCnfModal({ modalName: "deleteSubTask" }));
      toast.success(`${response.message}`);
    } catch (error) {
      toast.error(`${error?.response?.data?.error}`);
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
            <MenuItem onClick={() => handleEditTaskDialog()} sx={{ fontSize: "13px" }}>
              Edit Task
            </MenuItem>
            <MenuItem onClick={() => handleAddSubTasksDialog()} sx={{ fontSize: "13px" }}>
              Add Subtask
            </MenuItem>
          </>
        ) : (
          <MenuItem onClick={() => handleEditSubTaskDialog(rowId)} sx={{ fontSize: "13px" }}>
            Edit Subtask
          </MenuItem>
        )}
        <MenuItem onClick={() => handleDuplicateDialog()} sx={{ fontSize: "13px" }}>
          Duplicate
        </MenuItem>
        <MenuItem onClick={() => handleFileItDialog()} sx={{ fontSize: "13px" }}>
          File It
        </MenuItem>
        <MenuItem onClick={() => handleDeleteDialog()} sx={{ fontSize: "13px" }}>
          Delete {isParentRow ? "Task" : "Subtask"}
        </MenuItem>
      </Menu>

      <ReduxDialog value="edit-task" modalTitle="Edit Task" showModalButton={false} modalSize="md">
        <CreateEditTaskForm editMode={true} taskEditData={task} />
      </ReduxDialog>

      <ReduxDialog value="add-sub-tasks" modalTitle="Add Sub Task" showModalButton={false} modalSize="md">
        <CreateEditSubTasksForm taskData={task} />
      </ReduxDialog>

      <ReduxDialog value="edit-subtask" modalTitle="Edit Sub Task" showModalButton={false} modalSize="md">
        <CreateEditSubTasksForm editMode={true} taskData={task} subtaskData={subTask} />
      </ReduxDialog>

      <ReduxDialog value="duplicate-task" modalTitle="Copy Task" showModalButton={false} modalSize="sm">
        <DuplicateTaskDialog taskData={task} closeModalName={"duplicate-task"} />
      </ReduxDialog>

      <ReduxDialog value="duplicate-subtask" modalTitle="Copy Subtask" showModalButton={false} modalSize="sm">
        <DuplicateSubtaskDialog subtaskData={subTask} closeModalName={"duplicate-subtask"} />
      </ReduxDialog>

      <ConfirmationDialog value={"fileItTask"} handleYes={handleFileItTaskYes} />
      <ConfirmationDialog value={"fileItSubTask"} handleYes={handleFileItSubTaskYes} />
      <ConfirmationDialog value={"deleteTask"} handleYes={handleDeleteTaskYes} />
      <ConfirmationDialog value={"deleteSubTask"} handleYes={handleDeleteSubTaskYes} />
    </>
  );
}
