import { Stack, Typography } from "@mui/material";
import React from "react";

export default function NoDataFound({ message }) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="center">
      <Typography component="div" variant="subtitle2" color="error" p={2} >
       {message}...
      </Typography>
    </Stack>
  );
}
