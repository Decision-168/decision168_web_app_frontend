import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Box, InputLabel } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function CustomAutocomplete({
  label,
  placeholder,
  options,
  getOptionLabelFn,
  required,
  formValues,
  setFormValues,
}) {
  const theme = useTheme();

  // Define custom CSS styles for the placeholder
  const placeholderStyles = {
    fontSize: "14px",
    color: theme.palette.secondary.dark,
  };

  const handleChange = (fieldName) => (event, value) => {
    setFormValues({
      ...formValues,
      [fieldName]: value.country_code,
    });
  };

  return (
    <Box sx={{ textAlign: "left" }}>
      <InputLabel sx={{ fontSize: "14px" }}>
        {label}
        {required && <span style={{ color: theme.palette.error.main }}> *</span>}
      </InputLabel>
      <Autocomplete
        sx={{ marginTop: "8px", width: "100%" }}
        options={options}
        // value={options.find((option) => option.country_code === formValues.country) || null}
        onChange={handleChange("country")}
        getOptionLabel={getOptionLabelFn}
        renderInput={(params) => <TextField {...params} placeholder={placeholder} />}
      />
    </Box>
  );
}
