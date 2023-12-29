import React, { useEffect, useState, memo } from "react";
import { FormControl, Select, MenuItem, Typography, Box, IconButton, Chip } from "@mui/material";
import { activePotfolioTeamMembers, editTaskAndSubtask, getGoalTeamMembers } from "../../../api/modules/taskModule";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../redux/action/userSlice";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { toast } from "react-toastify";
import { fetchAssignees } from "../../../helpers/fetchAssignees";

const SelectAssignee = ({ rowID, assigneeID, gID, type }) => {
  const portfolioId = JSON.parse(localStorage.getItem("portfolioId"));
  const user = useSelector(selectUserDetails);
  const regId = user?.reg_id;

  const [editAssignee, setEditAssignee] = useState(null);
  const [assignees, setAssignees] = useState([]);
  const [selectedAssignee, setSelectedAssignee] = useState(null);

  useEffect(() => {
    setSelectedAssignee(assigneeID);
  }, [assigneeID]);

  const formatAssigneeText = (assigneeId, regId, assignees) => {
    // Replace this logic with your actual logic for displaying the assignee text
    if (assigneeId === regId) {
      return "Assign to me";
    } else {
      const foundAssignee = assignees?.find((assignee) => assignee?.reg_id === assigneeId);

      // Check if an assignee with the given reg_id was found
      if (foundAssignee) {
        return foundAssignee?.name;
      } else {
        // Handle the else condition here (return a default message or handle as needed)
        return "Assignee not found";
      }
    }
  };


  useEffect(() => {
    fetchAssignees(gID, portfolioId, regId, setAssignees);
  }, [gID, portfolioId]);

  const handleEditAssignee = (taskId) => {
    setEditAssignee(taskId);
  };

  //Task Priority
  const updateAssignee = async (taskId, newAssignee) => {
    try {
      const taskData = {
        div_class: "task_editable",
        div_field: "tassignee_field",
        div_id: taskId,
        txt: newAssignee,
        user_id: regId,
      };

      const subtaskData = {
        div_class: "subtask_editable",
        div_field: "stassignee_field",
        div_id: taskId,
        txt: newAssignee,
        user_id: regId,
      };

      // Assuming editTaskAndSubtask returns a Promise
      const response = type === "task" ? await editTaskAndSubtask(portfolioId, taskData) : await editTaskAndSubtask(portfolioId, subtaskData);
      toast.success(`${response?.message}`);
    } catch (error) {
      toast.error(`${error?.response?.data?.message}`);
    }
  };

  const handleAssignee = async (event, taskId) => {
    try {
      const newAssignee = event.target.value;

      await updateAssignee(taskId, newAssignee);

      // Update the local state to reflect the change
      setSelectedAssignee(event.target.value);
      // Close the assignee editing
      setEditAssignee(null);
    } catch (error) {}
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      {editAssignee === rowID ? (
        <FormControl fullWidth>
          <Select value={selectedAssignee} onChange={(event) => handleAssignee(event, rowID)}>
            {assignees.map((assignee, index) => (
              <MenuItem key={index} value={assignee.reg_id}>
                <Typography component="p" variant="caption" display="block">
                  {assignee.name}
                </Typography>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
        <Box>
          <Chip
            label={formatAssigneeText(selectedAssignee, regId, assignees)}
            variant="contained"
            sx={{
              minWidth: "80px",
              maxWidth: "85px",
            }}
          />
          <IconButton size="small" type="button" sx={{ fontSize: "1rem" }} onClick={() => handleEditAssignee(rowID)}>
            <ExpandMoreIcon fontSize="inherit" />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default memo(SelectAssignee);
