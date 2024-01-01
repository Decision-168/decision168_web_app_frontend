// calendarSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { RRule } from "rrule";

const initialState = {
  isModalOpen: false,
  selectedDate: null,
  events: JSON.parse(localStorage.getItem("events")) || [],
  todos: JSON.parse(localStorage.getItem("todos")) || [],
  reminders: JSON.parse(localStorage.getItem("reminders")) || [],
  meetings: JSON.parse(localStorage.getItem("meetings")) || [],
};

const RECURRENCE_TYPES = {
  DAILY: "daily",
  WEEKDAYS: "weekdays",
  CUSTOM: "custom",
  WEEKLY: "weekly",
  MONTHLY: "monthly",
  YEARLY: "yearly",
  DOES_NOT_REPEAT: "doesnotrepeat",
};

const weekdayMappings = {
  mo: RRule.SU,
  tu: RRule.MO,
  we: RRule.TU,
  th: RRule.WE,
  fr: RRule.TH,
  sa: RRule.FR,
  su: RRule.SA,
};

const duration = 60 * 60 * 1000;

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isModalOpen = true;
      state.selectedDate = action.payload;
      console.log("action", action);
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.selectedDate = null;
    },
    addEvent: (state, action) => {
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
      } = action.payload;

      const generateRecurringEvents = () => {
        if (recurrence === RECURRENCE_TYPES.WEEKDAYS) {
          // Handle weekdays (Monday to Friday)
          const weekdaysRule = new RRule({
            freq: RRule.WEEKLY,
            byweekday: [
              RRule.SU,
              RRule.MO,
              RRule.TU,
              RRule.WE,
              RRule.TH,
              RRule.FR,
            ],
            dtstart: new Date(`${startDate}T${startTime}`),
            until: new Date(`${endDate}T${endTime}`),
          });

          const recurringDates = weekdaysRule.all();

          recurringDates.forEach((recurringDate) => {
            const newEvent = {
              id: uuidv4(),
              title,
              start: recurringDate,
              end: new Date(recurringDate.getTime() + duration),
              color,
              recurrence,
              reminderTime,
            };
            state.events.push(newEvent);
          });
        } else if (recurrence === RECURRENCE_TYPES.CUSTOM) {
          // Handle custom recurrence logic
          const customRule = new RRule({
            freq: RRule.WEEKLY,
            byweekday: CustomDays.map(
              (day) => weekdayMappings[day.toLowerCase()]
            ), // Map to RRule values
            dtstart: new Date(`${startDate}T${startTime}`),
            until: new Date(`${endDate}T${endTime}`),
          });

          const recurringDates = customRule.all();

          recurringDates.forEach((recurringDate) => {
            const newEvent = {
              id: uuidv4(),
              title,
              start: recurringDate,
              end: new Date(recurringDate.getTime() + duration),
              color,
              recurrence,
              reminderTime,
            };
            state.events.push(newEvent);
          });
        } else {
          // Handle other recurrence types using the existing logic
          const ruleOptions = {
            freq: RRule[recurrence.toUpperCase()],
            dtstart: new Date(`${startDate}T${startTime}`),
            until: new Date(`${endDate}T${endTime}`),
          };

          const rule = new RRule(ruleOptions);

          const recurringDates = rule.all();

          recurringDates.forEach((recurringDate) => {
            const newEvent = {
              id: uuidv4(),
              title,
              start: recurringDate,
              end: new Date(recurringDate.getTime() + duration),
              color,
              recurrence,
              reminderTime,
            };
            state.events.push(newEvent);
          });
        }
      };

      // If the event is recurring, generate recurring events; otherwise, create a single event
      if (recurrence !== RECURRENCE_TYPES.DOES_NOT_REPEAT) {
        generateRecurringEvents();
      } else {
        const newEvent = {
          id: uuidv4(),
          title,
          start: new Date(`${startDate}T${startTime}`),
          end: new Date(`${endDate}T${endTime}`),
          color,
          recurrence,
          reminderTime,
        };
        state.events.push(newEvent);
      }
    },

    addTodo: (state, action) => {
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
      } = action.payload;

      const generateRecurringTodos = () => {
        if (recurrence === RECURRENCE_TYPES.WEEKDAYS) {
          // Handle weekdays (Monday to Friday)
          const weekdaysRule = new RRule({
            freq: RRule.WEEKLY,
            byweekday: [
              RRule.SU,
              RRule.MO,
              RRule.TU,
              RRule.WE,
              RRule.TH,
              RRule.FR,
            ],
            dtstart: new Date(`${startDate}T${startTime}`),
            until: new Date(`${endDate}T${endTime}`),
          });

          const recurringDates = weekdaysRule.all();

          recurringDates.forEach((recurringDate) => {
            const newTodo = {
              id: uuidv4(),
              title,
              start: recurringDate,
              end: new Date(recurringDate.getTime() + duration),
              color,
              recurrence,
              reminderTime,
            };
            state.todos.push(newTodo);
          });
        } else if (recurrence === RECURRENCE_TYPES.CUSTOM) {
          // Handle custom recurrence logic
          const customRule = new RRule({
            freq: RRule.WEEKLY,
            byweekday: CustomDays.map(
              (day) => weekdayMappings[day.toLowerCase()]
            ), // Map to RRule values
            dtstart: new Date(`${startDate}T${startTime}`),
            until: new Date(`${endDate}T${endTime}`),
          });

          const recurringDates = customRule.all();

          recurringDates.forEach((recurringDate) => {
            const newTodo = {
              id: uuidv4(),
              title,
              start: recurringDate,
              end: new Date(recurringDate.getTime() + duration),
              color,
              recurrence,
              reminderTime,
            };
            state.todos.push(newTodo);
          });
        } else {
          // Handle other recurrence types using the existing logic
          const ruleOptions = {
            freq: RRule[recurrence.toUpperCase()],
            dtstart: new Date(`${startDate}T${startTime}`),
            until: new Date(`${endDate}T${endTime}`),
          };

          const rule = new RRule(ruleOptions);

          const recurringDates = rule.all();

          recurringDates.forEach((recurringDate) => {
            const newTodo = {
              id: uuidv4(),
              title,
              start: recurringDate,
              end: new Date(recurringDate.getTime() + duration),
              color,
              recurrence,
              reminderTime,
            };
            state.todos.push(newTodo);
          });
        }
      };

      // If the todo is recurring, generate recurring todos; otherwise, create a single todo
      if (recurrence !== RECURRENCE_TYPES.DOES_NOT_REPEAT) {
        generateRecurringTodos();
      } else {
        const newTodo = {
          id: uuidv4(),
          title,
          start: new Date(`${startDate}T${startTime}`),
          end: new Date(`${endDate}T${endTime}`),
          color,
          recurrence,
          reminderTime,
        };
        state.todos.push(newTodo);
      }
    },

    addReminder: (state, action) => {
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
      } = action.payload;

      const generateRecurringReminders = () => {
        if (recurrence === RECURRENCE_TYPES.WEEKDAYS) {
          // Handle weekdays (Monday to Friday)
          const weekdaysRule = new RRule({
            freq: RRule.WEEKLY,
            byweekday: [
              RRule.SU,
              RRule.MO,
              RRule.TU,
              RRule.WE,
              RRule.TH,
              RRule.FR,
            ],
            dtstart: new Date(`${startDate}T${startTime}`),
            until: new Date(`${endDate}T${endTime}`),
          });

          const recurringDates = weekdaysRule.all();

          recurringDates.forEach((recurringDate) => {
            const newReminder = {
              id: uuidv4(),
              title,
              reminderTime,
              start: recurringDate,
              end: new Date(recurringDate.getTime() + duration),
              color,
              recurrence,
            };
            state.reminders.push(newReminder);
          });
        } else if (recurrence === RECURRENCE_TYPES.CUSTOM) {
          // Handle custom recurrence logic
          const customRule = new RRule({
            freq: RRule.WEEKLY,
            byweekday: CustomDays.map(
              (day) => weekdayMappings[day.toLowerCase()]
            ), // Map to RRule values
            dtstart: new Date(`${startDate}T${startTime}`),
            until: new Date(`${endDate}T${endTime}`),
          });

          const recurringDates = customRule.all();

          recurringDates.forEach((recurringDate) => {
            const newReminder = {
              id: uuidv4(),
              title,
              reminderTime,
              start: recurringDate,
              end: new Date(recurringDate.getTime() + duration),
              color,
              recurrence,
            };
            state.reminders.push(newReminder);
          });
        } else {
          // Handle other recurrence types using the existing logic
          const ruleOptions = {
            freq: RRule[recurrence.toUpperCase()],
            dtstart: new Date(`${startDate}T${startTime}`),
            until: new Date(`${endDate}T${endTime}`),
          };

          const rule = new RRule(ruleOptions);

          const recurringDates = rule.all();

          recurringDates.forEach((recurringDate) => {
            const newReminder = {
              id: uuidv4(),
              title,
              reminderTime,
              start: recurringDate,
              end: new Date(recurringDate.getTime() + duration),
              color,
              recurrence,
            };
            state.reminders.push(newReminder);
          });
        }
      };

      // If the reminder is recurring, generate recurring reminders; otherwise, create a single reminder
      if (recurrence !== RECURRENCE_TYPES.DOES_NOT_REPEAT) {
        generateRecurringReminders();
      } else {
        const newReminder = {
          id: uuidv4(),
          title,
          reminderTime,
          start: new Date(`${startDate}T${startTime}`),
          end: new Date(`${endDate}T${endTime}`),
          color,
          recurrence,
        };
        state.reminders.push(newReminder);
      }
    },

    addMeeting: (state, action) => {
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
      } = action.payload;

      const generateRecurringMeetings = () => {
        if (recurrence === RECURRENCE_TYPES.WEEKDAYS) {
          const weekdaysRule = new RRule({
            freq: RRule.WEEKLY,
            byweekday: [
              RRule.SU,
              RRule.MO,
              RRule.TU,
              RRule.WE,
              RRule.TH,
              RRule.FR,
            ],
            dtstart: new Date(`${startDate}T${startTime}`),
            until: new Date(`${endDate}T${endTime}`),
          });

          const recurringDates = weekdaysRule.all();

          recurringDates.forEach((recurringDate) => {
            const newMeeting = {
              id: uuidv4(),
              title,
              start: recurringDate,
              end: new Date(recurringDate.getTime() + duration),
              color,
              recurrence,
              reminderTime,
            };
            state.meetings.push(newMeeting);
          });
        } else if (recurrence === RECURRENCE_TYPES.CUSTOM) {
          const customRule = new RRule({
            freq: RRule.WEEKLY,
            byweekday: CustomDays.map(
              (day) => weekdayMappings[day.toLowerCase()]
            ),
            dtstart: new Date(`${startDate}T${startTime}`),
            until: new Date(`${endDate}T${endTime}`),
          });

          const recurringDates = customRule.all();

          recurringDates.forEach((recurringDate) => {
            const newMeeting = {
              id: uuidv4(),
              title,
              start: recurringDate,
              end: new Date(recurringDate.getTime() + duration),
              color,
              recurrence,
              reminderTime,
            };
            state.meetings.push(newMeeting);
          });
        } else {
          const ruleOptions = {
            freq: RRule[recurrence.toUpperCase()],
            dtstart: new Date(`${startDate}T${startTime}`),
            until: new Date(`${endDate}T${endTime}`),
          };

          const rule = new RRule(ruleOptions);

          const recurringDates = rule.all();

          recurringDates.forEach((recurringDate) => {
            const newMeeting = {
              id: uuidv4(),
              title,
              start: recurringDate,
              end: new Date(recurringDate.getTime() + duration),
              color,
              recurrence,
              reminderTime,
            };
            state.meetings.push(newMeeting);
          });
        }
      };

      if (recurrence !== RECURRENCE_TYPES.DOES_NOT_REPEAT) {
        generateRecurringMeetings();
      } else {
        const newMeeting = {
          id: uuidv4(),
          title,
          start: new Date(`${startDate}T${startTime}`),
          end: new Date(`${endDate}T${endTime}`),
          color,
          recurrence,
          reminderTime,
        };
        state.meetings.push(newMeeting);
      }
    },

    updateEvent: (state, action) => {
      const { id, start, end, allDay } = action.payload;

      // Check if the event is in the 'events' array
      const isEvent = state.events.some((event) => event.id === id);

      // Check if the event is in the 'todos' array
      const isTodo = state.todos.some((todo) => todo.id === id);

      // Check if the event is in the 'reminders' array
      const isReminder = state.reminders.some((reminder) => reminder.id === id);

      // Check if the event is in the 'meetings' array
      const isMeeting = state.meetings.some((meeting) => meeting.id === id);

      if (isEvent) {
        state.events = state.events.map((event) =>
          event.id === id ? { ...event, start, end, allDay } : event
        );
      } else if (isTodo) {
        state.todos = state.todos.map((todo) =>
          todo.id === id ? { ...todo, start, end, allDay } : todo
        );
      } else if (isReminder) {
        state.reminders = state.reminders.map((reminder) =>
          reminder.id === id ? { ...reminder, start, end, allDay } : reminder
        );
      } else if (isMeeting) {
        state.meetings = state.meetings.map((meeting) =>
          meeting.id === id ? { ...meeting, start, end, allDay } : meeting
        );
      }
    },
  },
});

export const {
  openModal,
  closeModal,
  addEvent,
  addTodo,
  addReminder,
  addMeeting,
  updateEvent,
} = calendarSlice.actions;

export const selectCalendar = (state) => state.calendar;

export default calendarSlice.reducer;
