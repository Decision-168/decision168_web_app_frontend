import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Box, InputLabel } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { getCountries } from "../../api/modules/dashboardModule";

export default function SelectCountry({ required, formValues, setFormValues }) {
  const theme = useTheme();
  const [countries, setCountries] = useState([]);

  const fetchCountries = async () => {
    try {
      const response = await getCountries();
      setCountries(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  // Define custom CSS styles for the placeholder
  const placeholderStyles = {
    fontSize: "14px",
    color: theme.palette.secondary.dark,
  };

  const handleChange = (fieldName) => (event, value) => {
    setFormValues({
      ...formValues,
      [fieldName]: value.country_code,
    });
  };

  return (
    <Box sx={{ textAlign: "left" }}>
      <InputLabel sx={{ fontSize: "14px" }}>
        Country
        {required && <span style={{ color: theme.palette.error.main }}> *</span>}
      </InputLabel>
      <Autocomplete
        sx={{ marginTop: "8px", width: "100%" }}
        options={countries}
        value={countries.find((option) => option.country_code === formValues.country) || null}
        onChange={handleChange("country")}
        getOptionLabel={(option) => option.country_name}
        renderInput={(params) => <TextField {...params} placeholder="Select Your Country" />}
      />
    </Box>
  );
}
