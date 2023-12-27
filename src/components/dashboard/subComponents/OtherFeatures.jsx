import React, { useState, useEffect } from "react";
import { Box} from "@mui/material";
import Grid from "@mui/material/Grid";
import { selectUserDetails } from "../../../redux/action/userSlice";
import { useSelector } from "react-redux";
import { getRecentNotifications } from "../../../api/modules/dashboardModule";
import MyDayCard from "./MyDayCard";
import MyNext168Card from "./MyNext168Card";
import MyAlertsCard from "./MyAlertsCard";


export default function ResponsiveGrid() {
  const user = useSelector(selectUserDetails);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    const recentNotifications = async () => {
      try {
        const id = user?.reg_id;
        const response = await getRecentNotifications(id);
        setData(response);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    recentNotifications();
  }, []);


  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        <Grid item xs={12} md={6}>
          <MyDayCard
            TodayTasksResult={data.TodayTasksResult}
            TodaySubtasksResult={data?.TodaySubtasksResult}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <MyNext168Card
            WeekTasksResult={data.WeekTasksResult}
            WeekSubtasksResult={data?.WeekSubtasksResult}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <MyAlertsCard />
        </Grid>
      </Grid>
    </Box>
  );
}


