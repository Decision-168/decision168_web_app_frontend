import React from "react";
import { Stack, IconButton, Menu, MenuItem, Fade, Tooltip } from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import AttachmentIcon from "@mui/icons-material/Attachment";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CreateEditTaskForm from "../createEditTask/CreateEditTaskForm";
import ReduxDialog from "../../common/ReduxDialog";
import { useDispatch } from "react-redux";
import { openModal } from "../../../redux/action/modalSlice";
import CreateSubTasksForm from "../createEditSubtasks/CreateSubTasksForm";
import DuplicateDialog from "./DuplicateDialog";
import EditSubTasksForm from "../createEditSubtasks/EditSubTasksForm";
import ConfirmationDialog from "../../common/ConfirmationDialog";
import { openCnfModal } from "../../../redux/action/confirmationModalSlice";

export default function Actions({ rowId, isParentRow }) {
  const dispatch = useDispatch();
  // More Button Menu code
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMoreClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMoreClose = () => {
    setAnchorEl(null);
  };

  const handleEditTaskDialog = (rowId) => {
    dispatch(openModal("edit-task"));
    handleMoreClose();
  };

  const handleAddSubTasksDialog = (rowId) => {
    dispatch(openModal("add-sub-tasks"));
    handleMoreClose();
  };

  const handleEditSubTaskDialog = (rowId) => {
    dispatch(openModal("edit-sub-task"));
    handleMoreClose();
  };

  const handleDuplicateDialog = (rowId) => {
    dispatch(openModal("duplicate-task"));
    handleMoreClose();
  };

  const handleFileItDialog = (rowId) => {
    dispatch(
      openCnfModal({
        modalName: "fileIt",
        title: "Are you sure?",
        description: `You want to file the Task`,
      })
    );
    handleMoreClose();
  };

  const handleDeleteDialog = (rowId) => {
    dispatch(
      openCnfModal({
        modalName: "deleteTask",
        title: "Are you sure?",
        description: `You want to Delete the Task`,
      })
    );
    handleMoreClose();
  };

  return (
    <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
      <IconButton>
        <CommentIcon />
      </IconButton>
      <IconButton>
        <AttachmentIcon />
      </IconButton>

      {/* More icon */}
      <Tooltip title="More" arrow size="small" placement="top-end">
        <IconButton id="fade-button" aria-controls={open ? "fade-menu" : undefined} aria-haspopup="true" aria-expanded={open ? "true" : undefined} onClick={handleMoreClick}>
          <MoreVertIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleMoreClose}
        TransitionComponent={Fade}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right", // Set to 'right' to open the menu to the left
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right", // Set to 'right' to align the menu with the left side of the button
        }}>
        {isParentRow ? (
          <>
            <MenuItem onClick={() => handleEditTaskDialog(rowId)} sx={{ fontSize: "13px" }}>
              Edit Task
            </MenuItem>
            <MenuItem onClick={() => handleAddSubTasksDialog(rowId)} sx={{ fontSize: "13px" }}>
              Add Subtask
            </MenuItem>
          </>
        ) : (
          <MenuItem onClick={() => handleEditSubTaskDialog(rowId)} sx={{ fontSize: "13px" }}>
            Edit Subtask
          </MenuItem>
        )}

        <MenuItem onClick={() => handleDuplicateDialog(rowId)} sx={{ fontSize: "13px" }}>
          Duplicate
        </MenuItem>
        <MenuItem onClick={() => handleFileItDialog(rowId)} sx={{ fontSize: "13px" }}>
          File It
        </MenuItem>
        <MenuItem onClick={() => handleDeleteDialog(rowId)} sx={{ fontSize: "13px" }}>
          Delete {isParentRow ? "Task" : "Subtask"}
        </MenuItem>
      </Menu>

      <ReduxDialog value="edit-task" modalTitle="Edit Task" showModalButton={false} modalSize="md">
        <CreateEditTaskForm editMode={true} />
      </ReduxDialog>

      <ReduxDialog value="add-sub-tasks" modalTitle="Add Sub Task" showModalButton={false} modalSize="md">
        <CreateSubTasksForm />
      </ReduxDialog>

      <ReduxDialog value="edit-sub-task" modalTitle="Edit Sub Task" showModalButton={false} modalSize="md">
        <EditSubTasksForm />
      </ReduxDialog>

      <ReduxDialog value="duplicate-task" modalTitle="Copy Task" showModalButton={false} modalSize="sm">
        <DuplicateDialog />
      </ReduxDialog>

      <ConfirmationDialog value={"fileIt"} />

      <ConfirmationDialog value={"deleteTask"} />
    </Stack>
  );
}
