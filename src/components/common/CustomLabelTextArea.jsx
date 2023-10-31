import React from "react";
import { TextareaAutosize, InputLabel, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function CustomLabelTextArea({ name, label, labelColor, placeholder, register, errors, validation, required }) {
  const theme = useTheme();
  const inputProps = register(name, validation);
  // Define custom CSS styles for the placeholder
  const placeholderStyles = {
    fontSize: "14px",
    color: theme.palette.secondary.dark,
  };

  const textAreaStyles = {
    width: "100%",
    padding: "8px",
    fontFamily: "IBM Plex Sans, sans-serif",
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: "4px",
    overflowX: "hidden", // Prevent horizontal overflow
    resize: "vertical", // Allow vertical resizing, prevent horizontal
    marginTop: "8px",
    "&::placeholder": {
      fontSize: "14px",
      color: theme.palette.secondary.dark,
    },
    "&:focus": {
      borderColor: theme.palette.primary.main, // Change border color on focus
    },
  };

  return (
    <Box sx={{ textAlign: "left" }}>
      <InputLabel sx={{ fontSize: "14px", color: labelColor }}>
        {label}

        {required && <span style={{ color: theme.palette.error.main }}> *</span>}
      </InputLabel>
      <TextareaAutosize
        // {...register(name, validation)}
        placeholder={placeholder}
        minRows={3}
        style={textAreaStyles}
        name={name}
      />
      {errors[name] && <span style={{ color: theme.palette.error.main }}>{errors[name].message}</span>}
    </Box>
  );
}
