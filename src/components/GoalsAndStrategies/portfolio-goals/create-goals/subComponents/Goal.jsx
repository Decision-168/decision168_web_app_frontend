import { Box, Button, DialogActions, DialogContent, Grid } from "@mui/material";
import React, { memo } from "react";
import CustomMultilineTextField from "../../../subComponents/CustomMultilineTextField";
import CustomAutocomplete from "../../../subComponents/CustomAutocomplete";
import FilterSelectedOptions from "../../../subComponents/FilterSelectedOptions";
import InviteMembers from "../../../subComponents/InviteMembers";
import Duration from "../../../subComponents/Duration";
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
  const CommonForm = ({}) => {
    return (
      <Grid container spacing={2} px={individual && 2}>
        <CustomLabelTextField
          label="Objective/Goal"
          name="Objective"
          required={true}
          placeholder="Enter Objective/Goal..."
        />
        <CustomAutocomplete
          label="Identify Department "
          options={departments}
          name="department"
          required={true}
          placeholder="Select Department"
        />
        <CustomAutocomplete
          label="Assign Goal Manager"
          options={assignee}
          name="goalManager"
          required={false}
          placeholder="Assign To Me"
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
