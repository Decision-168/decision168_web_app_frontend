/* eslint-disable react/prop-types */
import { Box, MenuItem, Select } from "@mui/material";
import { useState } from "react";

const SelectBox = ({ TicketId, items, assignee }) => {
  const [selectedValues, setSelectedValues] = useState(assignee);

  const handleChange = (selectedValue) => {
    setSelectedValues(selectedValue);
  };

  return (
    <Box sx={{ minWidth: 120, textAlign: "left", maxWidth: 180 }}>
      <Select
        fullWidth
        id={`${TicketId}`}
        placeholder="Assign"
        value={selectedValues}
        onChange={(e) => handleChange(e.target.value)}
        sx={{
          height: "36px",
          fontSize: "13px",
          background: "white",
          color: "black",
          mt: 0,
        }}>
        <MenuItem value="" sx={{ fontSize: "13px" }}>
          Assign
        </MenuItem>
        {items.map((item, index) => (
          <MenuItem key={index} value={item.value} sx={{ fontSize: "13px" }}>
            {item.text}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default SelectBox;
