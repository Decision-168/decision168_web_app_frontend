import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import LinkIcon from "@mui/icons-material/Link";

const CustomLinkField = ({ value, onChange, placeholder, ...props }) => {
  return (
    <TextField
      {...props}
      value={value}
      onChange={onChange}
      fullWidth
      placeholder={placeholder}
      margin="dense"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <LinkIcon style={{ fontSize: "1.2rem " }} />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default CustomLinkField;
