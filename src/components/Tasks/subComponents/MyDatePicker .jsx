import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the CSS for the date picker
import { IconButton } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

// Function to format the date as YY/MM/DD
function formatDateAsYYMMDD(date) {
  const year = date.getFullYear().toString().slice(0);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function MyDatePicker() {
  const [startDate, setStartDate] = useState(new Date());

  const textFieldStyles = {
    "& .MuiInputBase-root": {
      border: "none", // Remove the border
    },
  };

  return (
    <div>
      <TextField
        variant="outlined"
        disabled
        fullWidth
        value={formatDateAsYYMMDD(startDate)} // Format the date in YY/MM/DD format
        sx={{ width: "155px", ...textFieldStyles }}
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
    </div>
  );
}

export default MyDatePicker;
