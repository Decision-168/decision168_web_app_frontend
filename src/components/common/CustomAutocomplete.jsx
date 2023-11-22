import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Box, InputLabel } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function CustomAutocomplete({ label, options, placeholder, required }) {
  const theme = useTheme();

  const [selectedCountryCode, setSelectedCountryCode] = React.useState(null);

  // Define custom CSS styles for the placeholder
  const placeholderStyles = {
    fontSize: "14px",
    color: theme.palette.secondary.dark,
  };

  const handleCountryCodeChange = (event, value) => {
    // Update the state with the selected country code
    setSelectedCountryCode(value);
  };

  console.log(selectedCountryCode);

  return (
    <Box sx={{ textAlign: "left" }}>
      <InputLabel sx={{ fontSize: "14px" }}>
        {label}
        {required && <span style={{ color: theme.palette.error.main }}> *</span>}
      </InputLabel>
      <Autocomplete sx={{ marginTop: "8px", width: "100%" }} options={options} getOptionLabel={(option) => option.country_name} renderInput={(params) => <TextField {...params} placeholder={label} onChange={handleCountryCodeChange} />} />
    </Box>
  );
}
