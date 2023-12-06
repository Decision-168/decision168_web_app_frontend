import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Box, InputLabel } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { getCountries } from "../../api/modules/dashboardModule";

export default function SelectTeamMember({
  required,
  SelectTeamMember,
  setSelectedMember,
  otherTeamMembers,
}) {
  const theme = useTheme();

  // Define custom CSS styles for the placeholder
  const placeholderStyles = {
    fontSize: "14px",
    color: theme.palette.secondary.dark,
  };

  const handleChange = (fieldName) => (event, value) => {
    console.log(value);
    setSelectedMember(value.reg_id);
  };

  return (
    <Box sx={{ textAlign: "left" }}>
      <InputLabel sx={{ fontSize: "14px" }}>
        Assign open work to other team member
        {required && <span style={{ color: theme.palette.error.main }}> *</span>}
      </InputLabel>
      <Autocomplete
        sx={{ marginTop: "8px", width: "100%" }}
        options={otherTeamMembers}
        value={SelectTeamMember}
        onChange={handleChange("memberName")}
        getOptionLabel={(option) => option.member_name}
        renderInput={(params) => <TextField {...params} placeholder="Assign Open Work.." />}
      />
    </Box>
  );
}
