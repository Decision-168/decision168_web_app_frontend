import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Box, DialogContent, Typography } from "@mui/material";
import { openModal as reduxOpenModal } from "../../../redux/action/modalSlice";
import { useDispatch } from "react-redux";
import EventColorBox from "../../common/EventColorBox";
import ReduxDialog from "../../common/ReduxDialog";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DeleteEventDialog from "./DeleteEventDialog";
import EditEventDialog from "./EditEventDialog";
import { getCustomStyle } from "../getCustomStyle";

const ReminderViewDialog = ({ event }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const styleObject = getCustomStyle(event);

  const handleAddTodo = () => {
    dispatch(reduxOpenModal("add-todo"));
  };

  const handleEdit = () => {
    dispatch(reduxOpenModal("edit-event"));
  };

  const handleDelete = () => {
    setDeleteDialogOpen(true);
  };

  return (
    <>
      <ReduxDialog value="select-reminder" modalSize="md" isEventModal={true} handleAddTodo={handleAddTodo} handleEditClick={handleEdit} handleDeleteClick={handleDelete}>
        <DialogContent dividers>
          <Box>
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "left", alignItems: "center", mb: 1 }}>
                <EventColorBox backgroundColor={styleObject.backgroundColor} color={styleObject.color} />
                <Typography component="h4" sx={{ fontSize: "16px", fontWeight: "400" }}>
                  This is Reminder
                </Typography>
              </Box>

              <Typography component="h6" sx={{ fontSize: "12px", color: theme.palette.tertiary.light, textAlign: "left" }}>
                Wednesday, January 03 2024, 06:00 AM - 07:00 AM, Time Zone : America/New_York
              </Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "left", alignItems: "center", mb: 2 }}>
              <OpenInNewIcon sx={{ fontSize: "16px", mr: 2 }} />
              <Typography component="h5" sx={{ fontSize: "13px", fontWeight: "400", color: "#0084FF", cursor: "pointer", "&:hover": { color: theme.palette.primary.dark } }}>
                https://app.decision168.com/meeting/6ao-w9h-pdj-03072333
              </Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "left", alignItems: "center", mb: 2 }}>
              <NotificationsIcon sx={{ fontSize: "16px", mr: 2 }} />
              <Typography component="h5" sx={{ fontSize: "13px", fontWeight: "400" }}>
                5 minutes before
              </Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "left", alignItems: "center", mb: 2 }}>
              <ArrowForwardIcon sx={{ fontSize: "16px", mr: 2 }} />
              <Typography component="h5" sx={{ fontSize: "13px", fontWeight: "400" }}>
                Does not repeat
              </Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "left", alignItems: "center", mb: 2 }}>
              <FormatListBulletedIcon sx={{ fontSize: "16px", mr: 2 }} />
              <Typography component="h5" sx={{ fontSize: "13px", fontWeight: "400" }}>
                My Reminder
              </Typography>
            </Box>
          </Box>
        </DialogContent>
      </ReduxDialog>

      <DeleteEventDialog type="Reminder" setDeleteDialogOpen={setDeleteDialogOpen} isDeleteDialogOpen={isDeleteDialogOpen} />
    </>
  );
};

export default ReminderViewDialog;
