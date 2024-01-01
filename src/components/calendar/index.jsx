// Calendar.js
import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Paper,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  Tab,
  Tabs,
  styled,
  useTheme,
  DialogActions,
  Button,
} from "@mui/material";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { Draggable } from "@hello-pangea/dnd";

import {
  openModal,
  closeModal,
  addEvent,
  addTodo,
  addReminder,
  addMeeting,
  updateEvent,
} from "../../redux/action/calendarSlice";
import { openModal as reduxOpenModal } from "../../redux/action/modalSlice";

import Event from "./subComponents/Event";
import Todo from "./subComponents/Todo";
import ReminderForm from "./subComponents/ReminderForm";
import Meeting from "./subComponents/Meeting";
import ReduxDialog from "../common/ReduxDialog";
import EventView from "./subComponents/Dialogs/EventView";
import DraggableResource from "./subComponents/DraggableResource";
import Quote from "../dashboard/subComponents/Quote";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(BigCalendar);

const Calendar = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const { isModalOpen, selectedDate, events, todos, reminders, meetings } =
    useSelector((state) => state.calendar);

  const getDefaultEventDetails = (selectedDate) => {
    const defaultDetails = {
      title: "",
      startDate: selectedDate || new Date(),
      endDate: selectedDate || new Date(),
      startTime: moment(selectedDate || new Date()).format("HH:mm"),
      endTime: moment(selectedDate || new Date())
        .add(1, "hour")
        .format("HH:mm"),
      color: "default",
      recurrence: "doesnotrepeat",
      isDraggable: true,
      reminderTime: 0,
      CustomDays: "",
    };
    return defaultDetails;
  };

  const [eventDetails, setEventDetails] = useState(
    getDefaultEventDetails(selectedDate)
  );
  const [todoDetails, setTodoDetails] = useState(
    getDefaultEventDetails(selectedDate)
  );
  const [reminderDetails, setReminderDetails] = useState(
    getDefaultEventDetails(selectedDate)
  );
  const [meetingDetails, setMeetingDetails] = useState(
    getDefaultEventDetails(selectedDate)
  );

  const StyledTabs = styled(Tabs)(({ theme }) => ({
    position: "sticky",
    top: 0,
    zIndex: 1,
    opacity: 1,
    backgroundColor: "white", // Set the desired background color for the sticky tabs
    "& .MuiTabs-indicator": {
      backgroundColor: theme.palette.primary.light,
    },
    "& .MuiTab-textColorPrimary.Mui-selected": {
      color: theme.palette.primary.dark,
    },
  }));
  const [selectedTab, setSelectedTab] = useState("events");

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("reminders", JSON.stringify(reminders));
    localStorage.setItem("meetings", JSON.stringify(meetings));
  }, [events, todos, reminders, meetings]);

  const resetDetailsState = (range) => {
    return {
      title: "",
      startDate: moment(range.start),
      endDate: moment(range.end).subtract(1, "hour").toDate(),
      startTime: moment(range.start).format("HH:mm"),
      endTime: moment(range.end).add(1, "hour").format("HH:mm"),
      color: "default",
      recurrence: "doesnotrepeat",
      isDraggable: true,
      reminderTime: 0,
      CustomDays: "",
    };
  };

  const handleSelect = (range) => {
    dispatch(
      openModal({ start: range.start.getTime(), end: range.end.getTime() })
    );
    setEventDetails(resetDetailsState(range));
    setTodoDetails(resetDetailsState(range));
    setReminderDetails(resetDetailsState(range));
    setMeetingDetails(resetDetailsState(range));
  };

  const handleClose = () => {
    dispatch(closeModal());
    setEventDetails(resetDetailsState(selectedDate || new Date()));
    setTodoDetails(resetDetailsState(selectedDate || new Date()));
    setReminderDetails(resetDetailsState(selectedDate || new Date()));
    setMeetingDetails(resetDetailsState(selectedDate || new Date()));
    setSelectedTab("events");
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

  const saveDispatchAction = (dispatch, details, actionCreator) => {
    const {
      title,
      startDate,
      endDate,
      startTime,
      endTime,
      color,
      recurrence,
      reminderTime,
      CustomDays,
    } = details;

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
      case "events":
        saveDispatchAction(dispatch, eventDetails, addEvent);
        break;
      case "todo":
        saveDispatchAction(dispatch, todoDetails, addTodo);
        break;
      case "reminder":
        saveDispatchAction(dispatch, reminderDetails, addReminder);
        break;
      case "meeting":
        saveDispatchAction(dispatch, meetingDetails, addMeeting);
        break;
      default:
        return;
    }
    setSelectedTab("events");

    handleClose();
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const combinedEvents = [...events, ...todos, ...reminders, ...meetings];

  const eventStyleGetter = (event) => {
    return {
      style: {
        backgroundColor: event.color,
        color: "#333",
        height: "20px",
        fontSize: "12px",
      },
      draggable: combinedEvents.isDraggable,
    };
  };

  const [selectedEvent, setSelectedEvent] = useState("");

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    dispatch(reduxOpenModal("select-event"));
  };

  const moveEvent = useCallback(
    ({ event, start, end, isAllDay: droppedOnAllDaySlot = false }) => {
      const { id, allDay } = event;
      if (!allDay && droppedOnAllDaySlot) {
        dispatch(updateEvent({ id, allDay: true }));
      } else {
        dispatch(updateEvent({ id, start, end }));
      }
    },
    [dispatch]
  );

  const resizeEvent = useCallback(
    ({ event, start, end, isAllDay }) => {
      const { id } = event;
      dispatch(updateEvent({ id, start, end, allDay: isAllDay }));
    },
    [dispatch]
  );

  const [draggedEvent, setDraggedEvent] = useState(null);

  const onDropFromOutside = useCallback(
    ({ start, end }) => {
      try {
        if (draggedEvent) {
          const { text, backgroundColor } = draggedEvent;

          const startDate = moment(start).format("YYYY-MM-DD");
          const endDate = moment(start).add(1, "hour").format("YYYY-MM-DD");
          const startTime = moment(start).format("HH:mm");
          const endTime = moment(start).add(1, "hour").format("HH:mm");

          dispatch(
            addEvent({
              title: text,
              startDate,
              endDate,
              startTime,
              endTime,
              color: backgroundColor,
              recurrence: "doesnotrepeat",
              reminderTime: 0,
            })
          );
        } else {
          console.error("Dragged data is undefined");
        }
      } catch (error) {
        console.error("Error handling drop from outside:", error);
      } finally {
        setDraggedEvent(null);
      }
    },
    [dispatch, draggedEvent]
  );

  return (
    <Grid container spacing={1}>
      <Grid item xs={9}>
        <Paper style={{ padding: "16px", height: "40em" }}>
          <DnDCalendar
            localizer={localizer}
            events={combinedEvents.map((event) => ({
              ...event,
              start: new Date(event.start),
              end: new Date(event.end),
            }))}
            startAccessor="start"
            endAccessor="end"
            selectable={true}
            onEventDrop={moveEvent}
            onEventResize={resizeEvent}
            popup
            resizable
            onSelectSlot={handleSelect}
            onSelectEvent={handleEventSelect}
            eventPropGetter={eventStyleGetter}
            style={{ height: "100%" }}
            draggableAccessor={Draggable}
            onDropFromOutside={onDropFromOutside}
          />
        </Paper>
      </Grid>

      <Grid item xs={3} sx={{ mt: -8 }}>
        <Grid container>
          <Grid xs={12}>
            <Quote />
          </Grid>
          <Grid xs={12} sx={{ mt: -6 }}>
            <DraggableResource setDraggedEvent={setDraggedEvent} />
          </Grid>
        </Grid>
      </Grid>

      <Dialog
        open={isModalOpen}
        onClose={handleClose}
        maxWidth="xs"
        PaperProps={{ style: { maxHeight: "70vh" } }}
      >
        <DialogTitle
          style={{
            borderTop: `7px solid ${theme.palette.primary.main}`,
          }}
        >
          Create New
        </DialogTitle>
        <DialogContent>
          <StyledTabs
            value={selectedTab}
            onChange={handleTabChange}
            indicatorColor={theme.palette.primary.light}
            textColor={theme.palette.primary.dark}
          >
            <Tab label="Event" value="events" />
            <Tab label="Todo" value="todo" />
            <Tab label="Reminder" value="reminder" />
            <Tab label="Meeting" value="meeting" />
          </StyledTabs>
          {selectedTab === "events" && (
            <Event
              eventDetails={eventDetails}
              handleInputChange={handleInputChange}
              onSave={handleSave}
              onClose={handleClose}
              isCalendarDialog={isModalOpen}
            />
          )}
          {selectedTab === "todo" && (
            <Todo
              todoDetails={todoDetails}
              handleInputChange={handleInputChange}
              onSave={handleSave}
              onClose={handleClose}
              isCalendarDialog={isModalOpen}
            />
          )}
          {selectedTab === "reminder" && (
            <ReminderForm
              reminderDetails={reminderDetails}
              handleInputChange={handleInputChange}
              onSave={handleSave}
              onClose={handleClose}
              isCalendarDialog={isModalOpen}
            />
          )}
          {selectedTab === "meeting" && (
            <Meeting
              meetingDetails={meetingDetails}
              handleInputChange={handleInputChange}
              onSave={handleSave}
              onClose={handleClose}
              isCalendarDialog={isModalOpen}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="outlined"
            sx={{ marginRight: 2 }}
          >
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <ReduxDialog
        value="select-event"
        modalTitle={selectedEvent.title}
        showModalButton={false}
        redirectPath=""
        modalSize="sm"
      >
        <EventView selectedEvent={selectedEvent} />
      </ReduxDialog>

      <ReduxDialog
        value="event-update"
        modalTitle="Update"
        showModalButton={false}
        redirectPath=""
        modalSize="xs"
      >
        <Event />
      </ReduxDialog>

      <ReduxDialog
        value="add-todo"
        modalTitle="create new Todo"
        showModalButton={false}
        redirectPath=""
        modalSize="xs"
      >
        <Todo />
      </ReduxDialog>
      <ReduxDialog
        value="create-draggable-event"
        modalTitle="create new Draggable Event"
        showModalButton={false}
        redirectPath=""
        modalSize="xs"
      >
        <Todo />
      </ReduxDialog>
      <ReduxDialog
        value="update-draggable-event"
        modalTitle="Update Draggable Event"
        showModalButton={false}
        redirectPath=""
        modalSize="xs"
      >
        <Todo />
      </ReduxDialog>
    </Grid>
  );
};

export default Calendar;
