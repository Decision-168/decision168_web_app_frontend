import React, { useEffect, useState } from "react";
import { TextField, Grid, FormControlLabel, Checkbox, Box, useTheme } from "@mui/material";
import InviteMembers from "./InviteMembers";
import Editor from "./Editor";
import moment from "moment";
import RecurringEvents from "./RecurringEvents";
import CustomRecurrence from "./CustomRecurence";
import { getPortfolios } from "../../../api/modules/porfolioModule";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../redux/action/userSlice";
import SelectOption from "../../common/SelectOption";
import MultiSelectOption from "../../common/MultiSelectOption";
import CustomLabelTextField from "../../common/CustomLabelTextField";
import CustomFileInput from "../../common/CustomFileInput";
import ColorPickerComponent from "./ColorPickerComponent";
import { reminderOptions } from "../data";
import CustomLinkField from "../../common/CustomLinkField";
import CustomLocationField from "../../common/CustomLocationField";

const member = [{ title: "Talha Shaikh" }, { title: "Owaise Zarger" }, { title: "Bilal Daimi" }];

const MeetingForm = ({ meetingDetails, handleInputChange }) => {
  const [recurringValue, setRecurringValue] = useState("doesnotrepeat");
  const [reminderTime, setReminderTime] = useState(0);
  const [selectedCustomDays, setSelectedCustomDays] = useState([]);
  const [portfolios, setPortfolios] = useState([]);
  const [formValues, setFormValues] = useState({});
  const theme = useTheme();
  const user = useSelector(selectUserDetails);

  //fecth portfolios
  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const portfoliosData = await getPortfolios({ email: user?.email_address });
        setPortfolios(portfoliosData);
      } catch (error) {}
    };

    // Fetch portfolios when the component mounts
    fetchPortfolios();
  }, []);

  // Attach File
  const [files, setFiles] = useState(null);
  const time = Math.floor(Date.now() / 1000);
  const filesArray = files?.length ? files.map((file, index) => ({ [index]: `${time}_${file.name.toLowerCase()}` })) : [];

  const handleFilesChange = (newValue, info) => {
    setFiles(newValue);
  };

  const handleRecurringChange = (event) => {
    const newRecurringValue = event.target.value;
    setRecurringValue(newRecurringValue);
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
    // You can still update eventDetails here if needed
    handleInputChange({
      target: { name: "CustomDays", value: selectedCustomDays },
    });
  };

  return (
    <Box px={2} py={3}>
      <Grid container spacing={1}>
        {/* Title */}
        <Grid item xs={12} sm={6}>
          <CustomLabelTextField label="" required={false} placeholder="Enter Title*" name="title" />
        </Grid>

        {/* Choose Color */}
        <Grid item xs={12} sm={6}>
          <ColorPickerComponent />
        </Grid>

        {/* Portfolio */}
        <Grid item xs={12} sm={12} sx={{ pb: 1 }}>
          <SelectOption
            label="Portfolio"
            hideLabel={true}
            required={false}
            field="portfolio_id"
            idKey="portfolio_id"
            getOptionLabel={(option) => option.portfolio_name}
            staticOptions={portfolios}
            formValues={formValues}
            setFormValues={setFormValues}
            isDisabled={false}
          />
        </Grid>

        {/* Member(s) */}
        <Grid item xs={12} sm={12} sx={{ pb: 1 }}>
          <MultiSelectOption
            label="Member(s)"
            hideLabel={true}
            required={false}
            field="member"
            idKey="title"
            getOptionLabel={(option) => option.title}
            staticOptions={member}
            formValues={formValues}
            setFormValues={setFormValues}
          />
        </Grid>

        {/* Invite Members */}
        <Grid item xs={12} sm={12}>
          <InviteMembers />
        </Grid>

        {/* Start Date */}
        <Grid item xs={12} sm={6}>
          <TextField type="date" name="startDate" fullWidth margin="normal" />
        </Grid>

        {/* End Date */}
        <Grid item xs={12} sm={6}>
          <TextField type="date" name="endDate" fullWidth margin="normal" />
        </Grid>

        {/* Recuring Event */}
        <Grid item xs={12} sm={12}>
          <RecurringEvents
            handleRecurringChange={handleRecurringChange}
            recurringValue={recurringValue}
            startDate={moment(new Date()).format("YYYY-MM-DD")}
            endDate={moment(new Date()).format("YYYY-MM-DD")}
          />
          {/* Custom recurrence options (visible only when "Custom" is selected) */}
          {recurringValue === "custom" && <CustomRecurrence handleCustomRecurrenceChange={handleCustomRecurrenceChange} />}
        </Grid>

        {/* Start Time */}
        <Grid item xs={12} sm={6}>
          <TextField type="time" name="startTime" fullWidth margin="normal" />
        </Grid>

        {/* End Time */}
        <Grid item xs={12} sm={6}>
          <TextField type="time" name="endTime" fullWidth margin="normal" />
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

        {/* Link */}
        <Grid item xs={12} sm={12}>
          <CustomLinkField placeholder="Meeting Link" />
        </Grid>

        {/* Create Own Link */}
        <Grid item xs={12} sm={12} textAlign={"left"} sx={{ mt: -2 }}>
          <FormControlLabel control={<Checkbox name="ownUrl" />} label="Create Own Link" sx={{ color: "rgba(0, 0, 0, 0.87)", marginLeft: 0 }} />
        </Grid>

        {/* Location*/}
        <Grid item xs={12} sm={12}>
          <CustomLocationField placeholder="Add Location" />
        </Grid>

        {/* Choose files*/}
        <Grid item xs={12} sm={12}>
          <CustomFileInput label="" placeholder="Choose files..." multiple required={false} name="file" value={files} handleFilesChange={handleFilesChange} />
        </Grid>

        {/* Editer */}
        <Grid item xs={12} sm={12}>
          <Box
            sx={{
              textAlign: "left",
              border: "1px solid #ddd", // Add border style here
              borderRadius: "10px",
              "& .sun-editor": {
                fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
                borderRadius: "10px",
                fontSize: "14px",
                border: 0,
              },
              my: 1,
              "& .se-toolbar": { borderRadius: "10px", border: 0 },
            }}
          >
            <Editor />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MeetingForm;
