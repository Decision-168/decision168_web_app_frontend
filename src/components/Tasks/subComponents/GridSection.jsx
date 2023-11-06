import { Box, Grid } from "@mui/material";
import React from "react";

const GridSection = () => {
  return (
    <Box sx={{ flexGrow: 1 }} mb={2}>
      <Grid container>
        <Grid item xs={12}>
          Grid Section
        </Grid>
      </Grid>
    </Box>
  );
};

export default GridSection;
