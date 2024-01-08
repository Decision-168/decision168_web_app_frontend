import moment from "moment";

export const EVENTS = [
  {
    id: 1,
    start: moment("2024-01-05T10:00:00").toDate(),
    end: moment("2024-01-05T11:00:00").toDate(),
    title: "This is Event",
    created_type: "event",
    event_color: "cus_cal_color1",
  },
  {
    id: 2,
    start: moment("2024-01-06T10:00:00").toDate(),
    end: moment("2024-01-06T11:00:00").toDate(),
    title: "This is todo",
    created_type: "todo",
    event_color: "cus_cal_color2",
  },
  {
    id: 3,
    start: moment("2024-01-07T10:00:00").toDate(),
    end: moment("2024-01-07T11:00:00").toDate(),
    title: "This is reminder",
    created_type: "reminder",
    event_color: "cus_cal_color3",
  },
  {
    id: 4,
    start: moment("2024-01-08T10:00:00").toDate(),
    end: moment("2024-01-08T11:00:00").toDate(),
    title: "This is meeting",
    created_type: "meeting",
    event_color: "cus_cal_color4",
  },
];

export const priorities = ["No Priority", "High Priority", "Medium Priority", "Low Priority"];

export const priorityColors = {
  No: { backgroundColor: "#E4E4E4" },
  High: { backgroundColor: "#FF5733" },
  Medium: { backgroundColor: "#F7DC6F" },
  Low: { backgroundColor: "#85C1E9" },
};

export const timeOptions = ["6:00 AM", "6:15 AM", "6:30 AM", "6:45 AM", "7:00 AM", "7:15 AM", "7:30 AM", "7:45 AM", "8:00 AM", "8:15 AM", "8:30 AM", "8:45 AM"];

export const reminderOptions = ["No reminder", "5 minutes before", "15 minutes before", "30 minutes before", "1 hour before", "4 hours before", "1 day before", "2 days before", "1 week before"];
