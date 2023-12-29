import React, { useEffect, useState } from "react";
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Tooltip, Stack, FormGroup, FormControlLabel, Checkbox, TextField, IconButton, DialogContent } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { taskPriorities, priorityColors, taskStatuses, statusColors } from "../subComponents/TasksData";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ReorderIcon from "@mui/icons-material/Reorder";
import SubdirectoryArrowRightRoundedIcon from "@mui/icons-material/SubdirectoryArrowRightRounded";
import { Box, FormControl, MenuItem, Select, Typography } from "@mui/material";
import Chip from "@mui/material/Chip";
import ConfirmationDialog from "../../common/ConfirmationDialog";
import { openCnfModal, closeCnfModal } from "../../../redux/action/confirmationModalSlice";
import { useDispatch } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { taskOverviewStyles } from "../../../components/Tasks/taskOverview/styles";
import { changeSubTaskStatusCheckox, changeTaskStatusCheckox, editTaskAndSubtask } from "../../../api/modules/taskModule";
import { selectUserDetails } from "../../../redux/action/userSlice";
import { toast } from "react-toastify";
import { formatPriority, formatStatus } from "../../../helpers/tasks";
import CustomDialog from "../../common/CustomDialog";
import TaskPreview from "../taskOverview/subComponents/TaskPreview";
import SubtaskPreview from "../subtaskOverview/subComponent/SubtaskPreview";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CommentIcon from "@mui/icons-material/Comment";
import { openModal } from "../../../redux/action/modalSlice";
import CommentSection from "../../project/projects-overview/comment-section";
import More from "./More";
import ReduxDialog from "../../common/ReduxDialog";
import AttachmentIcon from "@mui/icons-material/Attachment";
import CustomFileInput from "../../common/CustomFileInput";
import Badge from "@mui/material/Badge";
import SelectAssignee from "./SelectAssignee";
import TasksModuleDatePicker from "./TasksModuleDatePicker";
import AttachTaskFile from "./AttachTaskFile";
import AttachSubtaskFile from "./AttachSubtaskFile";

export default function TaskTable({ rows, setRows, fetchData, currentPage }) {

  console.log("currentPage  TaskTable====> ",currentPage)
  const theme = useTheme();
  const styles = taskOverviewStyles();
  const dispatch = useDispatch();
  const portfolioId = JSON.parse(localStorage.getItem("portfolioId"));
  const user = useSelector(selectUserDetails);
  const regId = user?.reg_id;

  const [rowId, setRowId] = useState(0);
  const [subRowId, setSubRowId] = useState(0);
  const [openSubrows, setOpenSubrows] = useState(false);
  const [expandedTaskId, setExpandedTaskId] = useState(0);
  const [rowStates, setRowStates] = useState({});
  const [taskName, setTaskName] = useState("");
  const [subTaskName, setSubTaskName] = useState("");
  const [taskToEdit, setTaskToEdit] = useState({});
  const [subTaskToEdit, setSubTaskToEdit] = useState({});
  const [openTaskMenu, setOpenTaskMenu] = useState(null);
  const [openSubtaskMenu, setOpenSubtaskMenu] = useState(null);

  //assingnee
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
  const [parenTaskIdFromChild, setParentTaskIdFromChild] = useState(null); 

  const handleTaskIdFromChild = (parentTaskId)  => {
       console.log("parentTaskId ===>",parentTaskId)
      //  setParentTaskIdFromChild(parentTaskId);
       handleOpenSubrows(parentTaskId);
  }

  // useEffect(() => {
  //   console.log("parenTaskIdFromChild =====>",parenTaskIdFromChild)
  //   handleOpenSubrows(parenTaskIdFromChild);
  // }, []) 

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

  const handleDragEnd = (e) => {
    if (!e.destination) return;
    let tempData = Array.from(rows);
    let [source_data] = tempData.splice(e.source.index, 1);
    tempData.splice(e.destination.index, 0, source_data);
    setRows(tempData);
    setOpenSubrows(false);
  };

  const handleOpenSubrows = (taskId) => {
    setExpandedTaskId(taskId);
    setOpenSubrows(true);
  };

  const handleCloseSubrows = (taskId) => {
    setExpandedTaskId(null);
    setOpenSubrows(false);
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
      if (currentPage) {
        fetchData(currentPage);
      } else {
        fetchData();
      }
      dispatch(closeCnfModal({ modalName: "changeTaskCheckboxStatus" }));
      toast.success(`${response.message}`);
    } catch (error) {
      toast.error(`${error?.response?.data?.error}`);
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
      if (currentPage) {
        fetchData(currentPage);
      } else {
        fetchData();
      }
      dispatch(closeCnfModal({ modalName: "changeSubTaskCheckboxStatus" }));
      toast.success(`${response.message}`);
    } catch (error) {
      toast.error(`${error?.response?.data?.error}`);
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
    } catch (error) {}
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
    } catch (error) {}
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
    } catch (error) {}
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
    } catch (error) {}
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
      // Update the local state to reflect the change
      setSelectedStatuses((prevSelected) => ({
        ...prevSelected,
        [taskId]: response.updatedStatus,
      }));

      toast.success(`${response?.message}`);
    } catch (error) {
      toast.error(`${error?.response?.data?.message}`);
    }
  };

  const handleTaskStatus = async (event, taskId) => {
    try {
      const newStatus = event.target.value;
      await updateTaskStatus(taskId, newStatus);

      // // Update the local state to reflect the change
      // setSelectedStatuses((prevSelected) => ({
      //   ...prevSelected,
      //   [taskId]: newStatus,
      // }));
      // Close the status editing
      setEditTaskStatus(null);
    } catch (error) {}
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

      // Update the local state to reflect the change
      setSelectedStatuses((prevSelected) => ({
        ...prevSelected,
        [subtaskId]: response?.updatedStatus,
      }));

      toast.success(`${response?.message}`);
    } catch (error) {
      toast.error(`${error?.response?.data?.message}`);
      // Handle any errors that occur during the API call
    }
  };

  const handleSubTaskStatus = async (event, subtaskId) => {
    try {
      const newStatus = event.target.value;
      await updateSubTaskStatus(subtaskId, newStatus);

      // // Update the local state to reflect the change
      // setSelectedStatuses((prevSelected) => ({
      //   ...prevSelected,
      //   [subtaskId]: newStatus,
      // }));
      // Close the status editing
      setEditSubTaskStatus(null);
    } catch (error) {}
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
    }
  };
  const handleTaskDueDate = (taskId) => async (date) => {
    try {
      const newDate = date;
      await updateTaskDueDate(taskId, newDate);
    } catch (error) {}
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
    }
  };
  const handleSubTaskDueDate = (subtaskId) => async (date) => {
    try {
      const newDate = date;
      await updateSubTaskDueDate(subtaskId, newDate);
    } catch (error) {}
  };

  //Task PreviewDialog code
  const [openTaskPreviewDialog, setOpenTaskPreviewDialog] = React.useState(false);
  const [openSubTaskPreviewDialog, setOpenSubTaskPreviewDialog] = React.useState(false);

  // Task prview Dailog Code
  const handleOpenTaskPreviewDialog = (rowId) => {
    setRowId(rowId);
    setOpenTaskPreviewDialog(true);
  };

  const handleCloseTaskPreviewDialog = () => {
    setOpenTaskPreviewDialog(false);
  };

  // Sub Task prview Dailog Code
  const handleOpenSubTaskPreviewDialog = (subrowId, parent_tname, row) => {
    setSubRowId(subrowId);
    setOpenSubTaskPreviewDialog(true);
  };

  const handleCloseSubTaskPreviewDialog = () => {
    setOpenSubTaskPreviewDialog(false);
  };

  //Task Comment
  const handleTaskCommentsDialog = (rowId, row) => {
    setRowId(rowId);
    setTaskToEdit(row);
    dispatch(openModal("send-task-comments"));
  };

  //Subtask comment
  const handleSubTaskCommentsDialog = (subrowId, subrow) => {
    setSubRowId(subrowId);
    setSubTaskToEdit(subrow);
    dispatch(openModal("send-subtask-comments"));
  };

  //Task Attache file
  const handleTaskAttachFileDialog = (rowId, row) => {
    setRowId(rowId);
    setTaskToEdit(row);
    dispatch(openModal("task-attach-file"));
  };

  //Subtask Attach file
  const handleSubTaskAttachFileDialog = (subrowId, subrow) => {
    setSubRowId(subrowId);
    setSubTaskToEdit(subrow);
    dispatch(openModal("subtask-attach-file"));
  };

  const [subTaskFiles, setSubTaskFiles] = useState(null);
  //to send DB
  const subtaskFilesArray = subTaskFiles?.map((file, index) => ({
    [index]: file.name,
  }));
  const handleSubTaskFilesChange = (newValue, info) => {
    setSubTaskFiles(newValue);
  };

  //Task More
  const handleTaskMoreClick = (event, taskId, task) => {
    setTaskToEdit(task);
    setRowId(taskId);
    setOpenTaskMenu(event.currentTarget);
  };

  //SubTask More
  const handleSubTaskMoreClick = (event, subtaskId, row, subrow) => {
    setTaskToEdit(row);
    setSubTaskToEdit(subrow);
    setSubRowId(subtaskId);
    setOpenSubtaskMenu(event.currentTarget);
  };

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <TableContainer>
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
                                  <>
                                    {openSubrows && expandedTaskId === row?.tid ? (
                                      <IconButton size="small" onClick={() => handleCloseSubrows(row?.tid)} style={{ backgroundColor: "#F2F2F2" }}>
                                        <ExpandLessIcon />
                                      </IconButton>
                                    ) : (
                                      <IconButton size="small" onClick={() => handleOpenSubrows(row?.tid)} style={{ backgroundColor: "#F2F2F2" }}>
                                        <Badge badgeContent={row?.subTasks?.length} color="secondary">
                                          <ExpandMoreIcon />
                                        </Badge>
                                      </IconButton>
                                    )}
                                  </>
                                )}
                              </Stack>
                            </TableCell>

                            {/* Code */}
                            <TableCell sx={{ width: "10%" }} align="center">
                              <FormGroup sx={{ width: "100px" }}>
                                <FormControlLabel
                                  sx={{ color: "black" }}
                                  control={
                                    <Checkbox checked={row?.tstatus === "done"} size="small" onChange={(event) => handleTaskCodeCheckBoxDialog(event, row?.tid, row?.tassignee, row?.tstatus)} />
                                  }
                                  label={row?.tcode}
                                />
                              </FormGroup>
                            </TableCell>

                            {/* Task Name */}
                            <TableCell sx={{ width: "30%" }} align="left">
                              <Box component="form" noValidate sx={{ height: "100%" }}>
                                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
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
                                        <CustomDialog
                                          handleClose={handleCloseTaskPreviewDialog}
                                          open={openTaskPreviewDialog}
                                          modalTitle="Task"
                                          redirectPath={`/tasks-overview/${rowId}`}
                                          showModalButton={true}
                                          modalSize="lg"
                                        >
                                          <TaskPreview styles={styles} taskId={rowId} closePreview={handleCloseTaskPreviewDialog} fetchData={fetchData} currentPage={currentPage} />
                                        </CustomDialog>
                                      )}
                                    </>
                                  )}

                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "center",
                                    }}
                                  >
                                    {rowStates[row.tid]?.editMode ? (
                                      <>
                                        <IconButton size="small" type="button" sx={{ fontSize: "1rem" }} onClick={() => handleCancelTaskNameEdit(row?.tid)}>
                                          <CancelIcon fontSize="inherit" />
                                        </IconButton>
                                        <IconButton size="small" type="button" sx={{ fontSize: "1rem" }} onClick={() => handleSaveTaskClick(row?.tid)}>
                                          <SaveIcon fontSize="inherit" />
                                        </IconButton>
                                      </>
                                    ) : (
                                      <IconButton size="small" type="button" sx={{ fontSize: "1rem" }} onClick={(event) => handleEditTaskName(row?.tid, row?.tname)}>
                                        <EditIcon fontSize="inherit" />
                                      </IconButton>
                                    )}
                                  </Box>
                                </Stack>
                              </Box>
                            </TableCell>

                            {/* Assignee */}
                            <TableCell sx={{ width: "10%" }} align="center">
                              <SelectAssignee rowID={row?.tid} assigneeID={row?.tassignee} gID={row?.gid} type="task" />
                            </TableCell>

                            {/* Priority */}
                            <TableCell sx={{ width: "10%" }} align="center">
                              <Box sx={{ minWidth: 120 }}>
                                {editTaskPriority === row.tid ? (
                                  <FormControl fullWidth>
                                    <Select value={selectedPriorities[row.tid] || ""} onChange={(event) => handleTaskPriority(event, row?.tid)}>
                                      {taskPriorities.map((priority, index) => (
                                        <MenuItem key={index} value={priority.value}>
                                          <Typography component="p" variant="caption" display="block">
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
                                      label={formatPriority(selectedPriorities[row.tid] || row.tpriority || "")}
                                      variant="contained"
                                      sx={{
                                        minWidth: "80px",
                                        maxWidth: "85px",
                                        ...priorityColors[selectedPriorities[row.tid]],
                                      }}
                                    />
                                    <IconButton size="small" type="button" sx={{ fontSize: "1rem" }} onClick={() => handleEditTaskPriority(row.tid)}>
                                      <ExpandMoreIcon fontSize="inherit" />
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
                                    <Select value={selectedStatuses[row.tid] || ""} onChange={(event) => handleTaskStatus(event, row.tid)}>
                                      {taskStatuses.map((status, index) => (
                                        <MenuItem key={index} value={status.value}>
                                          <Typography component="p" variant="caption" display="block">
                                            {formatStatus(status.text)}
                                          </Typography>
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                ) : (
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
                                    <IconButton size="small" type="button" sx={{ fontSize: "1rem" }} onClick={() => handleEditTaskStatus(row.tid)}>
                                      <ExpandMoreIcon fontSize="inherit" />
                                    </IconButton>
                                  </Box>
                                )}
                              </Box>
                            </TableCell>

                            {/* Due Date */}
                            <TableCell sx={{ width: "10%" }} align="center">
                              <TasksModuleDatePicker
                                label=""
                                required={false}
                                sizeWidth="132px"
                                showBorder={false}
                                value={row?.tdue_date ? new Date(row?.tdue_date) : null}
                                onChange={handleTaskDueDate(row?.tid)}
                                type="task"
                                gid={row?.gid}
                              />
                            </TableCell>

                            {/* Actions */}
                            <TableCell sx={{ width: "10%" }} align="center">
                              <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
                                {/* Comment */}
                                <Tooltip arrow title="Comment" size="small" placement="top-end">
                                  <IconButton size="small" type="button" sx={{ fontSize: "1.2rem" }} onClick={() => handleTaskCommentsDialog(row?.tid, row)}>
                                    <CommentIcon fontSize="inherit" />
                                  </IconButton>
                                </Tooltip>

                                {rowId === row?.tid && (
                                  <ReduxDialog value="send-task-comments" modalTitle="Task" showModalButton={true} redirectPath={`/tasks-overview/${rowId}`} modalSize="sm">
                                    <DialogContent dividers>
                                      <CommentSection projectId={taskToEdit?.tproject_assign} taskId={taskToEdit?.tid} subtaskId={0} commentModule={"task"} />
                                    </DialogContent>
                                  </ReduxDialog>
                                )}

                                {/* Attach */}
                                <Tooltip arrow title="Attach file" size="small" placement="top-end">
                                  <IconButton size="small" type="button" sx={{ fontSize: "1.2rem" }} onClick={() => handleTaskAttachFileDialog(row?.tid, row)}>
                                    <AttachmentIcon fontSize="inherit" />
                                  </IconButton>
                                </Tooltip>

                                {rowId === row?.tid && (
                                  <ReduxDialog value="task-attach-file" modalTitle={row?.tname} showModalButton={true} redirectPath={`/tasks-overview/${rowId}`} modalSize="sm">
                                    <AttachTaskFile task={taskToEdit} />
                                  </ReduxDialog>
                                )}

                                {/* More */}
                                <Tooltip arrow title="More" size="small" placement="top-end">
                                  <IconButton
                                    size="small"
                                    type="button"
                                    sx={{ fontSize: "1.2rem" }}
                                    id="fade-button"
                                    aria-controls={open ? "fade-menu" : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? "true" : undefined}
                                    onClick={(event) => handleTaskMoreClick(event, row?.tid, row)}
                                  >
                                    <MoreVertIcon fontSize="inherit" />
                                  </IconButton>
                                </Tooltip>

                                {rowId === row?.tid && (
                                  <More rowId={rowId} task={taskToEdit} isParentRow={true} fetchData={fetchData} currentPage={currentPage} anchorEl={openTaskMenu} setAnchorEl={setOpenTaskMenu} />
                                )}
                              </Stack>
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
                                  <FormGroup sx={{ width: "100px" }}>
                                    <FormControlLabel
                                      sx={{ color: "black" }}
                                      control={
                                        <Checkbox
                                          checked={subrow?.ststatus === "done"}
                                          size="small"
                                          onChange={(event) => handleSubTaskCodeCheckBoxDialog(event, subrow?.stid, subrow?.stassignee, subrow?.ststatus)}
                                        />
                                      }
                                      label={subrow?.stcode}
                                    />
                                  </FormGroup>
                                </TableCell>

                                {/* SubTask Name */}
                                <TableCell sx={{ width: "30%" }} align="left">
                                  <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
                                    {rowStates[subrow.stid]?.editMode ? (
                                      <TextField
                                        name="stname"
                                        label=""
                                        variant="outlined"
                                        value={rowStates[subrow.stid]?.subtaskName}
                                        onChange={(e) => {
                                          setSubTaskName(e.target.value);
                                          setRowStates((prevRowStates) => ({
                                            ...prevRowStates,
                                            [subrow.stid]: {
                                              ...prevRowStates[subrow.stid],
                                              subtaskName: e.target.value,
                                            },
                                          }));
                                        }}
                                        fullWidth
                                      />
                                    ) : (
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
                                          <CustomDialog
                                            handleClose={handleCloseSubTaskPreviewDialog}
                                            open={openSubTaskPreviewDialog}
                                            modalTitle="Subtask"
                                            redirectPath={`/subtasks-overview/${subRowId}`}
                                            showModalButton={true}
                                            modalSize="lg"
                                            data={{ tname: row?.tname, tproject_assign: row?.tproject_assign }}
                                          >
                                            <SubtaskPreview
                                              styles={styles}
                                              subtaskId={subRowId}
                                              closePreview={handleCloseSubTaskPreviewDialog}
                                              fetchData={fetchData}
                                              currentPage={currentPage}
                                              taskData={row}
                                            />
                                          </CustomDialog>
                                        )}
                                      </>
                                    )}

                                    <Box
                                      sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                      }}
                                    >
                                      {rowStates[subrow.stid]?.editMode ? (
                                        <>
                                          <IconButton size="small" type="button" sx={{ fontSize: "1rem" }} onClick={() => handleCancelSubTaskNameEdit(subrow?.stid)}>
                                            <CancelIcon fontSize="inherit" />
                                          </IconButton>
                                          <IconButton size="small" type="button" sx={{ fontSize: "1rem" }} onClick={() => handleSaveSubTaskClick(subrow?.stid)}>
                                            <SaveIcon fontSize="inherit" />
                                          </IconButton>
                                        </>
                                      ) : (
                                        <IconButton size="small" type="button" sx={{ fontSize: "1rem" }} onClick={(event) => handleEditSubTaskName(subrow?.stid, subrow?.stname)}>
                                          <EditIcon fontSize="inherit" />
                                        </IconButton>
                                      )}
                                    </Box>
                                  </Stack>
                                </TableCell>

                                {/* SubTask Assignee */}
                                <TableCell sx={{ width: "10%" }} align="center">
                                  <SelectAssignee rowID={subrow?.stid} assigneeID={subrow?.stassignee} gID={subrow?.gid} type="subtask" />
                                </TableCell>

                                {/* SubTask Priority */}
                                <TableCell sx={{ width: "10%" }} align="center">
                                  <Box sx={{ minWidth: 120 }}>
                                    {editSubTaskPriority === subrow?.stid ? (
                                      <FormControl fullWidth>
                                        <Select value={selectedPriorities[subrow?.stid] || ""} onChange={(event) => handleSubTaskPriority(event, subrow?.stid)}>
                                          {taskPriorities.map((priority, index) => (
                                            <MenuItem key={index} value={priority.value}>
                                              <Typography component="p" variant="caption" display="block">
                                                {formatPriority(priority.text)}
                                              </Typography>
                                            </MenuItem>
                                          ))}
                                        </Select>
                                      </FormControl>
                                    ) : (
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
                                        <IconButton size="small" type="button" sx={{ fontSize: "1rem" }} onClick={() => handleEditSubTaskPriority(subrow?.stid)}>
                                          <ExpandMoreIcon fontSize="inherit" />
                                        </IconButton>
                                      </Box>
                                    )}
                                  </Box>
                                </TableCell>

                                {/* SubTask Status */}
                                <TableCell sx={{ width: "10%" }} align="center">
                                  <Box sx={{ minWidth: 120 }}>
                                    {editSubTaskStatus === subrow?.stid ? (
                                      <FormControl fullWidth>
                                        <Select value={selectedStatuses[subrow?.stid] || ""} onChange={(event) => handleSubTaskStatus(event, subrow?.stid)}>
                                          {taskStatuses.map((status, index) => (
                                            <MenuItem key={index} value={status.value}>
                                              <Typography component="p" variant="caption" display="block">
                                                {formatStatus(status.text)}
                                              </Typography>
                                            </MenuItem>
                                          ))}
                                        </Select>
                                      </FormControl>
                                    ) : (
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
                                        <IconButton size="small" type="button" sx={{ fontSize: "1rem" }} onClick={() => handleEditSubTaskStatus(subrow?.stid)}>
                                          <ExpandMoreIcon fontSize="inherit" />
                                        </IconButton>
                                      </Box>
                                    )}
                                  </Box>
                                </TableCell>

                                {/* Due Date */}
                                <TableCell sx={{ width: "10%" }} align="center">
                                  <TasksModuleDatePicker
                                    label=""
                                    required={false}
                                    sizeWidth="132px"
                                    showBorder={false}
                                    value={subrow?.stdue_date ? new Date(subrow?.stdue_date) : null}
                                    onChange={handleSubTaskDueDate(subrow?.stid)}
                                    type="subtask"
                                    parentTaskDueDate={row?.tdue_date}
                                  />
                                </TableCell>

                                {/*SubTask Actions */}
                                <TableCell sx={{ width: "10%" }} align="center">
                                  <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
                                    {/* Comment */}
                                    <Tooltip arrow title="Comment" size="small" placement="top-end">
                                      <IconButton size="small" type="button" sx={{ fontSize: "1.2rem" }} onClick={() => handleSubTaskCommentsDialog(subrow?.stid, subrow)}>
                                        <CommentIcon fontSize="inherit" />
                                      </IconButton>
                                    </Tooltip>

                                    {subRowId === subrow?.stid && (
                                      <ReduxDialog value="send-subtask-comments" modalTitle="Subtask" showModalButton={true} redirectPath={`/subtasks-overview/${subRowId}`} modalSize="sm">
                                        <DialogContent dividers>
                                          <CommentSection projectId={subTaskToEdit?.stproject_assign} taskId={0} subtaskId={subTaskToEdit?.stid} commentModule={"subtask"} />
                                        </DialogContent>
                                      </ReduxDialog>
                                    )}

                                    {/* Attach */}
                                    <Tooltip arrow title="Attach file" size="small" placement="top-end">
                                      <IconButton size="small" type="button" sx={{ fontSize: "1.2rem" }} onClick={() => handleSubTaskAttachFileDialog(subrow?.stid, subrow)}>
                                        <AttachmentIcon fontSize="inherit" />
                                      </IconButton>
                                    </Tooltip>

                                    {subRowId === subrow?.stid && (
                                      <ReduxDialog value="subtask-attach-file" modalTitle={subrow?.stname} showModalButton={true} redirectPath={`/subtasks-overview/${subRowId}`} modalSize="sm">
                                        <AttachSubtaskFile subtask={subTaskToEdit} />
                                      </ReduxDialog>
                                    )}

                                    {/* Subtask More */}
                                    <Tooltip arrow title="More" size="small" placement="top-end">
                                      <IconButton
                                        size="small"
                                        type="button"
                                        sx={{ fontSize: "1.2rem" }}
                                        id="fade-button"
                                        aria-controls={open ? "fade-menu" : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? "true" : undefined}
                                        onClick={(event) => handleSubTaskMoreClick(event, subrow?.stid, row, subrow)}
                                      >
                                        <MoreVertIcon fontSize="inherit" />
                                      </IconButton>
                                    </Tooltip>

                                    {subRowId === subrow?.stid && (
                                      <More
                                        rowId={subRowId}
                                        task={taskToEdit}
                                        subTask={subTaskToEdit}
                                        isParentRow={false}
                                        currentPage={currentPage}
                                        fetchData={fetchData}
                                        anchorEl={openSubtaskMenu}
                                        setAnchorEl={setOpenSubtaskMenu}
                                        passTaskIdToParent={handleTaskIdFromChild}
                                    
                                      />
                                    )}
                                  </Stack>
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
