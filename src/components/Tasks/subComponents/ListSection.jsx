import { Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import TaskTable from "./TaskTable";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../redux/action/userSlice";
import { getDashboardAlltaskListView } from "../../../api/modules/taskModule";
import Loader from "../../common/Loader";
import MyPagination from "../../common/MyPagination";

const ListSection = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector(selectUserDetails);
  // const regId = user?.reg_id;
  const regId = 1; // for testing

  // Pagination settings
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 6;

  const fetchData = async (page) => {
    setLoading(true);
    try {
      // Introduce a delay of 1 second (1000 milliseconds)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await getDashboardAlltaskListView(regId, page, pageSize);
      setRows(response.data);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [regId, currentPage]);

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
            <TaskTable rows={rows} setRows={setRows} fetchData={fetchData} />
            {rows?.length > 0 && (
            <MyPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            )}
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default ListSection;
