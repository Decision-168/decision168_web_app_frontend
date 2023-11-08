import { Button, DialogActions, DialogContent, Grid } from "@mui/material";
import React from "react";
import CustomLabelTextField from "./CustomLabelTextField";
import { useForm } from "react-hook-form";
import { globalValidations } from "../../../utils/GlobalValidation";
import CustomMultilineTextField from "./CustomMultilineTextField";

const EditKPIPopup = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  return (
    <>
      <DialogContent dividers>
        <Grid container>
          <CustomLabelTextField
            label="KPI"
            name="KPI"
            required={true}
            placeholder="Enter KPi..."
            register={register}
            errors={errors}
            validation={globalValidations.KPI}
          />
          <CustomMultilineTextField
            label="Description"
            name="Description"
            required={false}
            placeholder="Enter Description..."
            register={register}
            errors={errors}
            validation={globalValidations.Description}
          />
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