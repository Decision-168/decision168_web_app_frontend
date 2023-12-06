import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";

export default function CustomSelect({ items, label, labelColor, required, handleChange, value, disabled }) {
  const theme = useTheme();

  return (
    <Box sx={{ minWidth: 120, textAlign: "left" }}>
      <InputLabel sx={{ fontSize: "14px", color: labelColor }}>
        {label}
        {required && <span style={{ color: theme.palette.error.main }}> *</span>}
      </InputLabel>
      <Select fullWidth id="demo-simple-select" value={value} onChange={handleChange} disabled={disabled}>
        {items.map((item, index) => (
          <MenuItem key={index} value={item.value} color="red" selected={true}>
            {item.text}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
