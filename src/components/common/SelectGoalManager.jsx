import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Box, Grid, InputLabel } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function SelectGoalManager({
  required,
  managers,
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
      [fieldName]: value.member_reg_id,
    });
  };

  return (
    <>
      {moduleType == "project" ? (
        <>
          <Grid item xs={12} sm={2} md={2} lg={2} alignSelf={"center"}>
            <InputLabel sx={{ fontSize: "14px", textAlign: "start" }}>
              Project Manager
            </InputLabel>
          </Grid>
          <Grid item xs={12} sm={10} md={10} lg={10}>
            <Autocomplete
              sx={{ marginTop: "8px", width: "100%" }}
              options={managers}
              value={
                managers.find(
                  (option) => option.member_reg_id === formValues.pmanager
                ) || null
              }
              onChange={handleChange("pmanager")}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField {...params} placeholder="Assign Project Manager" />
              )}
            />
          </Grid>
        </>
      ) : (
        <>
          <Grid item xs={2} alignSelf={"center"}>
            <InputLabel sx={{ fontSize: "14px" }}>Goal Manager</InputLabel>
          </Grid>
          <Grid item xs={10}>
            <Autocomplete
              sx={{ marginTop: "8px", width: "100%" }}
              options={managers}
              value={
                managers.find(
                  (option) => option.member_reg_id === formValues.gmanager
                ) || null
              }
              onChange={handleChange("gmanager")}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField {...params} placeholder="Assign Goal Manager" />
              )}
            />
          </Grid>
        </>
      )}
    </>
  );
}
