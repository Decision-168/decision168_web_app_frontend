import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Box, IconButton, InputLabel } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useTheme } from "@mui/material/styles";
import moment from "moment";

function CustomDatePicker({ label, required, value, onChange }) {
  const theme = useTheme();
  const [startDate, setStartDate] = useState(value);
  const textFieldStyles = {
    "& .MuiInputBase-root": {
      border: "none",
    },
  };

  useEffect(() => {
    setStartDate(value);
  }, [value]);
  

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
        {required && (
          <span style={{ color: theme.palette.error.main }}> *</span>
        )}
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
              onChange={handleDateChange}
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
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
