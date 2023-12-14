import React from "react";
import { TextField, InputLabel, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function CustomLabelTextField({
  name,
  label,
  labelColor,
  placeholder,
  required,
  value,
  onChange,
}) {
   const theme = useTheme();

   // //to style placeholder
   // const inputProps = register(name, validation);
   // Define custom CSS styles for the placeholder
   const placeholderStyles = {
     fontSize: "14px",
     color: theme.palette.secondary.dark,
   };
  return (
    <>
      <Grid item xs={2} alignSelf={"center"}>
        <InputLabel sx={{ fontSize: "14px", color: labelColor }}>
          {label}
          {required && (
            <span style={{ color: theme.palette.error.main }}> *</span>
          )}
        </InputLabel>
      </Grid>
      <Grid item xs={10}>
        <TextField
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
      </Grid>
    </>
  );
}
