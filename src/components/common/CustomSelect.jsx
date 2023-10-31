import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";


export default function CustomSelect({ items, label, labelColor, required }) {
    const theme = useTheme();
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120, textAlign: "left" }}>
      <InputLabel sx={{ fontSize: "14px", color: labelColor }}>{label}
      {required && <span style={{ color: theme.palette.error.main }}> *</span>}</InputLabel>
      <Select fullWidth id="demo-simple-select" value={age} onChange={handleChange}>
        {items.map((item, index) => (
          <MenuItem key={index} value={item.value} color="red" selected={item.selected}>
            {item.text}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
