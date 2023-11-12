import { Box, Grid, Typography, Chip, IconButton, FormControl, Select, MenuItem } from "@mui/material";
import React from "react";
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

export default function OverviewCardBody({ styles }) {
  const [selectedStatus, setSelectedStatus] = React.useState("in progress");
  const [editStatus, setEditStatus] = React.useState(false);
  const priorityBg = getPriorityStyle("medium");
  const statusBg = getStatusStyle(selectedStatus);

  const handleEditStatus = () => {
    setEditStatus(true);
  };

  const handleStatus = (event) => {
    setEditStatus(false);
    setSelectedStatus(event.target.value);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography sx={styles.label}>Task Code:</Typography>
        <Typography sx={styles.labelText}>AC-2821</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography sx={styles.label}>Task Description :</Typography>
        <Typography sx={styles.labelText}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo minima adipisci quia placeat repellendus iste.</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography sx={styles.label}>Task Notes:</Typography>
        <Grid container p={1}>
          <Grid item xs={12} md={6}>
            <Box sx={styles.notesControl}>
              <HomeRepairServiceIcon sx={styles.noteIcon} />
              <Typography sx={styles.noteslabel}>Project:</Typography>
              <Typography component={Link} to="/projects-overview" sx={styles.projectOverviewLink}>
                Account Creation Module
              </Typography>
            </Box>
            <Box sx={styles.notesControl}>
              <AssignmentIndIcon sx={styles.noteIcon} />
              <Typography sx={styles.noteslabel}>Assigned To: </Typography>
              <Typography sx={styles.noteslabelText}>John Doe</Typography>
            </Box>
            <Box sx={styles.notesControl}>
              <CalendarMonthIcon sx={styles.noteIcon} />
              <Typography sx={styles.noteslabel}>Created Date: </Typography>
              <Typography sx={styles.noteslabelText}>6 Nov, 2023</Typography>
            </Box>
            <Box sx={styles.notesControl}>
              <PersonIcon sx={styles.noteIcon} />
              <Typography sx={styles.noteslabel}>Created By:</Typography>
              <Typography sx={styles.noteslabelText}>John Doe</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={styles.notesControl}>
              <BadgeIcon sx={styles.noteIcon} />
              <Typography sx={styles.noteslabel}>Portfolio:</Typography>
              <Typography sx={styles.noteslabelText}>John Doe</Typography>
            </Box>
            <Box sx={styles.notesControl}>
              <CalendarTodayIcon sx={styles.noteIcon} />
              <Typography sx={styles.noteslabel}> Due Date: </Typography>
              <Typography sx={styles.noteslabelText}>21 Nov, 2023</Typography>
            </Box>
            <Box sx={styles.notesControl}>
              <LowPriorityIcon sx={styles.noteIcon} />
              <Typography sx={styles.noteslabel}> Priority:</Typography>
              {/* <Typography sx={styles.noteslabelText}>Medium</Typography> */}
              <Chip label="medium" variant="contained" sx={{ ml: 1, minWidth: "80px", maxWidth: "85px", ...priorityBg }} />
            </Box>
            <Box sx={styles.notesControl}>
              <PrivacyTipIcon sx={styles.noteIcon} />
              <Typography sx={styles.noteslabel}>Status:</Typography>
              <Typography sx={styles.noteslabelText}>
                <Box sx={{ minWidth: 120 }}>
                  {editStatus ? (
                    <FormControl fullWidth>
                      <Select value={selectedStatus} onChange={(event) => handleStatus(event)}>
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
                      <IconButton size="small" onClick={() => handleEditStatus()}>
                        <ExpandMoreIcon />
                      </IconButton>
                    </Box>
                  )}
                </Box>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography sx={styles.label}>Tasks Links:</Typography>
        <Typography sx={styles.labelText}>No Task Links!</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography sx={styles.label}>Tasks Files:</Typography>
        <Typography sx={styles.labelText}>No Task Files!</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography sx={styles.label}>Subtasks:</Typography>
        <Typography sx={styles.labelText}>No SubTasks!</Typography>
      </Grid>
    </Grid>
  );
}
