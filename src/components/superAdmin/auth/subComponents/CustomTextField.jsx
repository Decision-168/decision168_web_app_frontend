import React from "react";
import { TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function CustomTextField({
  name,
  placeholder,
  register,
  errors,
  validation,
}) {
  const theme = useTheme();

  //to style placeholder
  const inputProps = register(name, validation);
  // Define custom CSS styles for the placeholder
  const placeholderStyles = {
    fontSize: "14px",
    color: theme.palette.secondary.dark,
  };

  return (
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
  );
}
