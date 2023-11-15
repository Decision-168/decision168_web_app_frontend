import React, { useState, useSyncExternalStore } from "react";
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
import { tasks, taskAssignees, taskPriorities, taskStatuses } from "../subComponents/TasksData";
import Actions from "./Actions";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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
import ConfirmationDialog from "../../common/ConfirmationDialog";
import { closeCnfModal, openCnfModal } from "../../../redux/action/confirmationModalSlice";
import { useDispatch } from "react-redux";
import { useTheme } from "@mui/material/styles";
import CustomDialog from "../../common/CustomDialog";
import { taskOverviewStyles } from "../taskOverview/styles";
import SubtaskPreview from "../subtaskOverview/subComponent/SubtaskPreview";
import { closeModal } from "../../../redux/action/modalSlice";

const subRows = [
  { id: "1A", code: "AC-0001A", title: "Subtask-1A", description: "Subtask-1A Description", assignee: "John Doe", priority: "low", status: "in progress", dueDate: "2023-11-18", note: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, nemo.", isParentRow: false },
  { id: "1B", code: "AC-0001B", title: "Subtask-1B", description: "Subtask-1B Description", assignee: "John Doe", priority: "low", status: "in progress", dueDate: "2023-11-18", note: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, nemo.", isParentRow: false },
];

export default function SubtaskRow() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const theme = useTheme();
  const styles = taskOverviewStyles();
  const dispatch = useDispatch();
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

  const handleTaskDescription = (rowId) => {
    if (editMode) {
      //write logic for task description
      setEditMode(false);
    } else {
      setEditMode(true);
      setRowId(rowId);
    }
  };

  // tasks descrition
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

  const handleStatus = (event, subrowId) => {
    setEditStatus(false);
    setSelectedStatus(event.target.value);
  };

  const handleCodeCheckBoxDialog = (event, subrowId) => {
    if (event.target.checked) {
      dispatch(
        openCnfModal({
          modalName: "statusToComplete",
          title: "",
          description: `Do you want to Change Task Status to Complete?`,
        })
      );
      handleMoreClose();
    } else {
      dispatch(closeCnfModal({ modalName: "statusToComplete" }));
    }
  };

  //SubTask PreviewDialog code
  const [openSubTaskPreviewDialog, setOpenSubTaskPreviewDialog] = React.useState(false);
  const [filteredSubTask, setFilterSubTask] = useState(null);

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
    <Box sx={{ mt: 1 }}>
      <>
        {subRows.map((subrow, index) => (
          <TableRow sx={{ " &:last-child th": { border: 0 }, width: "100%", bgcolor: "white", "&:hover": { backgroundColor: "#F7F7F7", "& .task-description": { color: theme.palette.primary.dark } } }}>
            {/* Icons */}
            <TableCell align="right">
              <IconButton size="small">
                <SubdirectoryArrowRightRoundedIcon />
              </IconButton>
            </TableCell>

            {/* Code */}
            <TableCell align="center">
              <FormGroup sx={{ width: "100px" }}>
                <FormControlLabel sx={{ color: "black" }} control={<Checkbox size="small" onChange={(event) => handleCodeCheckBoxDialog(event, subrow.id)} />} label={subrow.code} />
              </FormGroup>
            </TableCell>

            {/* Task Description */}
            <TableCell align="left">
              <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ height: "100%" }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
                  {editMode && rowId === subrow.id ? (
                    <CustomTextField
                      name="taskDescription"
                      placeholder="Enter Task description..."
                      register={register}
                      errors={errors}
                      validation={globalValidations.taskDescription} // Pass the validation rules as a prop
                    />
                  ) : (
                    <>
                      <Typography onClick={() => handleOpenSubTaskPreviewDialog(subrow.id)} className="task-description" sx={{ textDecoration: "none", color: theme.palette.secondary.dark, fontSize: "13px", fontWeight: "400" }}>
                        {subrow.description}
                      </Typography>

                      <CustomDialog handleClose={handleCloseSubTaskPreviewDialog} open={openSubTaskPreviewDialog} modalTitle="Subtask" redirectPath={"/subtasks-overview"} showModalButton={true} modalSize="lg">
                        <SubtaskPreview styles={styles} filteredRow={filteredSubTask} />
                      </CustomDialog>
                    </>
                  )}
                  <Tooltip title={editMode ? "Save task" : "Rename task"} arrow size="small" placement="top-start">
                    <IconButton size="small" onClick={() => handleTaskDescription(subrow.id)}>
                      {editMode && rowId === subrow.id ? <SaveIcon /> : <EditIcon />}
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Box>
            </TableCell>

            {/* Assignee */}
            <TableCell align="center">
              <Box sx={{ minWidth: 120 }}>
                {editAssignee && rowId === subrow.id ? (
                  <FormControl fullWidth>
                    <Select value={selectedAssignee} onChange={(event) => handleAssignee(event, subrow.id)}>
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
                    <IconButton size="small" onClick={() => handleEditAssignee(subrow.id)}>
                      <ExpandMoreIcon />
                    </IconButton>
                  </Box>
                )}
              </Box>
            </TableCell>

            {/* Priority */}
            <TableCell align="center">
              <Box sx={{ minWidth: 120 }}>
                {editPriority && rowId === subrow.id ? (
                  <FormControl fullWidth>
                    <Select value={selectedPriority} onChange={(event) => handlePriority(event, subrow.id)}>
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
                    <IconButton size="small" onClick={() => handleEditPriority(subrow.id)}>
                      <ExpandMoreIcon />
                    </IconButton>
                  </Box>
                )}
              </Box>
            </TableCell>

            {/* Status */}
            <TableCell align="center">
              <Box sx={{ minWidth: 120 }}>
                {editStatus && rowId === subrow.id ? (
                  <FormControl fullWidth>
                    <Select value={selectedStatus} onChange={(event) => handleStatus(event, subrow.id)}>
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
                    <IconButton size="small" onClick={() => handleEditStatus(subrow.id)}>
                      <ExpandMoreIcon />
                    </IconButton>
                  </Box>
                )}
              </Box>
            </TableCell>

            {/* Due Date */}
            <TableCell align="center">
              <MyDatePicker label="" required={false} sizeWidth="132px" showBorder={false} />
            </TableCell>

            {/* Actions */}
            <TableCell sx={{ width: "20%" }} align="center">
              <Actions rowId={subrow.id} isParentRow={subrow.isParentRow} />
            </TableCell>
          </TableRow>
        ))}
      </>
      <ConfirmationDialog value={"statusToComplete"} />
    </Box>
  );
}
