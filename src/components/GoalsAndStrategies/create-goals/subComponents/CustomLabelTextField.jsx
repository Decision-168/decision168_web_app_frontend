import React from "react";
import { TextField, InputLabel, Box, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { display } from "@mui/system";

export default function CustomLabelTextField({
  name,
  label,
  labelColor,
  placeholder,
  register,
  errors,
  validation,
  required,
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
    <>
      <Grid item xs={12} lg={2} alignSelf={"center"}>
        <InputLabel sx={{ fontSize: "14px", color: labelColor }}>
          {label}
          {required && (
            <span style={{ color: theme.palette.error.main }}> *</span>
          )}
        </InputLabel>
      </Grid>
      <Grid item xs={12} lg={10}>
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
      </Grid>
    </>
  );
}
