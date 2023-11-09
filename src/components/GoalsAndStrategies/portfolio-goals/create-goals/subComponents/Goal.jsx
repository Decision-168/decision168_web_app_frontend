import { Box, Button, DialogActions, DialogContent, Grid } from "@mui/material";
import React, { memo } from "react";
import { useForm } from "react-hook-form";
import CustomMultilineTextField from "../../../subComponents/CustomMultilineTextField";
import CustomAutocomplete from "../../../subComponents/CustomAutocomplete";
import FilterSelectedOptions from "../../../subComponents/FilterSelectedOptions";
import InviteMembers from "../../../subComponents/InviteMembers";
import Duration from "../../../subComponents/Duration";
import { globalValidations } from "../../../../../utils/GlobalValidation";
import CustomLabelTextField from "../../../subComponents/CustomLabelTextField";
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
const member = [
  { title: "Afrin Syed" },
  { title: "Amin Syed" },
  { title: "Don Mehmood" },
];
const Goal = ({ individual }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const CommonForm = ({}) => {
    return (
      <Grid container spacing={2} px={individual && 2}>
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
        <FilterSelectedOptions
          label="Add Team Members"
          labelColor=""
          required={false}
          placeholder="Add Team Members..."
          items={member}
        />
        <InviteMembers />
        <Duration label="Duration " labelColor="" required={true} />
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
  return (
    <>
      {individual ? (
        <DialogContent dividers>
          <CommonForm />
        </DialogContent>
      ) : (
        <CommonForm />
      )}

      {individual && (
        <DialogActions>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "end",
              pt: 1,
              width: "100%",
            }}
          >
            <Box sx={{ flex: "1 1 auto" }} />
            <Button variant="contained" size="small">
              Save Changes
            </Button>
          </Box>
        </DialogActions>
      )}
    </>
  );
};

export default memo(Goal);
