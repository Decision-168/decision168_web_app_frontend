import { Grid } from "@mui/material";
import React from "react";
import { globalValidations } from "../../../../utils/GlobalValidation";
import { useForm } from "react-hook-form";
import CustomLabelTextField from "./CustomLabelTextField";
import CustomMultilineTextField from "./CustomMultilineTextField";
import CustomAutocomplete from "./CustomAutocomplete";
const departments = [
  { label: "Marketing" },
  { label: "Implementation" },
  { label: "Marketing & Sales" },
];
const assignee = [
  { label: "Afrin Syed" },
  { label: "Amin Syed" },
  { label: "Don Mehmood" },
];
const Goal = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  return (
    <Grid container>
      <CustomLabelTextField
        label="Objective/Goal"
        name="Objective"
        required={true}
        placeholder="Enter Objective/Goal..."
        register={register}
        errors={errors}
        validation={globalValidations.Objective}
      />
      <CustomAutocomplete
        label="Identify Department "
        options={departments}
        name="department"
        required={true}
        placeholder="Select Department"
        register={register}
        errors={errors}
        validation={globalValidations.department}
      />
      <CustomAutocomplete
        label="Assign Goal Manager"
        options={assignee}
        name="goalManager"
        required={false}
        register={register}
        placeholder="Assign To Me"
        errors={errors}
        validation={globalValidations.goalManager}
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
