import React, { useState } from "react";
import { Box, Checkbox, FormControlLabel, Grid, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import moment from "moment";
import RecurringEvents from "./RecurringEvents";
import CustomRecurrence from "./CustomRecurence";
import CustomLabelTextField from "../../common/CustomLabelTextField";
import ColorPickerComponent from "./ColorPickerComponent";
import SelectOption from "../../common/SelectOption";
import { reminderOptions } from "../data";

const ReminderForm = ({ reminderDetails, handleInputChange }) => {
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

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleCustomRecurrenceChange = (customDays) => {
    setSelectedCustomDays(customDays);

    handleInputChange({
      target: { name: "CustomDays", value: selectedCustomDays },
    });
  };

  return (
    <Box px={2} py={4}>
      <Grid container spacing={1}>
        {/* Title */}
        <Grid item xs={12} sm={6}>
          <CustomLabelTextField label="" required={false} placeholder="Enter Title*" name="title" value={reminderDetails?.title} onChange={handleInputChange} />
        </Grid>

        {/* Choose Color */}
        <Grid item xs={12} sm={6}>
          <ColorPickerComponent />
        </Grid>

        {/* Start Date*/}
        <Grid item xs={12} sm={6}>
          <TextField type="date" name="startDate" value={moment(reminderDetails?.startDate).format("YYYY-MM-DD")} onChange={handleInputChange} fullWidth margin="normal" />
        </Grid>

        {/* End Date*/}
        <Grid item xs={12} sm={6}>
          <TextField type="date" name="endDate" value={moment(reminderDetails?.endDate).format("YYYY-MM-DD")} onChange={handleInputChange} fullWidth margin="normal" />
        </Grid>

        {/* Recuring Event */}
        <Grid item xs={12} sm={12}>
          <RecurringEvents handleRecurringChange={handleRecurringChange} recurringValue={recurringValue} startDate={moment(reminderDetails?.startDate)} endDate={moment(reminderDetails?.endDate)} />
          {/* Custom recurrence options (visible only when "Custom" is selected) */}
          {recurringValue === "custom" && <CustomRecurrence handleCustomRecurrenceChange={handleCustomRecurrenceChange} />}
        </Grid>

        {/* Start Time */}
        <Grid item xs={12} sm={6}>
          <TextField type="time" name="startTime" value={reminderDetails?.startTime} onChange={handleInputChange} fullWidth margin="normal" />
        </Grid>

        {/* End Time */}
        <Grid item xs={12} sm={6}>
          <TextField type="time" name="endTime" value={reminderDetails?.endTime} onChange={handleInputChange} fullWidth margin="normal" />
        </Grid>

        {/* Reminder*/}
        <Grid item xs={12} sm={6}>
          <SelectOption
            label="Reminder"
            hideLabel={true}
            required={false}
            field="reminder"
            idKey="value"
            getOptionLabel={(option) => option.label}
            staticOptions={reminderOptions?.map((reminder) => ({ label: reminder, value: reminder }))}
            formValues={formValues}
            setFormValues={setFormValues}
            isDisabled={false}
          />
        </Grid>

        {/* All Day checkbox */}
        <Grid item xs={12} sm={6} textAlign={"left"}>
          <FormControlLabel control={<Checkbox size="small" />} label="All Day" sx={{ color: theme.palette.secondary.main }} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReminderForm;
