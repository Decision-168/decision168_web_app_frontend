import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Chip,
  IconButton,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import BadgeIcon from "@mui/icons-material/Badge";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LowPriorityIcon from "@mui/icons-material/LowPriority";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getPriorityStyle } from "../../../../helpers/getPriorityStyle ";
import { getStatusStyle } from "../../../../helpers/getStatusStyle";
import { taskStatuses } from "../../subComponents/TasksData";
import { Link } from "react-router-dom";
import moment from "moment";
import { changeSubTaskStatus } from "../../../../api/modules/taskModule";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../../redux/action/userSlice";
import CircularProgress from "@mui/material/CircularProgress";

export default function SubTaskInfo({ styles, info }) {
  const [selectedStatus, setSelectedStatus] = useState(info?.ststatus);
  const [editStatus, setEditStatus] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const statusBg = getStatusStyle(selectedStatus);
  const user = useSelector(selectUserDetails);
  const regId = user?.reg_id;
  const handleEditStatus = () => {
    setEditStatus(true);
  };

  useEffect(() => {
    setSelectedStatus(info?.ststatus);
  }, [info?.ststatus]);

  const handleStatus = async (event, subtaskId, assignee) => {
    try {
      setLoading(true);

      const newStatus = event.target.value;

      const data = {
        stid: subtaskId,
        stassignee: assignee,
        status_but: newStatus,
      };

      const response = await changeSubTaskStatus(regId, data);

      // Update local state
      setSelectedStatus(newStatus);
      setEditStatus(false);

      toast.success(`${response.message}`);
    } catch (error) {
      toast.error(`${error?.response?.data?.error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container p={1}>
      <Grid item xs={12} md={6}>
        {info?.projectName && (
          <Box sx={styles.notesControl}>
            <HomeRepairServiceIcon sx={styles.noteIcon} />
            <Typography sx={styles.noteslabel}>Project:</Typography>
            <Typography
              component={Link}
              to={`/projects-overview/${info?.stproject_assign}`}
              sx={styles.projectOverviewLink}
            >
              {info.projectName}
            </Typography>
          </Box>
        )}
        {info?.subTaskAssigneeName && (
          <Box sx={styles.notesControl}>
            <AssignmentIndIcon sx={styles.noteIcon} />
            <Typography sx={styles.noteslabel}>Assigned To: </Typography>
            <Typography sx={styles.noteslabelText}>
              {info.subTaskAssigneeName}
            </Typography>
          </Box>
        )}

        {info?.stcreated_date && (
          <Box sx={styles.notesControl}>
            <CalendarMonthIcon sx={styles.noteIcon} />
            <Typography sx={styles.noteslabel}>Created Date: </Typography>
            <Typography sx={styles.noteslabelText}>
              {moment(info.stcreated_date).format("Do MMMM, YYYY ")}
            </Typography>
          </Box>
        )}
        {info?.subTaskCreatedByName && (
          <Box sx={styles.notesControl}>
            <PersonIcon sx={styles.noteIcon} />
            <Typography sx={styles.noteslabel}>Created By:</Typography>
            <Typography sx={styles.noteslabelText}>
              {info.subTaskCreatedByName}
            </Typography>
          </Box>
        )}
      </Grid>
      <Grid item xs={12} md={6}>
        {info?.portfolioName && (
          <Box sx={styles.notesControl}>
            <BadgeIcon sx={styles.noteIcon} />
            <Typography sx={styles.noteslabel}>Portfolio:</Typography>
            <Typography sx={styles.noteslabelText}>
              {info.portfolioName}
            </Typography>
          </Box>
        )}
        {info?.stdue_date && (
          <Box sx={styles.notesControl}>
            <CalendarTodayIcon sx={styles.noteIcon} />
            <Typography sx={styles.noteslabel}> Due Date: </Typography>
            <Typography sx={styles.noteslabelText}>
              {}
              {moment(info.stdue_date).format("Do MMMM, YYYY ")}
            </Typography>
          </Box>
        )}
        {info?.stpriority && (
          <Box sx={styles.notesControl}>
            <LowPriorityIcon sx={styles.noteIcon} />
            <Typography sx={styles.noteslabel}> Priority:</Typography>
            <Chip
              label={info.stpriority}
              variant="contained"
              sx={{
                ml: 1,
                minWidth: "80px",
                maxWidth: "85px",
                ...getPriorityStyle(info.stpriority),
              }}
            />
          </Box>
        )}
        {info?.ststatus && (
          <Box sx={styles.notesControl}>
            <PrivacyTipIcon sx={styles.noteIcon} />
            <Typography sx={styles.noteslabel}>Status:</Typography>
            <Typography sx={styles.noteslabelText}>
              <Box sx={{ minWidth: 120 }}>
                {editStatus ? (
                  <FormControl fullWidth>
                    <Select
                      value={selectedStatus}
                      onChange={(event) =>
                        handleStatus(event, info?.stid, info?.stassignee)
                      }
                    >
                      {taskStatuses.map((status, index) => (
                        <MenuItem key={index} value={status.value}>
                          <Typography
                            component="p"
                            variant="caption"
                            display="block"
                          >
                            {status.text}
                          </Typography>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  <>
                    {loading ? (
                      <CircularProgress
                        size={15}
                        thickness={8}
                        sx={{ color: "gray", mx: 2 }}
                      />
                    ) : (
                      <Box>
                        <Chip
                          label={selectedStatus}
                          variant="contained"
                          sx={{
                            minWidth: "80px",
                            maxWidth: "85px",
                            ...statusBg,
                          }}
                        />
                        <IconButton size="small" onClick={handleEditStatus}>
                          <ExpandMoreIcon />
                        </IconButton>
                      </Box>
                    )}
                  </>
                )}
              </Box>
            </Typography>
          </Box>
        )}
      </Grid>
    </Grid>
  );
}
