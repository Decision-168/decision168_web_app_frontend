import React from "react";
import { Box, Button, Grid, Typography, Paper } from "@mui/material";
import BasicBreadcrumbs from "../../common/BasicBreadcrumbs";
import { taskOverviewStyles } from "../taskOverview/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import SubtaskOverviewCard from "./subComponent/SubtaskOverviewCard";
import SubtaskLinks from "./subComponent/SubtaskLinks";
import SubtaskFiles from "./subComponent/SubtaskFiles";
import { getSubTaskDetails } from "../../../api/modules/taskModule";
import CommentSection from "../../project/projects-overview/comment-section";

export default function SubtaskOverview() {
  const theme = useTheme();
  const styles = taskOverviewStyles();

  const { subTaskId } = useParams();

  const [subTask, setSubTask] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const fetchSubTaskDetails = async () => {
    setLoading(true);
    try {
      const response = await getSubTaskDetails(subTaskId);
      setSubTask(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchSubTaskDetails();
  }, [subTaskId]);


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
          <SubtaskOverviewCard styles={styles} subtask={subTask}/>
          <SubtaskLinks styles={styles} links={subTask?.stlink} LinkComments={subTask?.stlink_comment} />
          <SubtaskFiles styles={styles} files={subTask?.stfile} />
        </Grid>
        <Grid item xs={12} lg={4}>
          <Paper elevation={0} sx={{height:"100%"}}>
          <CommentSection projectId={subTask?.stproject_assign} taskId={0} subtaskId={subTask?.stid} commentModule={"subtask"}/>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
