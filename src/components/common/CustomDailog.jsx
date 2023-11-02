import React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import CustomLinkButton from "./CustomLinkButton";
import { Box, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PerfectScrollbar from "react-perfect-scrollbar";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function CustomDailog({ children, handleClose, open, modalTitle, showModalButton, modalSize }) {
  const theme = useTheme();
  return (
    <div>
      <BootstrapDialog maxWidth={modalSize}  onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle sx={{ m: 0, p: 2, display: "flex", justifyContent: "left", alignItems: "center", borderTop: `5px solid ${theme.palette.primary.main} ` }} id="customized-dialog-title">
          <Typography component="h6" variant="subtitle2" mr={2}>
            {modalTitle}
          </Typography>

          {showModalButton && <CustomLinkButton path="/profile" text="Open" />}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}>
          <CloseIcon />
        </IconButton>

        <DialogContent dividers >{children}</DialogContent>

        {/* <DialogActions>
          <Button autoFocus onClick={handleClose} size="small" variant="contained" sx={{ backgroundColor: theme.palette.secondary.main, color: theme.palette.secondary.light, "&:hover": { backgroundColor: theme.palette.secondary.dark } }}>
            Cancel
          </Button>
        </DialogActions> */}
      </BootstrapDialog>
    </div>
  );
}
