import { Grid, InputLabel, useTheme } from "@mui/material";
import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
const Duration = ({
  label,
  labelColor,
  required,
  individual,
  onDateChange,
}) => {
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const theme = useTheme();
  const handleStartDateChange = (date) => {
    setStartDate(date);
    setEndDate(date);
    onDateChange({ startDate: date, endDate: date });
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    onDateChange({ startDate, endDate: date });
  };
  return (
    <>
      <Grid item xs={12} sm={2} md={2} lg={2} alignSelf={"center"}>
        <InputLabel
          sx={{ fontSize: "14px", color: labelColor, textAlign: "start" }}
        >
          {label}
          {required && (
            <span style={{ color: theme.palette.error.main }}> *</span>
          )}
        </InputLabel>
      </Grid>
      <Grid item xs={12} sm={10} md={10} lg={10}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            {individual ? (
              <DatePicker
                inputFormat="MM/dd/yyyy"
                value={endDate}
                onChange={handleEndDateChange}
                sx={{ marginTop: "8px", width: "100%" }}
                disablePast // Disable past dates
              />
            ) : (
              <>
                <DatePicker
                  inputFormat="MM/dd/yyyy"
                  value={startDate}
                  onChange={handleStartDateChange}
                  sx={{ marginTop: "8px", width: "100%" }}
                  disablePast // Disable past dates
                />
                <DatePicker
                  inputFormat="MM/dd/yyyy"
                  value={endDate}
                  onChange={handleEndDateChange}
                  sx={{ marginTop: "8px", width: "100%" }}
                  disablePast // Disable past dates
                />
              </>
            )}
          </div>
        </LocalizationProvider>
      </Grid>
    </>
  );
};

export default Duration;
