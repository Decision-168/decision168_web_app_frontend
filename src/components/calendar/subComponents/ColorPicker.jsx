// ColorPicker.js
import React from "react";
import { GithubPicker } from "react-color";
import { styled } from "@mui/material";

const CustomGithubPicker = styled("div")({
  "& .github-picker": {
    height: "100px" /* Adjust the height as needed */,
    overflow: "scroll",
  },
});

const ColorPicker = ({ value, onChange }) => {
  return (
    <CustomGithubPicker>
      <GithubPicker color={value} onChange={(color) => onChange(color.hex)} />
    </CustomGithubPicker>
  );
};

export default ColorPicker;
