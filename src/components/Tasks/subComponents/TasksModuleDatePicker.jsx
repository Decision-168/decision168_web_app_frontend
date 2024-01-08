import React, { useState, useEffect, memo } from "react";
import TextField from "@mui/material/TextField";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the CSS for the date picker
import { Box, IconButton, InputLabel } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useTheme } from "@mui/material/styles";
import { getGoalDetails } from "../../../api/modules/taskModule";

function TasksModuleDatePicker({ label, required, sizeWidth, showBorder, value, onChange, isDisabled, type, gid, parentTaskDueDate }) {
  const theme = useTheme();
  const [userInteracted, setUserInteracted] = useState(false);
  const [startDate, setStartDate] = useState(value || new Date()); // Use the provided value or initialize a new date

  const handleDateChange = (date) => {
    setStartDate(date);
    setUserInteracted(true);
    if (onChange) {
      onChange(date);
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
      backgroundColor: "#E4E4E4",
      borderRadius: "20px",
      height: "25px",
    },
    "& .MuiInputBase-input": {
      backgroundColor: "#E4E4E4",
      borderRadius: "20px",
      height: "25px",
      py: 0,
      px: 1,
      fontSize: "0.9rem",
    },
  };

  // Define the min and max dates based on the given criteria
  let dynamicMinDate = new Date();
  let dynamicMaxDate = new Date(new Date().getFullYear() + 1, 11, 31);

  if (type === "task") {
    if (gid === 0) {
      dynamicMinDate = new Date();
      dynamicMaxDate = new Date(new Date().getFullYear() + 1, 11, 31);
    } else {
      // If gid is not 0, call the getGoalDetails API
      const fetchData = async () => {
        try {
          const response = await getGoalDetails(gid);
          const gstart_date = response?.gstart_date;
          const gend_date = response?.gend_date;

          // Use gstart_date and gend_date to set dynamicMinDate and dynamicMaxDate
          // Example:
          dynamicMinDate = new Date(gstart_date);
          dynamicMaxDate = new Date(gend_date);
        } catch (error) {}
      };

      fetchData();
    }
  } else {
    dynamicMinDate = new Date();
    dynamicMaxDate = new Date(new Date(parentTaskDueDate));
  }

  return (
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
          padding: "2px",
        },
        ...textFieldStyles,
      }}
      InputProps={{
        startAdornment: (
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            dateFormat="yyyy-MM-dd" // Set the date format
            minDate={dynamicMinDate}
            maxDate={dynamicMaxDate}
            disabled={isDisabled}
            customInput={
              <IconButton size="small" sx={{ fontSize: "1rem" }}>
                <CalendarMonthIcon fontSize="inherit" />
              </IconButton>
            }
          />
        ),
      }}
    />
  );
}

export default memo(TasksModuleDatePicker);
