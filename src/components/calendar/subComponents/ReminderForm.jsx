import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ColorPickerDropdown from "./ColorPickerDropDown";
import moment from "moment";
import Reminder from "./Reminder";
import RecurringEvents from "./RecurringEvents";
import CustomRecurrence from "./CustomRecurence";

const ReminderForm = ({
  reminderDetails,
  handleInputChange,
  onSave,
  onClose,
  isCalendarDialog,
}) => {
  const [value, setValue] = useState("");
  const [recurringValue, setRecurringValue] = useState("doesnotrepeat");
  const [reminderTime, setReminderTime] = useState(0);
  const [selectedCustomDays, setSelectedCustomDays] = useState([]);
  const theme = useTheme();

  const handleRecurringChange = (event) => {
    const newRecurringValue = event.target.value;
    setRecurringValue(newRecurringValue);

    // Update reminderDetails with the new recurringValue
    handleInputChange({
      target: { name: "recurrence", value: newRecurringValue },
    });
  };

  const handleReminderTimeChange = (event) => {
    const newReminderTime = event.target.value;
    setReminderTime(newReminderTime);

    handleInputChange({
      target: { name: "reminderTime", value: newReminderTime },
    });
  };

  const placeholderStyles = {
    fontSize: "14px",
    color: theme.palette.secondary.dark,
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleCustomRecurrenceChange = (customDays) => {
    // Update selectedCustomDays directly
    setSelectedCustomDays(customDays);

    handleInputChange({
      target: { name: "CustomDays", value: selectedCustomDays },
    });
  };

  return (
    <Box p={3}>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <TextField
            name="title"
            placeholder="Enter Title"
            value={reminderDetails.title}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={6}>
          <ColorPickerDropdown
            value={reminderDetails.color}
            onChange={(color) =>
              handleInputChange({
                target: { name: "color", value: color },
              })
            }
          />
        </Grid>

        {/* Date and time */}
        <Grid item xs={6}>
          <TextField
            type="date"
            name="startDate"
            value={moment(reminderDetails?.startDate).format("YYYY-MM-DD")}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            type="date"
            name="endDate"
            value={moment(reminderDetails?.endDate).format("YYYY-MM-DD")}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12}>
          <RecurringEvents
            handleRecurringChange={handleRecurringChange}
            recurringValue={recurringValue}
            startDate={moment(reminderDetails?.startDate)}
            endDate={moment(reminderDetails?.endDate)}
          />
          {/* Custom recurrence options (visible only when "Custom" is selected) */}
          {recurringValue === "custom" && (
            <CustomRecurrence
              handleCustomRecurrenceChange={handleCustomRecurrenceChange}
            />
          )}
        </Grid>
        <Grid item xs={6}>
          <TextField
            type="time"
            name="startTime"
            value={reminderDetails?.startTime}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            type="time"
            name="endTime"
            value={reminderDetails?.endTime}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        </Grid>
        {/* Reminder dropdown */}
        <Grid item xs={6}>
          <Reminder
            handleReminderTimeChange={handleReminderTimeChange}
            reminderTime={reminderTime}
          />
        </Grid>

        {/* All day checkbox */}
        <Grid
          item
          xs={6}
          container
          alignItems="center"
          justifyContent="flex-start"
        >
          <FormControlLabel
            control={<Checkbox name="allDay" />}
            label="All Day"
            sx={{ color: "rgba(0, 0, 0, 0.87)", marginLeft: 0 }}
          />
        </Grid>
      </Grid>
      {/* save and cancel Dialog actions */}

      {isCalendarDialog ? (
        <></>
      ) : (
        <Grid item xs={12} sx={{ textAlign: "right" }}>
          <Button onClick={onClose} variant="outlined" sx={{ marginRight: 2 }}>
            Cancel
          </Button>
          <Button onClick={onSave} variant="contained" sx={{ marginRight: 2 }}>
            save
          </Button>
        </Grid>
      )}
    </Box>
  );
};

export default ReminderForm;
