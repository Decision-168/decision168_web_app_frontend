import React, { useEffect, useState, memo } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  Typography,
  Box,
  IconButton,
  Chip,
} from "@mui/material";
import {
  activePotfolioTeamMembers,
  editTaskAndSubtask,
  getGoalTeamMembers,
} from "../../../api/modules/taskModule";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../redux/action/userSlice";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { toast } from "react-toastify";

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
      const foundAssignee = assignees?.find(
        (assignee) => assignee?.reg_id === assigneeId
      );

      // Check if an assignee with the given reg_id was found
      if (foundAssignee) {
        return foundAssignee?.name;
      } else {
        // Handle the else condition here (return a default message or handle as needed)
        return "Assignee not found";
      }
    }
  };

  const getAssignees = async (gid, portfolio_id) => {
    try {
      if (gid === 0) {
        // Call the activePotfolioTeamMembers API
        const response = await activePotfolioTeamMembers(portfolio_id);
        return response;
      } else {
        // Call the getGoalTeamMembers API with specific gid
        const response = await getGoalTeamMembers(gid);
        return response;
      }
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const teamMembers = await getAssignees(gID, portfolioId);

        // Assuming storedRegId is the value you want to compare with reg_id
        const storedRegId = regId;

        // Find the index of the team member with reg_id equal to storedRegId
        const indexOfStoredRegId = teamMembers.findIndex(
          (member) => member.reg_id === storedRegId
        );

        // If the member with storedRegId is found, replace its name with "Assign to me"
        if (indexOfStoredRegId !== -1) {
          teamMembers[indexOfStoredRegId].name = "Assign to me";
        }

        // Sort the array so that "Assign to me" is always the first option
        teamMembers.sort((a, b) =>
          a.name === "Assign to me" ? -1 : b.name === "Assign to me" ? 1 : 0
        );

        setAssignees(teamMembers);
      } catch (error) {}
    };

    fetchTeamMembers();
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
      const response =
        type === "task"
          ? await editTaskAndSubtask(portfolioId, taskData)
          : await editTaskAndSubtask(portfolioId, subtaskData);
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
          <Select
            value={selectedAssignee}
            onChange={(event) => handleAssignee(event, rowID)}
          >
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
          <IconButton
            size="small"
            type="button"
            sx={{ fontSize: "1rem" }}
            onClick={() => handleEditAssignee(rowID)}
          >
            <ExpandMoreIcon fontSize="inherit" />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default memo(SelectAssignee);
