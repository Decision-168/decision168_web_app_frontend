import React, { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Paper, Grid, useTheme, Box } from "@mui/material";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { Draggable } from "@hello-pangea/dnd";
import { addEvent, updateEvent } from "../../redux/action/calendarSlice";
import { openModal as reduxOpenModal } from "../../redux/action/modalSlice";
import DraggableResource from "./subComponents/DraggableResource";
import Quote from "../dashboard/subComponents/Quote";
import "./index.css";
import CreateNewDialog from "./subComponents/CreateNewDialog";
import { EVENTS } from "./data";
import CustomCalendarEvent from "./subComponents/CustomCalendarEvent";
import { getCustomStyle } from "./getCustomStyle";
import EventViewDialog from "./subComponents/EventViewDialog";
import TodoViewDialog from "./subComponents/TodoViewDialog";
import ReminderViewDialog from "./subComponents/ReminderViewDialog";
import MeetingViewDialog from "./subComponents/MeetingViewDialog";
import AddTodo from "./subComponents/AddTodo";
import EditEventDialog from "./subComponents/EditEventDialog";
import { SignalCellularNull } from "@mui/icons-material";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(BigCalendar);

const Calendar = () => {
  const dispatch = useDispatch();
  const { isModalOpen, selectedDate, events, todos, reminders, meetings } = useSelector((state) => state.calendar);

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

  const [eventDetails, setEventDetails] = useState(getDefaultEventDetails(selectedDate));
  const [todoDetails, setTodoDetails] = useState(getDefaultEventDetails(selectedDate));
  const [reminderDetails, setReminderDetails] = useState(getDefaultEventDetails(selectedDate));
  const [meetingDetails, setMeetingDetails] = useState(getDefaultEventDetails(selectedDate));
  const [eventType, setEventType] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(SignalCellularNull);

  const handleSelect = (range) => {
    dispatch(reduxOpenModal("create-New"));
    setEventDetails(resetDetailsState(range));
    setTodoDetails(resetDetailsState(range));
    setReminderDetails(resetDetailsState(range));
    setMeetingDetails(resetDetailsState(range));
  };

  const combinedEvents = [...events, ...todos, ...reminders, ...meetings];

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = getCustomStyle(event?.data?.selectedStyle);
    return {
      style,
    };
  };

  const handleEventSelect = (event) => {
    setSelectedId(event?.id);
    setEventType(event?.created_type);
    setSelectedEvent(event);
    const type = event?.created_type;
    switch (type) {
      case "event":
        return dispatch(reduxOpenModal("select-event"));
      case "todo":
        return dispatch(reduxOpenModal("select-todo"));
      case "reminder":
        return dispatch(reduxOpenModal("select-reminder"));
      case "meeting":
        return dispatch(reduxOpenModal("select-meeting"));
      default:
        return null;
    }
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

  const handleNavigate = (newDate, view) => {
    const currentMonth = moment(newDate).format("MMMM YYYY");
    alert(`currentMonth ${JSON.stringify(currentMonth)}`);
    alert(`view ${JSON.stringify(view)}`);
  };

  const handleViewChange = (view) => {
    alert(`view ${JSON.stringify(view)}`);
  };

  const components = {
    event: ({ event }) => {
      const type = event?.created_type;
      switch (type) {
        case "event":
          return <CustomCalendarEvent event={event} />;
        case "todo":
          return <CustomCalendarEvent event={event} />;
        case "reminder":
          return <CustomCalendarEvent event={event} />;
        case "meeting":
          return <CustomCalendarEvent event={event} />;
        default:
          return null;
      }
    },
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8} lg={9}>
          <Paper style={{ padding: "16px", height: "40em" }}>
            <DnDCalendar
              localizer={localizer}
              events={EVENTS}
              components={components}
              startAccessor="start"
              endAccessor="end"
              selectable={true}
              onEventDrop={moveEvent}
              onEventResize={resizeEvent}
              popup
              resizable={false}
              onSelectSlot={handleSelect}
              onSelectEvent={handleEventSelect}
              eventPropGetter={eventStyleGetter}
              style={{ height: "100%" }}
              draggableAccessor={Draggable}
              onDropFromOutside={onDropFromOutside}
              onNavigate={handleNavigate}
              onView={handleViewChange}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Grid container rowSpacing={2}>
            <Grid item xs={12}>
              <Quote />
            </Grid>
            <Grid item xs={12}>
              <DraggableResource setDraggedEvent={setDraggedEvent} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <CreateNewDialog
        eventDetails={eventDetails}
        setEventDetails={setEventDetails}
        todoDetails={todoDetails}
        setTodoDetails={setTodoDetails}
        reminderDetails={reminderDetails}
        setReminderDetails={setReminderDetails}
        meetingDetails={meetingDetails}
        setMeetingDetails={setMeetingDetails}
      />

      <EventViewDialog event={selectedEvent} />
      <TodoViewDialog event={selectedEvent} />
      <ReminderViewDialog event={selectedEvent} />
      <MeetingViewDialog event={selectedEvent} />

      <AddTodo />
      <EditEventDialog type={eventType} />
    </>
  );
};

export default Calendar;
