import React from "react";
import { Paper, Box, Grid, Typography } from "@mui/material";
import { Edit } from "@mui/icons-material";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useDispatch } from "react-redux";
import {
  openCnfModal,
  closeCnfModal,
} from "../../../../redux/action/confirmationModalSlice";
import { openModal } from "../../../../redux/action/modalSlice";
import ConfirmationDialog from "../../../common/ConfirmationDialog";
import ReduxDialog from "../../../common/ReduxDialog";
import SubTaskOverviewCardHeader from "./SubTaskOverviewCardHeader";
import CommentSection from "../../../project/projects-overview/comment-section";
import {
  fileItSubTask,
  getSubTaskDetails,
} from "../../../../api/modules/taskModule";
import SubTaskInfo from "./SubTaskInfo";
import { patchDeleteSubtask } from "../../../../api/modules/TrashModule";
import { toast } from "react-toastify";
import DuplicateSubtaskDialog from "../../subComponents/DuplicateSubtaskDialog";
import CreateEditSubTasksForm from "../../createEditSubtasks/CreateEditSubTasksForm";

export default function SubtaskPreview({ styles, subtaskId, taskData, closePreview, fetchData }) {
  const dispatch = useDispatch();

  const [subTask, setSubTask] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const fetchSubTaskDetails = async () => {
    setLoading(true);
    try {
      const response = await getSubTaskDetails(subtaskId);
      setSubTask(response);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchSubTaskDetails();
  }, [subtaskId]);

  const handleEditSubTasksDialog = () => {
    dispatch(openModal("edit-preview-subtask"));
  };

  const handleDuplicateDialog = () => {
    dispatch(openModal("duplicate-preview-subtask"));
  };

  //File It
  const handleFileItDialog = () => {
    dispatch(
      openCnfModal({
        modalName: "fileItSubTaskInPreview",
        title: "Are you sure?",
        description: `You want to file the Subtask`,
      })
    );
  };

  const handleFileItSubTaskYes = async () => {
    const subtask_id = subtaskId;
    const user_id = user?.reg_id;
    try {
      const response = await fileItSubTask(subtask_id, user_id);
      fetchData();
      dispatch(closeCnfModal({ modalName: "fileItSubTaskInPreview" }));
      toast.success(`${response.message}`);
    } catch (error) {
      toast.error(`${error?.response?.data?.error}`);
    }
  };

  const handleDeleteDialog = () => {
    dispatch(
      openCnfModal({
        modalName: "deleteSubTaskInPreview",
        title: "Are you sure?",
        description: `You want to Delete the Subtask`,
      })
    );
  };

  const handleDeleteSubTaskYes = async () => {
    const subtask_id = subtaskId;
    const user_id = user?.reg_id;
    try {
      const response = await patchDeleteSubtask(subtask_id, user_id);
      dispatch(closeCnfModal({ modalName: "deleteSubTaskInPreview" }));
      fetchData();
      closePreview();
      toast.success(`${response.message}`);
    } catch (error) {
      toast.error(`${error?.response?.data?.error}`);
    }
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12} lg={8}>
          <Paper elevation={0} sx={{ p: 2, bgcolor: "#F7F7F7", width: "100%px" }}>
            <Box sx={{ height: "500px", overflow: "auto" }}>
              <PerfectScrollbar>
                <SubTaskOverviewCardHeader
                  title={`SUBTASK: ${subTask?.stname}`}
                  btn1Text={"Edit Subtask"}
                  btn1Icon={<Edit />}
                  handleClick1={handleEditSubTasksDialog}
                  handleDuplicate={handleDuplicateDialog}
                  handleFileIt={handleFileItDialog}
                  handleDelete={handleDeleteDialog}
                />
                <Grid container>
                  {taskData?.tname && (
                    <Grid item xs={12}>
                      <Typography sx={styles.label}>Task:</Typography>
                      <Typography sx={styles.labelText}>
                        {taskData?.tname}
                      </Typography>
                    </Grid>
                  )}

                  {subTask?.stcode && (
                    <Grid item xs={12}>
                      <Typography sx={styles.label}>Subtask Code:</Typography>
                      <Typography sx={styles.labelText}>
                        {subTask?.stcode}
                      </Typography>
                    </Grid>
                  )}

                  {subTask?.stdes && (
                    <Grid item xs={12}>
                      <Typography sx={styles.label}>
                        Subtask Description :
                      </Typography>
                      <Typography sx={styles.labelText}>
                        {subTask?.stdes}
                      </Typography>
                    </Grid>
                  )}

                  {subTask?.stnote && (
                    <Grid item xs={12}>
                      <Typography sx={styles.label}>Subtask Notes:</Typography>
                      <Typography sx={styles.labelText}>
                        {subTask?.stnote}
                      </Typography>
                    </Grid>
                  )}

                  <Grid item xs={12}>
                    <Typography sx={styles.label}>Subtask Links:</Typography>
                    {subTask?.stlink?.length > 0 ? (
                      subTask?.stlink?.split(",")?.map((link, index) => (
                        <Typography key={index} sx={styles.labelText}>
                          {link}
                        </Typography>
                      ))
                    ) : (
                      <Typography sx={styles.labelText}>
                        No Subtask Links!
                      </Typography>
                    )}
                  </Grid>

                  <Grid item xs={12}>
                    <Typography sx={styles.label}>Subtask Files:</Typography>
                    {subTask?.stfile?.length > 0 ? (
                      subTask?.stfile?.split(",")?.map((file, index) => (
                        <Typography key={index} sx={styles.labelText}>
                          {file}
                        </Typography>
                      ))
                    ) : (
                      <Typography sx={styles.labelText}>
                        No Subtask Files!
                      </Typography>
                    )}
                  </Grid>
                </Grid>

                <SubTaskInfo styles={styles} info={subTask} />
              </PerfectScrollbar>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Paper elevation={0} sx={{ height: "100%", width: "100%" }}>
            <CommentSection projectId={subTask?.stproject_assign} taskId={0} subtaskId={subTask?.stid} commentModule={"subtask"} />
          </Paper>
        </Grid>
      </Grid>

      <ReduxDialog value="edit-preview-subtask" modalTitle="Edit Sub Task" showModalButton={false} modalSize="md" >
        <CreateEditSubTasksForm editMode={true} taskData={taskData} subtaskData={subTask} />
      </ReduxDialog>

      <ReduxDialog
        value="duplicate-preview-subtask"
        modalTitle="Copy Subtask"
        showModalButton={false}
        modalSize="sm"
      >
        <DuplicateSubtaskDialog
          subtaskData={subTask}
          closeModalName={"duplicate-preview-subtask"}
        />
      </ReduxDialog>

      <ConfirmationDialog
        value={"fileItSubTaskInPreview"}
        handleYes={handleFileItSubTaskYes}
      />

      <ConfirmationDialog
        value={"deleteSubTaskInPreview"}
        handleYes={handleDeleteSubTaskYes}
      />
    </>
  );
}
