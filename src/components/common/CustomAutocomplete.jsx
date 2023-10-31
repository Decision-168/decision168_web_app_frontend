import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Box, InputLabel } from "@mui/material";

export default function CustomAutocomplete({ label, options }) {
  return (
    <Box sx={{ textAlign: "left" }}>
      <InputLabel sx={{ fontSize: "14px" }}>{label}</InputLabel>
      <Autocomplete sx={{ marginTop: "8px", width: "100%" }} options={options} renderInput={(params) => <TextField {...params} />} />
    </Box>
  );
}
