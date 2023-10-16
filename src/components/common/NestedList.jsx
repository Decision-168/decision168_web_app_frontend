import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EventIcon from "@mui/icons-material/Event";
import ListAltIcon from "@mui/icons-material/ListAlt";
import GroupsIcon from "@mui/icons-material/Groups";

export default function NestedList({ drawerOpen }) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    if (drawerOpen) {
      setOpen(!open);
    } else {
      setOpen(false);
    }
  };

  return (
    <List sx={{ width: "100%", color: "#B9B8B9", backgroundColor: "#383838", paddingY: 0 }} component="nav" aria-labelledby="nested-list-subheader">
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <CalendarMonthIcon sx={{ color: "#B9B8B9" }} />
        </ListItemIcon>
        <ListItemText primary="Calender" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <EventIcon sx={{ color: "#B9B8B9" }} />
            </ListItemIcon>
            <ListItemText primary="Events" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <ListAltIcon sx={{ color: "#B9B8B9" }} />
            </ListItemIcon>
            <ListItemText primary="To Do's" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <GroupsIcon sx={{ color: "#B9B8B9" }} />
            </ListItemIcon>
            <ListItemText primary="Meetings" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}
