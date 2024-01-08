import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const CustomLocationField = ({ value, onChange, placeholder, ...props }) => {
  const handleInputChange = (event) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <TextField
      {...props}
      value={value}
      onChange={handleInputChange}
      fullWidth
      placeholder={placeholder}
      margin="dense"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <LocationOnIcon style={{ fontSize: "1.2rem "}} /> 
          </InputAdornment>
        ),
      }}
    />
  );
};

export default CustomLocationField;
