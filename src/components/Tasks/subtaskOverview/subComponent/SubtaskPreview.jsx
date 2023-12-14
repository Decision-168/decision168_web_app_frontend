import React from "react";
import { Paper, Box, Grid, Typography } from "@mui/material";
import { Edit } from "@mui/icons-material";
import PerfectScrollbar from "react-perfect-scrollbar";
import DuplicateDialog from "../../subComponents/DuplicateDialog";
import { useDispatch } from "react-redux";
import { openCnfModal } from "../../../../redux/action/confirmationModalSlice";
import { openModal } from "../../../../redux/action/modalSlice";
import ConfirmationDialog from "../../../common/ConfirmationDialog";
import ReduxDialog from "../../../common/ReduxDialog";
import EditSubTasksForm from "../../createEditSubtasks/EditSubTasksForm";
import SubTaskOverviewCardHeader from "./SubTaskOverviewCardHeader";
import CommentSection from "../../../project/projects-overview/comment-section";
import { getSubTaskDetails } from "../../../../api/modules/taskModule";
import SubTaskInfo from "./SubTaskInfo";

export default function SubtaskPreview({ styles, subtaskId, parentTaskName }) {
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
          <Paper elevation={0} sx={{ p: 2, bgcolor: "#F7F7F7", width: "700px" }}>
            <Box sx={{ height: "500px", overflow: "auto" }}>
              <PerfectScrollbar>
                <SubTaskOverviewCardHeader title={`SUBTASK: ${subTask?.stname}`} btn1Text={"Edit Subtask"} btn1Icon={<Edit />} handleClick1={handleEditSubTasksDialog} handleDuplicate={handleDuplicateDialog} handleFileIt={handleFileItDialog} handleDelete={handleDeleteDialog} />
                <Grid container>

                  {
                    parentTaskName && <Grid item xs={12}>
                      <Typography sx={styles.label}>Task:</Typography>
                      <Typography sx={styles.labelText}>{parentTaskName}</Typography>
                    </Grid>
                  }

                  {
                    subTask?.stcode && <Grid item xs={12}>
                      <Typography sx={styles.label}>Subtask Code:</Typography>
                      <Typography sx={styles.labelText}>{subTask?.stcode}</Typography>
                    </Grid>
                  }


                  {
                    subTask?.stdes && <Grid item xs={12}>
                      <Typography sx={styles.label}>Subtask Description :</Typography>
                      <Typography sx={styles.labelText}>{subTask?.stdes}</Typography>
                    </Grid>
                  }

                  {
                    subTask?.stnote && <Grid item xs={12}>
                      <Typography sx={styles.label}>Subtask Notes:</Typography>
                      <Typography sx={styles.labelText}>{subTask?.stnote}</Typography>
                    </Grid>
                  }

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

      <ConfirmationDialog value={"fileIt"} />

      <ConfirmationDialog value={"deleteTask"} />
    </>
  );
}
