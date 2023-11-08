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
import CustomLabelTextField from "../../subComponents/CustomLabelTextField";
import { globalValidations } from "../../../../utils/GlobalValidation";
import KpiTabSection from "./KpiTabSection";
const DuplicateKPI = () => {
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
              label="KPI"
              name="KPI"
              required={true}
              placeholder="Enter KPI..."
              register={register}
              errors={errors}
              validation={globalValidations.KPI}
            />
            <Grid item xs={12}>
              <Box p={2} sx={{ background: "#f5f5f5" }}>
                <Typography
                  sx={{ fontSize: 15, fontWeight: "600", textAlign: "start" }}
                >
                  Import Options
                </Typography>
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
