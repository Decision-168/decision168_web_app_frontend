import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BadgeIcon from "@mui/icons-material/Badge";
import AdjustIcon from "@mui/icons-material/Adjust";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import NotesIcon from "@mui/icons-material/Notes";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import DescriptionIcon from "@mui/icons-material/Description";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import ArchiveIcon from "@mui/icons-material/Archive";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import AssignmentIcon from "@mui/icons-material/Assignment";

export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon sx={{ color: "#B9B8B9" }} />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <CalendarMonthIcon sx={{ color: "#B9B8B9" }} />
      </ListItemIcon>
      <ListItemText primary="Calender" />
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <BadgeIcon sx={{ color: "#B9B8B9" }} />
      </ListItemIcon>
      <ListItemText primary="Portfolio" />
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <AdjustIcon sx={{ color: "#B9B8B9" }} />
      </ListItemIcon>
      <ListItemText primary="Goals & Strategies" />
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <AccountTreeIcon sx={{ color: "#B9B8B9" }} />
      </ListItemIcon>
      <ListItemText primary="Projects" />
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <AssignmentTurnedInIcon sx={{ color: "#B9B8B9" }} />
      </ListItemIcon>
      <ListItemText primary="Tasks" />
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <NotesIcon sx={{ color: "#B9B8B9" }} />
      </ListItemIcon>
      <ListItemText primary="Notes" />
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <DashboardCustomizeIcon sx={{ color: "#B9B8B9" }} />
      </ListItemIcon>
      <ListItemText primary="Content Planer" />
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <DescriptionIcon sx={{ color: "#B9B8B9" }} />
      </ListItemIcon>
      <ListItemText primary="File Cabinate" />
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <LibraryBooksIcon sx={{ color: "#B9B8B9" }} />
      </ListItemIcon>
      <ListItemText primary="My Report" />
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <Diversity3Icon sx={{ color: "#B9B8B9" }} />
      </ListItemIcon>
      <ListItemText primary="Community" />
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <ArchiveIcon sx={{ color: "#B9B8B9" }} />
      </ListItemIcon>
      <ListItemText primary="Archive" />
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <DeleteForeverIcon sx={{ color: "#B9B8B9" }} />
      </ListItemIcon>
      <ListItemText primary="Trash" />
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <HelpOutlineIcon sx={{ color: "#B9B8B9" }} />
      </ListItemIcon>
      <ListItemText primary="Help Center" />
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon color="inherit">
        <SupportAgentIcon sx={{ color: "#B9B8B9" }} />
      </ListItemIcon>
      <ListItemText primary="Support" />
    </ListItemButton>
  </React.Fragment>
);
