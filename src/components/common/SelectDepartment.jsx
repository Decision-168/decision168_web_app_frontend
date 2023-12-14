import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Box, InputLabel } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function SelectDepartment({
  required,
  SelectDepartment,
  setSelectedDepartment,
  departments,
}) {
  const theme = useTheme();

  // Define custom CSS styles for the placeholder
  const placeholderStyles = {
    fontSize: "14px",
    color: theme.palette.secondary.dark,
  };

  const handleChange = (fieldName) => (event, value) => {
    console.log(value);
    setSelectedDepartment(value.depId);
  };

  return (
    <Box sx={{ textAlign: "left" }}>
      <InputLabel sx={{ fontSize: "14px" }}>
        Select Department
        {required && <span style={{ color: theme.palette.error.main }}> *</span>}
      </InputLabel>
      <Autocomplete
        sx={{ marginTop: "8px", width: "100%" }}
        options={departments}
        value={SelectDepartment}
        onChange={handleChange("department")}
        getOptionLabel={(option) => option.department}
        renderInput={(params) => <TextField {...params} placeholder="Select Your department" />}
      />
    </Box>
  );
}
