import React, { useEffect, useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Stack,
  IconButton,
} from "@mui/material";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { priorityColors, statusColors } from "./TasksData";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ReorderIcon from "@mui/icons-material/Reorder";
import SubdirectoryArrowRightRoundedIcon from "@mui/icons-material/SubdirectoryArrowRightRounded";
import { Box, Typography } from "@mui/material";
import Chip from "@mui/material/Chip";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { taskOverviewStyles } from "../taskOverview/styles";
import { selectUserDetails } from "../../../redux/action/userSlice";
import { formatPriority, formatStatus } from "../../../helpers/tasks";
import CustomDialog from "../../common/CustomDialog";
import TaskPreview from "../taskOverview/subComponents/TaskPreview";
import SubtaskPreview from "../subtaskOverview/subComponent/SubtaskPreview";
import Badge from "@mui/material/Badge";
import TasksModuleDatePicker from "./TasksModuleDatePicker";

export default function PortfolioTaskTable({ rows, setRows, fetchData }) {
  const theme = useTheme();
  const styles = taskOverviewStyles();
  const user = useSelector(selectUserDetails);
  const regId = user?.reg_id;


  const [rowId, setRowId] = useState(0);
  const [subRowId, setSubRowId] = useState(0);
  const [openSubrows, setOpenSubrows] = useState(false);
  const [expandedTaskId, setExpandedTaskId] = useState(0);
  const [rowStates, setRowStates] = useState({});

  //priority
  const [selectedPriorities, setSelectedPriorities] = useState({});

  //status
  const [selectedStatuses, setSelectedStatuses] = useState({});

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

  //Task Due Date
  const handleTaskDueDate = (date) => {};

  //SubTask Due Date
  const handleSubtaskDueDate = (date) => {};

  //Task PreviewDialog code
  const [openTaskPreviewDialog, setOpenTaskPreviewDialog] =
    React.useState(false);
  const [openSubTaskPreviewDialog, setOpenSubTaskPreviewDialog] =
    React.useState(false);
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

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <TableContainer sx={{ minHeight: "62vh", maxHeight: "100vh" }}>
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
                    <Draggable
                      key={row?.tcode}
                      draggableId={row?.tcode}
                      index={index}
                    >
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
                              <Stack
                                direction="row"
                                justifyContent="start"
                                alignItems="center"
                                spacing={1}
                              >
                                <Tooltip
                                  title="Reorder Task"
                                  arrow
                                  size="small"
                                  placement="top-start"
                                >
                                  <IconButton
                                    size="small"
                                    type="button"
                                    sx={{ fontSize: "1.2rem" }}
                                    component="span"
                                    {...provider.dragHandleProps}
                                  >
                                    <ReorderIcon fontSize="inherit" />
                                  </IconButton>
                                </Tooltip>

                                {row?.subTasks && row?.subTasks?.length > 0 && (
                                  <>
                                    {openSubrows &&
                                    expandedTaskId === row?.tid ? (
                                      <IconButton
                                        size="small"
                                        onClick={() =>
                                          handleCloseSubrows(row?.tid)
                                        }
                                        style={{ backgroundColor: "#F2F2F2" }}
                                      >
                                        <ExpandLessIcon />
                                      </IconButton>
                                    ) : (
                                      <IconButton
                                        size="small"
                                        onClick={() =>
                                          handleOpenSubrows(row?.tid)
                                        }
                                        style={{ backgroundColor: "#F2F2F2" }}
                                      >
                                        <Badge
                                          badgeContent={row?.subTasks?.length}
                                          color="secondary"
                                        >
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
                              <Box
                                component="form"
                                noValidate
                                sx={{ height: "100%" }}
                              >
                                <Stack
                                  direction="row"
                                  justifyContent="space-between"
                                  alignItems="center"
                                  spacing={1}
                                >
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
                                        handleOpenTaskPreviewDialog(row?.tid)
                                      }
                                    >
                                      {rowStates[row?.tid]?.taskName ||
                                        row?.tname}
                                    </Typography>

                                    {rowId === row?.tid && (
                                      <CustomDialog
                                        handleClose={
                                          handleCloseTaskPreviewDialog
                                        }
                                        open={openTaskPreviewDialog}
                                        modalTitle="Task"
                                        redirectPath={`/tasks-overview/${rowId}`}
                                        showModalButton={true}
                                        modalSize="lg"
                                      >
                                        <TaskPreview
                                          styles={styles}
                                          taskId={rowId}
                                          closePreview={
                                            handleCloseTaskPreviewDialog
                                          }
                                          fetchData={fetchData}
                                        />
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
                                    label={
                                      row?.tassignee === regId
                                        ? "Assign to me"
                                        : row?.taskAssigneeName
                                    }
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
                                    label={formatPriority(
                                      selectedPriorities[row.tid] ||
                                        row.tpriority ||
                                        ""
                                    )}
                                    variant="contained"
                                    sx={{
                                      minWidth: "80px",
                                      maxWidth: "85px",
                                      ...priorityColors[
                                        selectedPriorities[row.tid]
                                      ],
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
                                    label={formatStatus(
                                      selectedStatuses[row.tid] ||
                                        row.tstatus ||
                                        ""
                                    )}
                                    variant="contained"
                                    sx={{
                                      minWidth: "80px",
                                      maxWidth: "85px",
                                      ...statusColors[
                                        selectedStatuses[row.tid]
                                      ],
                                    }}
                                  />
                                </Box>
                              </Box>
                            </TableCell>

                            {/* Due Date */}
                            <TableCell sx={{ width: "10%" }} align="center">
                              <TasksModuleDatePicker
                                label=""
                                required={false}
                                sizeWidth="132px"
                                showBorder={false}
                                value={
                                  row?.tdue_date
                                    ? new Date(row?.tdue_date)
                                    : null
                                }
                                onChange={handleTaskDueDate}
                                isDisabled={true}
                                type="task"
                                gid={row?.gid}
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
                                  <IconButton
                                    size="small"
                                    type="button"
                                    sx={{ fontSize: "1.2rem", ml: 3 }}
                                  >
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
                                  <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    spacing={1}
                                  >
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
                                          handleOpenSubTaskPreviewDialog(
                                            subrow?.stid
                                          )
                                        }
                                      >
                                        {rowStates[subrow.stid]?.subtaskName ||
                                          subrow?.stname}
                                      </Typography>

                                      {subRowId === subrow?.stid && (
<<<<<<< HEAD
                                        <CustomDialog handleClose={handleCloseSubTaskPreviewDialog} open={openSubTaskPreviewDialog} modalTitle="Subtask" redirectPath={`/subtasks-overview/${subRowId}`} showModalButton={true} modalSize="lg" data={{ tname: row?.tname, tproject_assign: row?.tproject_assign }}>
                                          <SubtaskPreview styles={styles} subtaskId={subRowId} closePreview={handleCloseSubTaskPreviewDialog} fetchData={fetchData} />
=======
                                        <CustomDialog
                                          handleClose={
                                            handleCloseSubTaskPreviewDialog
                                          }
                                          open={openSubTaskPreviewDialog}
                                          modalTitle="Subtask"
                                          redirectPath={`/subtasks-overview/${subRowId}`}
                                          showModalButton={true}
                                          modalSize="lg"
                                        >
                                          <SubtaskPreview
                                            styles={styles}
                                            subtaskId={subRowId}
                                            closePreview={
                                              handleCloseSubTaskPreviewDialog
                                            }
                                            fetchData={fetchData}
                                          />
>>>>>>> c8e20cae2265221430370582776db8fcea1d39fd
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
                                        label={
                                          subrow?.stassignee === regId
                                            ? "To Me"
                                            : subrow?.subTaskAssigneeName
                                        }
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
                                        label={formatPriority(
                                          selectedPriorities[subrow?.stid] ||
                                            subrow?.stpriority ||
                                            ""
                                        )}
                                        variant="contained"
                                        sx={{
                                          minWidth: "80px",
                                          maxWidth: "85px",
                                          ...priorityColors[
                                            selectedPriorities[subrow?.stid]
                                          ],
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
                                        label={formatStatus(
                                          selectedStatuses[subrow?.stid] ||
                                            subrow?.ststatus ||
                                            ""
                                        )}
                                        variant="contained"
                                        sx={{
                                          minWidth: "80px",
                                          maxWidth: "85px",
                                          ...statusColors[
                                            selectedStatuses[subrow?.stid]
                                          ],
                                        }}
                                      />
                                    </Box>
                                  </Box>
                                </TableCell>

                                {/*Subtask Due Date */}
                                <TableCell sx={{ width: "10%" }} align="center">
                                  <TasksModuleDatePicker
                                    label=""
                                    required={false}
                                    sizeWidth="132px"
                                    showBorder={false}
                                    value={
                                      subrow?.stdue_date
                                        ? new Date(subrow?.stdue_date)
                                        : null
                                    }
                                    onChange={handleSubtaskDueDate}
                                    isDisabled={true}
                                    type="subtask"
                                    parentTaskDueDate={row?.tdue_date}
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
    </>
  );
}
