import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Box, InputLabel } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { getCountries } from "../../api/modules/dashboardModule";

export default function SelectIcon({ required, index, fields, setFields }) {
  const theme = useTheme();

  const data = [
    { icon: "YouTube", link: "https://www.youtube.com/" },
    { icon: "Facebook", link: "https://www.facebook.com/" },
    { icon: "LinkedIn", link: "https://www.linkedin.com/" },
    { icon: "Instagram", link: "https://www.instagram.com/" },
  ];

  // Define custom CSS styles for the placeholder
  const placeholderStyles = {
    fontSize: "14px",
    color: theme.palette.secondary.dark,
  };

  const handleChange = (fieldName, index) => (event, value) => {
    const updatedIcons = [...fields];
    updatedIcons[index].social_media_icon = value.icon;
    setFields(updatedIcons); // Assuming you have a state variable 'fields' and a function 'setFields' to update it.
  };

  return (
    <Box sx={{ textAlign: "left" }}>
      <InputLabel sx={{ fontSize: "14px" }}>
        Select Icon
        {required && <span style={{ color: theme.palette.error.main }}> *</span>}
      </InputLabel>
      <Autocomplete
        sx={{ marginTop: "8px", width: "100%" }}
        clearOnBlur={false}
        options={data}
        value={data.find((option) => option.icon === fields[index].social_media_icon) || null}
        onChange={handleChange("social_media_icon", index)}
        getOptionLabel={(option) => option.icon}
        renderInput={(params) => <TextField {...params} placeholder="Select icon" />}
      />
    </Box>
  );
}
