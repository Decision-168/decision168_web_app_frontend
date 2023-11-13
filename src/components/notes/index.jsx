import React from "react";
import { Box, Grid } from "@mui/material";
import BasicBreadcrumbs from "../common/BasicBreadcrumbs";
import NotesEditor from "./subComponents/NotesEditor";
import NotesList from "./subComponents/NotesList";

const index = () => {
  return (
    <Box sx={{ flexGrow: 1 }} mb={2}>
      <BasicBreadcrumbs currentPage="notes" />
      <Grid container>
        <Grid item xs={12} lg={3}>
          <NotesList/>
        </Grid>
        <Grid item xs={12} lg={9}>
          <NotesEditor />
        </Grid>
      </Grid>
    </Box>
  );
};

export default index;