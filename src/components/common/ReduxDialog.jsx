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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const ReduxDialog = ({
  children,
  value,
  modalTitle,
  showModalButton,
  modalSize,
  redirectPath,
}) => {
  const theme = useTheme();
  const activeModal = useSelector(selectModal);
  const dispatch = useDispatch();
  return (
    <BootstrapDialog
      maxWidth={modalSize}
      minWidth={modalSize}
      fullWidth={true}
      onClose={() => dispatch(closeModal())}
      aria-labelledby="customized-dialog-title"
      open={activeModal === value}
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

        {showModalButton && (
          <CustomLinkButton path={redirectPath} text="Open" />
        )}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={() => dispatch(closeModal())}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      {children}
    </BootstrapDialog>
  );
};
export default memo(ReduxDialog);