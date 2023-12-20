import { Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../redux/action/userSlice";
import { getPortfolioTasksListView } from "../../../api/modules/taskModule";
import Loader from "../../common/Loader";
import NoListTaskFound from "./NoListTaskFound";
import { useParams } from "react-router-dom";
import PortfolioTaskTable from "./PortfolioTaskTable";

const PortfolioTaskListSection = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector(selectUserDetails);
  const { portfolioId } = useParams();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getPortfolioTasksListView(portfolioId);
      setRows(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [portfolioId]);

  return (
    <Grid container mt={2}>
      <Grid item xs={12}>
        {loading ? <Loader /> : <PortfolioTaskTable rows={rows} setRows={setRows} fetchData={fetchData} />}
      </Grid>
    </Grid>
  );
};

export default PortfolioTaskListSection;
