// Event.jsx
import React, { useEffect, useState } from "react";
import { TextField, Grid, FormControlLabel, Checkbox, InputAdornment, Box, Button, useTheme } from "@mui/material";
import { Link as LinkIcon } from "@mui/icons-material";
import ColorPickerDropdown from "./ColorPickerDropDown";
import PortfolioPicker from "./PortfolioPicker";
import FilterSelectedOptions from "./FilterSelectedOptions";
import InviteMembers from "./InviteMembers";
import Reminder from "./Reminder";
import FileUpload from "./FileUpload";
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

const member = [{ title: "Talha Shaikh" }, { title: "Owaise Zarger" }, { title: "Bilal Daimi" }];
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

const Event = ({ eventDetails, handleInputChange, onSave, onClose, isCalendarDialog }) => {
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
    const filesArray = files?.length ? files.map((file, index) => ({ [index]: `${time}_${file.name.toLowerCase()}`})) : [];
  
    const handleFilesChange = (newValue, info) => {
      setFiles(newValue);
    };

  const handleRecurringChange = (event) => {
    const newRecurringValue = event.target.value;
    setRecurringValue(newRecurringValue);

    // Update eventDetails with the new recurringValue
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
    // You can still update eventDetails here if needed
    handleInputChange({
      target: { name: "CustomDays", value: selectedCustomDays },
    });
  };

  return (
    <Box px={2} py={4}>
      <Grid container spacing={1}>

        <Grid item xs={12} sm={6}  py={2}>
          <CustomLabelTextField
            label=""
            required={false}
            placeholder="Enter Title*"
            name="title"
            value={eventDetails?.title}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}  py={2}>
          {/* <ColorPickerDropdown
            value={eventDetails?.color}
            required
            onChange={(color) =>
              handleInputChange({
                target: { name: "color", value: color },
              })
            }
          /> */}

          <ColorPickerComponent/>
        </Grid>


        <Grid item xs={12} sm={12}  py={2}>
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

        <Grid item xs={12} sm={12}  py={2}>
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

        <Grid item xs={12} sm={12}  py={2}>
          <InviteMembers />
        </Grid>

        {/* Date and time */}
        <Grid item  xs={12} sm={6}  py={2}>
          <TextField type="date" name="startDate" value={moment(eventDetails?.startDate).format("YYYY-MM-DD")} onChange={handleInputChange} fullWidth margin="normal" />
        </Grid>
        
        <Grid item  xs={12} sm={6}  py={2}>
          <TextField type="date" name="endDate" value={moment(eventDetails?.endDate).format("YYYY-MM-DD")} onChange={handleInputChange} fullWidth margin="normal" />
        </Grid>

        <Grid item xs={12} sm={12}  py={2}>
          <RecurringEvents handleRecurringChange={handleRecurringChange} recurringValue={recurringValue} startDate={moment(eventDetails?.startDate)} endDate={moment(eventDetails?.endDate)} />
          {/* Custom recurrence options (visible only when "Custom" is selected) */}
          {recurringValue === "custom" && (
            <CustomRecurrence
              // handleCustomRecurrenceChange={setSelectedCustomDays}
              handleCustomRecurrenceChange={handleCustomRecurrenceChange}
            />
          )}
        </Grid>

        <Grid item xs={12} sm={6}  py={2}>
          <TextField type="time" name="startTime" value={eventDetails?.startTime} onChange={handleInputChange} fullWidth/>
        </Grid>


        <Grid item xs={12} sm={6}  py={2}>
          <TextField type="time" name="endTime" value={eventDetails?.endTime} onChange={handleInputChange} fullWidth  />
        </Grid>


        {/* Reminder dropdown */}
        <Grid item xs={12} sm={6}  py={2}>
          {/* <Reminder handleReminderTimeChange={handleReminderTimeChange} reminderTime={reminderTime} /> */}

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

        {/* All Day checkbox */}
        <Grid item xs={12} sm={6} py={2} textAlign={"left"}>
          <FormControlLabel control={<Checkbox name="allDay" />} label="All Day" sx={{ color: "rgba(0, 0, 0, 0.87)", marginLeft: 0 }} />
        </Grid>

        {/* event url */}
        <Grid item xs={12} sm={12}  pt={2}>
          <TextField
            // label="Event URL"
            name="url"
            value={eventDetails?.url || "https://dev.decision168.com/meeting/to8-ic1-ouo-01105327"}
            onChange={handleInputChange}
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


        {/* create own url */}
        <Grid item xs={12} sm={12} textAlign={"left"} sx={{mt:-2}}>
          <FormControlLabel control={<Checkbox name="ownUrl" />} label="Create Own URL" sx={{ color: "rgba(0, 0, 0, 0.87)", marginLeft: 0 }} />
        </Grid>

        {/* Choose files*/}
        <Grid item xs={12} sm={12} py={2}>
          <CustomFileInput label="" placeholder="Choose files..." multiple required={false} name="file" value={files} handleFilesChange={handleFilesChange} />
        </Grid>

        <Grid item xs={12} sm={12} py={2}>
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

export default Event;

// {isCalendarDialog ? (
//   <></>
// ) : (
//   <Grid item xs={12} sx={{ textAlign: "right" }}>
//     <Button onClick={onClose} variant="outlined" sx={{ mr: 1 }}>
//       Cancel
//     </Button>


//     <Button onClick={onSave} variant="contained" sx={{ mr: 1 }}>
//       save
//     </Button>
//   </Grid>
// )}
