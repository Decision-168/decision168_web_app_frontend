import React from "react";
import { TextField, InputLabel, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function CustomMultilineTextField({
  name,
  label,
  labelColor,
  placeholder,
  required,
  value,
  onChange,
}) {
  const theme = useTheme();

  // Define custom CSS styles for the placeholder
  const placeholderStyles = {
    fontSize: "14px",
    color: theme.palette.secondary.dark,
  };

  return (
    <Box sx={{ textAlign: "left", height: "150px" }}>
      <InputLabel sx={{ fontSize: "14px", color: labelColor }}>
        {label}
        {required && (
          <span style={{ color: theme.palette.error.main }}> *</span>
        )}
      </InputLabel>
      <TextField
        id="outlined-multiline-static"
        sx={{
          "& .MuiOutlinedInput-root": {
            padding: "6px 0",
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
          sx: {
            "&::placeholder": placeholderStyles,
          },
        }}
        value={value}
        onChange={onChange}
      />
    </Box>
  );
}
