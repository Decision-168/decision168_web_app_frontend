// Meeting.jsx
import React, { useEffect, useState } from "react";
import {
  TextField,
  Grid,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  Box,
  Button,
} from "@mui/material";
import { Link as LinkIcon } from "@mui/icons-material";
import ColorPickerDropdown from "./ColorPickerDropDown";
import PortfolioPicker from "./PortfolioPicker";
import FilterSelectedOptions from "./FilterSelectedOptions";
import InviteMembers from "./InviteMembers";
import Reminder from "./Reminder";
import FileUpload from "./FileUpload";
import Editor from "./Editor";
import moment from "moment";
import { useTheme } from "@emotion/react";
import RecurringEvents from "./RecurringEvents";
import CustomRecurrence from "./CustomRecurence";

const member = [
  { title: "Talha Shaikh" },
  { title: "Owaise Zarger" },
  { title: "Bilal Daimi" },
];

const Meeting = ({
  meetingDetails,
  handleInputChange,
  onSave,
  onClose,
  isCalendarDialog,
}) => {
  const [files, setFiles] = useState(null);
  const [recurringValue, setRecurringValue] = useState("doesnotrepeat");
  const [reminderTime, setReminderTime] = useState(0);
  const [selectedCustomDays, setSelectedCustomDays] = useState([]);
  const theme = useTheme();

  const handleFilesChange = (newValue, info) => {
    setFiles(newValue);
  };

  const handleRecurringChange = (event) => {
    const newRecurringValue = event.target.value;
    setRecurringValue(newRecurringValue);

    // Update meetingDetails with the new recurringValue
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
            placeholder="Enter Title"
            name="title"
            value={meetingDetails?.title}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        </Grid>

        <Grid item xs={6}>
          <ColorPickerDropdown
            value={meetingDetails?.color}
            onChange={(color) =>
              handleInputChange({
                target: { name: "color", value: color },
              })
            }
          />
        </Grid>

        {/* Dropdown for Select Portfolio*/}
        <Grid item xs={12}>
          <PortfolioPicker />
        </Grid>

        {/* FilterSelectedOptions and InviteMembers in one line */}
        <Grid item xs={12}>
          <FilterSelectedOptions
            required={false}
            placeholder="Add Team Members..."
            items={member}
          />
        </Grid>
        <Grid item xs={12}>
          <InviteMembers />
        </Grid>
        {/* Date and time */}
        <Grid item xs={6}>
          <TextField
            type="date"
            name="startDate"
            value={moment(meetingDetails?.startDate).format("YYYY-MM-DD")}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            type="date"
            name="endDate"
            value={moment(meetingDetails?.endDate).format("YYYY-MM-DD")}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12}>
          <RecurringEvents
            handleRecurringChange={handleRecurringChange}
            recurringValue={recurringValue}
            startDate={moment(meetingDetails?.startDate)}
            endDate={moment(meetingDetails?.endDate)}
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
            value={meetingDetails?.startTime}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            type="time"
            name="endTime"
            value={meetingDetails?.endTime}
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

        {/* All Day checkbox */}
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

        {/* event url */}
        <Grid item xs={12}>
          <TextField
            label="Event URL"
            name="url"
            value="https://dev.decision168.com/meeting/to8-ic1-ouo-01105327"
            //   onChange={handleInputChange}
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LinkIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid
          item
          xs={6}
          container
          alignItems="center"
          justifyContent="flex-start"
        >
          <FormControlLabel
            control={<Checkbox name="ownUrl" />}
            label="Create Own URL"
            sx={{ color: "rgba(0, 0, 0, 0.87)", marginLeft: 0 }}
          />
        </Grid>
        <Grid item xs={12}>
          <FileUpload
            label="Attach File(s)"
            placeholder="Choose files..."
            multiple
            required={false}
            name="file"
            value={files}
            handleFilesChange={handleFilesChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              textAlign: "left",
              mt: 0,
              pt: 0,
              border: "1px solid #ddd", // Add border style here
              borderRadius: "10px",
              "& .sun-editor": {
                fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
                borderRadius: "10px",
                fontSize: "14px",
                border: 0,
              },
              "& .se-toolbar": { borderRadius: "10px", border: 0 },
            }}
          >
            <Editor />
          </Box>
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

export default Meeting;
