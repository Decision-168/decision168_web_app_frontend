import React, { useCallback, useState } from "react";
import { Box, Grid } from "@mui/material";
import BasicBreadcrumbs from "../common/BasicBreadcrumbs";
import RadioSection from "./subComponents/RadioSection";
import ArchiveData from "./subComponents/ArchiveData";

const index = () => {
  const [value, setValue] = useState("all");
  const handleChangeRadio = useCallback((event) => {
    setValue(event.target.value);
  }, []);
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
            <BasicBreadcrumbs currentPage="archive" />
          </Box>
        </Grid>
        <Grid item xs={12} lg={9}>
          <RadioSection value={value} handleChange={handleChangeRadio} />
        </Grid>
        <Grid item xs={12} lg={12}>
            <ArchiveData value={value} />
          </Grid>
      </Grid>
    </Box>
  );
};
export default index;