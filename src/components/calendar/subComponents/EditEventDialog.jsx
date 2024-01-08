import React from "react";
import ReduxDialog from "../../common/ReduxDialog";
import { DialogActions, DialogContent, Box, Typography } from "@mui/material";
import SecondaryButton from "../../common/SecondaryButton";
import PrimaryButton from "../../common/PrimaryButton";
import EventForm from "./EventForm";
import TodoForm from "./TodoForm";
import ReminderForm from "./ReminderForm";
import MeetingForm from "./MeetingForm";
import { closeModal as reduxCloseModal } from "../../../redux/action/modalSlice";
import { useDispatch } from "react-redux";
import { useTheme } from "@mui/material/styles";
import ScrollableContainer from "../../common/ScrollableContainer";

export default function EditEventDialog({ type }) {
  const theme = useTheme();
  const dispatch = useDispatch();

  const handleSave = () => {
    switch (selectedTab) {
      case "event":
        alert("You have Updated event form values");
        break;
      case "todo":
        alert("You have Updated todo form values");
        break;
      case "reminder":
        alert("You have Updated reminder form values");
        break;
      case "meeting":
        alert("You have Updated meeting form values");
        break;
      default:
        return;
    }
    handleClose();
  };

  const handleClose = () => {
    dispatch(reduxCloseModal("edit-event"));
  };

  return (
    <ReduxDialog modalTitle="Update" value="edit-event" modalSize="sm">
      <DialogContent dividers>
        <Box sx={{ borderBottom: 2, borderColor: theme.palette.primary.main }}>
          <Typography component="h4" sx={{ fontSize: "16px", fontWeight: "500", pb: 1 }}>
            {type ? type.charAt(0).toUpperCase() + type.slice(1) : ""}
          </Typography>
        </Box>
        <ScrollableContainer maxHeight="450px">
          <Box sx={{ my: -2 }}>
            {type === "event" && <EventForm />}
            {type === "todo" && <TodoForm />}
            {type === "reminder" && <ReminderForm />}
            {type === "meeting" && <MeetingForm />}
          </Box>
        </ScrollableContainer>
      </DialogContent>
      <DialogActions>
        <SecondaryButton onClick={handleClose}>Cancel</SecondaryButton>
        <PrimaryButton onClick={handleSave}>Save Changes</PrimaryButton>
      </DialogActions>
    </ReduxDialog>
  );
}
