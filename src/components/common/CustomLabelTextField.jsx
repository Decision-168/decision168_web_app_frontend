import React from "react";
import { TextField, InputLabel, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function CustomLabelTextField({ name, label, placeholder, register, errors, validation, required }) {
  const theme = useTheme();

  //to style placeholder
  const inputProps = register(name, validation);
  // Define custom CSS styles for the placeholder
  const placeholderStyles = {
    fontSize: "14px",
    color: theme.palette.secondary.dark,
  };

  return (
    <Box sx={{ textAlign: "left" }}>
      <InputLabel sx={{ fontSize: "14px" }}>
        {label}
        {required && <span style={{ color: theme.palette.error.main }}>*</span>}
      </InputLabel>
      <TextField
        placeholder={placeholder}
        margin="dense"
        required
        fullWidth
        name={name}
        inputProps={{
          ...inputProps,
          sx: {
            "&::placeholder": placeholderStyles,
          
          },
        }}
    
        error={!!errors[name]}
        helperText={errors[name]?.message}
      />
    </Box>
  );
}
