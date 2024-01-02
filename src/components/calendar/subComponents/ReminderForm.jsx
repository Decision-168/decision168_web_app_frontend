import React, { useEffect, useState } from "react";
import { Box, Button, Checkbox, FormControlLabel, Grid, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ColorPickerDropdown from "./ColorPickerDropDown";
import moment from "moment";
import Reminder from "./Reminder";
import RecurringEvents from "./RecurringEvents";
import CustomRecurrence from "./CustomRecurence";
import CustomLabelTextField from "../../common/CustomLabelTextField";
import ColorPickerComponent from "./ColorPickerComponent";
import SelectOption from "../../common/SelectOption";
import SecondaryButton from "../../common/SecondaryButton";

const reminderDurations = [
  {
    value: 0,
    label: "No Reminder",
  },
  {
    value: 15,
    label: "15 mins",
  },
  {
    value: 30,
    label: "30 mins",
  },
  {
    value: 60,
    label: "1 hour",
  },
  {
    value: 120,
    label: "2 hours",
  },
];

const ReminderForm = ({ reminderDetails, handleInputChange, onSave, onClose, isCalendarDialog }) => {
  const [value, setValue] = useState("");
  const [recurringValue, setRecurringValue] = useState("doesnotrepeat");
  const [reminderTime, setReminderTime] = useState(0);
  const [selectedCustomDays, setSelectedCustomDays] = useState([]);
  const [formValues, setFormValues] = useState({});
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
    <Box px={2} py={4}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} py={2}>
          <CustomLabelTextField label="" required={false} placeholder="Enter Title*" name="title" value={reminderDetails?.title} onChange={handleInputChange} />
        </Grid>

        <Grid item xs={12} sm={6} py={2}>
          <ColorPickerComponent />
        </Grid>

        {/* startDate*/}
        <Grid item xs={12} sm={6} py={2}>
          <TextField type="date" name="startDate" value={moment(reminderDetails?.startDate).format("YYYY-MM-DD")} onChange={handleInputChange} fullWidth />
        </Grid>

        {/* EndDate*/}
        <Grid item xs={12} sm={6} py={2}>
          <TextField type="date" name="endDate" value={moment(reminderDetails?.endDate).format("YYYY-MM-DD")} onChange={handleInputChange} fullWidth />
        </Grid>

        <Grid item xs={12} sm={12} py={2}>
          <RecurringEvents handleRecurringChange={handleRecurringChange} recurringValue={recurringValue} startDate={moment(reminderDetails?.startDate)} endDate={moment(reminderDetails?.endDate)} />
          {/* Custom recurrence options (visible only when "Custom" is selected) */}
          {recurringValue === "custom" && <CustomRecurrence handleCustomRecurrenceChange={handleCustomRecurrenceChange} />}
        </Grid>

        <Grid item xs={12} sm={6} py={2}>
          <TextField type="time" name="startTime" value={reminderDetails?.startTime} onChange={handleInputChange} fullWidth />
        </Grid>

        <Grid item xs={12} sm={6} py={2}>
          <TextField type="time" name="endTime" value={reminderDetails?.endTime} onChange={handleInputChange} fullWidth />
        </Grid>

        {/* Reminder dropdown */}
        <Grid item xs={12} sm={6} py={2}>
          {/* <Reminder handleReminderTimeChange={handleReminderTimeChange} reminderTime={reminderTime} />*/}

          <SelectOption
            label="Reminder"
            hideLabel={true}
            required={false}
            field="reminder"
            idKey="value"
            getOptionLabel={(option) => option.label}
            staticOptions={reminderDurations}
            formValues={formValues}
            setFormValues={setFormValues}
            isDisabled={false}
          />
        </Grid>

        {/* All day checkbox */}
        <Grid item xs={12} sm={6} py={2} textAlign={"left"}>
          <FormControlLabel control={<Checkbox name="allDay" />} label="All Day" sx={{ color: "rgba(0, 0, 0, 0.87)", marginLeft: 0 }} />
        </Grid>
      </Grid>

      {/* save and cancel Dialog actions */}

      {isCalendarDialog ? (
        <></>
      ) : (
        <Grid item xs={12} sx={{ textAlign: "end" }}>
          <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>

          <Button onClick={onSave} variant="contained" color="primary" sx={{ ml: 1 }}>
            Save
          </Button>
        </Grid>
      )}
    </Box>
  );
};

export default ReminderForm;
