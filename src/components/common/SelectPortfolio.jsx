import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Box, Grid, InputLabel } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function SelectPortfolio({
  required,
  portfolios,
  formValues,
  setFormValues,
  moduleType,
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
      [fieldName]: value.portfolio_id,
    });
  };

  return (
    <>
      <Grid item xs={12} sm={2} md={2} lg={2} alignSelf={"center"}>
        <InputLabel sx={{ fontSize: "14px", textAlign: "start" }}>
          Portfolio
          {required && (
            <span style={{ color: theme.palette.error.main }}> *</span>
          )}
        </InputLabel>
      </Grid>
      {moduleType === "project" ? (
        <Grid item xs={12} sm={10} md={10} lg={10}>
          <Autocomplete
            sx={{ marginTop: "8px", width: "100%" }}
            options={portfolios}
            value={
              portfolios.find(
                (option) => option.portfolio_id === formValues.portfolio_id
              ) || null
            }
            onChange={handleChange("portfolio_id")}
            getOptionLabel={(option) =>
              option.portfolio_user == "company"
                ? option.portfolio_name
                : `${option.portfolio_name} ${option.portfolio_lname}`
            }
            renderInput={(params) => (
              <TextField {...params} placeholder="Select Your Portfolio" />
            )}
          />
        </Grid>
      ) : (
        <Grid item xs={10}>
          <Autocomplete
            sx={{ marginTop: "8px", width: "100%" }}
            options={portfolios}
            value={
              portfolios.find(
                (option) => option.portfolio_id === formValues.portfolio_id
              ) || null
            }
            onChange={handleChange("portfolio_id")}
            getOptionLabel={(option) => option.portfolio_name}
            renderInput={(params) => (
              <TextField {...params} placeholder="Select Your Portfolio" />
            )}
          />
        </Grid>
      )}
    </>
  );
}
