import { Box, Grid } from "@mui/material";
import React from "react";
import CustomTable from "../../create-goals/subComponents/CustomTable";

const ListSection = () => {
  return (
    <Box sx={{ flexGrow: 1 }} mb={2} mt={2}>
      <Grid container spacing={4}>
        <Grid item xs={12} lg={12}>
          <CustomTable title={"Created Goals"} />
        </Grid>
        <Grid item xs={12} lg={12}>
          <CustomTable title={"Accepted Goals"} />
        </Grid>
        <Grid item xs={12} lg={12}>
          <CustomTable title={"Pending Requests"} />
        </Grid>
        <Grid item xs={12} lg={12}>
          <CustomTable title={"More Info Requests"} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ListSection