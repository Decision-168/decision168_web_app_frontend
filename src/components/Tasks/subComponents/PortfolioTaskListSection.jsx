import { Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../redux/action/userSlice";
import { getPortfolioTasksListView } from "../../../api/modules/taskModule";
import Loader from "../../common/Loader";
import NoListTaskFound from "./NoListTaskFound";
import { useParams } from "react-router-dom";
import PortfolioTaskTable from "./PortfolioTaskTable";
import MyPagination from "../../common/MyPagination";
import { SearchWithFuse } from "../../../helpers/SearchWithFuse";

const PortfolioTaskListSection = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector(selectUserDetails);
  const { portfolioId } = useParams();

  // Pagination settings
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 6;

  const fetchData = async (page) => {
    setLoading(true);
    try {
      // Introduce a delay of 1 second (1000 milliseconds)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await getPortfolioTasksListView(portfolioId, page, pageSize);
      setRows(response?.data);
      setTotalPages(response?.totalPages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [portfolioId, currentPage]);

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
            <PortfolioTaskTable rows={rows} setRows={setRows} fetchData={fetchData} />
            {rows?.length > 0 && <MyPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />}
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default PortfolioTaskListSection;
