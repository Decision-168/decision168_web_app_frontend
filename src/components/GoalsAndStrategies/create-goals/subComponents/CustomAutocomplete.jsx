import React, { memo } from "react";

import {
  TextField,
  Grid,
  InputLabel,
  useTheme,
  Autocomplete,
} from "@mui/material";

const CustomAutocomplete = ({
  label,
  options,
  labelColor,
  required,
  validation,
  register,
  name,
  errors,
  placeholder,
}) => {
  const theme = useTheme();
  const inputProps = register(name, validation);
  // Define custom CSS styles for the placeholder
  const placeholderStyles = {
    fontSize: "12px",
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
        <Autocomplete
          options={options}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={placeholder}
              InputProps={{
                ...params.InputProps,
                // sx: {
                //   "&::placeholder": placeholderStyles,
                // },
              }}
            />
          )}
        />
      </Grid>
    </>
  );
};
export default memo(CustomAutocomplete);
