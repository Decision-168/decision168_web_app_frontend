import React, { useEffect, useState } from "react";
import {
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  TextareaAutosize,
  Box,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ColorPickerDropdown from "./ColorPickerDropDown";
import Reminder from "./Reminder";
import moment from "moment";
import RecurringEvents from "./RecurringEvents";
import CustomRecurrence from "./CustomRecurence";

const Todo = ({
  todoDetails,
  handleInputChange,
  onSave,
  onClose,
  isCalendarDialog,
}) => {
  const [value, setValue] = useState("");
  const [reminderTime, setReminderTime] = useState(0);
  const [recurringValue, setRecurringValue] = useState("doesnotrepeat");
  const [selectedCustomDays, setSelectedCustomDays] = useState([]);
  const theme = useTheme();

  const handleRecurringChange = (event) => {
    const newRecurringValue = event.target.value;
    setRecurringValue(newRecurringValue);

    // Update todoDetails with the new recurringValue
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
    <Box p={2}>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <TextField
            name="title"
            placeholder="Enter Title"
            value={todoDetails?.title}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={6}>
          <ColorPickerDropdown
            value={todoDetails?.color}
            onChange={(color) =>
              handleInputChange({
                target: { name: "color", value: color },
              })
            }
          />
        </Grid>

        <Grid item xs={12} sx={{ mt: 2 }}>
          <TextareaAutosize
            minRows={3}
            placeholder="Add Note"
            // value={value}
            // onChange={handleChange}
            style={{
              width: "100%",
              height: "80px",
              fontSize: "14px",
              border: `2px solid ${theme.palette.secondary.light}`,
              borderRadius: "4px",
              padding: "8px",
            }}
          />
        </Grid>

        {/* Date and time */}
        <Grid item xs={6}>
          <TextField
            type="date"
            name="startDate"
            value={moment(todoDetails?.startDate).format("YYYY-MM-DD")}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            type="date"
            name="endDate"
            value={moment(todoDetails?.endDate).format("YYYY-MM-DD")}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        </Grid>

        <Grid item xs={12}>
          <RecurringEvents
            handleRecurringChange={handleRecurringChange}
            recurringValue={recurringValue}
            startDate={moment(todoDetails?.startDate)}
            endDate={moment(todoDetails?.endDate)}
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
            value={todoDetails?.startTime}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            type="time"
            name="endTime"
            value={todoDetails?.endTime}
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
        {/* save and cancel Dialog actions */}
        {isCalendarDialog ? (
          <></>
        ) : (
          <Grid item xs={12} sx={{ textAlign: "right" }}>
            <Button
              onClick={onClose}
              variant="outlined"
              sx={{ marginRight: 2 }}
            >
              Cancel
            </Button>
            <Button
              onClick={onSave}
              variant="contained"
              sx={{ marginRight: 2 }}
            >
              save
            </Button>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Todo;
