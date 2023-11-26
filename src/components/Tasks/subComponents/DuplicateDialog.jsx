import { Box, Button, DialogActions, DialogContent, Grid, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import CustomLabelTextField from "../../common/CustomLabelTextField";
import { globalValidations } from "../../../utils/GlobalValidation";
import DuplicateTabSection from "./DuplicateTabSection";
const DuplicateDialog = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  return (
    <>
      <DialogContent dividers>
        <Box sx={{ flexGrow: 1, width: "100%", background: "white", p: 2 }} mb={2}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CustomLabelTextField label="Task Name" name="task" required={true} placeholder="Enter Task Name..." />
            </Grid>

            <Grid item xs={12}>
              <Box p={2} sx={{ background: "#f5f5f5" }}>
                <Typography sx={{ fontSize: 15, fontWeight: "600", textAlign: "start" }}>Import Options</Typography>
                <DuplicateTabSection />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Grid container>
          <Grid item xs={12} sm={12} px={2} py={2} textAlign="end">
            <Button variant="contained" size="small" sx={{}}>
              Duplicate
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </>
  );
};

export default DuplicateDialog;
