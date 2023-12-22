import React, { useEffect, useState } from "react";
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Tooltip, Stack, FormGroup, FormControlLabel, Checkbox, TextField, IconButton, DialogContent } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { taskPriorities, priorityColors, taskStatuses, statusColors } from "./TasksData";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ReorderIcon from "@mui/icons-material/Reorder";
import SubdirectoryArrowRightRoundedIcon from "@mui/icons-material/SubdirectoryArrowRightRounded";
import { Box, FormControl, MenuItem, Select, Typography } from "@mui/material";
import Chip from "@mui/material/Chip";
import MyDatePicker from "./MyDatePicker ";
import ConfirmationDialog from "../../common/ConfirmationDialog";
import { openCnfModal, closeCnfModal } from "../../../redux/action/confirmationModalSlice";
import { useDispatch } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { taskOverviewStyles } from "../taskOverview/styles";
import { changeSubTaskStatusCheckox, changeTaskStatusCheckox, editTaskAndSubtask } from "../../../api/modules/taskModule";
import { selectUserDetails } from "../../../redux/action/userSlice";
import { toast } from "react-toastify";
import { formatAssigneeText, formatPriority, formatStatus } from "../../../helpers/tasks";
import CustomDialog from "../../common/CustomDialog";
import TaskPreview from "../taskOverview/subComponents/TaskPreview";
import SubtaskPreview from "../subtaskOverview/subComponent/SubtaskPreview";
import NoListTaskFound from "./NoListTaskFound";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CommentIcon from "@mui/icons-material/Comment";
import { openModal } from "../../../redux/action/modalSlice";
import CommentSection from "../../project/projects-overview/comment-section";
import More from "./More";
import ReduxDialog from "../../common/ReduxDialog";
import AttachmentIcon from "@mui/icons-material/Attachment";
import CustomFileInput from "../../common/CustomFileInput";
import Badge from "@mui/material/Badge";

export default function PortfolioTaskTable({ rows, setRows, fetchData }) {
  const theme = useTheme();
  const styles = taskOverviewStyles();
  const dispatch = useDispatch();
  const portfolioId = JSON.parse(localStorage.getItem("portfolioId"));
  const user = useSelector(selectUserDetails);
  // const regId = user?.reg_id;
  const regId = 1; // for testing

  const [rowId, setRowId] = useState(0);
  const [subRowId, setSubRowId] = useState(0);
  const [openSubrows, setOpenSubrows] = useState(false);
  const [expandedTaskId, setExpandedTaskId] = useState(0);
  const [rowStates, setRowStates] = useState({});
  const [taskName, setTaskName] = useState("");
  const [subTaskName, setSubTaskName] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);

  //assingnee
  const [assignees, setAssignees] = useState([]);
  const [selectedAssignees, setSelectedAssignees] = useState({});
  const [editTaskAssignee, setEditTaskAssignee] = useState(null);
  const [editSubTaskAssignee, setEditSubTaskAssignee] = useState(null);
  const [taskAssignee, setTaskAssignee] = useState(null);
  const [subTaskAssignee, setSubTaskAssignee] = useState(null);
  //priority
  const [selectedPriorities, setSelectedPriorities] = useState({});
  const [editTaskPriority, setEditTaskPriority] = useState(null);
  const [editSubTaskPriority, setEditSubTaskPriority] = useState(null);
  //status
  const [selectedStatuses, setSelectedStatuses] = useState({});
  const [editTaskStatus, setEditTaskStatus] = useState(null);
  const [editSubTaskStatus, setEditSubTaskStatus] = useState(null);
  //Duedate
  const [selectedDueDate, setSelectedDueDate] = useState({});
  const [selectedTaskDueDate, setSelectedTaskDueDate] = useState(null);
  const [selectedSubTaskDueDate, setSelectedSubTaskDueDate] = useState(null);

  // Fetch taskAssignees from API or another source
  useEffect(() => {
    const fetchedAssignees = [
      { value: regId, text: "To Me" },
      { value: 2, text: "john" },
    ];
    setAssignees(fetchedAssignees);
  }, []);

  // Set the initial selectedPriorities based on rows
  useEffect(() => {
    const initialSelectedPriorities = {};

    rows?.forEach((row) => {
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

    rows?.forEach((row) => {
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
    const initialSelectedAssignees = {};

    rows?.forEach((row) => {
      // Check for the main row's task assignee
      if (row?.tassignee) {
        initialSelectedAssignees[row.tid] = row.tassignee;
      }

      // Check for subrows and their task assignees
      if (row.subTasks && Array.isArray(row.subTasks)) {
        row.subTasks.forEach((subrow) => {
          if (subrow.stassignee) {
            initialSelectedAssignees[subrow.stid] = subrow.stassignee;
          }
        });
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
  const handleEditTaskName = (taskId, taskName) => {
    setRowStates((prevRowStates) => ({
      ...prevRowStates,
      [taskId]: {
        ...prevRowStates[taskId],
        editMode: true,
        taskName: taskName,
      },
    }));
  };

  const handleCancelTaskNameEdit = (taskId) => {
    // Reset the taskName to its original value or an empty string
    const originalTaskName = rowStates[taskId]?.tname || "";
    // setTaskName(originalTaskName);

    // Reset editMode to false for the specified task
    setRowStates((prevRowStates) => ({
      ...prevRowStates,
      [taskId]: {
        ...prevRowStates[taskId],
        editMode: false,
        // Optionally, reset the taskName in rowStates as well
        taskName: originalTaskName,
      },
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
      toast.success(`${response?.message}`);
    } catch (error) {
      toast.error(`${error?.response?.data?.message}`);
      // Handle any errors that occur during the API call
      console.error("Error updating task name:", error);
    }
  };

  const handleSaveTaskClick = async (taskId) => {
    try {
      await updateTaskName(taskId, taskName);
      // Update the display with the saved task name
      setRowStates((prevRowStates) => ({
        ...prevRowStates,
        [taskId]: {
          ...prevRowStates[taskId],
          editMode: false,
        },
      }));
    } catch (error) {
      console.error("Error handling save task click:", error);
    }
  };

  //Edit SubTask Name
  const handleEditSubTaskName = (subtaskId, subtaskName) => {
    setRowStates((prevRowStates) => ({
      ...prevRowStates,
      [subtaskId]: {
        ...prevRowStates[subtaskId],
        editMode: true,
        subtaskName: subtaskName,
      },
    }));
  };

  const handleCancelSubTaskNameEdit = (subtaskId) => {
    // Reset the SubtaskName to its original value or an empty string
    const originalSubTaskName = rowStates[subtaskId]?.stname || "";
    // setSubTaskName(originalSubTaskName);

    // Reset editMode to false for the specified task
    setRowStates((prevRowStates) => ({
      ...prevRowStates,
      [subtaskId]: {
        ...prevRowStates[subtaskId],
        editMode: false,
        // Optionally, reset the taskName in rowStates as well
        subtaskName: originalSubTaskName,
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
      toast.success(`${response?.message}`);
    } catch (error) {
      toast.error(`${error?.response?.data?.message}`);
      console.error("Error updating SubTask name:", error);
    }
  };

  const handleSaveSubTaskClick = async (subtaskId) => {
    try {
      await updateSubTaskName(subtaskId, subTaskName);

      // Update the local state to reflect the change
      setRowStates((prevRowStates) => ({
        ...prevRowStates,
        [subtaskId]: {
          ...prevRowStates[subtaskId],
          editMode: false,
        },
      }));
    } catch (error) {
      console.error("Error handling save SubTask click:", error);
    }
  };

  // Task Assignee
  const handleTaskAssignee = (event, taskId) => {
    const newAssignee = event.target.value;
    // Update the selected assignees
    setSelectedAssignees((prevSelected) => ({
      ...prevSelected,
      [taskId]: newAssignee,
    }));
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
    setSelectedAssignees((prevSelected) => ({
      ...prevSelected,
      [subtaskId]: newAssignee,
    }));
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
      toast.success(`${response?.message}`);
    } catch (error) {
      toast.error(`${error?.response?.data?.message}`);
      // Handle any errors that occur during the API call
      console.error("Error updating priority:", error);
    }
  };

  const handleTaskPriority = async (event, taskId) => {
    try {
      const newPriority = event.target.value;
      await updateTaskPriority(taskId, newPriority);

      // Update the local state to reflect the change
      setSelectedPriorities((prevSelected) => ({
        ...prevSelected,
        [taskId]: newPriority,
      }));
      // Close the priority editing
      setEditTaskPriority(null);
    } catch (error) {
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
      toast.success(`${response?.message}`);
    } catch (error) {
      toast.error(`${error?.response?.data?.message}`);
      console.error("Error updating priority:", error);
    }
  };

  const handleSubTaskPriority = async (event, subtaskId) => {
    try {
      const newPriority = event.target.value;
      await updateSubTaskPriority(subtaskId, newPriority);

      // Update the local state to reflect the change
      setSelectedPriorities((prevSelected) => ({
        ...prevSelected,
        [subtaskId]: newPriority,
      }));
      // Close the priority editing
      setEditSubTaskPriority(null);
    } catch (error) {
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
      toast.success(`${response?.message}`);
    } catch (error) {
      toast.error(`${error?.response?.data?.message}`);
      console.error("Error updating status:", error);
    }
  };

  const handleTaskStatus = async (event, taskId) => {
    try {
      const newStatus = event.target.value;
      await updateTaskStatus(taskId, newStatus);

      // Update the local state to reflect the change
      setSelectedStatuses((prevSelected) => ({
        ...prevSelected,
        [taskId]: newStatus,
      }));
      // Close the status editing
      setEditTaskStatus(null);
    } catch (error) {
      console.error("Error handling the status:", error);
    }
  };

  const handleEditTaskStatus = (taskId) => {
    setEditTaskStatus(taskId);
  };

  //SubTask Status
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
      toast.success(`${response?.message}`);
    } catch (error) {
      toast.error(`${error?.response?.data?.message}`);
      // Handle any errors that occur during the API call
      console.error("Error updating status:", error);
    }
  };

  const handleSubTaskStatus = async (event, subtaskId) => {
    try {
      const newStatus = event.target.value;
      await updateSubTaskStatus(subtaskId, newStatus);

      // Update the local state to reflect the change
      setSelectedStatuses((prevSelected) => ({
        ...prevSelected,
        [subtaskId]: newStatus,
      }));
      // Close the status editing
      setEditSubTaskStatus(null);
    } catch (error) {
      console.error("Error handling the status:", error);
    }
  };

  const handleEditSubTaskStatus = (subtaskId) => {
    setEditSubTaskStatus(subtaskId);
  };

  //Task Due Date
  const updateTaskDueDate = async (taskId, newDate) => {
    try {
      const data = {
        div_class: "task_editable",
        div_field: "tduedate_field",
        div_id: taskId,
        txt: newDate,
        user_id: regId,
      };

      // Assuming editTaskAndSubtask returns a Promise
      const response = await editTaskAndSubtask(portfolioId, data);
      toast.success(`${response?.message}`);
    } catch (error) {
      toast.error(`${error?.response?.data?.message}`);
      console.error("Error updating task due date:", error);
    }
  };
  const handleTaskDueDate = (taskId) => async (date) => {
    try {
      const newDate = date;
      await updateTaskDueDate(taskId, newDate);
    } catch (error) {
      console.error("Error handling the task duedate:", error);
    }
  };

  //SubTask Due Date
  const updateSubTaskDueDate = async (subtaskId, newDate) => {
    try {
      const data = {
        div_class: "subtask_editable",
        div_field: "stduedate_field",
        div_id: subtaskId,
        txt: newDate,
        user_id: regId,
      };

      // Assuming editTaskAndSubtask returns a Promise
      const response = await editTaskAndSubtask(portfolioId, data);
      toast.success(`${response?.message}`);
    } catch (error) {
      toast.error(`${error?.response?.data?.message}`);
      console.error("Error updating subtask duedate:", error);
    }
  };

  //Task Duedate
  const handleSubTaskDueDate = (subtaskId) => async (date) => {
    alert(`${subtaskId}--${date} `);
    try {
      const newDate = date;
      await updateSubTaskDueDate(subtaskId, newDate);
    } catch (error) {
      console.error("Error handling the subtask duedate:", error);
    }
  };

  //Task PreviewDialog code
  const [openTaskPreviewDialog, setOpenTaskPreviewDialog] = React.useState(false);
  const [openSubTaskPreviewDialog, setOpenSubTaskPreviewDialog] = React.useState(false);
  const [parentTaskName, setParentTaskName] = useState("");

  // Task prview Dailog Code
  const handleOpenTaskPreviewDialog = (rowId) => {
    setRowId(rowId);
    setOpenTaskPreviewDialog(true);
  };

  const handleCloseTaskPreviewDialog = () => {
    setOpenTaskPreviewDialog(false);
  };

  // Sub Task prview Dailog Code
  const handleOpenSubTaskPreviewDialog = (subrowId, parent_tname) => {
    setParentTaskName(parent_tname);
    setSubRowId(subrowId);
    setOpenSubTaskPreviewDialog(true);
  };

  const handleCloseSubTaskPreviewDialog = () => {
    setOpenSubTaskPreviewDialog(false);
  };

  //Task Comment
  const handleTaskCommentsDialog = (rowId) => {
    setRowId(rowId);
    dispatch(openModal("send-comments"));
  };

  //Subtask comment
  const handleSubTaskCommentsDialog = (subrowId) => {
    setSubRowId(subrowId);
    dispatch(openModal("send-comments"));
  };

  //Task Attache file
  const handleTaskAttachFileDialog = (rowId) => {
    dispatch(openModal("task-attach-file"));
  };

  const [taskFiles, setTaskFiles] = useState(null);

  const handleTaskFilesChange = (newValue, info) => {
    setTaskFiles(newValue); // Concatenate the new files with the existing ones
  };

  // const displayTaskFilesInAlert = () => {
  //   const fileNames = taskFiles.map((file) => file.name).join(", "); // Create a comma-separated list of file names
  //   alert(`Selected files: ${fileNames}`);
  // };

  //Subtask Attach file
  const handleSubTaskAttachFileDialog = (subrowId) => {
    setSubRowId(subrowId);
    dispatch(openModal("subtask-attach-file"));
  };

  const [subTaskFiles, setSubTaskFiles] = useState(null);

  const handleSubTaskFilesChange = (newValue, info) => {
    setSubTaskFiles(newValue); // Concatenate the new files with the existing ones
  };

  // const displaySubTaskFilesInAlert = () => {
  //   const fileNames = subTaskFiles.map((file) => file.name).join(", "); // Create a comma-separated list of file names
  //   alert(`Selected files: ${fileNames}`);
  // };

  const [taskToEdit, setTaskToEdit] = useState({});
  const [subTaskToEdit, setSubTaskToEdit] = useState({});
  const [openTaskMenu, setOpenTaskMenu] = useState(null);
  const [openSubtaskMenu, setOpenSubtaskMenu] = useState(null);

  //Task More
  const handleTaskMoreClick = (event, taskId, task) => {
    setTaskToEdit(task);
    setRowId(taskId);
    setOpenTaskMenu(event.currentTarget);
  };

  //SubTask More
  const handleSubTaskMoreClick = (event, subtaskId, subrow) => {
    setSubTaskToEdit(subrow);
    setSubRowId(subtaskId);
    setOpenSubtaskMenu(event.currentTarget);
  };

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <TableContainer sx={{ minHeight: "72vh" }}>
          <Table sx={{ minWidth: "650px" }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ width: "100%", bgcolor: "#FFFFFF" }}>
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
                              bgcolor: "#FFFFFF",
                              "&:hover": {
                                backgroundColor: "#F7F7F7",
                                "& .task-name": {
                                  color: theme.palette.primary.dark,
                                },
                              },
                            }}
                            {...provider.draggableProps}
                            ref={provider.innerRef}
                          >
                            {/* Icons */}
                            <TableCell sx={{ width: "10%" }} align="center">
                              <Stack direction="row" justifyContent="start" alignItems="center" spacing={1}>
                                <Tooltip title="Reorder Task" arrow size="small" placement="top-start">
                                  <IconButton size="small" type="button" sx={{ fontSize: "1.2rem" }} component="span" {...provider.dragHandleProps}>
                                    <ReorderIcon fontSize="inherit" />
                                  </IconButton>
                                </Tooltip>

                                {row?.subTasks && row?.subTasks?.length > 0 && (
                                  <IconButton size="small" onClick={() => handleToggleSubrows(row?.tid)} style={{ backgroundColor: "#F2F2F2" }}>
                                    {openSubrows && expandedTaskId === row?.tid ? (
                                      <ExpandLessIcon />
                                    ) : (
                                      <Badge badgeContent={row?.subTasks?.length} color="secondary">
                                        <ExpandMoreIcon />
                                      </Badge>
                                    )}
                                  </IconButton>
                                )}
                              </Stack>
                            </TableCell>

                            {/* Code */}
                            <TableCell sx={{ width: "10%" }} align="center">
                              <Typography
                                component="p"
                                variant="caption"
                                display="block"
                                sx={{
                                  color: theme.palette.secondary.dark,
                                  fontSize: "13px",
                                  fontWeight: "500",
                                }}
                                gutterBottom
                                textAlign="left"
                              >
                                {row?.tcode}
                              </Typography>
                            </TableCell>

                            {/* Task Name */}
                            <TableCell sx={{ width: "30%" }} align="left">
                              <Box component="form" noValidate sx={{ height: "100%" }}>
                                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
                                  <>
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
                                      className="task-name"
                                      gutterBottom
                                      ml={1}
                                      textAlign="left"
                                      onClick={() => handleOpenTaskPreviewDialog(row?.tid)}
                                    >
                                      {rowStates[row?.tid]?.taskName || row?.tname}
                                    </Typography>

                                    {rowId === row?.tid && (
                                      <CustomDialog handleClose={handleCloseTaskPreviewDialog} open={openTaskPreviewDialog} modalTitle="Task" redirectPath={`/tasks-overview/${rowId}`} showModalButton={true} modalSize="lg">
                                        <TaskPreview styles={styles} taskId={rowId} closePreview={handleCloseTaskPreviewDialog} fetchData={fetchData} />
                                      </CustomDialog>
                                    )}
                                  </>
                                </Stack>
                              </Box>
                            </TableCell>

                            {/* Assignee */}
                            <TableCell sx={{ width: "10%" }} align="center">
                              <Box sx={{ minWidth: 120 }}>
                                <Box>
                                  <Chip
                                    // label={formatAssigneeText(selectedAssignees[row?.tid] || row?.tassignee, regId, assignees)}
                                    label={row?.tassignee === regId ? "To Me" : row?.taskAssigneeName }
                                    variant="contained"
                                    sx={{
                                      minWidth: "80px",
                                      maxWidth: "85px",
                                    }}
                                  />
                                </Box>
                              </Box>
                            </TableCell>

                            {/* Priority */}
                            <TableCell sx={{ width: "10%" }} align="center">
                              <Box sx={{ minWidth: 120 }}>
                                <Box>
                                  <Chip
                                    label={formatPriority(selectedPriorities[row.tid] || row.tpriority || "")}
                                    variant="contained"
                                    sx={{
                                      minWidth: "80px",
                                      maxWidth: "85px",
                                      ...priorityColors[selectedPriorities[row.tid]],
                                    }}
                                  />
                                </Box>
                              </Box>
                            </TableCell>

                            {/* Status */}
                            <TableCell sx={{ width: "10%" }} align="center">
                              <Box sx={{ minWidth: 120 }}>
                                <Box>
                                  <Chip
                                    label={formatStatus(selectedStatuses[row.tid] || row.tstatus || "")}
                                    variant="contained"
                                    sx={{
                                      minWidth: "80px",
                                      maxWidth: "85px",
                                      ...statusColors[selectedStatuses[row.tid]],
                                    }}
                                  />
                                </Box>
                              </Box>
                            </TableCell>

                            {/* Due Date */}
                            <TableCell sx={{ width: "10%" }} align="center">
                              <MyDatePicker
                                label=""
                                required={false}
                                sizeWidth="132px"
                                showBorder={false}
                                minDate={new Date()} // Set the minimum date to today
                                maxDate={new Date(new Date().getFullYear() + 1, 11, 31)} // Set the maximum date to one year from today
                                value={row?.tdue_date ? new Date(row.tdue_date) : null}
                                onChange={handleTaskDueDate(row?.tid)}
                                isDisabled={true}
                              />
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
                                  bgcolor: "#FFFFFF",
                                  "&:hover": {
                                    backgroundColor: "#F7F7F7",
                                    "& .task-name": {
                                      color: theme.palette.primary.dark,
                                    },
                                  },
                                }}
                              >
                                {/* SubTaskIcons */}
                                <TableCell sx={{ width: "10%" }} align="center">
                                  <IconButton size="small" type="button" sx={{ fontSize: "1.2rem", ml: 3 }}>
                                    <SubdirectoryArrowRightRoundedIcon fontSize="inherit" />
                                  </IconButton>
                                </TableCell>

                                {/* SubTaskCode */}
                                <TableCell sx={{ width: "10%" }} align="center">
                                  <Typography
                                    component="p"
                                    variant="caption"
                                    display="block"
                                    sx={{
                                      color: theme.palette.secondary.dark,
                                      fontSize: "13px",
                                      fontWeight: "500",
                                    }}
                                    gutterBottom
                                    textAlign="left"
                                  >
                                    {subrow?.stcode}
                                  </Typography>
                                </TableCell>

                                {/* SubTask Name */}
                                <TableCell sx={{ width: "30%" }} align="left">
                                  <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
                                    <>
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
                                        className="task-name"
                                        gutterBottom
                                        ml={1}
                                        textAlign="left"
                                        onClick={() => handleOpenSubTaskPreviewDialog(subrow?.stid)}
                                      >
                                        {rowStates[subrow.stid]?.subtaskName || subrow?.stname}
                                      </Typography>

                                      {subRowId === subrow?.stid && (
                                        <CustomDialog handleClose={handleCloseSubTaskPreviewDialog} open={openSubTaskPreviewDialog} modalTitle="Subtask" redirectPath={`/subtasks-overview/${subRowId}`} showModalButton={true} modalSize="lg">
                                          <SubtaskPreview styles={styles} subtaskId={subRowId} closePreview={handleCloseSubTaskPreviewDialog} fetchData={fetchData} />
                                        </CustomDialog>
                                      )}
                                    </>
                                  </Stack>
                                </TableCell>

                                {/* SubTask Assignee */}
                                <TableCell sx={{ width: "10%" }} align="center">
                                  <Box sx={{ minWidth: 120 }}>
                                    <Box>
                                      <Chip
                                        // label={formatAssigneeText(selectedAssignees[subrow?.stid] || subrow?.stassignee, regId, assignees)}
                                        label={subrow?.stassignee === regId ? "To Me" : subrow?.subTaskAssigneeName }
                                        variant="contained"
                                        sx={{
                                          minWidth: "80px",
                                          maxWidth: "85px",
                                        }}
                                      />
                                    </Box>
                                  </Box>
                                </TableCell>

                                {/* SubTask Priority */}
                                <TableCell sx={{ width: "10%" }} align="center">
                                  <Box sx={{ minWidth: 120 }}>
                                    <Box>
                                      <Chip
                                        label={formatPriority(selectedPriorities[subrow?.stid] || subrow?.stpriority || "")}
                                        variant="contained"
                                        sx={{
                                          minWidth: "80px",
                                          maxWidth: "85px",
                                          ...priorityColors[selectedPriorities[subrow?.stid]],
                                        }}
                                      />
                                    </Box>
                                  </Box>
                                </TableCell>

                                {/* SubTask Status */}
                                <TableCell sx={{ width: "10%" }} align="center">
                                  <Box sx={{ minWidth: 120 }}>
                                    <Box>
                                      <Chip
                                        label={formatStatus(selectedStatuses[subrow?.stid] || subrow?.ststatus || "")}
                                        variant="contained"
                                        sx={{
                                          minWidth: "80px",
                                          maxWidth: "85px",
                                          ...statusColors[selectedStatuses[subrow?.stid]],
                                        }}
                                      />
                                    </Box>
                                  </Box>
                                </TableCell>

                                {/* Due Date */}
                                <TableCell sx={{ width: "10%" }} align="center">
                                  <MyDatePicker
                                    label=""
                                    required={false}
                                    sizeWidth="132px"
                                    showBorder={false}
                                    minDate={new Date()} // Set the minimum date to today
                                    maxDate={new Date(new Date().getFullYear() + 1, 11, 31)} // Set the maximum date to one year from today
                                    value={subrow?.stdue_date ? new Date(subrow?.stdue_date) : null}
                                    onChange={handleSubTaskDueDate(subrow?.stid)}
                                    isDisabled={true}
                                  />
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
