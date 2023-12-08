import React, { useEffect, useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Tooltip,
  Stack,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  IconButton,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import {
  taskPriorities,
  priorityColors,
  taskStatuses,
  statusColors,
} from "../subComponents/TasksData";
import Actions from "./Actions";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ReorderIcon from "@mui/icons-material/Reorder";
import SubdirectoryArrowRightRoundedIcon from "@mui/icons-material/SubdirectoryArrowRightRounded";
import { Box, FormControl, Grid, MenuItem, Select, Typography } from "@mui/material";
import CustomTextField from "../../common/CustomTextField";
import { useForm } from "react-hook-form";
import { globalValidations } from "../../../utils/GlobalValidation";
import Chip from "@mui/material/Chip";
import { getStatusStyle } from "../../../helpers/getStatusStyle";
import { getPriorityStyle } from "../../../helpers/getPriorityStyle ";
import MyDatePicker from "./MyDatePicker ";
import ConfirmationDialog from "../../common/ConfirmationDialog";
import { openCnfModal, closeCnfModal } from "../../../redux/action/confirmationModalSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import CustomDialog from "../../common/CustomDialog";
import OverviewCard from "../taskOverview/subComponents/TaskOverviewCard";
import { taskOverviewStyles } from "../taskOverview/styles";
import TaskInfo from "./TaskInfo";
import PerfectScrollbar from "react-perfect-scrollbar";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import OverviewCardHeader from "../taskOverview/subComponents/TaskOverviewCardHeader";
import TaskPreview from "../taskOverview/subComponents/TaskPreview";
import SubtaskPreview from "../subtaskOverview/subComponent/SubtaskPreview";
import { useSelector } from "react-redux";
import CustomDatePicker from "../../common/CustomDatePicker";
import { parseISO } from "date-fns";
import {
  changeTaskStatusCheckox,
  editTaskAndSubtask,
  getAlltasksAndSubtasks,
} from "../../../api/modules/taskModule";
import { selectUserDetails } from "../../../redux/action/userSlice";
import { toast } from "react-toastify";
import { formatAssigneeText, formatPriority, formatStatus } from "../../../helpers/tasks";

export default function TaskTable() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const theme = useTheme();
  const styles = taskOverviewStyles();
  const dispatch = useDispatch();
  const portfolioId = JSON.parse(localStorage.getItem("portfolioId"));
  const user = useSelector(selectUserDetails);
  const regId = user?.reg_id;
  const [rows, setRows] = useState([]);
  const [openSubrows, setOpenSubrows] = useState(false);
  const [expandedTaskId, setExpandedTaskId] = useState(0);
  const [rowId, setRowId] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [taskAssignees, setTaskAssignees] = useState([]);
  const [selectedAssignees, setSelectedAssignees] = useState({});
  const [editAssignee, setEditAssignee] = useState(null);
  const [selectedPriorities, setSelectedPriorities] = useState({});
  const [selectedPriority, setSelectedPriority] = useState({});
  const [editPriority, setEditPriority] = useState(null);
  const [selectedStatuses, setSelectedStatuses] = useState({});
  const [editStatus, setEditStatus] = useState(null);
  const [rowStates, setRowStates] = useState({});
  const [taskName, setTaskName] = useState("");
  const [taskAssignee, setTaskAssignee] = useState(null);
  const [taskStatus, setTaskStatus] = useState(null);
  const [selectedDueDate, setSelectedDueDate] = useState(null);

  const fetchData = async () => {
    try {
      const response = await getAlltasksAndSubtasks(regId);
      setRows(response);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, [user?.reg_id]);

  // Fetch taskAssignees from API or another source
  useEffect(() => {
    // Replace this with your actual fetch logic
    // For example, if you're fetching from an API:
    // fetchAssignees().then((assignees) => setTaskAssignees(assignees));
    const fetchedAssignees = [{ value: regId, text: "To Me" }];
    setTaskAssignees(fetchedAssignees);
  }, []);

  // Set the initial selectedPriorities based on rows
  useEffect(() => {
    const initialSelectedPriorities = {};
    rows.forEach((row) => {
      if (row.tpriority) {
        initialSelectedPriorities[row.tid] = row.tpriority;
      }
    });
    setSelectedPriorities(initialSelectedPriorities);
  }, [rows]);

  // Set the initial selectedStatuses based on rows
  useEffect(() => {
    const initialSelectedStatuses = {};
    rows.forEach((row) => {
      if (row.tstatus) {
        initialSelectedStatuses[row.tid] = row.tstatus;
      }
    });
    setSelectedStatuses(initialSelectedStatuses);
  }, [rows]);

  // Set the initial selectedAssignees based on rows
  useEffect(() => {
    const initialSelectedAssignees = {};
    rows.forEach((row) => {
      if (row.tassignee) {
        initialSelectedAssignees[row.tid] = row.tassignee;
      }
    });
    setSelectedAssignees(initialSelectedAssignees);
  }, [rows]);

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

  const handleCodeCheckBoxDialog = (event, rowId, tAssignee, tStatus) => {
    alert(`${rowId}-${tAssignee}-${tStatus}${!event.target.checked}`);
    setRowId(rowId);
    setTaskAssignee(tAssignee);
    // for already checked and done
    if (!event.target.checked && tStatus === "done") {
      // If the checkbox is checked and status is done, open the dialog to make the status incomplete
      dispatch(
        openCnfModal({
          modalName: "changeCheckboxStatus",
          title: "",
          description: `Do you want to Change Task Status to Incomplete?`,
        })
      );
    } else if (event.target.checked && tStatus !== "done") {
      // If the checkbox is unchecked and the status is not done, open the dialog to make the status Complete
      dispatch(
        openCnfModal({
          modalName: "changeCheckboxStatus",
          title: "",
          description: `Do you want to Change Task Status to Complete?`,
        })
      );
    } else {
      dispatch(closeCnfModal({ modalName: "changeCheckboxStatus" }));
    }
  };

  const handleYes = async () => {
    const data = { tid: rowId, tassignee: taskAssignee };
    try {
      const response = await changeTaskStatusCheckox(regId, data);
      fetchData();
      dispatch(closeCnfModal({ modalName: "changeCheckboxStatus" }));
      toast.success(`${response.message}`);
    } catch (error) {
      toast.error(`${error?.response?.data?.error}`);
      console.error("Error in changing the task status:", error);
    }
  };

  const handleAssignee = (event, taskId) => {
    const newAssignee = event.target.value;
    // Update the selected assignees
    setSelectedAssignees((prevSelected) => ({
      ...prevSelected,
      [taskId]: newAssignee,
    }));
    // Handle the logic to update the assignee in the database, if needed

    // Close the assignee editing
    setEditAssignee(null);
  };

  const handleEditAssignee = (taskId) => {
    setEditAssignee(taskId);
  };

  const updatePriority = async (taskId, newPriority) => {
    try {
      const data = {
        div_class: "task_editable",
        div_field: "tpriority_field",
        div_id: taskId,
        txt: newPriority,
        user_id: regId,
      };

      // Assuming editTaskAndSubtask returns a Promise
      const response = await editTaskAndSubtask(portfolioId, data);
      // Fetch data after successful update
      fetchData();
      // Show success toast with the API response message
      toast.success(`${response?.message}`);
    } catch (error) {
      toast.error(`${error?.response?.data?.message}`);
      // Handle any errors that occur during the API call
      console.error("Error updating priority:", error);
    }
  };

  const handlePriority = async (event, taskId) => {
    const newPriority = event.target.value;
    // Update the priority in the database and handle states
    try {
      await updatePriority(taskId, newPriority);

      // Update the local state to reflect the change
      setSelectedPriorities((prevSelected) => ({
        ...prevSelected,
        [taskId]: newPriority,
      }));
      // Close the priority editing
      setEditPriority(null);
    } catch (error) {
      // Handle errors specific to the save operation if needed
      console.error("Error handling the priority:", error);
    }
  };

  const handleEditPriority = (taskId) => {
    setEditPriority(taskId);
  };

  const updateStatus = async (taskId, newStatus) => {
    try {
      const data = {
        div_class: "task_editable",
        div_field: "tstatus_field",
        div_id: taskId,
        txt: newStatus,
        user_id: regId,
      };

      // Assuming editTaskAndSubtask returns a Promise
      const response = await editTaskAndSubtask(portfolioId, data);
      // Fetch data after successful update
      fetchData();
      // Show success toast with the API response message
      toast.success(`${response?.message}`);
    } catch (error) {
      toast.error(`${error?.response?.data?.message}`);
      // Handle any errors that occur during the API call
      console.error("Error updating status:", error);
    }
  };

  const handleStatus = async (event, taskId) => {
    const newStatus = event.target.value;
    // Update the status in the database and handle states
    try {
      await updateStatus(taskId, newStatus);

      // Update the local state to reflect the change
      setSelectedStatuses((prevSelected) => ({
        ...prevSelected,
        [taskId]: newStatus,
      }));
      // Close the status editing
      setEditStatus(null);
    } catch (error) {
      // Handle errors specific to the save operation if needed
      console.error("Error handling the status:", error);
    }
  };

  const handleEditStatus = (taskId) => {
    setEditStatus(taskId);
  };

  const handleDueDateChange = (date) => {
    setSelectedDueDate(date);
  };

  const handleEditTaskClick = (taskId, taskName) => {
    setRowStates((prevRowStates) => ({
      ...prevRowStates,
      [taskId]: { editMode: true, taskName: taskName || "" },
    }));

    // Set the taskName state here as well
    setTaskName(taskName || "");
  };

  const handleCancelEdit = (taskId) => {
    setRowStates((prevRowStates) => ({
      ...prevRowStates,
      [taskId]: { editMode: false, taskName: rows.find((row) => row.tid === taskId)?.tname || "" },
    }));
  };

  const updateTaskName = async (taskId, taskName) => {
    try {
      const data = {
        div_class: "task_editable",
        div_field: "tname_field",
        div_id: taskId,
        txt: taskName,
        user_id: regId,
      };

      // Assuming editTaskAndSubtask returns a Promise
      const response = await editTaskAndSubtask(portfolioId, data);

      // Fetch data after successful update
      fetchData();

      // Show success toast with the API response message
      toast.success(`${response?.message}`);
    } catch (error) {
      toast.error(`${error?.response?.data?.message}`);
      // Handle any errors that occur during the API call
      console.error("Error updating task name:", error);
    }
  };

  const handleSaveTaskClick = async (taskId) => {
    // Update the task name in the database and handle states
    try {
      await updateTaskName(taskId, taskName);

      // Update the local state to reflect the change
      setRowStates((prevRowStates) => ({
        ...prevRowStates,
        [taskId]: { editMode: false, taskName: prevRowStates[taskId]?.taskName || "" },
      }));
    } catch (error) {
      // Handle errors specific to the save operation if needed
      console.error("Error handling save task click:", error);
    }
  };

  //Task PreviewDialog code
  const [openTaskPreviewDialog, setOpenTaskPreviewDialog] = React.useState(false);
  const [openSubTaskPreviewDialog, setOpenSubTaskPreviewDialog] = React.useState(false);
  const [filteredTask, setFilterTask] = useState(null);
  const [filteredSubTask, setFilterSubTask] = useState(null);

  // Task prview Dailog Code
  const handleOpenTaskPreviewDialog = (rowId) => {
    const filteredTaskRow = rows.filter((row, index) => row?.tid === rowId);
    setFilterTask(filteredTaskRow);
    setOpenTaskPreviewDialog(true);
  };
  const handleCloseTaskPreviewDialog = () => {
    setOpenTaskPreviewDialog(false);
  };

  // Sub Task prview Dailog Code
  const handleOpenSubTaskPreviewDialog = (subrowId) => {
    console.log(subrowId);
    const filteredSubTaskRow = rows.reduce((result, row) => {
      const matchingSubrow = row.subRows.find((subrow) => subrow.id === subrowId);
      if (matchingSubrow) {
        result.push(matchingSubrow);
      }
      return result;
    }, []);
    console.log(filteredSubTaskRow);
    setFilterSubTask(filteredSubTaskRow);
    setOpenSubTaskPreviewDialog(true);
  };

  const handleCloseSubTaskPreviewDialog = () => {
    setOpenSubTaskPreviewDialog(false);
  };

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <TableContainer component={Paper} sx={{ minHeight: "72vh" }}>
          <Table sx={{ minWidth: "650px" }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ width: "100%" }}>
                <TableCell align="left" sx={{ width: "10%" }}>
                  &nbsp;
                </TableCell>
                <TableCell align="left" sx={{ width: "10%" }}>
                  Code
                </TableCell>
                <TableCell align="left" sx={{ width: "30%" }}>
                  Task
                </TableCell>
                <TableCell align="center" sx={{ width: "5%" }}>
                  Assignee
                </TableCell>
                <TableCell align="center" sx={{ width: "5%" }}>
                  Priority
                </TableCell>
                <TableCell align="center" sx={{ width: "5%" }}>
                  Status
                </TableCell>
                <TableCell align="center" sx={{ width: "15%" }}>
                  Due Date
                </TableCell>
                <TableCell align="center" sx={{ width: "20%" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <Droppable droppableId="droppable-1">
              {(provider) => (
                <TableBody ref={provider.innerRef} {...provider.droppableProps}>
                  {rows?.map((row, index) => (
                    <Draggable key={row?.tid} draggableId={row?.tid?.toString()} index={index}>
                      {(provider) => (
                        <React.Fragment key={index}>
                          <TableRow
                            sx={{
                              " &:last-child th": { border: 0 },
                              width: "100%",
                              bgcolor: "white",
                              "&:hover": {
                                backgroundColor: "#F7F7F7",
                                "& .task-description": {
                                  color: theme.palette.primary.dark,
                                },
                              },
                            }}
                            {...provider.draggableProps}
                            ref={provider.innerRef}>
                            {/* Icons */}
                            <TableCell sx={{ width: "10%" }} align="center">
                              <Stack
                                direction="row"
                                justifyContent="start"
                                alignItems="center"
                                spacing={1}>
                                <Tooltip
                                  title="Reorder row"
                                  arrow
                                  size="small"
                                  placement="top-start">
                                  <IconButton
                                    size="small"
                                    component="span"
                                    {...provider.dragHandleProps}>
                                    <ReorderIcon />
                                  </IconButton>
                                </Tooltip>

                                {row?.subTasks && row?.subTasks?.length > 0 && (
                                  <IconButton
                                    size="small"
                                    onClick={() => handleToggleSubrows(row?.tid)}>
                                    {openSubrows && expandedTaskId === row?.tid ? (
                                      <Tooltip
                                        title="Hide subrows"
                                        arrow
                                        size="small"
                                        placement="top-start">
                                        <ExpandLessIcon />
                                      </Tooltip>
                                    ) : (
                                      <Tooltip
                                        title="Show subrows"
                                        arrow
                                        size="small"
                                        placement="top-start">
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
                                <FormControlLabel
                                  sx={{ color: "black" }}
                                  control={
                                    <Checkbox
                                      checked={row?.tstatus === "done"}
                                      size="small"
                                      onChange={(event) =>
                                        handleCodeCheckBoxDialog(
                                          event,
                                          row?.tid,
                                          row?.tassignee,
                                          row?.tstatus
                                        )
                                      }
                                    />
                                  }
                                  label={row?.tcode}
                                />
                              </FormGroup>
                            </TableCell>

                            {/* Task Name */}
                            <TableCell key={row.tid} sx={{ width: "30%" }} align="left">
                              <Box component="form" noValidate sx={{ height: "100%" }}>
                                <Stack
                                  direction="row"
                                  justifyContent="space-between"
                                  alignItems="center"
                                  spacing={1}>
                                  {rowStates[row.tid]?.editMode ? (
                                    <TextField
                                      name="tname"
                                      label=""
                                      variant="outlined"
                                      value={rowStates[row.tid]?.taskName}
                                      onChange={(e) => {
                                        setTaskName(e.target.value);
                                        setRowStates((prevRowStates) => ({
                                          ...prevRowStates,
                                          [row.tid]: {
                                            ...prevRowStates[row.tid],
                                            taskName: e.target.value,
                                          },
                                        }));
                                      }}
                                      fullWidth
                                      InputProps={{
                                        style: { border: "none", background: "transparent" },
                                      }}
                                    />
                                  ) : (
                                    <Typography
                                      onClick={() => handleOpenTaskPreviewDialog(row?.tid)}
                                      className="task-description"
                                      sx={{
                                        textDecoration: "none",
                                        color: theme.palette.secondary.dark,
                                        fontSize: "13px",
                                        fontWeight: "400",
                                      }}>
                                      {row?.tname}
                                    </Typography>
                                  )}

                                  {rowStates[row.tid]?.editMode ? (
                                    <>
                                      <Tooltip
                                        title="Save task"
                                        arrow
                                        size="small"
                                        placement="top-start">
                                        <IconButton
                                          size="small"
                                          sx={{ fontSize: "1rem" }}
                                          onClick={() => handleSaveTaskClick(row?.tid)}>
                                          <SaveIcon fontSize="inherit" />
                                        </IconButton>
                                      </Tooltip>
                                      <Tooltip
                                        title="Cancel"
                                        arrow
                                        size="small"
                                        placement="top-start">
                                        <IconButton
                                          size="small"
                                          sx={{ fontSize: "1rem" }}
                                          onClick={() => handleCancelEdit(row?.tid)}>
                                          <CancelIcon fontSize="inherit" />
                                        </IconButton>
                                      </Tooltip>
                                    </>
                                  ) : (
                                    <Tooltip
                                      title="Rename task"
                                      arrow
                                      size="small"
                                      placement="top-start">
                                      <IconButton
                                        size="small"
                                        sx={{ fontSize: "1rem" }}
                                        onClick={() => handleEditTaskClick(row?.tid, row?.tname)}>
                                        <EditIcon fontSize="inherit" />
                                      </IconButton>
                                    </Tooltip>
                                  )}
                                </Stack>
                              </Box>
                            </TableCell>

                            {/* Assignee */}
                            <TableCell key={row.tid} sx={{ width: "5%" }} align="center">
                              <Box sx={{ minWidth: 120 }}>
                                {editAssignee === row.tid ? (
                                  <FormControl fullWidth>
                                    <Select
                                      value={selectedAssignees[row.tid] || ""}
                                      onChange={(event) => handleAssignee(event, row.tid)}>
                                      {taskAssignees.map((assignee, index) => (
                                        <MenuItem key={index} value={assignee.value}>
                                          <Typography
                                            component="p"
                                            variant="caption"
                                            display="block">
                                            {assignee.text}
                                          </Typography>
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                ) : (
                                  <Box>
                                    <Chip
                                      label={formatAssigneeText(
                                        selectedAssignees[row.tid] || row.tassignee,
                                        regId
                                      )}
                                      variant="contained"
                                      sx={{
                                        minWidth: "80px",
                                        maxWidth: "85px",
                                      }}
                                    />
                                    <IconButton
                                      size="small"
                                      onClick={() => handleEditAssignee(row.tid)}>
                                      <ExpandMoreIcon />
                                    </IconButton>
                                  </Box>
                                )}
                              </Box>
                            </TableCell>

                            {/* Priority */}
                            <TableCell key={row.tid} sx={{ width: "5%" }} align="center">
                              <Box sx={{ minWidth: 120 }}>
                                {editPriority === row.tid ? (
                                  <FormControl fullWidth>
                                    <Select
                                      value={selectedPriorities[row.tid] || ""}
                                      onChange={(event) => handlePriority(event, row?.tid)}>
                                      {taskPriorities.map((priority, index) => (
                                        <MenuItem key={index} value={priority.value}>
                                          <Typography
                                            component="p"
                                            variant="caption"
                                            display="block">
                                            {formatPriority(priority.text)}
                                          </Typography>
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                ) : (
                                  <Box>
                                    <Chip
                                      label={formatPriority(
                                        selectedPriorities[row.tid] || row.tpriority || ""
                                      )}
                                      variant="contained"
                                      sx={{
                                        minWidth: "80px",
                                        maxWidth: "85px",
                                        ...priorityColors[selectedPriorities[row.tid]],
                                      }}
                                    />
                                    <IconButton
                                      size="small"
                                      onClick={() => handleEditPriority(row.tid)}>
                                      <ExpandMoreIcon />
                                    </IconButton>
                                  </Box>
                                )}
                              </Box>
                            </TableCell>

                            {/* Status */}
                            <TableCell key={row.tid} sx={{ width: "5%" }} align="center">
                              <Box sx={{ minWidth: 120 }}>
                                {editStatus === row.tid ? (
                                  <FormControl fullWidth>
                                    <Select
                                      value={selectedStatuses[row.tid] || ""}
                                      onChange={(event) => handleStatus(event, row.tid)}>
                                      {taskStatuses.map((status, index) => (
                                        <MenuItem key={index} value={status.value}>
                                          <Typography
                                            component="p"
                                            variant="caption"
                                            display="block">
                                            {formatStatus(status.text)}
                                          </Typography>
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                ) : (
                                  <Box>
                                    <Chip
                                      label={formatStatus(
                                        selectedStatuses[row.tid] || row.tstatus || ""
                                      )}
                                      variant="contained"
                                      sx={{
                                        minWidth: "80px",
                                        maxWidth: "85px",
                                        ...statusColors[selectedStatuses[row.tid]],
                                      }}
                                    />
                                    <IconButton
                                      size="small"
                                      onClick={() => handleEditStatus(row.tid)}>
                                      <ExpandMoreIcon />
                                    </IconButton>
                                  </Box>
                                )}
                              </Box>
                            </TableCell>

                            {/* Due Date */}
                            <TableCell sx={{ width: "15%" }} align="center">
                              <MyDatePicker
                                label=""
                                required={false}
                                sizeWidth="132px"
                                showBorder={false}
                                value={row?.tdue_date ? new Date(row.tdue_date) : null}
                                onChange={handleDueDateChange}
                              />
                            </TableCell>

                            {/* Actions */}
                            <TableCell sx={{ width: "20%" }} align="center">
                              <Actions rowId={row.id} isParentRow={row.isParentRow} />
                            </TableCell>
                          </TableRow>

                          {/* Subrows will be here */}
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

      <ConfirmationDialog value={"changeCheckboxStatus"} handleYes={handleYes} />
    </>
  );
}
