import React from "react";
import { MuiFileInput } from "mui-file-input";
import { useTheme } from "@mui/material/styles";
import { Box, InputLabel } from "@mui/material";

export default function CustomFileInput({ label, placeholder, multiple, required, value, handleFilesChange, name }) {
  const theme = useTheme();

  return (
    <Box sx={{ textAlign: "left" }}>
      <InputLabel sx={{ fontSize: "14px", color: "black", mb: 1 }}>
        {label}
        {required && <span style={{ color: theme.palette.error.main }}> *</span>}
      </InputLabel>
      <MuiFileInput
        name={name}
        fullWidth
        multiple={multiple}
        placeholder={placeholder}
        // error=""
        // helperText="helper"
        value={value}
        onChange={handleFilesChange}
      />
    </Box>
  );
}
