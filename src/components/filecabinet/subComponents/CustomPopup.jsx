import React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Box, Button, DialogActions } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ConfirmationDialog from "../../common/ConfirmationDialog";
import { openCnfModal } from "../../../redux/action/confirmationModalSlice";
import { useDispatch } from "react-redux";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const CustomPopup = ({
  children,
  handleClose,
  open,
  modalTitle,
  modalType,
  showModalButton,
  modalSize,
  redirectPath,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const handleReopen = (module) => {
    dispatch(
      openCnfModal({
        modalName: "reopenModule",
        title: "Are you sure?",
        description: `You want to Reopen this ${module}!`,
      })
    );
  };
  return (
    <div>
      <BootstrapDialog
        maxWidth={modalSize}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle
          sx={{
            m: 0,
            p: 2,
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            borderTop: `5px solid ${theme.palette.primary.main} `,
          }}
          id="customized-dialog-title"
        >
          <Typography component="h6" variant="subtitle2" mr={2}>
            {modalTitle}
          </Typography>
          {modalType != "project-file" &&
            modalType != "task-file" &&
            modalType != "subtask-file" &&
            modalType != "content-file" && (
              <>
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => handleReopen(modalTitle)}
                >
                  Reopen
                </Button>
              </>
            )}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent dividers>{children}</DialogContent>
        {(modalType === "project-file" ||
          modalType === "task-file" ||
          modalType === "subtask-file" ||
          modalType === "content-file") && (
          <>
            <DialogActions>
              <Button
                autoFocus
                variant="contained"
                href={(modalType === "project-file") && (`./src/assets/project_files/${modalTitle}`) || (modalType === "task-file") && (`./src/assets/task_files/${modalTitle}`) || (modalType === "subtask-file") && (`./src/assets/task_files/${modalTitle}`) || (modalType === "content-file") && (`./src/assets/plan_content_files/${modalTitle}`)}
                download={modalTitle}
              >
                Download
              </Button>
            </DialogActions>
          </>
        )}
      </BootstrapDialog>
      <ConfirmationDialog value={"reopenModule"} />
    </div>
  );
};
export default CustomPopup;