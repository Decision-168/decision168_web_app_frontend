import React, { memo } from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import CustomLinkButton from "./CustomLinkButton";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, selectModal } from "../../redux/action/modalSlice";
import { Grid } from "@mui/material";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const ReduxDialog = ({ children, value, modalTitle, showModalButton, modalSize, redirectPath, isEventModal, handleAddTodo, handleEditClick, handleDeleteClick }) => {
  const theme = useTheme();
  const activeModal = useSelector(selectModal);
  const dispatch = useDispatch();
  return (
    <BootstrapDialog maxWidth={modalSize} fullWidth={true} onClose={() => dispatch(closeModal())} aria-labelledby="customized-dialog-title" open={activeModal === value}>
      <DialogTitle
        sx={{
          px: 2,
          py:1,
          display:"flex",
          justifyContent:"left",
          alignItems:"center",
          borderTop: `5px solid ${theme.palette.primary.main} `,
        }}
        id="customized-dialog-title"
      >
        {isEventModal ? (
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <PrimaryButton onClick={handleAddTodo} startIcon={<AddIcon />}>
                Add Todo
              </PrimaryButton>
            </Grid>

            <Grid item>
              <PrimaryButton onClick={handleEditClick} startIcon={<EditIcon />}>
                Edit
              </PrimaryButton>
            </Grid>

            <Grid item>
              <SecondaryButton onClick={handleDeleteClick} startIcon={<DeleteIcon />}>
                Delete
              </SecondaryButton>
            </Grid>
          </Grid>
        ) : (
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <Typography component="h6" variant="subtitle2">
                {modalTitle}
              </Typography>
            </Grid>

            <Grid item>{showModalButton && <CustomLinkButton path={redirectPath} text="Open" />}</Grid>
          </Grid>
        )}

        <IconButton
          aria-label="close"
          onClick={() => dispatch(closeModal())}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {children}
    </BootstrapDialog>
  );
};
export default memo(ReduxDialog);
