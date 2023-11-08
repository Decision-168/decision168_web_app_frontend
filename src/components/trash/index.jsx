import React from "react";
import { Box, Grid } from "@mui/material";
import BasicBreadcrumbs from "../common/BasicBreadcrumbs";
import RadioSection from "./subComponents/RadioSection";
import FilterTable from "./subComponents/FilterTable";

const index = () => {
  return (
    <Box sx={{ flexGrow: 1 }} mb={2}>
      <Grid container>
        <Grid item xs={12} lg={3}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <BasicBreadcrumbs currentPage="trash" />
          </Box>
        </Grid>
        <Grid item xs={12} lg={9}>
          <RadioSection />
        </Grid>
        <Grid item xs={12}>
          <FilterTable/>
        </Grid>
      </Grid>
    </Box>
  );
};

export default index;