// CustomRecurrence.jsx
import React, { useState } from "react";
import { Checkbox, FormControlLabel, FormGroup, Box } from "@mui/material";

const CustomRecurrence = ({ handleCustomRecurrenceChange }) => {
  const [selectedDays, setSelectedDays] = useState({
    su: false,
    mo: false,
    tu: false,
    we: false,
    th: false,
    fr: false,
    sa: false,
  });

  const handleCheckboxChange = (day) => {
    setSelectedDays((prevSelectedDays) => ({
      ...prevSelectedDays,
      [day]: !prevSelectedDays[day],
    }));
  };

  // Notify parent component about the selected custom recurrence days
  React.useEffect(() => {
    const selectedDaysArray = Object.entries(selectedDays)
      .filter(([day, isSelected]) => isSelected)
      .map(([day]) => day);
    handleCustomRecurrenceChange(selectedDaysArray);
    console.log("Selected Days:", selectedDaysArray);
  }, [selectedDays, handleCustomRecurrenceChange]);

  return (
    <Box>
      <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
        <FormControlLabel
          sx={{ color: "green" }}
          control={
            <Checkbox
              checked={selectedDays.su}
              onChange={() => handleCheckboxChange("su")}
            />
          }
          label="Sun"
        />
        <FormControlLabel
          sx={{ color: "green" }}
          control={
            <Checkbox
              checked={selectedDays.mo}
              onChange={() => handleCheckboxChange("mo")}
            />
          }
          label="Mon"
        />
        <FormControlLabel
          sx={{ color: "green" }}
          control={
            <Checkbox
              checked={selectedDays.tu}
              onChange={() => handleCheckboxChange("tu")}
            />
          }
          label="Tue"
        />
        <FormControlLabel
          sx={{ color: "green" }}
          control={
            <Checkbox
              checked={selectedDays.we}
              onChange={() => handleCheckboxChange("we")}
            />
          }
          label="Wed"
        />
        <FormControlLabel
          sx={{ color: "green" }}
          control={
            <Checkbox
              checked={selectedDays.th}
              onChange={() => handleCheckboxChange("th")}
            />
          }
          label="Thu"
        />
        <FormControlLabel
          sx={{ color: "green" }}
          control={
            <Checkbox
              checked={selectedDays.fr}
              onChange={() => handleCheckboxChange("fr")}
            />
          }
          label="Fri"
        />
        <FormControlLabel
          sx={{ color: "green" }}
          control={
            <Checkbox
              checked={selectedDays.sa}
              onChange={() => handleCheckboxChange("sa")}
            />
          }
          label="Sat"
        />
      </FormGroup>
    </Box>
  );
};

export default CustomRecurrence;
