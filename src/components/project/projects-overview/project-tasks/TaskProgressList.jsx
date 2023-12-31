import { Avatar, Box, Grid, Typography } from "@mui/material";
import React, { memo } from "react";
import LinearProgressWithLabel from "../../../common/LinearProgressWithLabel";
import { stringAvatar } from "../../../../helpers/stringAvatar";
import { Link, useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const TaskProgressList = ({ item }) => {
  const { pid } = useParams();
  const theme = useTheme();
  return (
    <Grid container px={2} spacing={1} py={1} sx={{ borderBottom: "1px solid #f6f6f6" }}>
      <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Avatar alt={item?.profileImage && stringAvatar(item?.name)} src={`/src/assets/student_photos/${item?.profileImage}`} sx={{ width: "2rem", height: "2rem" }}>
            {item?.profileImage && stringAvatar(item?.name)}
          </Avatar>
          <Typography
            component={Link}
            to={`/team-member-tasks-list/${pid}/${item?.assigneeId}`}
            sx={{ fontSize: 14, ml: 2, color: "#343a40", textDecoration: "none", "&:hover": { color: theme.palette.primary.dark } }}
          >
            {item.name}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "start",
          }}
        >
          <Typography sx={{ fontSize: 14, color: "#343a40" }}>{item?.status}</Typography>
          <LinearProgressWithLabel value={item?.progress} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default memo(TaskProgressList);
