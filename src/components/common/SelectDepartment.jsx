import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Box, Grid, InputLabel } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function SelectDepartment({
  required,
  departments,
  formValues,
  setFormValues,
  moduleType
}) {
  const theme = useTheme();

  // Define custom CSS styles for the placeholder
  const placeholderStyles = {
    fontSize: "14px",
    color: theme.palette.secondary.dark,
  };

  const handleChange = (fieldName) => (event, value) => {
    setFormValues({
      ...formValues,
      [fieldName]: value.portfolio_dept_id,
    });
  };

  return (
    <>
      <Grid item xs={2} alignSelf={"center"}>
        <InputLabel sx={{ fontSize: "14px" }}>
          Department
          {required && (
            <span style={{ color: theme.palette.error.main }}> *</span>
          )}
        </InputLabel>
      </Grid>
      {
        moduleType === 'project' ?
        (
          <Grid item xs={10}>
            <Autocomplete
              sx={{ marginTop: "8px", width: "100%" }}
              options={departments}
              value={
                departments.find(
                  (option) => option.portfolio_dept_id === formValues.dept_id
                ) || null
              }
              onChange={handleChange("dept_id")}
              getOptionLabel={(option) => option.department}
              renderInput={(params) => (
                <TextField {...params} placeholder="Select Your Department" />
              )}
            />
          </Grid>
        ) : 
        (
          <Grid item xs={10}>
            <Autocomplete
              sx={{ marginTop: "8px", width: "100%" }}
              options={departments}
              value={
                departments.find(
                  (option) => option.portfolio_dept_id === formValues.gdept
                ) || null
              }
              onChange={handleChange("gdept")}
              getOptionLabel={(option) => option.department}
              renderInput={(params) => (
                <TextField {...params} placeholder="Select Your Department" />
              )}
            />
          </Grid>
        )
      }
    </>
  );
}
