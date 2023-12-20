import { Grid } from "@mui/material";
import React, { useState, useEffect,memo } from "react";
import TaskTable from "./TaskTable";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../redux/action/userSlice";
import { getPortfolioTasksSubtasksListView } from "../../../api/modules/taskModule";
import Loader from "../../common/Loader";

const PortfolioListSection = ({ setData, filterData }) => {
  // const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector(selectUserDetails);
  // const regId = user?.reg_id;
  // const portfolioId = JSON.parse(localStorage.getItem("portfolioId"));
  const regId = 1;
  const portfolioId = 2;

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getPortfolioTasksSubtasksListView(
        portfolioId,
        regId
      );
      setData(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [portfolioId, regId]);

  return (
    <Grid container mt={2}>
      <Grid item xs={12}>
        {loading ? (
          <Loader />
        ) : (
          <TaskTable
            rows={filterData}
            setRows={setData}
            fetchData={fetchData}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default memo(PortfolioListSection);
