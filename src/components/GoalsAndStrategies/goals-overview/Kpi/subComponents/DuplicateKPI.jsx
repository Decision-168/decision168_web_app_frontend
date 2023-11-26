import { Box, Button, DialogActions, DialogContent, Grid, Typography } from "@mui/material";
import React from "react";
import CustomLabelTextField from "../../../subComponents/CustomLabelTextField";
import KpiTabSection from "./KpiTabSection";
const DuplicateKPI = () => {
  return (
    <>
      <DialogContent dividers>
        <Box sx={{ flexGrow: 1, width: "100%", background: "white", p: 2 }} mb={2}>
          <Grid container spacing={2}>
            <CustomLabelTextField label="KPI" name="KPI" required={true} placeholder="Enter KPI..." />
            <Grid item xs={12}>
              <Box p={2} sx={{ background: "#f5f5f5" }}>
                <Typography sx={{ fontSize: 15, fontWeight: "600", textAlign: "start" }}>Import Options</Typography>
                <KpiTabSection />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" size="small">
          Duplicate
        </Button>
      </DialogActions>
    </>
  );
};

export default DuplicateKPI;
