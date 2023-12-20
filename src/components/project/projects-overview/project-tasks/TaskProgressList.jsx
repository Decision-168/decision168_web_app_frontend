import { Avatar, Box, Grid, Typography } from "@mui/material";
import React, { memo } from "react";
import LinearProgressWithLabel from "../../../common/LinearProgressWithLabel";
import { stringAvatar } from "../../../../helpers/stringAvatar";

const TaskProgressList = ({ item }) => {
  return (
    <Grid container px={2} py={1} sx={{ borderBottom: "1px solid #f6f6f6" }}>
      <Grid item xs={6} lg={6}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          {item?.profileImage ? (
            <Avatar
              alt={stringAvatar(item?.name)}
              src={`/src/assets/student_photos/${item?.profileImage}`}
              sx={{ width: "2rem", height: "2rem" }}
            />
          ) : (
            <Avatar
              alt="user name"
              src="/src/assets/images/avatar-7.jpg"
              sx={{ width: "2rem", height: "2rem" }}
            />
          )}

          <Typography sx={{ fontSize: 14, ml: 2, color: "#343a40" }}>
            {item.name}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={6} lg={6}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "start",
          }}
        >
          <Typography sx={{ fontSize: 14, color: "#343a40" }}>
            {item?.status}
          </Typography>
          <LinearProgressWithLabel value={item?.progress} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default memo(TaskProgressList);
