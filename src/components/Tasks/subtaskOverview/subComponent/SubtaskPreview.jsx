import React from "react";
import { Paper, Box, Grid, Typography } from "@mui/material";
import { Edit } from "@mui/icons-material";
import PerfectScrollbar from "react-perfect-scrollbar";
import DuplicateDialog from "../../subComponents/DuplicateDialog";
import { useDispatch } from "react-redux";
import { openCnfModal, closeCnfModal } from "../../../../redux/action/confirmationModalSlice";
import { openModal } from "../../../../redux/action/modalSlice";
import ConfirmationDialog from "../../../common/ConfirmationDialog";
import ReduxDialog from "../../../common/ReduxDialog";
import EditSubTasksForm from "../../createEditSubtasks/EditSubTasksForm";
import SubTaskOverviewCardHeader from "./SubTaskOverviewCardHeader";
import CommentSection from "../../../project/projects-overview/comment-section";
import { fileItSubTask, getSubTaskDetails } from "../../../../api/modules/taskModule";
import SubTaskInfo from "./SubTaskInfo";
import { patchDeleteSubtask } from "../../../../api/modules/TrashModule";
import { toast } from "react-toastify";

export default function SubtaskPreview({ styles, subtaskId, parentTaskName, closePreview, fetchData }) {
  const dispatch = useDispatch();

  const [subTask, setSubTask] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const fetchSubTaskDetails = async () => {
    setLoading(true);
    try {
      const response = await getSubTaskDetails(subtaskId);
      setSubTask(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchSubTaskDetails();
  }, [subtaskId]);

  const handleEditSubTasksDialog = () => {
    dispatch(openModal("edit-subtask"));
  };

  const handleDuplicateDialog = () => {
    dispatch(openModal("duplicate-task"));
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
    // const user_id = user?.reg_id;
    const user_id = 1; // for testing
    try {
      const response = await fileItSubTask(subtask_id, user_id);
      fetchData();
      dispatch(closeCnfModal({ modalName: "fileItSubTaskInPreview" }));
      toast.success(`${response.message}`);
    } catch (error) {
      toast.error(`${error?.response?.data?.error}`);
      console.error("Error in filing the Subtask in preview:", error);
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
    // const user_id = user?.reg_id;
    const user_id = 1; // for testing
    try {
      const response = await patchDeleteSubtask(subtask_id, user_id);
      dispatch(closeCnfModal({ modalName: "deleteSubTaskInPreview" }));
      fetchData();
      closePreview();
      toast.success(`${response.message}`);
    } catch (error) {
      toast.error(`${error?.response?.data?.error}`);
      console.error("Error in Deleteing the Subtask in preview:", error);
    }
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Paper elevation={0} sx={{ p: 2, bgcolor: "#F7F7F7", width: "700px" }}>
            <Box sx={{ height: "500px", overflow: "auto" }}>
              <PerfectScrollbar>
                <SubTaskOverviewCardHeader title={`SUBTASK: ${subTask?.stname}`} btn1Text={"Edit Subtask"} btn1Icon={<Edit />} handleClick1={handleEditSubTasksDialog} handleDuplicate={handleDuplicateDialog} handleFileIt={handleFileItDialog} handleDelete={handleDeleteDialog} />
                <Grid container>
                  {parentTaskName && (
                    <Grid item xs={12}>
                      <Typography sx={styles.label}>Task:</Typography>
                      <Typography sx={styles.labelText}>{parentTaskName}</Typography>
                    </Grid>
                  )}

                  {subTask?.stcode && (
                    <Grid item xs={12}>
                      <Typography sx={styles.label}>Subtask Code:</Typography>
                      <Typography sx={styles.labelText}>{subTask?.stcode}</Typography>
                    </Grid>
                  )}

                  {subTask?.stdes && (
                    <Grid item xs={12}>
                      <Typography sx={styles.label}>Subtask Description :</Typography>
                      <Typography sx={styles.labelText}>{subTask?.stdes}</Typography>
                    </Grid>
                  )}

                  {subTask?.stnote && (
                    <Grid item xs={12}>
                      <Typography sx={styles.label}>Subtask Notes:</Typography>
                      <Typography sx={styles.labelText}>{subTask?.stnote}</Typography>
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
                      <Typography sx={styles.labelText}>No Subtask Links!</Typography>
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
                      <Typography sx={styles.labelText}>No Subtask Files!</Typography>
                    )}
                  </Grid>
                </Grid>

                <SubTaskInfo styles={styles} info={subTask} />
              </PerfectScrollbar>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Paper elevation={0} sx={{ p: 1, bgcolor: "#F7F7F7", width: "300px" }}>
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

      <ConfirmationDialog value={"fileItSubTaskInPreview"} handleYes={handleFileItSubTaskYes} />

      <ConfirmationDialog value={"deleteSubTaskInPreview"} handleYes={handleDeleteSubTaskYes} />
    </>
  );
}
