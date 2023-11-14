import React from "react";
import { TextField, InputLabel, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function CustomMultilineTextField({ name, label, labelColor, placeholder, register, errors, validation, required }) {
  const theme = useTheme();

  //to style placeholder
  const inputProps = register(name, validation);
  // Define custom CSS styles for the placeholder
  const placeholderStyles = {
    fontSize: "14px",
    color: theme.palette.secondary.dark,
  };

  return (
    <Box sx={{ textAlign: "left", height: "170px" }}>
      <InputLabel sx={{ fontSize: "14px", color: labelColor }}>
        {label}
        {required && <span style={{ color: theme.palette.error.main }}> *</span>}
      </InputLabel>
      <TextField
        id="outlined-multiline-static"
        sx={{
          "& .MuiOutlinedInput-root": {
            padding:"6px 0",
          },
        }}
        multiline
        rows={4}
        defaultValue=""
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
