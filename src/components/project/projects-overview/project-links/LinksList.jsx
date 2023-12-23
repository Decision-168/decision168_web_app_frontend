import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
import React, { memo } from "react";
import { Link } from "react-router-dom";
import LinkIcon from "@mui/icons-material/Link";
const LinksList = ({ item }) => {
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
          <Avatar alt="link">
            <LinkIcon />
          </Avatar>

          <Typography
            to={item.link}
            component={Link}
            sx={{ fontSize: 14, ml: 2, color: "#343a40" }}
          >
            {item.screen}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default memo(LinksList);
