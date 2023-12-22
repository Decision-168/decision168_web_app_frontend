import { Box, Typography } from "@mui/material";
import React, { Fragment, memo, useEffect, useState } from "react";
import RecentList from "./RecentList";
import {
  getViewHistoryDateGoal,
  getViewHistoryDateStrategy,
} from "../../../../api/modules/goalkpiModule";
import { getViewHistoryDateProject } from "../../../../api/modules/ProjectModule";

const RecentHistory = ({ id, type }) => {
  const [recentHis, setrecentHis] = useState([]);
  
    useEffect(() => {
      const fetchRecentHistoryData = async () => {
        try {
          let response;
          if (type === "goal") {
            response = await getViewHistoryDateGoal(id);
          } else if (type === "kpi") {
            response = await getViewHistoryDateStrategy(id);
          } else if (type === "project") {
            response = await getViewHistoryDateProject(id);
          }
          setrecentHis(response.history_dates);
        } catch (error) {
          console.error(error);
        }
      };

      fetchRecentHistoryData();
    }, [id, type]);  

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

      {recentData.map((rh_item, rh_index) => {
        return (
          <Fragment key={rh_index}>
            <RecentList data={rh_item} id={id} type={type} />
          </Fragment>
        );
      })}
    </Box>
  );
};

export default memo(RecentHistory);
