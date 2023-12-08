import React from "react";
import { TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function CustomTextField({
  name,
  placeholder,
  register,
  errors,
  validation,
  defaultValue,
  value,
  onChange,
}) {
  const theme = useTheme();

  //to style placeholder
  const inputProps = register(name, validation);
  // Define custom CSS styles for the placeholder
  const placeholderStyles = {
    fontSize: "14px",
    color: theme.palette.secondary.dark,
  };

  const handleChange = (e) => {
    // Call the external onChange handler if provided
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <TextField
      placeholder={placeholder}
      required
      fullWidth
      name={name}
      value={value} // Use controlled value
      defaultValue={defaultValue}
      onChange={handleChange} // Handle change event
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
