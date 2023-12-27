import React from "react";
import { MuiFileInput } from "mui-file-input";
import { useTheme } from "@mui/material/styles";
import { Grid, InputLabel } from "@mui/material";
const AttachedFile = ({
  label,
  placeholder,
  multiple,
  required,
  value,
  handleFilesChange,
  name,
}) => {
  const theme = useTheme();
  return (
    <>
      <Grid item xs={12} sm={2} md={2} lg={2} alignSelf={"center"}>
        <InputLabel sx={{ fontSize: "14px", mb: 1, textAlign: "start" }}>
          {label}
          {required && (
            <span style={{ color: theme.palette.error.main }}> *</span>
          )}
        </InputLabel>
      </Grid>
      <Grid item xs={12} sm={10} md={10} lg={10}>
        <MuiFileInput
          name={name}
          fullWidth
          multiple={multiple}
          placeholder={placeholder}
          // error=""
          // helperText="helper"
          value={value}
          onChange={handleFilesChange}
          sx={{
            "& span.MuiFileInput-placeholder": {
              fontSize: 13,
              color: "#9F9F9F",
              fontWeight: "100",
            },
          }}
        />
      </Grid>
    </>
  );
};

export default AttachedFile;
