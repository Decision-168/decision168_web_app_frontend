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
  placeholder,
}) => {
  const theme = useTheme();

  return (
    <>
      <Grid item xs={12} sm={2} md={2} lg={2} alignSelf={"center"}>
        <InputLabel
          sx={{ fontSize: "14px", color: labelColor, textAlign: "start" }}
        >
          {label}
          {required && (
            <span style={{ color: theme.palette.error.main }}> *</span>
          )}
        </InputLabel>
      </Grid>
      <Grid item xs={12} sm={10} md={10} lg={10}>
        <Autocomplete
          options={options}
          renderInput={(params) => (
            <TextField {...params} placeholder={placeholder} />
          )}
        />
      </Grid>
    </>
  );
};
export default memo(CustomAutocomplete);
