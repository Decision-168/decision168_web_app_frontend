import { Box, Grid } from "@mui/material";
import React from "react";
import EditableTable from "./EditableTable";

const ListSection = () => {
  return (
    <Box sx={{ flexGrow: 1 }} mb={2} mt={2}>
      <Grid container>
        <Grid item xs={12} lg={12}>
          <EditableTable tableTile={"Created Goals"} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ListSection;
