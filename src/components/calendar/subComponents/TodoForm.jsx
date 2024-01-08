import React, { useState } from "react";
import { Checkbox, FormControlLabel, Grid, TextField, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import moment from "moment";
import RecurringEvents from "./RecurringEvents";
import CustomRecurrence from "./CustomRecurence";
import CustomLabelTextField from "../../common/CustomLabelTextField";
import ColorPickerComponent from "./ColorPickerComponent";
import CustomMultilineTextField from "../../common/CustomMultilineTextField";
import SelectOption from "../../common/SelectOption";
import { priorities, reminderOptions } from "../data";

const TodoForm = ({ todoDetails, handleInputChange }) => {
  const [value, setValue] = useState("");
  const [reminderTime, setReminderTime] = useState(0);
  const [recurringValue, setRecurringValue] = useState("doesnotrepeat");
  const [selectedCustomDays, setSelectedCustomDays] = useState([]);
  const [formValues, setFormValues] = useState({});
  const theme = useTheme();

  const handleRecurringChange = (event) => {
    const newRecurringValue = event.target.value;
    setRecurringValue(newRecurringValue);

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
          <CustomLabelTextField placeholder="Enter Title*" name="title" value={todoDetails?.title} onChange={handleInputChange} />
        </Grid>

        {/* Choose Color */}
        <Grid item xs={12} sm={6}>
          <ColorPickerComponent />
        </Grid>

        {/* Note */}
        <Grid item xs={12} sm={12}>
          <CustomMultilineTextField name="note" required={false} placeholder="Add Note" />
        </Grid>

        {/* Start Date */}
        <Grid item xs={12} sm={6}>
          <TextField type="date" name="startDate" value={moment(todoDetails?.startDate).format("YYYY-MM-DD")} onChange={handleInputChange} fullWidth margin="normal" />
        </Grid>

        {/* End Date */}
        <Grid item xs={12} sm={6}>
          <TextField type="date" name="endDate" value={moment(todoDetails?.endDate).format("YYYY-MM-DD")} onChange={handleInputChange} fullWidth margin="normal" />
        </Grid>

        {/* Recuring Event */}
        <Grid item xs={12} sm={12}>
          <RecurringEvents handleRecurringChange={handleRecurringChange} recurringValue={recurringValue} startDate={moment(todoDetails?.startDate)} endDate={moment(todoDetails?.endDate)} />
          {/* Custom recurrence options (visible only when "Custom" is selected) */}
          {recurringValue === "custom" && <CustomRecurrence handleCustomRecurrenceChange={handleCustomRecurrenceChange} />}
        </Grid>

        {/* Start Time */}
        <Grid item xs={12} sm={6}>
          <TextField type="time" name="startTime" value={todoDetails?.startTime} onChange={handleInputChange} fullWidth margin="normal" />
        </Grid>

        {/* End Time */}
        <Grid item xs={12} sm={6}>
          <TextField type="time" name="endTime" value={todoDetails?.endTime} onChange={handleInputChange} fullWidth margin="normal" />
        </Grid>

        {/* Reminder */}
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

        {/* Priority */}
        <Grid item xs={12} sm={6}>
          <SelectOption
            label="Priority"
            hideLabel={true}
            required={false}
            field="Priority"
            idKey="value"
            getOptionLabel={(option) => option.label}
            staticOptions={priorities?.map((priority) => ({ label: priority, value: priority }))}
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

export default TodoForm;
