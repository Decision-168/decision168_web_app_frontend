import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import ProjectTabSection from "./ProjectTabSection";
import { globalValidations } from "../../../../utils/GlobalValidation";
import CustomLabelTextField from "../../subComponents/CustomLabelTextField";
const DuplicateProject = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  return (
    <>
      <DialogContent dividers>
        <Box
          sx={{ flexGrow: 1, width: "100%", background: "white", p: 2 }}
          mb={2}
        >
          <Grid container spacing={2}>
            <CustomLabelTextField
              label="Project Name"
              name="projectName"
              required={true}
              placeholder="Enter Project Name..."
              register={register}
              errors={errors}
              validation={globalValidations.projectName}
            />
            <Grid item xs={12}>
              <Box p={2} sx={{ background: "#f5f5f5" }}>
                <Typography
                  sx={{ fontSize: 15, fontWeight: "600", textAlign: "start" }}
                >
                  Import Options
                </Typography>
                <ProjectTabSection />
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

export default DuplicateProject;
