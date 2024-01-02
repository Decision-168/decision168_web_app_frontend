/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";

export default function CustomSelect({ items, label, labelColor, required, handleChange, value, background }) {
  const theme = useTheme();

  return (
    <Box sx={{ minWidth: 120, textAlign: "left" }}>
      <InputLabel sx={{ fontSize: "14px", color: labelColor }}>
        {label}
        {required && <span style={{ color: theme.palette.error.main }}> *</span>}
      </InputLabel>
      <Select
        fullWidth
        id="demo-simple-select"
        value={value}
        onChange={handleChange}
        sx={{ height: "36px", fontSize: "13px", background: background && "#f1b44c", color: background && "#fff", mt: 0 }}>
        {items.map((item, index) => (
          <MenuItem key={index} value={item.value} color="#0006" selected={true} sx={{ fontSize: "13px" }}>
            {item.text}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
