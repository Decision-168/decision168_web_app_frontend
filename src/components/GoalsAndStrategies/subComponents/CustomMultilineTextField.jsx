import React from "react";
import { TextField, InputLabel, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function CustomMultilineTextField({
  name,
  label,
  labelColor,
  placeholder,
  required,
  value,
  onChange
}) {
  const theme = useTheme();

  const handleChange = (event) => {
    // Forward the event to the parent component
    if (onChange) {
      onChange(event);
    }
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
          sx={{
            "& .MuiOutlinedInput-input": {
              padding: "0px !important",
            },
          }}
          id="outlined-multiline-static"
          multiline
          rows={3}
          defaultValue=""
          placeholder={placeholder}
          margin="dense"
          required
          fullWidth
          name={name}
          value={value} 
          onChange={handleChange}
        />
      </Grid>
    </>
  );
}
