import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Box, InputLabel } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function CustomAutocomplete({ label, placeholder, options, getOptionLabelFn, required, handleOptionChange, ...props }) {
  const theme = useTheme();

  // Define custom CSS styles for the placeholder
  const placeholderStyles = {
    fontSize: "14px",
    color: theme.palette.secondary.dark,
  };

  return (
    <Box sx={{ textAlign: "left" }}>
      <InputLabel sx={{ fontSize: "14px" }}>
        {label}
        {required && <span style={{ color: theme.palette.error.main }}> *</span>}
      </InputLabel>
      <Autocomplete
        onChange={(event, value) => handleOptionChange(event, value)}
        sx={{ marginTop: "8px", width: "100%" }}
        options={options}
        getOptionLabel={getOptionLabelFn}
        renderInput={(params) => <TextField {...params} placeholder={placeholder}  />}
        {...props} // Pass additional props to Autocomplete
      />
    </Box>
  );
}
