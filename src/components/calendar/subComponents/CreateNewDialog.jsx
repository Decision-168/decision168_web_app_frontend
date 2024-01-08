import React, { useState } from "react";
import { DialogContent, Tab, Tabs, DialogActions, Box } from "@mui/material";
import moment from "moment";
import ReduxDialog from "../../common/ReduxDialog";
import EventForm from "./EventForm";
import TodoForm from "./TodoForm";
import ReminderForm from "./ReminderForm";
import MeetingForm from "./MeetingForm";
import SecondaryButton from "../../common/SecondaryButton";
import PrimaryButton from "../../common/PrimaryButton";
import { closeModal as reduxCloseModal } from "../../../redux/action/modalSlice";
import { useDispatch } from "react-redux";
import ScrollableContainer from "../../common/ScrollableContainer";

export default function CreateNewDialog({ eventDetails, setEventDetails, todoDetails, setTodoDetails, reminderDetails, setReminderDetails, meetingDetails, setMeetingDetails }) {
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState("event");

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleInputChange = ({ target: { name, value } }) => {
    const updateDetails = (prevDetails) => ({
      ...prevDetails,
      [name]: name.includes("Date") ? moment(value, "YYYY-MM-DD") : value,
    });

    switch (selectedTab) {
      case "events":
        setEventDetails((prevDetails) => updateDetails(prevDetails));
        break;
      case "todo":
        setTodoDetails((prevDetails) => updateDetails(prevDetails));
        break;
      case "reminder":
        setReminderDetails((prevDetails) => updateDetails(prevDetails));
        break;
      case "meeting":
        setMeetingDetails((prevDetails) => updateDetails(prevDetails));
        break;
      default:
        return;
    }
  };

  const handleClose = () => {
    dispatch(reduxCloseModal("create-New"));
    // setEventDetails(resetDetailsState(selectedDate || new Date()));
    // setTodoDetails(resetDetailsState(selectedDate || new Date()));
    // setReminderDetails(resetDetailsState(selectedDate || new Date()));
    // setMeetingDetails(resetDetailsState(selectedDate || new Date()));
    setSelectedTab("events");
  };

  const saveDispatchAction = (dispatch, details, actionCreator) => {
    const { title, startDate, endDate, startTime, endTime, color, recurrence, reminderTime, CustomDays } = details;
    dispatch(
      actionCreator({
        title,
        startDate: moment(startDate).format("YYYY-MM-DD"),
        endDate: moment(endDate).format("YYYY-MM-DD"),
        startTime: moment(startTime, "HH:mm").format("HH:mm"),
        endTime: moment(endTime, "HH:mm").format("HH:mm"),
        color,
        recurrence,
        reminderTime,
        CustomDays,
      })
    );
  };

  const handleSave = () => {
    switch (selectedTab) {
      case "event":
        alert("You have submitted event form values");
        saveDispatchAction(dispatch, eventDetails, addEvent);
        break;
      case "todo":
        alert("You have submitted todo form values");
        saveDispatchAction(dispatch, todoDetails, addTodo);
        break;
      case "reminder":
        alert("You have submitted reminder form values");
        saveDispatchAction(dispatch, reminderDetails, addReminder);
        break;
      case "meeting":
        alert("You have submitted meeting form values");
        saveDispatchAction(dispatch, meetingDetails, addMeeting);
        break;
      default:
        return;
    }
    setSelectedTab("events");
    handleClose();
  };

  return (
    <ReduxDialog value="create-New" modalTitle="Create New" showModalButton={false} modalSize="sm">
      <DialogContent dividers sx={{ p: 1 }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", mt: -4, position: "sticky", top: "-17px", zIndex: 1200, bgcolor: "white" }}>
          <Tabs value={selectedTab} onChange={handleTabChange} aria-label="basic tabs example">
            <Tab label="Event" value="event" sx={{ flexGrow: 1, fontSize: "0.8rem" }} />
            <Tab label="Todo" value="todo" sx={{ flexGrow: 1, fontSize: "0.8rem" }} />
            <Tab label="Reminder" value="reminder" sx={{ flexGrow: 1, fontSize: "0.8rem" }} />
            <Tab label="Meeting" value="meeting" sx={{ flexGrow: 1, fontSize: "0.8rem" }} />
          </Tabs>
        </Box>
        <ScrollableContainer maxHeight="450px">
          {selectedTab === "event" && <EventForm eventDetails={eventDetails} handleInputChange={handleInputChange} />}
          {selectedTab === "todo" && <TodoForm todoDetails={todoDetails} handleInputChange={handleInputChange} />}
          {selectedTab === "reminder" && <ReminderForm reminderDetails={reminderDetails} handleInputChange={handleInputChange} />}
          {selectedTab === "meeting" && <MeetingForm meetingDetails={meetingDetails} handleInputChange={handleInputChange} />}
        </ScrollableContainer>
      </DialogContent>

      <DialogActions>
        <SecondaryButton onClick={handleClose}>Cancel</SecondaryButton>
        <PrimaryButton onClick={handleSave}>Save</PrimaryButton>
      </DialogActions>
    </ReduxDialog>
  );
}
