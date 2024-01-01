// //ColorPickerDropdown.jsx
import React from "react";
import { Select, MenuItem, FormControl, InputLabel, Box } from "@mui/material";
import ColorPicker from "./ColorPicker";

const ColorPickerDropdown = ({ value, onChange }) => {
  const handleChange = (color) => {
    onChange(color);
  };

  return (
    <Box sx={{ mt: "8px" }}>
      <FormControl fullWidth>
        <InputLabel id="color-picker-label">Choose a color</InputLabel>
        <Select
          labelId="color-picker-label"
          id="color-picker"
          value={value}
          onChange={(event) => {
            handleInpuChange(event.target.value);
          }}
          sx={{
            height: "37px",
            backgroundColor: value,
          }}
        >
          {/* ColorPicker as another selectable option */}
          <MenuItem>
            <ColorPicker value={value} onChange={handleChange} />
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default ColorPickerDropdown;
