import React from "react";
import { Box, Grid, Typography, Paper, Button } from "@mui/material";
import BasicBreadcrumbs from "../../common/BasicBreadcrumbs";
import TaskOverviewCard from "./subComponents/TaskOverviewCard";
import { taskOverviewStyles } from "./styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import TaskLinks from "./subComponents/TaskLinks";
import TaskFiles from "./subComponents/TaskFiles";
import CommentSection from "../../project/projects-overview/comment-section";
import SubtaskRow from "../subComponents/SubtaskRow";
import { getTaskDetails } from "../../../api/modules/taskModule";

export default function TaskOverview() {
  const theme = useTheme();
  const styles = taskOverviewStyles();
  const { taskId } = useParams();

  const [task, setTask] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const fetchTaskDetails = async () => {
    setLoading(true);
    try {
      const response = await getTaskDetails(taskId)
      setTask(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchTaskDetails();
  }, [taskId]);


  return (
    <Box sx={{ flexGrow: 1 }} mb={2}>
      <Grid container>
        <Grid item xs={4} md={2}>
          <BasicBreadcrumbs currentPage="Overview" showBackButton={true} />
        </Grid>
        <Grid item xs={4} md={10}>
          <Box sx={{ height: "100%", display: "flex", justifyContent: "start", alignItems: "center" }}>
            <Button component={Link} to="/projects-overview" startIcon={<ArrowBackIcon />} size="small" variant="contained" sx={{ ml: 2, backgroundColor: theme.palette.secondary.main, color: theme.palette.secondary.light, "&:hover": { backgroundColor: theme.palette.secondary.dark } }}>
              Go To Project
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <TaskOverviewCard styles={styles} task={task} />
          <TaskLinks styles={styles} links={task?.tlink} LinkComments={task?.tlink_comment} />
          <TaskFiles styles={styles} files={task?.tfile} />
        </Grid>
        <Grid item xs={12} lg={4}>
          <CommentSection />
        </Grid>
      </Grid>
      <Grid item xs={12} lg={12}>
        <Paper elevation={0} sx={{ p: 2, mt: 2 }}>
          <Typography sx={styles.label}>Subtaks:</Typography>
          <SubtaskRow  task={task} fetchTaskDetails={fetchTaskDetails}/>
        </Paper>
      </Grid>
    </Box>
  );
}
