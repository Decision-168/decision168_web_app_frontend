import React from "react";
import { MuiFileInput } from "mui-file-input";
import { useTheme } from "@mui/material/styles";
import { Box, InputLabel } from "@mui/material";

export default function FileUpload({
  label,
  placeholder,
  multiple,
  required,
  value,
  handleFilesChange,
  name,
}) {
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex", flexDirection: "row", textAlign: "left" }}>
      <InputLabel
        sx={{
          fontSize: "14px",
          color: "black",
          p: 1,
          mx: "8px",
          backgroundColor: theme.palette.secondary.light,
          borderRadius: "5px",
        }}
      >
        {label}
        {required && (
          <span style={{ color: theme.palette.error.main }}> *</span>
        )}
      </InputLabel>
      <MuiFileInput
        name={name}
        multiple={multiple}
        placeholder={placeholder}
        value={value}
        onChange={handleFilesChange}
        sx={{ width: "70%" }}
      />
    </Box>
  );
}
