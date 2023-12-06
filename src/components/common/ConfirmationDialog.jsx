import React, { memo } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import {
  closeCnfModal,
  selectCnfModal,
} from "../../redux/action/confirmationModalSlice";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Box, Typography } from "@mui/material";
import { PriorityHigh, PriorityHighRounded } from "@mui/icons-material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmationDialog = ({ value, handleOk }) => {
  const activeModal = useSelector(selectCnfModal);
  const modal = activeModal[value];
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeCnfModal({ modalName: value }));
  };

  return (
    <Dialog
      open={modal?.isOpen}
      TransitionComponent={Transition}
      maxWidth={"xs"}
      fullWidth={true}
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              border: "2px solid #c7df19",
              color: "#383838",
              background: "white",
              borderRadius: "50%",
              height: "5rem",
              width: "5rem",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <PriorityHighRounded sx={{ fontSize: "3.75em" }} />
          </Box>
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: "500",
              color: "#595959",
              mt: 2,
            }}
          >
            {modal?.title}
          </Typography>
          <Typography
            sx={{
              fontSize: "15px",
              color: "#545454",
              mt: 0.5,
            }}
          >
            {modal?.description}
          </Typography>
          <Box
            p={2}
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              size="small"
              onClick={handleOk}
              sx={{ color: "#fff" }}
            >
              Yes
            </Button>
            <Button
              variant="contained"
              size="small"
              sx={{
                background: "#383838",
                color: "#fff",
                ml: 1,
                "&:hover": {
                  background: "#383838",
                  color: "#fff",
                },
              }}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default memo(ConfirmationDialog);
