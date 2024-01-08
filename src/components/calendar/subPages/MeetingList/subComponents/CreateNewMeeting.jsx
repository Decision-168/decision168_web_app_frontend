import React from "react";
import ReduxDialog from "../../../../common/ReduxDialog";
import { Box, DialogActions, DialogContent, Typography } from "@mui/material";
import ScrollableContainer from "../../../../common/ScrollableContainer";
import SecondaryButton from "../../../../common/SecondaryButton";
import PrimaryButton from "../../../../common/PrimaryButton";
import { useDispatch } from "react-redux";
import { closeModal } from "../../../../../redux/action/modalSlice";
import { useTheme } from "@mui/material/styles";
import MeetingForm from "../../../subComponents/MeetingForm";

export default function CreateNewMeeting() {
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleClose = () => {
    dispatch(closeModal("create-new-meeting-in-list"));
  };

  const handleSave = () => {
    dispatch(closeModal("create-new-meeting-in-list"));
  };

  return (
    <ReduxDialog value="create-new-meeting-in-list" modalTitle="Create New" modalSize="sm">
      <DialogContent dividers>
        <Box sx={{ borderBottom: 2, borderColor: theme.palette.primary.main }}>
          <Typography component="h4" sx={{ fontSize: "16px", fontWeight: "500", pb: 1 }}>
            Meeting
          </Typography>
        </Box>
        <ScrollableContainer maxHeight="450px">
          <MeetingForm />
        </ScrollableContainer>
      </DialogContent>
      <DialogActions>
        <SecondaryButton onClick={handleClose}>Cancel</SecondaryButton>
        <PrimaryButton onClick={handleSave}>Save</PrimaryButton>
      </DialogActions>
    </ReduxDialog>
  );
}
