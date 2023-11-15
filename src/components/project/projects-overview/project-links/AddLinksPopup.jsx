import { Box, Button, DialogActions, DialogContent, Grid } from "@mui/material";
import React from "react";
import AddLinks from "../../portfolio-projects-list/AddLinks";

const AddLinksPopup = () => {
  return (
    <>
      <DialogContent dividers>
        <Box sx={{ width: "100%", background: "white", p: 2, borderRadius: 1 }}>
          <Grid container spacing={1}>
            <AddLinks />
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "end",
            pt: 1,
            mr: 2,
            width: "100%",
          }}
        >
          <Button variant="contained" size="small">
            Save Changes
          </Button>
        </Box>
      </DialogActions>
    </>
  );
};

export default AddLinksPopup;
