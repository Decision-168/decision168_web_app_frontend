import React from "react";
import { Link, Typography } from "@mui/material";

export default function Navigation({ question, linkLabel, path }) {
  return (
    <Typography component="p" variant="caption">
      {question}
      <Link href={path} variant="caption" pl={1}>
        {linkLabel}
      </Link>
    </Typography>
  );
}
