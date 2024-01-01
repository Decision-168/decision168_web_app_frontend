import { Grid } from "@mui/material";
import React, { useState, useEffect, memo } from "react";
import TaskTable from "./TaskTable";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../redux/action/userSlice";
import { getDashboardAlltaskListView, getProjectTasksList, getProjectTeamMembersTasksList } from "../../../api/modules/taskModule";
import Loader from "../../common/Loader";
import MyPagination from "../../common/MyPagination";
import { useParams } from "react-router-dom";

const ProjectTeamMembersListSection = ({ rows, setRows, setProjectDetails }) => {
  const [loading, setLoading] = useState(false);

  const { project_id, task_assignee } = useParams();

  console.log(project_id, task_assignee);

  // Pagination settings
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 6;

  const fetchData = async () => {
    setLoading(true);
    try {
      // Introduce a delay of 1 second (1000 milliseconds)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await getProjectTeamMembersTasksList(project_id, task_assignee)
      setProjectDetails(response?.pdetail);
      setRows(response?.tlist);
      // setTotalPages(response.totalPages);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchData(currentPage);
  // }, [project_id , task_assignee, currentPage]);

  useEffect(() => {
    fetchData();
  }, [project_id, task_assignee]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Grid container mt={2}>
      <Grid item xs={12}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <TaskTable rows={rows} setRows={setRows} fetchData={fetchData} currentPage={currentPage} />
            {rows?.length > 0 && <MyPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />}
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default ProjectTeamMembersListSection;
