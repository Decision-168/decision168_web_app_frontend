import React, { useEffect, useState } from "react";
import { Table, TableHead, TableBody, TableCell, TableContainer, TableRow, Paper, IconButton, Typography, Box, TextField, Select, MenuItem } from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CustomSelect from "../../common/CustomSelect";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const styles = {
  "&.css-1hng6jn-MuiInputBase-root-MuiOutlinedInput-root": {
    padding: "0",
  },
};

const data = [
  {
    id: 1,
    code: "AC-2560",
    task: "Design Portfolio",
    assignee: "John Doe",
    priority: "High",
    status: "In Review",
    dueDate: "2023-11-18",
    subRows: [{ code: "AC-2822", task: "Forgot password", assignee: "John Doe", priority: "High", status: "In Progress", dueDate: "2023-11-18" }],
  },
  {
    id: 2,
    code: "AC-2580",
    task: "Login through Social Media",
    assignee: "John Doe",
    priority: "High",
    status: "In Review",
    dueDate: "2023-11-18",
    subRows: [],
  },
  {
    id: 3,
    code: "AC-2570",
    task: "Design Dashboard",
    assignee: "John Doe",
    priority: "High",
    status: "In Review",
    dueDate: "2023-11-18",
    subRows: [
      { code: "AC-2823", task: "Forgot password", assignee: "John Doe", priority: "High", status: "In Progress", dueDate: "2023-11-18" },
      { code: "AC-2824", task: "Forgot password", assignee: "John Doe", priority: "High", status: "In Progress", dueDate: "2023-11-18" },
    ],
  },
  {
    id: 4,
    code: "AC-2590",
    task: "Login through Social Media",
    assignee: "John Doe",
    priority: "High",
    status: "In Review",
    dueDate: "2023-11-18",
    subRows: [
      { code: "AC-2823", task: "Forgot password", assignee: "John Doe", priority: "High", status: "In Progress", dueDate: "2023-11-18" },
      { code: "AC-2824", task: "Forgot password", assignee: "John Doe", priority: "High", status: "In Progress", dueDate: "2023-11-18" },
    ],
  },
];

// const taskAssignees = ["Assign To Me", "John Doe", "Smith", "Jams", "Sam"];
// const taskPriorities = ["High", "Medium", "Low"];
// const taskStatuses = ["To Do", "In Progress", "In Review", "Done"];

const taskAssignees = [
  { value: "assign to me", text: "Assign To Me", selected: true },
  { value: "john doe", text: "Jhon Doe", selected: false },
];

const taskStatuses = [
  { value: "to do", text: "To Do", selected: true },
  { value: "in progress", text: "In Progress", selected: false },
  { value: "in review", text: "In Review", selected: false },
  { value: "done", text: "Done", selected: false },
];

const taskPriorities = [
  { value: "high", text: "High", selected: true },
  { value: "medium", text: "Medium", selected: false },
  { value: "high", text: "High", selected: false },
];
const CollapsibleRow = () => {
  const [open, setOpen] = useState(false);
  const [expandedTaskId, setExpandedTaskId] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [taskId, setTaskId] = useState(-1);
  const [assignee, setAssignee] = React.useState("assign to me");
  const [priority, setPriority] = React.useState("medium");
  const [status, setStatus] = React.useState("to do");
  const [dueDate, setDueDate] = React.useState(dayjs("2022-04-17"));

  const handleToggle = (taskId) => {
    setExpandedTaskId(taskId);
    setOpen(!open);
  };

  const handleEdit = (taskId) => {
    setEditMode(true);
    setTaskId(taskId);
  };

  const handleSave = () => {
    setEditMode(false);
  };

  const handleChangeAssignee = (event) => {
    setAssignee(event.target.value);
  };

  const handleChangePriority = (event) => {
    setPriority(event.target.value);
  };

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleChangeDueDate = (event) => {
    setDueDate(event.target.value);
  };

  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Code</TableCell>
            <TableCell>Task</TableCell>
            <TableCell>Assignee</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Due Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <React.Fragment key={index}>
              <TableRow>
                <TableCell>
                  {item.subRows && item.subRows.length > 0 && (
                    <IconButton size="small" onClick={() => handleToggle(item.id)}>
                      {open && expandedTaskId === item.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                  )}
                </TableCell>
                <TableCell>
                  <FormGroup>
                    <FormControlLabel sx={{ color: "black" }} control={<Checkbox size="small" />} label={item.code} />
                  </FormGroup>
                </TableCell>
                <TableCell>
                  {editMode && taskId === item.id ? (
                    <Box
                      sx={{
                        height: "100%",
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "start",
                        flexDirection: "row",
                      }}>
                      <Box component="span" sx={{ height: "100%", width: "100%", mr: 1 }}>
                        <TextField fullWidth multiline maxRows={3} placeholder="Task description" defaultValue={item.task} />
                      </Box>
                      <IconButton onClick={() => handleSave()}>
                        <SaveIcon />
                      </IconButton>
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        height: "100%",
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "start",
                        flexDirection: "row",
                      }}>
                      <IconButton onClick={() => handleEdit(item.id)}>
                        <EditIcon />
                      </IconButton>
                      <Typography variant="subtitle2" component="h6" ml={1}>
                        {item.task}
                      </Typography>
                    </Box>
                  )}
                </TableCell>
                <TableCell>
                  <CustomSelect items={taskAssignees} label="" labelColor="" required={false} handleChange={handleChangeAssignee} value={assignee} />

                  {/* <Box sx={{ minWidth: 100 }}>
                    <FormControl fullWidth>
                      <Select name="assignee" id="assignee" value={assignee} onChange={handleChange}>
                        {taskAssignees.map((item, index) => (
                          <MenuItem key={index} value={item.value}>
                            {item.text}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box> */}
                </TableCell>
                <TableCell>
                  <CustomSelect items={taskPriorities} label="" labelColor="" required={false} handleChange={handleChangePriority} value={priority} />
                </TableCell>
                <TableCell>
                  <CustomSelect items={taskStatuses} label="" labelColor="" required={false} handleChange={handleChangeStatus} value={status} />
                </TableCell>
                <TableCell>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker", "DatePicker"]} sx={{ overflow: "hidden" }}>
                      <DatePicker defaultValue={dayjs(item.dueDate)} />
                      {/* <DatePicker label="Controlled picker" value={dueDate} onChange={handleChangeDueDate} /> */}
                    </DemoContainer>
                  </LocalizationProvider>
                </TableCell>
              </TableRow>
              {open && expandedTaskId === item.id && item.subRows && (
                <React.Fragment>
                  {item.subRows.map((subRow, subIndex) => (
                    <TableRow key={index}>
                      <TableCell></TableCell>

                      <TableCell>
                        <FormGroup>
                          <FormControlLabel sx={{ color: "black" }} control={<Checkbox size="small" />} label={item.code} />
                        </FormGroup>
                      </TableCell>
                      <TableCell>
                        {editMode && taskId === item.id ? (
                          <Box
                            sx={{
                              height: "100%",
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "start",
                              flexDirection: "row",
                            }}>
                            <Box component="span" sx={{ height: "100%", width: "100%", mr: 1 }}>
                              <TextField fullWidth multiline maxRows={3} placeholder="Task description" defaultValue={item.task} />
                            </Box>
                            <IconButton onClick={() => handleSave()}>
                              <SaveIcon />
                            </IconButton>
                          </Box>
                        ) : (
                          <Box
                            sx={{
                              height: "100%",
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "start",
                              flexDirection: "row",
                            }}>
                            <IconButton onClick={() => handleEdit(item.id)}>
                              <EditIcon />
                            </IconButton>
                            <Typography variant="subtitle2" component="h6" ml={1}>
                              {item.task}
                            </Typography>
                          </Box>
                        )}
                      </TableCell>
                      <TableCell>
                        <CustomSelect items={taskAssignees} label="" labelColor="" required={false} handleChange={handleChangeAssignee} value={assignee} />

                        {/* <Box sx={{ minWidth: 100 }}>
                    <FormControl fullWidth>
                      <Select name="assignee" id="assignee" value={assignee} onChange={handleChange}>
                        {taskAssignees.map((item, index) => (
                          <MenuItem key={index} value={item.value}>
                            {item.text}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box> */}
                      </TableCell>
                      <TableCell>
                        <CustomSelect items={taskPriorities} label="" labelColor="" required={false} handleChange={handleChangePriority} value={priority} />
                      </TableCell>
                      <TableCell>
                        <CustomSelect items={taskStatuses} label="" labelColor="" required={false} handleChange={handleChangeStatus} value={status} />
                      </TableCell>
                      <TableCell>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={["DatePicker", "DatePicker"]} sx={{ overflow: "hidden" }}>
                            <DatePicker defaultValue={dayjs(item.dueDate)} />
                            {/* <DatePicker label="Controlled picker" value={dueDate} onChange={handleChangeDueDate} /> */}
                          </DemoContainer>
                        </LocalizationProvider>
                      </TableCell>
                    </TableRow>
                  ))}
                </React.Fragment>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CollapsibleRow;
