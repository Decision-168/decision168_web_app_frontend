import React, { useEffect, useState } from "react";
import {
  TableRow,
  TableCell,
  Stack,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  IconButton,
  Tooltip,
  DialogContent,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import {
  taskPriorities,
  priorityColors,
  taskStatuses,
  statusColors,
} from "../subComponents/TasksData";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SubdirectoryArrowRightRoundedIcon from "@mui/icons-material/SubdirectoryArrowRightRounded";
import {
  Box,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import Chip from "@mui/material/Chip";
import ConfirmationDialog from "../../common/ConfirmationDialog";
import {
  openCnfModal,
  closeCnfModal,
} from "../../../redux/action/confirmationModalSlice";
import { useDispatch } from "react-redux";
import { useTheme } from "@mui/material/styles";
import CustomDialog from "../../common/CustomDialog";
import { taskOverviewStyles } from "../taskOverview/styles";
import SubtaskPreview from "../subtaskOverview/subComponent/SubtaskPreview";
import { useSelector } from "react-redux";
import {
  changeSubTaskStatusCheckox,
  editTaskAndSubtask,
} from "../../../api/modules/taskModule";
import { selectUserDetails } from "../../../redux/action/userSlice";
import { toast } from "react-toastify";
import {
  formatAssigneeText,
  formatPriority,
  formatStatus,
} from "../../../helpers/tasks";
import CommentIcon from "@mui/icons-material/Comment";
import AttachmentIcon from "@mui/icons-material/Attachment";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SelectAssignee from "./SelectAssignee";
import TasksModuleDatePicker from "./TasksModuleDatePicker";
import AttachSubtaskFile from "./AttachSubtaskFile";
import { openModal } from "../../../redux/action/modalSlice";
import ReduxDialog from "../../common/ReduxDialog";
import CommentSection from "../../project/projects-overview/comment-section";
import More from "./More";

export default function SubtaskRow({ task, fetchTaskDetails }) {
  const theme = useTheme();
  const styles = taskOverviewStyles();
  const dispatch = useDispatch();
  const portfolioId = JSON.parse(localStorage.getItem("portfolioId"));
  const user = useSelector(selectUserDetails);
  const regId = user?.reg_id;

  const [subRowId, setSubRowId] = useState(0);
  const [rowStates, setRowStates] = useState({});
  const [subTaskName, setSubTaskName] = useState("");
  const [subTaskAssignee, setSubTaskAssignee] = useState(null);
  const [openSubTaskPreviewDialog, setOpenSubTaskPreviewDialog] =
    React.useState(false);
  const [parentTaskName, setParentTaskName] = useState("");
  const [subTaskToEdit, setSubTaskToEdit] = useState({});
  const [openSubtaskMenu, setOpenSubtaskMenu] = useState(null);

  //priority
  const [selectedPriorities, setSelectedPriorities] = useState({});
  const [editSubTaskPriority, setEditSubTaskPriority] = useState(null);
  //status
  const [selectedStatuses, setSelectedStatuses] = useState({});
  const [editSubTaskStatus, setEditSubTaskStatus] = useState(null);
  //Duedate
  const [selectedSubTaskDueDate, setSelectedSubTaskDueDate] = useState(null);

  // Set the initial selectedPriorities based on rows
  useEffect(() => {
    const initialSelectedPriorities = {};
    // Check for subrows and their priorities
    if (task.subTasks && Array.isArray(task.subTasks)) {
      task.subTasks.forEach((subrow) => {
        if (subrow.stpriority) {
          initialSelectedPriorities[subrow.stid] = subrow.stpriority;
        }
      });
    }
    setSelectedPriorities(initialSelectedPriorities);
  }, [task]);

  // Set the initial selectedStatuses based on rows
  useEffect(() => {
    const initialSelectedStatuses = {};
    // Check for subrows and their priorities
    if (task.subTasks && Array.isArray(task.subTasks)) {
      task.subTasks.forEach((subrow) => {
        if (subrow.ststatus) {
          initialSelectedStatuses[subrow.stid] = subrow.ststatus;
        }
      });
    }
    setSelectedStatuses(initialSelectedStatuses);
  }, [task]);

  // Subtask Code checkbox
  const handleSubTaskCodeCheckBoxDialog = (
    event,
    subrowId,
    stAssignee,
    stStatus
  ) => {
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
      fetchTaskDetails();
      dispatch(closeCnfModal({ modalName: "changeSubTaskCheckboxStatus" }));
      toast.success(`${response.message}`);
    } catch (error) {
      toast.error(`${error?.response?.data?.error}`);
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
      fetchTaskDetails();
      // Show success toast with the API response message
      toast.success(`${response?.message}`);
    } catch (error) {
      toast.error(`${error?.response?.data?.message}`);
    }
  };

  const handleSubTaskPriority = async (event, subtaskId) => {
    const newPriority = event.target.value;
    // Update the priority in the database and handle states
    try {
      await updateSubTaskPriority(subtaskId, newPriority);

      // Update the local state to reflect the change
      setSelectedPriorities((prevSelected) => ({
        ...prevSelected,
        [subtaskId]: newPriority,
      }));
      // Close the priority editing
      setEditSubTaskPriority(null);
    } catch (error) {
      // Handle errors specific to the save operation if needed
    }
  };

  const handleEditSubTaskPriority = (subtaskId) => {
    setEditSubTaskPriority(subtaskId);
  };

  // SubTask Status
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
      fetchTaskDetails();
      // Show success toast with the API response message
      toast.success(`${response?.message}`);
    } catch (error) {
      toast.error(`${error?.response?.data?.message}`);
      // Handle any errors that occur during the API call
    }
  };

  const handleSubTaskStatus = async (event, subtaskId) => {
    const newStatus = event.target.value;
    // Update the status in the database and handle states
    try {
      await updateSubTaskStatus(subtaskId, newStatus);

      // Update the local state to reflect the change
      setSelectedStatuses((prevSelected) => ({
        ...prevSelected,
        [subtaskId]: newStatus,
      }));
      // Close the status editing
      setEditSubTaskStatus(null);
    } catch (error) {
      // Handle errors specific to the save operation if needed
    }
  };

  const handleEditSubTaskStatus = (subtaskId) => {
    setEditSubTaskStatus(subtaskId);
  };

  //Duedate
  const handleSubTaskDueDateChange = (date) => {
    setSelectedSubTaskDueDate(date);
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

  //Subtask Attach file
  const handleSubTaskAttachFileDialog = (subrowId, subrow) => {
    setSubRowId(subrowId);
    setSubTaskToEdit(subrow);
    dispatch(openModal("subtask-attach-file"));
  };

  //SubTask More
  const handleSubTaskMoreClick = (event, subtaskId, subrow) => {
    setSubTaskToEdit(subrow);
    setSubRowId(subtaskId);
    setOpenSubtaskMenu(event.currentTarget);
  };

  //Subtask comment
  const handleSubTaskCommentsDialog = (subrowId, subrow) => {
    setSubRowId(subrowId);
    setSubTaskToEdit(subrow);
    dispatch(openModal("send-comments"));
  };

  return (
    <Box sx={{ mt: 1 }}>
      {task?.subTasks?.length > 0 ? (
        task?.subTasks?.map((subrow, index) => (
          <TableRow
            sx={{
              " &:last-child th": { border: 0 },
              width: "100%",
              bgcolor: "white",
              "&:hover": {
                backgroundColor: "#F7F7F7",
                "& .task-description": { color: theme.palette.primary.dark },
              },
            }}
          >
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
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={1}
              >
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
                      onClick={() =>
                        handleOpenSubTaskPreviewDialog(subrow?.stid)
                      }
                    >
                      {rowStates[subrow.stid]?.subtaskName || subrow?.stname}
                    </Typography>

                    <CustomDialog
                      handleClose={handleCloseSubTaskPreviewDialog}
                      open={openSubTaskPreviewDialog}
                      modalTitle="Subtask"
                      redirectPath={`/subtasks-overview/${subRowId}`}
                      showModalButton={true}
                      modalSize="lg"
                    >
                      <SubtaskPreview styles={styles} subtaskId={subRowId} />
                    </CustomDialog>
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
                      <IconButton
                        size="small"
                        type="button"
                        sx={{ fontSize: "1rem" }}
                        onClick={() =>
                          handleCancelSubTaskNameEdit(subrow?.stid)
                        }
                      >
                        <CancelIcon fontSize="inherit" />
                      </IconButton>
                      <IconButton
                        size="small"
                        type="button"
                        sx={{ fontSize: "1rem" }}
                        onClick={() => handleSaveSubTaskClick(subrow?.stid)}
                      >
                        <SaveIcon fontSize="inherit" />
                      </IconButton>
                    </>
                  ) : (
                    <IconButton
                      size="small"
                      type="button"
                      sx={{ fontSize: "1rem" }}
                      onClick={(event) =>
                        handleEditSubTaskName(subrow?.stid, subrow?.stname)
                      }
                    >
                      <EditIcon fontSize="inherit" />
                    </IconButton>
                  )}
                </Box>
              </Stack>
            </TableCell>

            {/* SubTask Assignee */}
            <TableCell sx={{ width: "10%" }} align="center">
              <SelectAssignee
                rowID={subrow?.stid}
                assigneeID={subrow?.stassignee}
                gID={subrow?.gid}
                type="subtask"
              />
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
                      }
                    >
                      {taskPriorities.map((priority, index) => (
                        <MenuItem key={index} value={priority.value}>
                          <Typography
                            component="p"
                            variant="caption"
                            display="block"
                          >
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
                      onClick={() => handleEditSubTaskPriority(subrow?.stid)}
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </Box>
                )}
              </Box>
            </TableCell>

            {/* Subtask Status */}
            <TableCell sx={{ width: "10%" }} align="center">
              <Box sx={{ minWidth: 120 }}>
                {editSubTaskStatus === subrow?.stid ? (
                  <FormControl fullWidth>
                    <Select
                      value={selectedStatuses[subrow?.stid] || ""}
                      onChange={(event) =>
                        handleSubTaskStatus(event, subrow?.stid)
                      }
                    >
                      {taskStatuses.map((status, index) => (
                        <MenuItem key={index} value={status.value}>
                          <Typography
                            component="p"
                            variant="caption"
                            display="block"
                          >
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
                      onClick={() => handleEditSubTaskStatus(subrow?.stid)}
                    >
                      <ExpandMoreIcon />
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
                onChange={handleSubTaskDueDateChange}
                type="subtask"
                parentTaskDueDate={task?.tdue_date}
              />
            </TableCell>

            {/* Actions */}
            <TableCell sx={{ width: "20%" }} align="center">
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={1}
              >
                {/* Comment */}
                <Tooltip arrow title="Comment" size="small" placement="top-end">
                  <IconButton
                    size="small"
                    type="button"
                    sx={{ fontSize: "1.2rem" }}
                    onClick={() =>
                      handleSubTaskCommentsDialog(subrow?.stid, subrow)
                    }
                  >
                    <CommentIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
                {subRowId === subrow?.stid && (
                  <ReduxDialog
                    value="send-comments"
                    modalTitle={subrow?.stname}
                    showModalButton={true}
                    redirectPath={`/subtasks-overview/${subRowId}`}
                    modalSize="sm"
                  >
                    <DialogContent dividers>
                      <CommentSection
                        projectId={subTaskToEdit?.stproject_assign}
                        taskId={"0"}
                        subtaskId={subTaskToEdit?.stid}
                      />
                    </DialogContent>
                  </ReduxDialog>
                )}

                {/* Attach */}
                <Tooltip
                  arrow
                  title="Attach file"
                  size="small"
                  placement="top-end"
                >
                  <IconButton
                    size="small"
                    type="button"
                    sx={{ fontSize: "1.2rem" }}
                    onClick={() =>
                      handleSubTaskAttachFileDialog(subrow?.stid, subrow)
                    }
                  >
                    <AttachmentIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
                {subRowId === subrow?.stid && (
                  <ReduxDialog
                    value="subtask-attach-file"
                    modalTitle={subrow?.stname}
                    showModalButton={true}
                    redirectPath={`/subtasks-overview/${subRowId}`}
                    modalSize="sm"
                  >
                    <AttachSubtaskFile subtask={subTaskToEdit} />
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
                    onClick={(event) =>
                      handleSubTaskMoreClick(event, subrow?.stid, subrow)
                    }
                  >
                    <MoreVertIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>

                {subRowId === subrow?.stid && (
                  <More
                    rowId={subRowId}
                    task={task}
                    subTask={subTaskToEdit}
                    isParentRow={false}
                    fetchData={fetchTaskDetails}
                    anchorEl={openSubtaskMenu}
                    setAnchorEl={setOpenSubtaskMenu}
                  />
                )}
              </Stack>
            </TableCell>
          </TableRow>
        ))
      ) : (
        <Typography sx={styles.labelText}>No SubTasks!</Typography>
      )}
      <ConfirmationDialog value={"statusToComplete"} />
      <ConfirmationDialog
        value={"changeSubTaskCheckboxStatus"}
        handleYes={handleSubTaskYes}
      />
    </Box>
  );
}
