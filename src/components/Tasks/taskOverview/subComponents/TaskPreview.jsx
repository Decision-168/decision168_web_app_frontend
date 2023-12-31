import React, { memo, useState } from "react";
import { Paper, Box, Grid, Typography } from "@mui/material";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { Add, Edit } from "@mui/icons-material";
import TaskInfo from "./TaskInfo";
import PerfectScrollbar from "react-perfect-scrollbar";
import OverviewCardHeader from "./TaskOverviewCardHeader";
import CreateEditTaskForm from "../../createEditTask/CreateEditTaskForm";
import CreateEditSubTasksForm from "../../createEditSubtasks/CreateEditSubTasksForm";
import { useDispatch } from "react-redux";
import {
  openCnfModal,
  closeCnfModal,
} from "../../../../redux/action/confirmationModalSlice";
import { openModal } from "../../../../redux/action/modalSlice";
import ConfirmationDialog from "../../../common/ConfirmationDialog";
import ReduxDialog from "../../../common/ReduxDialog";
import SubtaskPreview from "../../subtaskOverview/subComponent/SubtaskPreview";
import CustomDialog from "../../../common/CustomDialog";
import CommentSection from "../../../project/projects-overview/comment-section";
import { fileItTask, getTaskDetails } from "../../../../api/modules/taskModule";
import { patchDeleteTask } from "../../../../api/modules/TrashModule";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../../redux/action/userSlice";
import { toast } from "react-toastify";
import DuplicateTaskDialog from "../../subComponents/DuplicateTaskDialog";

const TaskPreview = ({ styles, taskId, taskToEdit, closePreview, fetchData, currentPage }) => {

  const dispatch = useDispatch();
  const user = useSelector(selectUserDetails);
  //Dailog code
  const [openSubTaskPreviewDailog, setOpenSubTaskPreviewDailog] =
    React.useState(false);
  const [task, setTask] = React.useState({});
  const [subTaskId, setSubTaskId] = React.useState(null);
  const [loading, setLoading] = useState(false);

  const fetchTaskDetails = async () => {
    setLoading(true);
    try {
      const response = await getTaskDetails(taskId);
      setTask(response);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchTaskDetails();
  }, [taskId]);

  const handleSubTaskPreviewDialog = (subtaskId) => {
    setSubTaskId(subtaskId);
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
    dispatch(openModal("duplicate-preview-task"));
  };

  //File It
  const handleFileItDialog = () => {
    dispatch(
      openCnfModal({
        modalName: "fileItTaskInPreview",
        title: "Are you sure?",
        description: `You want to file the Task`,
      })
    );
  };

  const handleFileItTaskYes = async () => {
    const task_id = taskId;
    const user_id = user?.reg_id;
    try {
      const response = await fileItTask(task_id, user_id);
      dispatch(closeCnfModal({ modalName: "fileItTaskInPreview" }));
      if(currentPage){
        fetchData(currentPage);
      }else{
        fetchData();
      }
      closePreview();
      toast.success(`${response.message}`);
    } catch (error) {
      toast.error(`${error?.response?.data?.error}`);
    }
  };

  const handleDeleteDialog = () => {
    dispatch(
      openCnfModal({
        modalName: "deleteTaskInPreview",
        title: "Are you sure?",
        description: `You want to Delete the Task`,
      })
    );
  };

  const handleDeleteTaskYes = async () => {
    const task_id = taskId;
    const user_id = user?.reg_id;

    try {
      const response = await patchDeleteTask(task_id, user_id);
      dispatch(closeCnfModal({ modalName: "deleteTaskInPreview" }));
      if(currentPage){
        fetchData(currentPage);
      }else{
        fetchData();
      }
      closePreview();
      toast.success(`${response.message}`);
    } catch (error) {
      toast.error(`${error?.response?.data?.error}`);
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={8}>
          <Paper elevation={0} sx={{ p: 2, bgcolor: "#F7F7F7", width:"100%"}}>
            <Box sx={{ height: "500px", overflow: "auto" }}>
              <PerfectScrollbar>
                <OverviewCardHeader
                  title={`TASK: ${task?.tname}`}
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
                <Grid container>
                  <Grid item xs={12}>
                    {task?.tcode && (
                      <>
                        <Typography sx={styles.label}>Task Code:</Typography>
                        <Typography sx={styles.labelText}>
                          {task?.tcode}
                        </Typography>
                      </>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    {task?.tdes && (
                      <>
                        <Typography sx={styles.label}>
                          Task Description :
                        </Typography>
                        <Typography sx={styles.labelText}>
                          {task?.tdes}
                        </Typography>
                      </>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    {task?.tnote && (
                      <>
                        <Typography sx={styles.label}>Task Notes:</Typography>
                        <Typography sx={styles.labelText}>
                          {task?.tnote}
                        </Typography>
                      </>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <Typography sx={styles.label}>Tasks Links:</Typography>
                    {task?.tlink?.length > 0 ? (
                      task?.tlink?.split(",")?.map((link, index) => (
                        <Typography key={index} sx={styles.labelText}>
                          {link}
                        </Typography>
                      ))
                    ) : (
                      <Typography sx={styles.labelText}>
                        No Task Links!
                      </Typography>
                    )}
                  </Grid>

                  <Grid item xs={12}>
                    <Typography sx={styles.label}>Tasks Files:</Typography>
                    {task?.tfile?.length > 0 ? (
                      task?.tfile?.split(",")?.map((file, index) => (
                        <Typography key={index} sx={styles.labelText}>
                          {file}
                        </Typography>
                      ))
                    ) : (
                      <Typography sx={styles.labelText}>
                        No Task Files!
                      </Typography>
                    )}
                  </Grid>

                  <Grid item xs={12}>
                    <Typography sx={styles.label}>Subtasks:</Typography>
                    <Box>
                      {task?.subTasks?.length > 0 ? (
                        task?.subTasks?.map((subTask, index) => (
                          <Box key={index} sx={styles.subtaskLinkWrapper}>
                            <ArrowCircleRightIcon sx={styles.subtaskIcon} />
                            <Typography
                              onClick={() =>
                                handleSubTaskPreviewDialog(subTask?.stid)
                              }
                              sx={styles.subtaskLinkText}
                            >
                              {subTask?.stcode} : {subTask?.stname}
                            </Typography>
                          </Box>
                        ))
                      ) : (
                        <Typography sx={styles.labelText}>
                          No SubTasks!
                        </Typography>
                      )}
                    </Box>
                  </Grid>
                </Grid>
                <TaskInfo styles={styles} info={task} />
              </PerfectScrollbar>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Paper elevation={0} sx={{ height: "100%", width:"100%"}}>
            <CommentSection projectId={task?.tproject_assign} taskId={task?.tid} subtaskId={0} commentModule={"task"} />
          </Paper>
        </Grid>
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
        <CreateEditTaskForm editMode={true} taskEditData={taskToEdit} />
      </ReduxDialog>

      <ReduxDialog
        value="add-sub-tasks"
        modalTitle="Add Sub Task"
        showModalButton={false}
        modalSize="md"
      >
        <CreateEditSubTasksForm  taskData={task} />
      </ReduxDialog>

      <ReduxDialog
        value="duplicate-preview-task"
        modalTitle="Copy Task"
        showModalButton={false}
        modalSize="sm"
      >
        <DuplicateTaskDialog
          taskData={task}
          closeModalName={"duplicate-preview-task"}
        />
      </ReduxDialog>

      <ConfirmationDialog
        value={"fileItTaskInPreview"}
        handleYes={handleFileItTaskYes}
      />

      <ConfirmationDialog
        value={"deleteTaskInPreview"}
        handleYes={handleDeleteTaskYes}
      />

      <CustomDialog
        handleClose={handleCloseTaskPreviewDailog}
        open={openSubTaskPreviewDailog}
        modalTitle="Subtask"
        redirectPath={`/subtasks-overview/${subTaskId}`}
        showModalButton={true}
        modalSize="lg"
      >
        <SubtaskPreview
          styles={styles}
          subtaskId={subTaskId}
          taskData={taskToEdit}
        />
      </CustomDialog>
    </>
  );
};

export default memo(TaskPreview);
