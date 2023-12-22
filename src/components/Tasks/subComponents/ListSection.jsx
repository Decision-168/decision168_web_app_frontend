import { Grid } from "@mui/material";
import React, { useState, useEffect,memo } from "react";
import TaskTable from "./TaskTable";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../redux/action/userSlice";
import { getDashboardAlltaskListView } from "../../../api/modules/taskModule";

const ListSection = ({rows,setRows}) => {

  const [loading, setLoading] = useState(false);
  const user = useSelector(selectUserDetails);
  // const regId = user?.reg_id;
  const regId = 1; // for testing

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getDashboardAlltaskListView(regId);
      setRows(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [regId]);

  return (
    <Grid container mt={2}>
      <Grid item xs={12}>
        {loading ? <loader /> : <TaskTable rows={rows} setRows={setRows} fetchData={fetchData} />}
      </Grid>
    </Grid>
  );
};

export default memo(ListSection);
