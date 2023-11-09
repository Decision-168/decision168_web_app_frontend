import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { tasks, taskAssignees, taskPriorities, taskStatuses } from "../subComponents/TasksData";
import Actions from "./Actions";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ReorderIcon from "@mui/icons-material/Reorder";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import SubdirectoryArrowRightRoundedIcon from "@mui/icons-material/SubdirectoryArrowRightRounded";
import { Box, FormControl, MenuItem, Select, Typography } from "@mui/material";
import CustomTextField from "../../common/CustomTextField";
import { useForm } from "react-hook-form";
import { globalValidations } from "../../../utils/GlobalValidation";
import Chip from "@mui/material/Chip";
import { getStatusStyle } from "../../../helpers/getStatusStyle";
import { getPriorityStyle } from "../../../helpers/getPriorityStyle ";
import MyDatePicker from "./MyDatePicker ";

export default function TaskTable() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [rows, setRows] = useState(tasks);
  const [openSubrows, setOpenSubrows] = useState(false);
  const [expandedTaskId, setExpandedTaskId] = useState(0);
  const [rowId, setRowId] = useState(0);
  const [editMode, setEditMode] = useState(false);

  const [selectedAssignee, setSelectedAssignee] = useState("john doe");
  const [selectedPriority, setSelectedPriority] = useState("high");
  const [selectedStatus, setSelectedStatus] = useState("in progress");

  const [editAssignee, setEditAssignee] = useState(false);
  const [editPriority, setEditPriority] = useState(false);
  const [editStatus, setEditStatus] = useState(false);

  const statusBg = getStatusStyle(selectedStatus);
  const priorityBg = getPriorityStyle(selectedPriority);

  const handleDragEnd = (e) => {
    if (!e.destination) return;
    let tempData = Array.from(rows);
    let [source_data] = tempData.splice(e.source.index, 1);
    tempData.splice(e.destination.index, 0, source_data);
    setRows(tempData);
    setOpenSubrows(false);
  };

  const handleToggleSubrows = (taskId) => {
    setExpandedTaskId(taskId);
    setOpenSubrows(!openSubrows);
  };

  const handleTaskDescription = (rowId) => {
    if (editMode) {
      //write logic for task description
      setEditMode(false);
    } else {
      setEditMode(true);
      setRowId(rowId);
    }
  };

  //   for tasks descrition
  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  const handleEditAssignee = (rowId) => {
    setRowId(rowId);
    setEditAssignee(true);
  };

  const handleAssignee = (event, rowId) => {
    setEditAssignee(false);
    setSelectedAssignee(event.target.value);
  };

  const handleEditPriority = (rowId) => {
    setRowId(rowId);
    setEditPriority(true);
  };

  const handlePriority = (event, rowId) => {
    setEditPriority(false);
    setSelectedPriority(event.target.value);
  };

  const handleEditStatus = (rowId) => {
    setRowId(rowId);
    setEditStatus(true);
  };

  const handleStatus = (event, rowId) => {
    setEditStatus(false);
    setSelectedStatus(event.target.value);
  };

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <TableContainer component={Paper} sx={{ minHeight: "72vh" }}>
          <Table sx={{ minWidth: "650px" }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">&nbsp;</TableCell>
                <TableCell align="center">Code</TableCell>
                <TableCell align="center">Task</TableCell>
                <TableCell align="center">Assignee</TableCell>
                <TableCell align="center">Priority</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Due Date</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <Droppable droppableId="droppable-1">
              {(provider) => (
                <TableBody ref={provider.innerRef} {...provider.droppableProps}>
                  {rows.map((row, index) => (
                    <Draggable key={row.code} draggableId={row.code} index={index}>
                      {(provider) => (
                        <React.Fragment key={row.code}>
                          <TableRow sx={{ " &:last-child th": { border: 0 }, width: "100%", bgcolor: "white" }} {...provider.draggableProps} ref={provider.innerRef}>
                            {/* Icons */}
                            <TableCell sx={{ width: "10%" }} align="center">
                              <Stack direction="row" justifyContent="start" alignItems="center" spacing={1}>
                                <Tooltip title="Reorder row" arrow size="small" placement="top-start">
                                  <IconButton size="small" component="span" {...provider.dragHandleProps}>
                                    <ReorderIcon />
                                  </IconButton>
                                </Tooltip>

                                {row.subRows && row.subRows.length > 0 && (
                                  <IconButton size="small" onClick={() => handleToggleSubrows(row.id)}>
                                    {openSubrows && expandedTaskId === row.id ? (
                                      <Tooltip title="Hide subrows" arrow size="small" placement="top-start">
                                        <ExpandLessIcon />
                                      </Tooltip>
                                    ) : (
                                      <Tooltip title="Show subrows" arrow size="small" placement="top-start">
                                        <ExpandMoreIcon />
                                      </Tooltip>
                                    )}
                                  </IconButton>
                                )}
                              </Stack>
                            </TableCell>

                            {/* Code */}
                            <TableCell sx={{ width: "10%" }} align="center">
                              <FormGroup sx={{ width: "100px" }}>
                                <FormControlLabel sx={{ color: "black" }} control={<Checkbox size="small" />} label={row.code} />
                              </FormGroup>
                            </TableCell>

                            {/* Task Description */}
                            <TableCell sx={{ width: "30%" }} align="left">
                              <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ height: "100%" }}>
                                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
                                  {editMode && rowId === row.id ? (
                                    <CustomTextField
                                      name="taskDescription"
                                      placeholder="Enter Task description..."
                                      register={register}
                                      errors={errors}
                                      validation={globalValidations.taskDescription} // Pass the validation rules as a prop
                                    />
                                  ) : (
                                    <Typography component="p" variant="caption" display="block" gutterBottom ml={1}>
                                      {row.description}
                                    </Typography>
                                  )}
                                  <Tooltip title={editMode ? "Save task" : "Edit task"} arrow size="small" placement="top-start">
                                    <IconButton size="small" onClick={() => handleTaskDescription(row.id)}>
                                      {editMode && rowId === row.id ? <SaveIcon /> : <EditIcon />}
                                    </IconButton>
                                  </Tooltip>
                                </Stack>
                              </Box>
                            </TableCell>

                            {/* Assignee */}
                            <TableCell sx={{ width: "10%" }} align="center">
                              <Box sx={{ minWidth: 120 }}>
                                {editAssignee && rowId === row.id ? (
                                  <FormControl fullWidth>
                                    <Select value={selectedAssignee} onChange={(event) => handleAssignee(event, row.id)}>
                                      {taskAssignees.map((assignee, index) => (
                                        <MenuItem key={index} value={assignee.value}>
                                          <Typography component="p" variant="caption" display="block">
                                            {assignee.text}
                                          </Typography>
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                ) : (
                                  <Box>
                                    <Chip label={selectedAssignee} variant="contained" sx={{ minWidth: "80px", maxWidth: "85px" }} />
                                    <IconButton size="small" onClick={() => handleEditAssignee(row.id)}>
                                      <ExpandMoreIcon />
                                    </IconButton>
                                  </Box>
                                )}
                              </Box>
                            </TableCell>

                            {/* Priority */}
                            <TableCell sx={{ width: "10%" }} align="center">
                              <Box sx={{ minWidth: 120 }}>
                                {editPriority && rowId === row.id ? (
                                  <FormControl fullWidth>
                                    <Select value={selectedPriority} onChange={(event) => handlePriority(event, row.id)}>
                                      {taskPriorities.map((priority, index) => (
                                        <MenuItem key={index} value={priority.value}>
                                          <Typography component="p" variant="caption" display="block">
                                            {priority.text}
                                          </Typography>
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                ) : (
                                  <Box>
                                    <Chip label={selectedPriority} variant="contained" sx={{ minWidth: "80px", maxWidth: "85px", ...priorityBg }} />
                                    <IconButton size="small" onClick={() => handleEditPriority(row.id)}>
                                      <ExpandMoreIcon />
                                    </IconButton>
                                  </Box>
                                )}
                              </Box>
                            </TableCell>

                            {/* Status */}
                            <TableCell sx={{ width: "10%" }} align="center">
                              <Box sx={{ minWidth: 120 }}>
                                {editStatus && rowId === row.id ? (
                                  <FormControl fullWidth>
                                    <Select value={selectedStatus} onChange={(event) => handleStatus(event, row.id)}>
                                      {taskStatuses.map((status, index) => (
                                        <MenuItem key={index} value={status.value}>
                                          <Typography component="p" variant="caption" display="block">
                                            {status.text}
                                          </Typography>
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                ) : (
                                  <Box>
                                    <Chip label={selectedStatus} variant="contained" sx={{ minWidth: "80px", maxWidth: "85px", ...statusBg }} />
                                    <IconButton size="small" onClick={() => handleEditStatus(row.id)}>
                                      <ExpandMoreIcon />
                                    </IconButton>
                                  </Box>
                                )}
                              </Box>
                            </TableCell>

                            {/* Due Date */}
                            <TableCell sx={{ width: "20%" }} align="center">
                              <MyDatePicker label="" required={false} sizeWidth="155px" />
                            </TableCell>

                            {/* Actions */}
                            <TableCell sx={{ width: "20%" }} align="center">
                              <Actions />
                            </TableCell>
                          </TableRow>

                          {openSubrows &&
                            expandedTaskId === row.id &&
                            row.subRows.map((subrow, index) => (
                              <TableRow sx={{ " &:last-child th": { border: 0 }, width: "100%", bgcolor: "white" }}>
                                {/* Icons */}
                                <TableCell align="right">
                                  <IconButton size="small">
                                    <SubdirectoryArrowRightRoundedIcon />
                                  </IconButton>
                                </TableCell>

                                {/* Code */}
                                <TableCell align="center">
                                  <FormGroup sx={{ width: "100px" }}>
                                    <FormControlLabel sx={{ color: "black" }} control={<Checkbox size="small" />} label={row.code} />
                                  </FormGroup>
                                </TableCell>

                                {/* Task Description */}
                                <TableCell align="left">
                                  <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ height: "100%" }}>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
                                      {editMode && rowId === row.id ? (
                                        <CustomTextField
                                          name="taskDescription"
                                          placeholder="Enter Task description..."
                                          register={register}
                                          errors={errors}
                                          validation={globalValidations.taskDescription} // Pass the validation rules as a prop
                                        />
                                      ) : (
                                        <Typography component="p" variant="caption" display="block" gutterBottom ml={1}>
                                          {row.description}
                                        </Typography>
                                      )}
                                      <Tooltip title={editMode ? "Save task" : "Edit task"} arrow size="small" placement="top-start">
                                        <IconButton size="small" onClick={() => handleTaskDescription(row.id)}>
                                          {editMode && rowId === row.id ? <SaveIcon /> : <EditIcon />}
                                        </IconButton>
                                      </Tooltip>
                                    </Stack>
                                  </Box>
                                </TableCell>

                                {/* Assignee */}
                                <TableCell align="center">
                                  <Box sx={{ minWidth: 120 }}>
                                    {editAssignee && rowId === row.id ? (
                                      <FormControl fullWidth>
                                        <Select value={selectedAssignee} onChange={(event) => handleAssignee(event, row.id)}>
                                          {taskAssignees.map((assignee, index) => (
                                            <MenuItem key={index} value={assignee.value}>
                                              <Typography component="p" variant="caption" display="block">
                                                {assignee.text}
                                              </Typography>
                                            </MenuItem>
                                          ))}
                                        </Select>
                                      </FormControl>
                                    ) : (
                                      <Box>
                                        <Chip label={selectedAssignee} variant="contained" sx={{ minWidth: "80px", maxWidth: "85px" }} />
                                        <IconButton size="small" onClick={() => handleEditAssignee(row.id)}>
                                          <ExpandMoreIcon />
                                        </IconButton>
                                      </Box>
                                    )}
                                  </Box>
                                </TableCell>

                                {/* Priority */}
                                <TableCell align="center">
                                  <Box sx={{ minWidth: 120 }}>
                                    {editPriority && rowId === row.id ? (
                                      <FormControl fullWidth>
                                        <Select value={selectedPriority} onChange={(event) => handlePriority(event, row.id)}>
                                          {taskPriorities.map((priority, index) => (
                                            <MenuItem key={index} value={priority.value}>
                                              <Typography component="p" variant="caption" display="block">
                                                {priority.text}
                                              </Typography>
                                            </MenuItem>
                                          ))}
                                        </Select>
                                      </FormControl>
                                    ) : (
                                      <Box>
                                        <Chip label={selectedPriority} variant="contained" sx={{ minWidth: "80px", maxWidth: "85px", ...priorityBg }} />
                                        <IconButton size="small" onClick={() => handleEditPriority(row.id)}>
                                          <ExpandMoreIcon />
                                        </IconButton>
                                      </Box>
                                    )}
                                  </Box>
                                </TableCell>

                                {/* Status */}
                                <TableCell align="center">
                                  <Box sx={{ minWidth: 120 }}>
                                    {editStatus && rowId === row.id ? (
                                      <FormControl fullWidth>
                                        <Select value={selectedStatus} onChange={(event) => handleStatus(event, row.id)}>
                                          {taskStatuses.map((status, index) => (
                                            <MenuItem key={index} value={status.value}>
                                              <Typography component="p" variant="caption" display="block">
                                                {status.text}
                                              </Typography>
                                            </MenuItem>
                                          ))}
                                        </Select>
                                      </FormControl>
                                    ) : (
                                      <Box>
                                        <Chip label={selectedStatus} variant="contained" sx={{ minWidth: "80px", maxWidth: "85px", ...statusBg }} />
                                        <IconButton size="small" onClick={() => handleEditStatus(row.id)}>
                                          <ExpandMoreIcon />
                                        </IconButton>
                                      </Box>
                                    )}
                                  </Box>
                                </TableCell>

                                {/* Due Date */}
                                <TableCell align="center">
                                  <MyDatePicker label="" required={false} sizeWidth="155px" />
                                </TableCell>

                                {/* Actions */}
                                <TableCell sx={{ width: "20%" }} align="center">
                                  <Actions />
                                </TableCell>
                              </TableRow>
                            ))}
                        </React.Fragment>
                      )}
                    </Draggable>
                  ))}
                  {provider.placeholder}
                </TableBody>
              )}
            </Droppable>
          </Table>
        </TableContainer>
      </DragDropContext>
    </>
  );
}