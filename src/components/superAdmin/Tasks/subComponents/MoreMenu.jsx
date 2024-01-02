import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";

export default function MoreMenu({ handleClose, open, anchorEl }) {
  return (
    <Menu
      id="fade-menu"
      MenuListProps={{
        "aria-labelledby": "fade-button",
      }}
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      TransitionComponent={Fade}>
      <MenuItem onClick={handleClose}>Edit Task</MenuItem>
      <MenuItem onClick={handleClose}>Add Subtask</MenuItem>
      <MenuItem onClick={handleClose}>Duplicate</MenuItem>
      <MenuItem onClick={handleClose}>File It</MenuItem>
      <MenuItem onClick={handleClose}>Delete Task</MenuItem>
    </Menu>
  );
}
