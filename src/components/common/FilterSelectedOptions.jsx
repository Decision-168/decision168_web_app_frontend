import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { InputLabel } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function FilterSelectedOptions({ label, labelColor, required, placeholder, items }) {
  const theme = useTheme();
  return (
    <Stack spacing={1} sx={{ width: "100%", height: "100%", textAlign: "left"}}>
      <InputLabel sx={{ fontSize: "14px", color: labelColor }}>
        {label}
        {required && <span style={{ color: theme.palette.error.main }}> *</span>}
      </InputLabel>
      <Autocomplete  multiple id="tags-outlined" options={items} getOptionLabel={(option) => option.title} defaultValue={[items[1]]} filterSelectedOptions renderInput={(params) => <TextField {...params} placeholder={placeholder} />} />
    </Stack>
  );
}
