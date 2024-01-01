// Reminder.js
import React, { useState } from "react";
import { TextField, MenuItem } from "@mui/material";

const Reminder = ({ reminderTime, handleReminderTimeChange }) => {
  return (
    <TextField
      select
      label="Reminder"
      name="reminder"
      fullWidth
      margin="normal"
      value={reminderTime}
      onChange={handleReminderTimeChange}
    >
      <MenuItem value={0}>No Reminder</MenuItem>
      <MenuItem value={15}>15 mins</MenuItem>
      <MenuItem value={30}>30 mins</MenuItem>
      <MenuItem value={60}>1 hour</MenuItem>
      <MenuItem value={120}>2 hours</MenuItem>
      {/* Add more reminder options as needed */}
    </TextField>
  );
};

export default Reminder;
