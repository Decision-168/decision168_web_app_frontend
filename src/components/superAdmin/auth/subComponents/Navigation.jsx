import React from "react";
import { Box, Link, Typography } from "@mui/material";
import CustomLink from "../../common/CustomLink";

export default function Navigation({ question, linkLabel, path }) {
  return (
    <Typography component="p" variant="caption">
      {question}
      <Box component="span" pl={1}>
        <CustomLink path={path}>{linkLabel}</CustomLink>
      </Box>
    </Typography>
  );
}
