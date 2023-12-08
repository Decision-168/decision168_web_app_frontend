import React, { useState } from "react";
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
import { closeCnfModal, openCnfModal } from "../../../redux/action/confirmationModalSlice";
import { useDispatch } from "react-redux";
import { reopenGoal, reopenKpi, reopenProject, reopenSubtask, reopenTask } from "../../../api/modules/FileCabinetModule";
import { toast } from "react-toastify";

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
  modalId,
  modalSize,
  portfolioId,
  regId,
  fetchTreeData
}) => {
  const [modId, setModId] = useState(null);
  const [modType, setModType] = useState(null);
  const [portfolio, setPortfolio] = useState(null);
  const [userId, setUserId] = useState(null);
  const theme = useTheme();
  const dispatch = useDispatch();
  const handleReopen = (module, moduleId, moduleType, modulePort, moduleUser) => {
    setModId(moduleId);
    setModType(moduleType);
    setPortfolio(modulePort);
    setUserId(moduleUser);
    dispatch(
      openCnfModal({
        modalName: "reopenModule",
        title: "Are you sure?",
        description: `You want to Reopen this ${module}!`,
      })
    );
  };

  // Reopen Goal ----------------------------------------------
  const fetchGoalData = async () => {
    try {
      const response = await reopenGoal(modId, portfolio, userId);
      fetchTreeData()
      dispatch(closeCnfModal({ modalName: 'reopenModule' }));
      handleClose()
      toast.success(`${response.message}`);
    } catch (error) {
      dispatch(closeCnfModal({ modalName: 'reopenModule' }));
      handleClose()
      toast.error(`${error.response?.error}`);
    }
  };

  // Reopen Kpi ----------------------------------------------
  const fetchKpiData = async () => {
    try {
      const response = await reopenKpi(modId, portfolio, userId);
      fetchTreeData()
      dispatch(closeCnfModal({ modalName: 'reopenModule' }));
      handleClose()
      toast.success(`${response.message}`);
    } catch (error) {
      dispatch(closeCnfModal({ modalName: 'reopenModule' }));
      handleClose()
      toast.error(`${error.response?.error}`);
    }
  };

  // Reopen Project ----------------------------------------------
  const fetchProjectData = async () => {
    try {
      const response = await reopenProject(modId, portfolio, userId);
      fetchTreeData()
      dispatch(closeCnfModal({ modalName: 'reopenModule' }));
      handleClose()
      toast.success(`${response.message}`);
    } catch (error) {
      dispatch(closeCnfModal({ modalName: 'reopenModule' }));
      handleClose()
      toast.error(`${error.response?.error}`);
    }
  };

  // Reopen Task ----------------------------------------------
  const fetchTaskData = async () => {
    try {
      const response = await reopenTask(modId, portfolio, userId);
      fetchTreeData()
      dispatch(closeCnfModal({ modalName: 'reopenModule' }));
      handleClose()
      toast.success(`${response.message}`);
    } catch (error) {
      dispatch(closeCnfModal({ modalName: 'reopenModule' }));
      handleClose()
      toast.error(`${error.response?.error}`);
    }
  };

  // Reopen Subtask ----------------------------------------------
  const fetchSubtaskData = async () => {
    try {
      const response = await reopenSubtask(modId, userId);
      fetchTreeData()
      dispatch(closeCnfModal({ modalName: 'reopenModule' }));
      handleClose()
      toast.success(`${response.message}`);
    } catch (error) {
      dispatch(closeCnfModal({ modalName: 'reopenModule' }));
      handleClose()
      toast.error(`${error.response?.error}`);
    }
  };

  const handleYes = () => {
    if(modType == 'goal-content') {
      fetchGoalData()
    }else if(modType == 'kpi-content') {
      fetchKpiData()
    }else if(modType == 'project-content') {
      fetchProjectData()
    }else if(modType == 'task-content') {
      fetchTaskData()
    }else if(modType == 'subtask-content') {
      fetchSubtaskData()
    }
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
                  onClick={() => handleReopen(modalTitle, modalId, modalType, portfolioId, regId)}
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
      <ConfirmationDialog value={"reopenModule"} handleYes={handleYes} />
    </div>
  );
};
export default CustomPopup;
