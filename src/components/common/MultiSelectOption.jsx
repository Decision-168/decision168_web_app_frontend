import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Box, InputLabel } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function MultiSelectOption({
  label,
  required,
  field,
  idKey,
  getOptionLabel,
  dynamicOptions,
  loadOptions,
  loadOptionsParams,
  staticOptions,
  formValues,
  setFormValues,
  isDisabled,
}) {
  const theme = useTheme();
  const [options, setOptions] = useState([]);

  const handleChange = (fieldName) => (event, values) => {

    setFormValues({
      ...formValues,
      [fieldName]: values.map((value) => value[idKey]),
    });
  };


  useEffect(() => {
    const fetchOptions = async () => {
      const apiOptions = await loadOptions(loadOptionsParams);
      setOptions(apiOptions);
    };

    if (dynamicOptions) {
      fetchOptions();
    } else {
      setOptions(staticOptions);
    }
  }, [dynamicOptions, loadOptions, loadOptionsParams, staticOptions]);

  // Filter out selected options from the available options
  const filteredOptions = options.filter((option) => !formValues[field]?.includes(option[idKey]));

  return (
    <Box sx={{ textAlign: "left" }}>
      <InputLabel sx={{ fontSize: "14px" }}>
        {label}
        {required && <span style={{ color: theme.palette.error.main }}> *</span>}
      </InputLabel>

      <Autocomplete
        multiple
        sx={{ marginTop: "8px", width: "100%" }}
        options={filteredOptions}
        disabled={isDisabled}
        value={options.filter((option) => formValues[field]?.includes(option[idKey])) || []}
        onChange={handleChange(field)}
        getOptionLabel={(option) => getOptionLabel(option)}
        renderInput={(params) => <TextField {...params} placeholder={`Select ${label}`} />}
      />
    </Box>
  );
}
