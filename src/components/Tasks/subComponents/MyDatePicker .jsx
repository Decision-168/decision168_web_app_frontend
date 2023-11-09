import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the CSS for the date picker
import { Box, IconButton, InputLabel } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useTheme } from "@mui/material/styles";

// Function to format the date as YY/MM/DD
function formatDateAsYYMMDD(date) {
  const year = date.getFullYear().toString().slice(0);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function MyDatePicker({ label, required, sizeWidth }) {
  const theme = useTheme();
  const [startDate, setStartDate] = useState(new Date());

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
        value={formatDateAsYYMMDD(startDate)} // Format the date in YY/MM/DD format
        sx={{ width: sizeWidth, ...textFieldStyles }}
        InputProps={{
          endAdornment: (
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              customInput={
                <IconButton>
                  <CalendarMonthIcon />
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
