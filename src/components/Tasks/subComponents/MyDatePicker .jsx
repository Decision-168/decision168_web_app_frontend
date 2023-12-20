import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the CSS for the date picker
import { Box, IconButton, InputLabel } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useTheme } from "@mui/material/styles";

function MyDatePicker({ label, required, sizeWidth, showBorder,minDate, maxDate, value, onChange, isDisabled }) {
  const theme = useTheme();
  const [userInteracted, setUserInteracted] = useState(false);
  const [startDate, setStartDate] = useState(value || new Date()); // Use the provided value or initialize a new date

  const handleDateChange = (date) => {
    setStartDate(date);
    setUserInteracted(true);
    if (onChange) {
      onChange(date);
      console.log("New selected value:", date);
    }
  };

  useEffect(() => {
    // Update the date when the value prop changes only if the user hasn't interacted
    if (!userInteracted) {
      setStartDate(value || new Date());
    }
  }, [value, userInteracted]);

  const textFieldStyles = {
    "& .MuiInputBase-root": {
      border: "none", // Remove the border
    },
  };

  return (
    <Box sx={{ textAlign: "left" }}>
      <InputLabel sx={{ fontSize: "14px", color: "black", mb: 1 }}>
        {label}
        {required && <span style={{ color: theme.palette.error.main }}> *</span>}
      </InputLabel>
      <TextField
        variant="outlined"
        disabled
        fullWidth
        value={startDate.toISOString().split("T")[0]} // Format the date in YY/MM/DD format
        sx={{
          width: sizeWidth,
          "& .MuiOutlinedInput-notchedOutline": {
            borderWidth: showBorder ? "1px" : "0px",
          },
          "& .MuiOutlinedInput-root": {
            paddingRight: "0px",
          },
          ...textFieldStyles,
        }}
        InputProps={{
          endAdornment: (
            <DatePicker
              selected={startDate}
              onChange={handleDateChange}
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              dateFormat="yyyy-MM-dd" // Set the date format
              minDate={minDate} // Set the minimum date
              maxDate={maxDate} // Set the maximum date
              disabled={isDisabled} 
              customInput={
                <IconButton size="small" sx={{ fontSize: "1.2rem" }}>
                  <CalendarMonthIcon fontSize="inherit" />
                </IconButton>
              }
            />
          ),
        }}
      />
    </Box>
  );
}

export default MyDatePicker;
