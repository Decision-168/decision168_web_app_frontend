import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import { Box, Grid, IconButton, Stack, TextField, MenuItem, Chip, FormControl, Select } from "@mui/material";
import ScrollableContainer from "../../common/ScrollableContainer";
import "react-perfect-scrollbar/dist/css/styles.css";
import { useTheme } from "@mui/material/styles";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomMultilineTextField from "../../common/CustomMultilineTextField";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { formatPriority } from "../../../helpers/tasks";
import { priorities, priorityColors, timeOptions, reminderOptions } from "../data";
import TasksModuleDatePicker from "../../Tasks/subComponents/TasksModuleDatePicker";

export default function TodoAccordion() {
  const theme = useTheme();
  const [events, setEvents] = useState([
    {
      title: "Todo 1",
      event_note: "note 1",
      task_priority: "No Priority",
      time: "6:15 AM",
      event_reminder: "5 minutes before",
      expand: false,
      complete: false,
      titleEditMode: false,
      noteEditMode: false,
      priorityEdit: false,
      timeEdit: false,
    },
    {
      title: "Todo 2",
      event_note: "note 2",
      task_priority: "High Priority",
      time: "6:15 AM",
      event_reminder: "5 minutes before",
      expand: false,
      complete: false,
      titleEditMode: false,
      noteEditMode: false,
      priorityEdit: false,
      timeEdit: false,
      reminderEdit: false,
    },
    {
      title: "Todo 3",
      event_note: "note 3",
      task_priority: "Medium Priority",
      time: "6:15 AM",
      event_reminder: "10 minutes before",
      expand: false,
      complete: false,
      titleEditMode: false,
      noteEditMode: false,
      priorityEdit: false,
      timeEdit: false,
      reminderEdit: false,
    },
    {
      title: "Todo 4",
      event_note: "note 4",
      task_priority: "Low Priority",
      time: "6:15 AM",
      event_reminder: "15 minutes before",
      expand: false,
      complete: false,
      titleEditMode: false,
      noteEditMode: false,
      priorityEdit: false,
      timeEdit: false,
      reminderEdit: false,
    },
  ]);

  const handleAccordionChange = (index) => {
    setEvents((prevEvents) => prevEvents.map((event, i) => (i === index ? { ...event, expand: !event.expand } : event)));
  };

  //Title
  const handleEditTitle = (index) => {
    setEvents((prevEvents) => prevEvents.map((event, i) => (i === index ? { ...event, titleEditMode: true } : event)));
  };

  const handleTitleChange = (event, index) => {
    const { value } = event.target;
    setEvents((prevEvents) => prevEvents.map((event, i) => (i === index ? { ...event, title: value } : event)));
  };

  const handleSaveTitle = (index) => {
    setEvents((prevEvents) => prevEvents.map((event, i) => (i === index ? { ...event, titleEditMode: false } : event)));
  };

  const handleCancelTitleEdit = (index) => {
    setEvents((prevEvents) => prevEvents.map((event, i) => (i === index ? { ...event, titleEditMode: false } : event)));
  };

  //note
  const handleEditNote = (index) => {
    setEvents((prevEvents) => prevEvents.map((event, i) => (i === index ? { ...event, noteEditMode: true } : event)));
  };

  const handleNoteChange = (event, index) => {
    const { value } = event.target;
    setEvents((prevEvents) => prevEvents.map((event, i) => (i === index ? { ...event, event_note: value } : event)));
  };

  const handleSaveNote = (index) => {
    setEvents((prevEvents) => prevEvents.map((event, i) => (i === index ? { ...event, noteEditMode: false } : event)));
  };

  const handleCancelNoteEdit = (index) => {
    setEvents((prevEvents) => prevEvents.map((event, i) => (i === index ? { ...event, noteEditMode: false } : event)));
  };

  //checkbox
  const handleCheckbox = (index) => {
    setEvents((prevEvents) => prevEvents.map((event, i) => (i === index ? { ...event, complete: !event.complete } : event)));
  };

  // Priority
  const handleEditPriority = (index) => {
    setEvents((prevEvents) => prevEvents.map((event, i) => (i === index ? { ...event, priorityEdit: true } : event)));
  };

  const handlePriorityChange = (event, index) => {
    const { value } = event.target;
    setEvents((prevEvents) => prevEvents.map((event, i) => (i === index ? { ...e, task_priority: value, priorityEdit: false } : event)));
  };

  //time
  const handleEditTime = (index) => {
    setEvents((prevEvents) => prevEvents.map((event, i) => (i === index ? { ...event, timeEdit: true } : event)));
  };

  const handleTimeChange = (event, index) => {
    const { value } = event.target;
    setEvents((prevEvents) => prevEvents.map((event, i) => (i === index ? { ...e, time: value, timeEdit: false } : event)));
  };

  //date
  const handleDate = (date) => {
    alert(date);
  };

  //reminder
  const handleEditReminder = (index) => {
    setEvents((prevEvents) => prevEvents.map((event, i) => (i === index ? { ...event, reminderEdit: true } : event)));
  };

  const handleReminderChange = (event, index) => {
    const { value } = event.target;
    setEvents((prevEvents) => prevEvents.map((event, i) => (i === index ? { ...event, event_reminder: value, reminderEdit: false } : event)));
  };

  return (
    <ScrollableContainer>
      <Box sx={{ p: 2 }}>
        {events.map((event, index) => (
          <Accordion key={index} expanded={event.expand} onChange={() => handleAccordionChange(index)}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor: event.expand ? "#F2F2F2" : "inherit", borderBottom: "0.5px solid #CCCCCC" }}>
              {event.complete ? <CheckCircleOutlinedIcon color="primary" sx={{ fontSize: "1.2rem", mr: 1 }} /> : <CircleOutlinedIcon color="secondary" sx={{ fontSize: "1.2rem", mr: 1 }} />}
              <Typography sx={{ fontSize: "12px" }}>{event.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <Grid item xs={12} sm={7} md={8}>
                  <Stack direction="row" justifyContent="start" alignItems="center" spacing={1}>
                    {event.titleEditMode ? (
                      <TextField name="tname" label="" variant="outlined" fullWidth value={event.title} onChange={(e) => handleTitleChange(e, index)} />
                    ) : (
                      <>
                        <IconButton size="small" type="button" sx={{ fontSize: "1rem" }} onClick={() => handleEditTitle(index)}>
                          <EditIcon fontSize="inherit" />
                        </IconButton>
                        <Typography
                          component="p"
                          variant="caption"
                          display="block"
                          sx={{
                            textDecoration: "none",
                            color: theme.palette.secondary.dark,
                            cursor: "pointer",
                            fontSize: "13px",
                            fontWeight: "400",
                          }}
                          gutterBottom
                          ml={1}
                          textAlign="left"
                        >
                          {event.title}
                        </Typography>
                      </>
                    )}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      {event.titleEditMode && (
                        <>
                          <IconButton size="small" type="button" sx={{ fontSize: "1rem" }} onClick={() => handleCancelTitleEdit(index)}>
                            <CancelIcon fontSize="inherit" />
                          </IconButton>
                          <IconButton size="small" type="button" sx={{ fontSize: "1rem" }} onClick={() => handleSaveTitle(index)}>
                            <SaveIcon fontSize="inherit" />
                          </IconButton>
                        </>
                      )}
                    </Box>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={3} md={3}>
                  <Chip
                    onClick={() => handleCheckbox(index)}
                    icon={event.complete ? <CheckCircleOutlinedIcon color="inherit" fontSize="small" /> : <CircleOutlinedIcon fontSize="small" color="inherit" />}
                    label={event.complete ? "Complete" : "Incomplete"}
                    variant="contained"
                    sx={{
                      backgroundColor: event.complete ? "#4CAF50" : "#E4E4E4",
                      width: "100%",
                      justifyContent: "left",
                      "&:hover": {
                        backgroundColor: event.complete ? "#388E3C" : "#E4E4E4",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={2} md={1}>
                  <IconButton size="small" sx={{ fontSize: "1.2rem" }}>
                    <DeleteIcon color="secondary" fontSize="inherit" />
                  </IconButton>
                </Grid>
              </Grid>

              <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <Grid item xs={12} sm={7} md={8}>
                  <Stack direction="row" justifyContent="start" alignItems="center" spacing={1} sx={{ width: "100%" }}>
                    {event.noteEditMode ? (
                      <CustomMultilineTextField label="" name="event_note" required={false} placeholder="Note" value={event.event_note} onChange={(event) => handleNoteChange(event, index)} rows={2} />
                    ) : (
                      <>
                        <IconButton size="small" type="button" sx={{ fontSize: "1rem" }} onClick={() => handleEditNote(index)}>
                          <EditIcon fontSize="inherit" />
                        </IconButton>
                        <Typography
                          component="p"
                          variant="caption"
                          display="block"
                          sx={{
                            textDecoration: "none",
                            color: theme.palette.secondary.dark,
                            cursor: "pointer",
                            fontSize: "13px",
                            fontWeight: "400",
                          }}
                          gutterBottom
                          ml={1}
                          textAlign="left"
                        >
                          {event.event_note}
                        </Typography>
                      </>
                    )}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      {event.noteEditMode && (
                        <>
                          <IconButton size="small" type="button" sx={{ fontSize: "1rem" }} onClick={() => handleCancelNoteEdit(index)}>
                            <CancelIcon fontSize="inherit" />
                          </IconButton>
                          <IconButton size="small" type="button" sx={{ fontSize: "1rem" }} onClick={() => handleSaveNote(index)}>
                            <SaveIcon fontSize="inherit" />
                          </IconButton>
                        </>
                      )}
                    </Box>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={3} md={3} textAlign="left">
                  <Box sx={{ minWidth: 120 }}>
                    {event.priorityEdit ? (
                      <FormControl fullWidth>
                        <Select value={event.task_priority || ""} onChange={(event) => handlePriorityChange(event, index)}>
                          {priorities.map((priority, index) => (
                            <MenuItem key={index} value={priority}>
                              <Typography component="p" variant="caption" display="block">
                                {priority}
                              </Typography>
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    ) : (
                      <Chip
                        onClick={() => handleEditPriority(index)}
                        icon={<ExpandMoreIcon color="inherite" />}
                        label={formatPriority(event.task_priority || "")}
                        variant="contained"
                        sx={{
                          width: "100%",
                          justifyContent: "left",
                          ...priorityColors[event.task_priority.split(" ")[0]],
                          "&:hover": {
                            ...priorityColors[event.task_priority.split(" ")[0]],
                          },
                        }}
                      />
                    )}
                  </Box>
                </Grid>
                <Grid item xs={12} sm={2} md={1}>
                  &nbsp;
                </Grid>
              </Grid>

              <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <Grid item xs={12} sm={3} md={3} textAlign="left">
                  <Box sx={{ minWidth: 120 }}>
                    {event.reminderEdit ? (
                      <FormControl fullWidth>
                        <Select value={event.event_reminder || ""} onChange={(event) => handleReminderChange(event, index)}>
                          {reminderOptions.map((reminder, index) => (
                            <MenuItem key={index} value={reminder}>
                              <Typography component="p" variant="caption" display="block">
                                {reminder}
                              </Typography>
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    ) : (
                      <Chip
                        onClick={() => handleEditReminder(index)}
                        icon={<ExpandMoreIcon color="inherit" fontSize="small" />}
                        label={event.event_reminder || "Select Reminder"}
                        variant="contained"
                        sx={{
                          width: "100%",

                          justifyContent: "left",
                          backgroundColor: "#E4E4E4",
                          "&:hover": {
                            backgroundColor: "#E4E4E4",
                          },
                        }}
                      />
                    )}
                  </Box>
                </Grid>
                <Grid item xs={12} sm={5} md={5} textAlign="center">
                  <TasksModuleDatePicker label="" required={false} sizeWidth="132px" showBorder={false} value={new Date()} onChange={handleDate} />
                </Grid>
                <Grid item xs={12} sm={3} md={3} textAlign="left">
                  <Box sx={{ minWidth: 120 }}>
                    {event.timeEdit ? (
                      <FormControl fullWidth>
                        <Select value={event.time || ""} onChange={(event) => handleTimeChange(event, index)}>
                          {timeOptions.map((time, index) => (
                            <MenuItem key={index} value={time}>
                              <Typography component="p" variant="caption" display="block">
                                {time}
                              </Typography>
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    ) : (
                      <Chip
                        onClick={() => handleEditTime(index)}
                        icon={<AccessTimeIcon color="inherit" fontSize="small" />}
                        label={event.time || "Select Time"}
                        variant="contained"
                        sx={{
                          width: "100%",

                          justifyContent: "left",
                          backgroundColor: "#E4E4E4",
                          "&:hover": {
                            backgroundColor: "#E4E4E4",
                          },
                        }}
                      />
                    )}
                  </Box>
                </Grid>
                <Grid item xs={12} sm={1} md={1}>
                  &nbsp;
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </ScrollableContainer>
  );
}
