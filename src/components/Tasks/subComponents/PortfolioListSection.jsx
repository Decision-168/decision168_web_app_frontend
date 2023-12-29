import { Grid } from "@mui/material";
import React, { useState, useEffect, memo } from "react";
import TaskTable from "./TaskTable";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../redux/action/userSlice";
import { getPortfolioTasksSubtasksListView } from "../../../api/modules/taskModule";
import Loader from "../../common/Loader";
import NoListTaskFound from "./NoListTaskFound";
import MyPagination from "../../common/MyPagination";

const PortfolioListSection = ({ rows, setRows }) => {
  const [loading, setLoading] = useState(false);
  const user = useSelector(selectUserDetails);
  // const regId = user?.reg_id;
  // const portfolioId = JSON.parse(localStorage.getItem("portfolioId"));
  const regId = 1;
  const portfolioId = 2;

  // Pagination settings
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 6;

  const fetchData = async (page) => {
    setLoading(true);
    try {
      // Introduce a delay of 1 second (1000 milliseconds)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response = await getPortfolioTasksSubtasksListView(
        portfolioId,
        regId,
        page,
        pageSize
      );
      setRows(response.data);
      setTotalPages(response.totalPages);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [portfolioId, regId, currentPage]);

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
            <TaskTable rows={rows} setRows={setRows} fetchData={fetchData} currentPage={currentPage}/>
            {rows?.length > 0 && (
              <MyPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default memo(PortfolioListSection);
