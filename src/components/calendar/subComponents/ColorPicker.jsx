// ColorPicker.js
import React from "react";
import { GithubPicker } from "react-color";
import { styled } from "@mui/material";

const CustomGithubPicker = styled("div")({
  "& .github-picker": {
    height: "100px",
    width:"100%", 
    // overflow: "scroll",
  },
});

const ColorPicker = ({ value, onChange }) => {
  return (
    <CustomGithubPicker>
      <GithubPicker color={value} onChange={(color) => onChange(color.hex)}  style={{
        // Add your custom styles here
        border: '1px solid #2196F3', // Example border color
        borderRadius: '4px',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        // Add more styles as needed
      }}/>
    </CustomGithubPicker>
  );
};

export default ColorPicker;
