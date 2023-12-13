import { Box, Typography } from "@mui/material";
import React, { Fragment, memo, useEffect, useState } from "react";
import RecentList from "./RecentList";
import {
  getViewHistoryDateGoal,
  getViewHistoryDateStrategy,
} from "../../../../api/modules/goalkpiModule";

const RecentHistory = ({ id, type }) => {
  const [recentHis, setrecentHis] = useState([]);
  if (type === "goal") {
    useEffect(() => {
      const fetchRecentHistoryData = async () => {
        try {
          const response = await getViewHistoryDateGoal(id);
          setrecentHis(response.history_dates);
        } catch (error) {
          console.error(error);
        }
      };

      fetchRecentHistoryData();
    }, []);
  }

  if (type === "kpi") {
    useEffect(() => {
      const fetchRecentHistoryData = async () => {
        try {
          const response = await getViewHistoryDateStrategy(id);
          setrecentHis(response.history_dates);
        } catch (error) {
          console.error(error);
        }
      };

      fetchRecentHistoryData();
    }, []);
  }
  const recentData = recentHis.slice(0, 5);

  return (
    <Box
      sx={{
        flexGrow: 1,
        width: "100%",
        background: "white",
        p: 2,
        mt: 2,
        borderRadius: 1,
      }}
      mb={2}
    >
      <Typography
        sx={{ color: "#495057", fontSize: 15, fontWeight: "600", ml: 0.5 }}
      >
        History
      </Typography>

      {recentData.map((item, index) => {
        return (
          <Fragment key={index}>
            <RecentList data={item} id={id} type={type} />
          </Fragment>
        );
      })}
    </Box>
  );
};

export default memo(RecentHistory);
