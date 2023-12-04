import { Button, DialogActions, DialogContent, Grid } from "@mui/material";
import React from "react";
import CustomLabelTextField from "./CustomLabelTextField";
import CustomMultilineTextField from "./CustomMultilineTextField";

const EditKPIPopup = () => {

  return (
    <>
      <DialogContent dividers>
        <Grid container>
          <CustomLabelTextField label="KPI" name="KPI" required={true} placeholder="Enter KPi..." />
          <CustomMultilineTextField label="Description" name="Description" required={false} placeholder="Enter Description..." />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" size="small">
          Cancel
        </Button>
        <Button variant="contained" size="small">
          Save
        </Button>
      </DialogActions>
    </>
  );
};

export default EditKPIPopup;
