import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { InputLabel } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function FilterSelectedOptions({
  label,
  labelColor,
  required,
  placeholder,
  items,
  onSelectionChange,
  getOptionLabelFn
}) {
  const theme = useTheme();

  const handleSelectionChange = (event, selectedOptions) => {
    // Pass the selected options to the parent component using the callback
    if (onSelectionChange) {
      onSelectionChange(selectedOptions);
    }
  };

// Check if items is not null and is an array with at least one element
// const defaultValues = Array.isArray(items) && items?.length > 1 ? [items[1]] : [];

  return (
    <Stack spacing={1} sx={{ width: "100%", height: "100%", textAlign: "left" }}>
      <InputLabel sx={{ fontSize: "14px", color: labelColor }}>
        {label}
        {required && <span style={{ color: theme.palette.error.main }}> *</span>}
      </InputLabel>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={items}
        getOptionLabel={getOptionLabelFn}
        // defaultValue={defaultValues}
        // filterSelectedOptions
        onChange={handleSelectionChange}
        renderInput={(params) => <TextField {...params} placeholder={placeholder} />}
      />
    </Stack>
   
  );
}
