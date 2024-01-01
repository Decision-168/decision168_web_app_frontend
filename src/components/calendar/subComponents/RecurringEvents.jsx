import { MenuItem, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

const RecurringEvents = ({
  handleRecurringChange,
  recurringValue,
  startDate,
  endDate,
}) => {
  const [isCustomEnabled, setCustomEnabled] = useState(false);
  const [isWeekdaysEnabled, setWeekdaysEnabled] = useState(false);
  const [isWeeklyEnabled, setWeeklyEnabled] = useState(false);
  const [isMonthlyEnabled, setMonthlyEnabled] = useState(false);
  const [isYearlyEnabled, setYearlyEnabled] = useState(false);

  useEffect(() => {
    const dateDifference = endDate.diff(startDate, "days");
    setCustomEnabled(dateDifference >= 2);
    setWeekdaysEnabled(dateDifference >= 4);
    setWeeklyEnabled(dateDifference >= 7);
    setMonthlyEnabled(dateDifference >= 30);
    setYearlyEnabled(dateDifference >= 365);
  }, [startDate, endDate]);

  return (
    <>
      <TextField
        select
        name="recurringEvents"
        fullWidth
        margin="normal"
        value={recurringValue}
        onChange={handleRecurringChange}
      >
        <MenuItem value="doesnotrepeat">Does not repeat</MenuItem>
        <MenuItem value="daily">Daily</MenuItem>

        <MenuItem value="custom" disabled={!isCustomEnabled}>
          Custom (Please select more than 2 days in date range!)
        </MenuItem>

        <MenuItem value="weekdays" disabled={!isWeekdaysEnabled}>
          Every Weekday (Monday to Friday)
        </MenuItem>

        <MenuItem value="weekly" disabled={!isWeeklyEnabled}>
          Weekly (Please select more than 1 week in date range!)
        </MenuItem>

        <MenuItem value="monthly" disabled={!isMonthlyEnabled}>
          Monthly (Please select more than 1 month in date range!)
        </MenuItem>

        <MenuItem value="yearly" disabled={!isYearlyEnabled}>
          Annually (Please select more than 1 year in date range!)
        </MenuItem>
      </TextField>
    </>
  );
};

export default RecurringEvents;
