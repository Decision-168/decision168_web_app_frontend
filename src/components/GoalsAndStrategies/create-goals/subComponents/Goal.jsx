import { Grid } from "@mui/material";
import React from "react";
import { globalValidations } from "../../../../utils/GlobalValidation";
import { useForm } from "react-hook-form";
import CustomLabelTextField from "./CustomLabelTextField";
import CustomMultilineTextField from "./CustomMultilineTextField";
const Goal = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  return (
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
  );
};

export default Goal;
