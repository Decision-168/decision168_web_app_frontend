import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the CSS for the date picker
import { Box, IconButton, InputLabel } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useTheme } from "@mui/material/styles";

// Function to format the date as YY/MM/DD
// function formatDateAsYYMMDD(date) {
//   const year = date.getFullYear().toString().slice(0);
//   const month = (date.getMonth() + 1).toString().padStart(2, "0");
//   const day = date.getDate().toString().padStart(2, "0");
//   return `${year}-${month}-${day}`;
// }

// ... (your imports)

function MyDatePicker({ label, required, sizeWidth, showBorder, value, onChange }) {
  const theme = useTheme();
  const [userInteracted, setUserInteracted] = useState(false);
  const [startDate, setStartDate] = useState(value || new Date()); // Use the provided value or initialize a new date

  const handleDateChange = (date) => {
    setStartDate(date);
    setUserInteracted(true);
    if (onChange) {
      onChange(date);
      console.log('New selected value:', date);
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
        value={startDate.toISOString().split('T')[0]} // Format the date in YY/MM/DD format
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
              customInput={<CalendarMonthIcon sx={{ width: "30px", height: "30px", pr: 1, pt: 1, cursor: "pointer" }} />}
            />
          ),
        }}
      />
    </Box>
  );
}

export default MyDatePicker;
