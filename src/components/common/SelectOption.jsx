import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Box, Grid, InputLabel } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function SelectOption({
  label,
  required,
  field,
  idKey,
  getOptionLabel,
  dynamicOptions, // Boolean flag to determine if options should be loaded dynamically
  loadOptions, // Function to load options from API
  staticOptions, // Static options to be used when dynamicOptions is false
  formValues,
  setFormValues,
}) {
  const theme = useTheme();
  const [options, setOptions] = useState([]);
  const handleChange = (fieldName) => async (event, value) => {
    setFormValues({
      ...formValues,
      [fieldName]: value ? value[idKey] : null,
    });
  };

  useEffect(() => {
    const fetchOptions = async () => {
      // Call the API to get options
      const apiOptions = await loadOptions();
      setOptions(apiOptions);
    };

    // Load options dynamically only if dynamicOptions is true
    if (dynamicOptions) {
      fetchOptions();
    } else {
      // Use static options
      setOptions(staticOptions);
    }
  }, [dynamicOptions, loadOptions, staticOptions]);

  return (
    <>
      <Grid item xs={2} alignSelf={"center"}>
        <InputLabel sx={{ fontSize: "14px" }}>
          {label}
          {required && <span style={{ color: theme.palette.error.main }}> *</span>}
        </InputLabel>
      </Grid>
      <Grid item xs={10}>
        <Autocomplete
          sx={{ marginTop: "8px", width: "100%" }}
          options={options}
          value={options.find((option) => option[idKey] === formValues[field]) || null}
          onChange={handleChange(field)}
          getOptionLabel={(option) => getOptionLabel(option)}
          renderInput={(params) => <TextField {...params} placeholder={`Select Your ${label}`} />}
        />
      </Grid>
    </>
  );
}
