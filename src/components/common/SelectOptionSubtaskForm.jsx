import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Box,InputLabel } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function SelectOptionSubtaskForm({
  label,
  required,
  field,
  idKey,
  getOptionLabel,
  staticOptions,
  formValues,
  setFormValues,
  isDisabled,
  index,
}) {
  const theme = useTheme();
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchStaticOptions = async () => {
      setOptions(staticOptions);
    };

    fetchStaticOptions();
  }, [staticOptions]);

  const handleOptionChange = (fieldName, index) => async (event, value) => {
    const updatedValues = [...formValues];
    updatedValues[index][fieldName] = value ? value[idKey] : null;
    setFormValues(updatedValues);
  };

  return (
    <Box sx={{ textAlign: "left" }}>
      <InputLabel sx={{ fontSize: "14px" }}>
        {label}
        {required && <span style={{ color: theme.palette.error.main }}> *</span>}
      </InputLabel>

      <Autocomplete
        sx={{ marginTop: "8px", width: "100%" }}
        options={options}
        clearOnBlur={false}
        disabled={isDisabled}
        value={options?.find((option) => option[idKey] === formValues[index][field]) || null}
        onChange={handleOptionChange(field, index)}
        getOptionLabel={(option) => getOptionLabel(option)}
        renderInput={(params) => <TextField {...params} placeholder={`Select Your ${label}`} />}
      />
    </Box>
  );
}
