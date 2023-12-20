import React from "react";
import { MuiFileInput } from "mui-file-input";
import { useTheme } from "@mui/material/styles";
import { Box, InputLabel, Typography } from "@mui/material";

export default function CustomFileInput({ label, placeholder, multiple, required, value, handleFilesChange, name }) {
  const theme = useTheme();

  // const File1 = new File(['file contents'], 'example-file-1.txt', { type: 'text/plain' });
  // const File2 = new File(['file contents'], 'example-file-2.jpg', { type: 'image/jpeg' });


  const renderSelectedFiles = () => {
    if (value && value.length > 1) {
      return (
        <Typography sx={{ color: "black", mt: 1, fontSize:"0.7rem" }}>
          <span style={{ fontWeight: 'bold', fontSize: '0.8rem' }}>Selected Files: </span>
          {value.map((f, index) => (
            <span key={index}>
              {f.name}
              {index < value.length - 1 && ' , '}
            </span>
          ))}
        </Typography>
      );
    }
    return null;
  };

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
        value={value}
        onChange={handleFilesChange}
      />
       {renderSelectedFiles()}
    </Box>
  );
}
