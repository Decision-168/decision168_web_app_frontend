// PortfolioPicker.js
import React, { useState } from "react";
import { TextField, MenuItem } from "@mui/material";

const PortfolioPicker = () => {
  const [portfolio, setPortfolio] = useState("select-portfolio");
  return (
    <TextField
      select
      name="selectPortfolio"
      fullWidth
      margin="normal"
      value={portfolio}
      onChange={(event) => setPortfolio(event.target.value)}
    >
      <MenuItem value="select-portfolio">Select Portfolio</MenuItem>
      <MenuItem value="Chain">Chain</MenuItem>
      <MenuItem value="Decision168">Decision168, Inc</MenuItem>
      <MenuItem value="medStarter">MedStarter</MenuItem>
      <MenuItem value="SamTech">SamTech</MenuItem>
      <MenuItem value="test1">test1</MenuItem>
      <MenuItem value="test2">test2</MenuItem>
      <MenuItem value="test3">test3</MenuItem>
      {/* Add more values as needed */}
    </TextField>
  );
};

export default PortfolioPicker;
