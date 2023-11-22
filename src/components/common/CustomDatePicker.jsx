import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Box, IconButton, InputLabel } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useTheme } from "@mui/material/styles";
import moment from "moment-timezone";

function CustomDatePicker({ label, required, onChange, defaultDate }) {
  const theme = useTheme();

  const [startDate, setStartDate] = useState(new Date());

  const textFieldStyles = {
    "& .MuiInputBase-root": {
      border: "none",
    },
  };

  const handleDateChange = (date) => {
    setStartDate(date);
    if (onChange) {
      onChange(date);
    }
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
        value={moment(startDate).format("YYYY-MM-DD")}
        sx={{
          width: "100%",
          "& .MuiOutlinedInput-notchedOutline": {
            borderWidth: "1px",
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
              onChange={handleDateChange} // Use the custom handler
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

export default CustomDatePicker;
