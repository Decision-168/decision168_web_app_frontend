import { Box, Typography } from "@mui/material";
import React, { Fragment,memo } from "react";
import RecentList from "./RecentList";

const RecentHistory = ({}) => {
  const data = [0, 1, 2, 3, 4];
  return (
    <Box sx={{ flexGrow: 1, width: "100%", background: "white", p: 2,mt:2,borderRadius:1 }} mb={2}>
      <Typography
        sx={{ color: "#495057", fontSize: 15, fontWeight: "600", ml: 0.5 }}
      >
        History
      </Typography>

      {data.map((item, index) => {
        return (
          <Fragment key={index}>
            <RecentList />
          </Fragment>
        );
      })}
    </Box>
  );
};

export default memo(RecentHistory);
