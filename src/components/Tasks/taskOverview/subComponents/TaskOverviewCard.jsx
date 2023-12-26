import { Grid, Paper } from "@mui/material";
import React, { memo } from "react";
import { Add, Edit } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import {
  openCnfModal,
  closeCnfModal,
} from "../../../../redux/action/confirmationModalSlice";
import { openModal } from "../../../../redux/action/modalSlice";
import ConfirmationDialog from "../../../common/ConfirmationDialog";
import ReduxDialog from "../../../common/ReduxDialog";
import OverviewCardHeader from "./TaskOverviewCardHeader";
import OverviewCardBody from "./TaskOverviewCardBody";
import CreateEditTaskForm from "../../createEditTask/CreateEditTaskForm";
import CreateEditSubTasksForm from "../../createEditSubtasks/CreateEditSubTasksForm";
import { patchDeleteTask } from "../../../../api/modules/TrashModule";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { fileItTask } from "../../../../api/modules/taskModule";
import DuplicateTaskDialog from "../../subComponents/DuplicateTaskDialog";

const TaskOverviewCard = ({ styles, task }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    dispatch(openModal("duplicate-overview-task"));
  };

  //File It
  const handleFileItDialog = () => {
    dispatch(
      openCnfModal({
        modalName: "fileItTaskInOverview",
        title: "Are you sure?",
        description: `You want to file the Task`,
      })
    );
  };

  const handleFileItTaskYes = async () => {
    const task_id = task?.tid;
    // const user_id = user?.reg_id;
    const user_id = 1; // for testing
    try {
      const response = await fileItTask(task_id, user_id);
      dispatch(closeCnfModal({ modalName: "fileItTaskInOverview" }));
      navigate("/all-tasks");
      toast.success(`${response.message}`);
    } catch (error) {
      toast.error(`${error?.response?.data?.error}`);
    }
  };

  const handleDeleteDialog = () => {
    dispatch(
      openCnfModal({
        modalName: "deleteTaskInOverview",
        title: "Are you sure?",
        description: `You want to Delete the Task`,
      })
    );
  };

  const handleDeleteTaskYes = async () => {
    const task_id = task?.tid;
    // const user_id = user?.reg_id;
    const user_id = 1; // for testing
    try {
      const response = await patchDeleteTask(task_id, user_id);
      dispatch(closeCnfModal({ modalName: "deleteTaskInOverview" }));
      navigate("/all-tasks");
      toast.success(`${response.message}`);
    } catch (error) {
      toast.error(`${error?.response?.data?.error}`);
    }
  };

  return (
    <Paper elevation={0} sx={{ p: 2 }}>
      <Grid container spacing={0}>
        <OverviewCardHeader
          title={`Task: ${task?.tname}`}
          btn1Text={"Add Task"}
          btn2Text={"Add Subtask"}
          btn3Text={"Edit Task"}
          btn1Icon={<Add />}
          btn2Icon={<Add />}
          btn3Icon={<Edit />}
          handleClick1={handleAddTasksDialog}
          handleClick2={handleAddSubTasksDialog}
          handleClick3={handleEditTaskDialog}
          handleDuplicate={handleDuplicateDialog}
          handleFileIt={handleFileItDialog}
          handleDelete={handleDeleteDialog}
        />
        <OverviewCardBody styles={styles} task={task} />
      </Grid>

      <ReduxDialog
        value="add-task"
        modalTitle="Add Task"
        showModalButton={false}
        modalSize="md"
      >
        <CreateEditTaskForm editMode={false} />
      </ReduxDialog>

      <ReduxDialog
        value="edit-task"
        modalTitle="Edit Task"
        showModalButton={false}
        modalSize="md"
      >
        <CreateEditTaskForm editMode={true} taskEditData={task} />
      </ReduxDialog>

      <ReduxDialog
        value="add-sub-tasks"
        modalTitle="Add Sub Task"
        showModalButton={false}
        modalSize="md"
      >
        <CreateEditSubTasksForm taskData={task} />
      </ReduxDialog>

      <ReduxDialog
        value="duplicate-overview-task"
        modalTitle="Copy Task"
        showModalButton={false}
        modalSize="sm"
      >
        <DuplicateTaskDialog
          taskData={task}
          closeModalName={"duplicate-overview-task"}
        />
      </ReduxDialog>

      <ConfirmationDialog
        value={"fileItTaskInOverview"}
        handleYes={handleFileItTaskYes}
      />

      <ConfirmationDialog
        value={"deleteTaskInOverview"}
        handleYes={handleDeleteTaskYes}
      />
    </Paper>
  );
};
export default memo(TaskOverviewCard);
