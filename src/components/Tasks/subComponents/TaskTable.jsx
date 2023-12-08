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
  changeSubTaskStatusCheckox,
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
  const [subRowId, setSubRowId] = useState(0);

  //assingnee
  const [assignees, setAssignees] = useState([]);
  const [selectedTaskAssignees, setSelectedTaskAssignees] = useState({});
  const [editTaskAssignee, setEditTaskAssignee] = useState(null);
  const [selectedSubTaskAssignees, setSelectedSubTaskAssignees] = useState({});
  const [editSubTaskAssignee, setEditSubTaskAssignee] = useState(null);

  const [selectedPriorities, setSelectedPriorities] = useState({});
  const [selectedStatuses, setSelectedStatuses] = useState({});

  const [selectedTaskPriorities, setSelectedTaskPriorities] = useState({});
  const [selectedTaskPriority, setSelectedTaskPriority] = useState({});
  const [editTaskPriority, setEditTaskPriority] = useState(null);

  const [selectedSubTaskPriorities, setSelectedSubTaskPriorities] = useState({});
  const [selectedSubTaskPriority, setSelectedSubTaskPriority] = useState({});
  const [editSubTaskPriority, setEditSubTaskPriority] = useState(null);

  const [editTaskStatus, setEditTaskStatus] = useState(null);
  const [selectedSubTaskStatuses, setSelectedSubTaskStatuses] = useState({});
  const [editSubTaskStatus, setEditSubTaskStatus] = useState(null);

  const [selectedTaskDueDate, setSelectedTaskDueDate] = useState(null);
  const [selectedSubTaskDueDate, setSelectedSubTaskDueDate] = useState(null);

  const [rowStates, setRowStates] = useState({});
  const [taskName, setTaskName] = useState("");
  const [subTaskName, setSubTaskName] = useState("");
  const [taskAssignee, setTaskAssignee] = useState(null);
  const [subTaskAssignee, setSubTaskAssignee] = useState(null);

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
    setAssignees(fetchedAssignees);
  }, []);

  // Set the initial selectedPriorities based on rows
  useEffect(() => {
    const initialSelectedPriorities = {};

    rows.forEach((row) => {
      // Check for the main row's priority
      if (row.tpriority) {
        initialSelectedPriorities[row.tid] = row.tpriority;
      }

      // Check for subrows and their priorities
      if (row.subTasks && Array.isArray(row.subTasks)) {
        row.subTasks.forEach((subrow) => {
          if (subrow.stpriority) {
            initialSelectedPriorities[subrow.stid] = subrow.stpriority;
          }
        });
      }
    });

    setSelectedPriorities(initialSelectedPriorities);
  }, [rows]);

  // Set the initial selectedStatuses based on rows
  useEffect(() => {
    const initialSelectedStatuses = {};

    rows.forEach((row) => {
      // Check for the main row's priority
      if (row.tstatus) {
        initialSelectedStatuses[row.tid] = row.tstatus;
      }

      // Check for subrows and their priorities
      if (row.subTasks && Array.isArray(row.subTasks)) {
        row.subTasks.forEach((subrow) => {
          if (subrow.ststatus) {
            initialSelectedStatuses[subrow.stid] = subrow.ststatus;
          }
        });
      }
    });

    setSelectedStatuses(initialSelectedStatuses);
  }, [rows]);

  // Set the initial selectedTaskAssignees based on rows
  useEffect(() => {
    const initialSelectedTaskAssignees = {};
    rows?.forEach((row) => {
      if (row?.tassignee) {
        initialSelectedTaskAssignees[row.tid] = row?.tassignee;
      }
    });
    setSelectedTaskAssignees(initialSelectedTaskAssignees);
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

  //Task Code checkbox
  const handleTaskCodeCheckBoxDialog = (event, rowId, tAssignee, tStatus) => {
    setRowId(rowId);
    setTaskAssignee(tAssignee);
    // for already checked and done
    if (!event.target.checked && tStatus === "done") {
      // If the checkbox is checked and status is done, open the dialog to make the status incomplete
      dispatch(
        openCnfModal({
          modalName: "changeTaskCheckboxStatus",
          title: "",
          description: `Do you want to Change Task Status to Incomplete?`,
        })
      );
    } else if (event.target.checked && tStatus !== "done") {
      // If the checkbox is unchecked and the status is not done, open the dialog to make the status Complete
      dispatch(
        openCnfModal({
          modalName: "changeTaskCheckboxStatus",
          title: "",
          description: `Do you want to Change Task Status to Complete?`,
        })
      );
    } else {
      dispatch(closeCnfModal({ modalName: "changeTaskCheckboxStatus" }));
    }
  };

  const handleTaskYes = async () => {
    const data = { tid: rowId, tassignee: taskAssignee };
    try {
      const response = await changeTaskStatusCheckox(regId, data);
      fetchData();
      dispatch(closeCnfModal({ modalName: "changeTaskCheckboxStatus" }));
      toast.success(`${response.message}`);
    } catch (error) {
      toast.error(`${error?.response?.data?.error}`);
      console.error("Error in changing the task status:", error);
    }
  };

  //Subtask Code checkbox
  const handleSubTaskCodeCheckBoxDialog = (event, subrowId, stAssignee, stStatus) => {
    setSubRowId(subrowId);
    setSubTaskAssignee(stAssignee);
    // for already checked and done
    if (!event.target.checked && stStatus === "done") {
      // If the checkbox is checked and status is done, open the dialog to make the status incomplete
      dispatch(
        openCnfModal({
          modalName: "changeSubTaskCheckboxStatus",
          title: "",
          description: `Do you want to Change Subtask Status to Incomplete?`,
        })
      );
    } else if (event.target.checked && stStatus !== "done") {
      // If the checkbox is unchecked and the status is not done, open the dialog to make the status Complete
      dispatch(
        openCnfModal({
          modalName: "changeSubTaskCheckboxStatus",
          title: "",
          description: `Do you want to Change Subtask Status to Complete?`,
        })
      );
    } else {
      dispatch(closeCnfModal({ modalName: "changeSubTaskCheckboxStatus" }));
    }
  };

  const handleSubTaskYes = async () => {
    const data = { stid: subRowId, stassignee: subTaskAssignee };
    try {
      const response = await changeSubTaskStatusCheckox(regId, data);
      fetchData();
      dispatch(closeCnfModal({ modalName: "changeSubTaskCheckboxStatus" }));
      toast.success(`${response.message}`);
    } catch (error) {
      toast.error(`${error?.response?.data?.error}`);
      console.error("Error in changing the subtask status:", error);
    }
  };

  //Edit Task Name
  const handleEditTaskNameClick = (taskId, taskName) => {
    setRowStates((prevRowStates) => ({
      ...prevRowStates,
      [taskId]: { editMode: true, taskName: taskName || "" },
    }));

    // Set the taskName state here as well
    setTaskName(taskName || "");
  };

  const handleCancelTaskNameEdit = (taskId) => {
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

  //Edit SubTask Name
  const handleEditSubTaskNameClick = (subtaskId, subtaskName) => {
    setRowStates((prevRowStates) => ({
      ...prevRowStates,
      [subtaskId]: { editMode: true, subTaskName: subtaskName || "" },
    }));

    // Set the SubTaskName state here as well
    setSubTaskName(subtaskName || "");
  };

  const handleCancelSubTaskNameEdit = (subtaskId) => {
    setRowStates((prevRowStates) => ({
      ...prevRowStates,
      [subtaskId]: {
        editMode: false,
        subTaskName: rows?.subTasks?.find((subrow) => subrow?.stid === subtaskId)?.stname || "",
      },
    }));
  };

  const updateSubTaskName = async (subtaskId, subtaskName) => {
    try {
      const data = {
        div_class: "subtask_editable",
        div_field: "stname_field",
        div_id: subtaskId,
        txt: subtaskName,
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
      console.error("Error updating SubTask name:", error);
    }
  };

  const handleSaveSubTaskClick = async (subtaskId) => {
    // Update the task name in the database and handle states
    try {
      await updateSubTaskName(subtaskId, subTaskName);

      // Update the local state to reflect the change
      setRowStates((prevRowStates) => ({
        ...prevRowStates,
        [subtaskId]: { editMode: false, subTaskName: prevRowStates[subtaskId]?.subTaskName || "" },
      }));
    } catch (error) {
      // Handle errors specific to the save operation if needed
      console.error("Error handling save SubTask click:", error);
    }
  };

  // Task Assignee
  const handleTaskAssignee = (event, taskId) => {
    const newAssignee = event.target.value;
    // Update the selected assignees
    setSelectedTaskAssignees((prevSelected) => ({
      ...prevSelected,
      [taskId]: newAssignee,
    }));
    // Handle the logic to update the assignee in the database, if needed

    // Close the assignee editing
    setEditTaskAssignee(null);
  };

  const handleEditTaskAssignee = (taskId) => {
    setEditTaskAssignee(taskId);
  };

  // SubTask Assignee
  const handleSubTaskAssignee = (event, subtaskId) => {
    const newAssignee = event.target.value;
    // Update the selected assignees
    setSelectedSubTaskAssignees((prevSelected) => ({
      ...prevSelected,
      [subtaskId]: newAssignee,
    }));
    // Handle the logic to update the assignee in the database, if needed

    // Close the assignee editing
    setEditSubTaskAssignee(null);
  };

  const handleEditSubTaskAssignee = (subtaskId) => {
    setEditSubTaskAssignee(subtaskId);
  };

  //Task Priority
  const updateTaskPriority = async (taskId, newPriority) => {
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

  const handleTaskPriority = async (event, taskId) => {
    const newPriority = event.target.value;
    // Update the priority in the database and handle states
    try {
      await updateTaskPriority(taskId, newPriority);

      // Update the local state to reflect the change
      setSelectedTaskPriorities((prevSelected) => ({
        ...prevSelected,
        [taskId]: newPriority,
      }));
      // Close the priority editing
      setEditTaskPriority(null);
    } catch (error) {
      // Handle errors specific to the save operation if needed
      console.error("Error handling the priority:", error);
    }
  };

  const handleEditTaskPriority = (taskId) => {
    setEditTaskPriority(taskId);
  };

  //SubTask Priority
  const updateSubTaskPriority = async (subtaskId, newPriority) => {
    try {
      const data = {
        div_class: "subtask_editable",
        div_field: "stpriority_field",
        div_id: subtaskId,
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

  const handleSubTaskPriority = async (event, subtaskId) => {
    const newPriority = event.target.value;
    // Update the priority in the database and handle states
    try {
      await updateSubTaskPriority(subtaskId, newPriority);

      // Update the local state to reflect the change
      setSelectedSubTaskPriorities((prevSelected) => ({
        ...prevSelected,
        [subtaskId]: newPriority,
      }));
      // Close the priority editing
      setEditSubTaskPriority(null);
    } catch (error) {
      // Handle errors specific to the save operation if needed
      console.error("Error handling the priority:", error);
    }
  };

  const handleEditSubTaskPriority = (subtaskId) => {
    setEditSubTaskPriority(subtaskId);
  };

  //Task Status
  const updateTaskStatus = async (taskId, newStatus) => {
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

  const handleTaskStatus = async (event, taskId) => {
    const newStatus = event.target.value;
    // Update the status in the database and handle states
    try {
      await updateTaskStatus(taskId, newStatus);

      // Update the local state to reflect the change
      setSelectedTaskStatuses((prevSelected) => ({
        ...prevSelected,
        [taskId]: newStatus,
      }));
      // Close the status editing
      setEditTaskStatus(null);
    } catch (error) {
      // Handle errors specific to the save operation if needed
      console.error("Error handling the status:", error);
    }
  };

  const handleEditTaskStatus = (taskId) => {
    setEditTaskStatus(taskId);
  };

  //SubTask StatushandleTaskDueDateChange
  const updateSubTaskStatus = async (subtaskId, newStatus) => {
    try {
      const data = {
        div_class: "subtask_editable",
        div_field: "ststatus_field",
        div_id: subtaskId,
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

  const handleSubTaskStatus = async (event, subtaskId) => {
    const newStatus = event.target.value;
    // Update the status in the database and handle states
    try {
      await updateSubTaskStatus(subtaskId, newStatus);

      // Update the local state to reflect the change
      setSelectedSubTaskStatuses((prevSelected) => ({
        ...prevSelected,
        [subtaskId]: newStatus,
      }));
      // Close the status editing
      setEditSubTaskStatus(null);
    } catch (error) {
      // Handle errors specific to the save operation if needed
      console.error("Error handling the status:", error);
    }
  };

  const handleEditSubTaskStatus = (subtaskId) => {
    setEditSubTaskStatus(subtaskId);
  };

  //DueDate
  const handleTaskDueDateChange = (date) => {
    setSelectedTaskDueDate(date);
  };

  const handleSubTaskDueDateChange = (date) => {
    setSelectedSubTaskDueDate(date);
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
    const filteredSubTaskRow = rows?.reduce((result, row) => {
      const matchingSubrow = row?.subRows?.find((subrow) => subrow?.stid === subrowId);
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
                <TableCell align="center" sx={{ width: "10%" }}>
                  Assignee
                </TableCell>
                <TableCell align="center" sx={{ width: "10%" }}>
                  Priority
                </TableCell>
                <TableCell align="center" sx={{ width: "10%" }}>
                  Status
                </TableCell>
                <TableCell align="center" sx={{ width: "10%" }}>
                  Due Date
                </TableCell>
                <TableCell align="center" sx={{ width: "10%" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <Droppable droppableId="droppable-1">
              {(provider) => (
                <TableBody ref={provider.innerRef} {...provider.droppableProps}>
                  {rows?.map((row, index) => (
                    <Draggable key={row?.tcode} draggableId={row?.tcode} index={index}>
                      {(provider) => (
                        <React.Fragment key={row?.tcode}>
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
                                        handleTaskCodeCheckBoxDialog(
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
                            <TableCell sx={{ width: "30%" }} align="left">
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
                                    />
                                  ) : (
                                    <>
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

                                      <CustomDialog
                                        handleClose={handleCloseTaskPreviewDialog}
                                        open={openTaskPreviewDialog}
                                        modalTitle="Task"
                                        redirectPath={"/tasks-overview"}
                                        showModalButton={true}
                                        modalSize="lg">
                                        <TaskPreview styles={styles} filteredRow={filteredTask} />
                                      </CustomDialog>
                                    </>
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
                                          onClick={() => handleCancelTaskNameEdit(row?.tid)}>
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
                                        onClick={() =>
                                          handleEditTaskNameClick(row?.tid, row?.tname)
                                        }>
                                        <EditIcon fontSize="inherit" />
                                      </IconButton>
                                    </Tooltip>
                                  )}
                                </Stack>
                              </Box>
                            </TableCell>

                            {/* Assignee */}
                            <TableCell sx={{ width: "10%" }} align="center">
                              <Box sx={{ minWidth: 120 }}>
                                {editTaskAssignee === row.tid ? (
                                  <FormControl fullWidth>
                                    <Select
                                      value={selectedTaskAssignees[row.tid] || regId}
                                      onChange={(event) => handleTaskAssignee(event, row.tid)}>
                                      {assignees.map((assignee, index) => (
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
                                        selectedTaskAssignees[row.tid] || row.tassignee,
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
                                      onClick={() => handleEditTaskAssignee(row.tid)}>
                                      <ExpandMoreIcon />
                                    </IconButton>
                                  </Box>
                                )}
                              </Box>
                            </TableCell>

                            {/* Priority */}
                            <TableCell sx={{ width: "10%" }} align="center">
                              <Box sx={{ minWidth: 120 }}>
                                {editTaskPriority === row.tid ? (
                                  <FormControl fullWidth>
                                    <Select
                                      value={selectedPriorities[row.tid] || ""}
                                      onChange={(event) => handleTaskPriority(event, row?.tid)}>
                                      {taskPriorities.map((priority, index) => (
                                        <MenuItem key={index} value={priority.value}>
                                          <Typography
                                            component="p"
                                            variant="caption"
                                            display="block">
                                            {priority.text}
                                            {/* {formatPriority(priority.text)} */}
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
                                      onClick={() => handleEditTaskPriority(row.tid)}>
                                      <ExpandMoreIcon />
                                    </IconButton>
                                  </Box>
                                )}
                              </Box>
                            </TableCell>

                            {/* Status */}
                            <TableCell sx={{ width: "10%" }} align="center">
                              <Box sx={{ minWidth: 120 }}>
                                {editTaskStatus === row.tid ? (
                                  <FormControl fullWidth>
                                    <Select
                                      value={selectedStatuses[row.tid] || ""}
                                      onChange={(event) => handleTaskStatus(event, row.tid)}>
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
                                      onClick={() => handleEditTaskStatus(row.tid)}>
                                      <ExpandMoreIcon />
                                    </IconButton>
                                  </Box>
                                )}
                              </Box>
                            </TableCell>

                            {/* Due Date */}
                            <TableCell sx={{ width: "10%" }} align="center">
                              <MyDatePicker
                                label=""
                                required={false}
                                sizeWidth="132px"
                                showBorder={false}
                                value={row?.tdue_date ? new Date(row.tdue_date) : null}
                                onChange={handleTaskDueDateChange}
                              />
                            </TableCell>

                            {/* Actions */}
                            <TableCell sx={{ width: "10%" }} align="center">
                              <Actions rowId={row?.tid} isParentRow={true} />
                            </TableCell>
                          </TableRow>

                          {/* Subrows will be here */}
                          {openSubrows &&
                            expandedTaskId === row?.tid &&
                            row?.subTasks.map((subrow, index) => (
                              <TableRow
                                sx={{
                                  " &:last-child th": { border: 0 },
                                  width: "100%",
                                  bgcolor: "white",
                                  "&:hover": {
                                    backgroundColor: "#F7F7F7",
                                    "& .task-description": { color: theme.palette.primary.dark },
                                  },
                                }}>
                                {/* SubTaskIcons */}
                                <TableCell align="right">
                                  <IconButton size="small">
                                    <SubdirectoryArrowRightRoundedIcon />
                                  </IconButton>
                                </TableCell>

                                {/* SubTaskCode */}
                                <TableCell sx={{ width: "10%" }} align="center">
                                  <FormGroup sx={{ width: "100px" }}>
                                    <FormControlLabel
                                      sx={{ color: "black" }}
                                      control={
                                        <Checkbox
                                          checked={subrow?.ststatus === "done"}
                                          size="small"
                                          onChange={(event) =>
                                            handleSubTaskCodeCheckBoxDialog(
                                              event,
                                              subrow?.stid,
                                              subrow?.stassignee,
                                              subrow?.ststatus
                                            )
                                          }
                                        />
                                      }
                                      label={subrow?.stcode}
                                    />
                                  </FormGroup>
                                </TableCell>

                                {/* SubTask Name */}
                                <TableCell sx={{ width: "30%" }} align="left">
                                  <Box component="form" noValidate sx={{ height: "100%" }}>
                                    <Stack
                                      direction="row"
                                      justifyContent="space-between"
                                      alignItems="center"
                                      spacing={1}>
                                      {rowStates[subrow?.stid]?.editMode ? (
                                        <TextField
                                          name="tname"
                                          label=""
                                          variant="outlined"
                                          value={rowStates[subrow?.stid]?.subTaskName}
                                          onChange={(e) => {
                                            setSubTaskName(e.target.value);
                                            setRowStates((prevRowStates) => ({
                                              ...prevRowStates,
                                              [subrow?.stid]: {
                                                ...prevRowStates[subrow?.stid],
                                                subTaskName: e.target.value,
                                              },
                                            }));
                                          }}
                                          fullWidth
                                        />
                                      ) : (
                                        <>
                                          <Typography
                                            onClick={() =>
                                              handleOpenSubTaskPreviewDialog(subrow?.stid)
                                            }
                                            className="task-description"
                                            sx={{
                                              textDecoration: "none",
                                              color: theme.palette.secondary.dark,
                                              fontSize: "13px",
                                              fontWeight: "400",
                                            }}>
                                            {subrow?.stname}
                                          </Typography>

                                          <CustomDialog
                                            handleClose={handleCloseSubTaskPreviewDialog}
                                            open={openSubTaskPreviewDialog}
                                            modalTitle="Subtask"
                                            redirectPath={"/subtasks-overview"}
                                            showModalButton={true}
                                            modalSize="lg">
                                            <SubtaskPreview
                                              styles={styles}
                                              filteredRow={filteredSubTask}
                                            />
                                          </CustomDialog>
                                        </>
                                      )}

                                      {rowStates[subrow?.stid]?.editMode ? (
                                        <>
                                          <Tooltip
                                            title="Save task"
                                            arrow
                                            size="small"
                                            placement="top-start">
                                            <IconButton
                                              size="small"
                                              sx={{ fontSize: "1rem" }}
                                              onClick={() => handleSaveSubTaskClick(subrow?.stid)}>
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
                                              onClick={() =>
                                                handleCancelSubTaskNameEdit(subrow?.stid)
                                              }>
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
                                            onClick={() =>
                                              handleEditSubTaskNameClick(
                                                subrow?.stid,
                                                subrow?.stname
                                              )
                                            }>
                                            <EditIcon fontSize="inherit" />
                                          </IconButton>
                                        </Tooltip>
                                      )}
                                    </Stack>
                                  </Box>
                                </TableCell>

                                {/* SubTask Assignee */}
                                <TableCell sx={{ width: "10%" }} align="center">
                                  <Box sx={{ minWidth: 120 }}>
                                    {editSubTaskAssignee === subrow?.stid ? (
                                      <FormControl fullWidth>
                                        <Select
                                          value={selectedSubTaskAssignees[subrow?.stid] || ""}
                                          onChange={(event) =>
                                            handleSubTaskAssignee(event, subrow?.stid)
                                          }>
                                          {assignees.map((assignee, index) => (
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
                                            selectedSubTaskAssignees[subrow?.stid] ||
                                              subrow?.stassignee,
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
                                          onClick={() => handleEditSubTaskAssignee(subrow?.stid)}>
                                          <ExpandMoreIcon />
                                        </IconButton>
                                      </Box>
                                    )}
                                  </Box>
                                </TableCell>

                                {/* SubTask Priority */}
                                <TableCell sx={{ width: "10%" }} align="center">
                                  <Box sx={{ minWidth: 120 }}>
                                    {editSubTaskPriority === subrow?.stid ? (
                                      <FormControl fullWidth>
                                        <Select
                                          value={selectedPriorities[subrow?.stid] || ""}
                                          onChange={(event) =>
                                            handleSubTaskPriority(event, subrow?.stid)
                                          }>
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
                                            selectedPriorities[subrow?.stid] ||
                                              subrow?.stpriority ||
                                              ""
                                          )}
                                          variant="contained"
                                          sx={{
                                            minWidth: "80px",
                                            maxWidth: "85px",
                                            ...priorityColors[selectedPriorities[subrow?.stid]],
                                          }}
                                        />
                                        <IconButton
                                          size="small"
                                          onClick={() => handleEditSubTaskPriority(subrow?.stid)}>
                                          <ExpandMoreIcon />
                                        </IconButton>
                                      </Box>
                                    )}
                                  </Box>
                                </TableCell>

                                {/* Status */}
                                <TableCell sx={{ width: "10%" }} align="center">
                                  <Box sx={{ minWidth: 120 }}>
                                    {editSubTaskStatus === subrow?.stid ? (
                                      <FormControl fullWidth>
                                        <Select
                                          value={selectedStatuses[subrow?.stid] || ""}
                                          onChange={(event) =>
                                            handleSubTaskStatus(event, subrow?.stid)
                                          }>
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
                                            selectedStatuses[subrow?.stid] || subrow?.ststatus || ""
                                          )}
                                          variant="contained"
                                          sx={{
                                            minWidth: "80px",
                                            maxWidth: "85px",
                                            ...statusColors[selectedStatuses[subrow?.stid]],
                                          }}
                                        />
                                        <IconButton
                                          size="small"
                                          onClick={() => handleEditSubTaskStatus(subrow?.stid)}>
                                          <ExpandMoreIcon />
                                        </IconButton>
                                      </Box>
                                    )}
                                  </Box>
                                </TableCell>

                                {/* Due Date */}
                                <TableCell sx={{ width: "10%" }} align="center">
                                  <MyDatePicker
                                    label=""
                                    required={false}
                                    sizeWidth="132px"
                                    showBorder={false}
                                    value={subrow?.tdue_date ? new Date(subrow?.tdue_date) : null}
                                    onChange={handleSubTaskDueDateChange}
                                  />
                                </TableCell>

                                {/* Actions */}
                                <TableCell sx={{ width: "20%" }} align="center">
                                  <Actions rowId={subrow?.stid} isParentRow={false} />
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

      <ConfirmationDialog value={"changeTaskCheckboxStatus"} handleYes={handleTaskYes} />
      <ConfirmationDialog value={"changeSubTaskCheckboxStatus"} handleYes={handleSubTaskYes} />
    </>
  );
}
