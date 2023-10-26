import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
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
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EventIcon from "@mui/icons-material/Event";
import ListAltIcon from "@mui/icons-material/ListAlt";
import GroupsIcon from "@mui/icons-material/Groups";
import List from "@mui/material/List";
import ReusableNestedList from "./ReusableNestedList";
import { DashboardLayoutStyle } from "../../styles";

export default function ListItems({ drawerOpen }) {
  const styles = DashboardLayoutStyle();

  return (
    <List component="nav" sx={styles.nav}>
      <ListItemButton selected={true}>
        <ListItemIcon sx={{ color: "#B9B8B9" }}>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>

      {/* Calender */}
      <ReusableNestedList
        drawerOpen={drawerOpen}
        icon={<CalendarMonthIcon />}
        primaryText="Calender"
        items={[
          { icon: <EventIcon />, text: "Events" },
          { icon: <ListAltIcon />, text: "To Do's" },
          { icon: <GroupsIcon />, text: "Meetings" },
        ]}
      />

      <ListItemButton>
        <ListItemIcon sx={{ color: "#B9B8B9" }}>
          <BadgeIcon />
        </ListItemIcon>
        <ListItemText primary="Portfolio" />
      </ListItemButton>

      <ListItemButton>
        <ListItemIcon sx={{ color: "#B9B8B9" }}>
          <AdjustIcon />
        </ListItemIcon>
        <ListItemText primary="Goals & Strategies" />
      </ListItemButton>

      <ListItemButton>
        <ListItemIcon sx={{ color: "#B9B8B9" }}>
          <AccountTreeIcon />
        </ListItemIcon>
        <ListItemText primary="Projects" />
      </ListItemButton>

      <ListItemButton>
        <ListItemIcon sx={{ color: "#B9B8B9" }}>
          <AssignmentTurnedInIcon />
        </ListItemIcon>
        <ListItemText primary="Tasks" />
      </ListItemButton>

      <ListItemButton>
        <ListItemIcon sx={{ color: "#B9B8B9" }}>
          <NotesIcon />
        </ListItemIcon>
        <ListItemText primary="Notes" />
      </ListItemButton>

      <ListItemButton>
        <ListItemIcon sx={{ color: "#B9B8B9" }}>
          <DashboardCustomizeIcon />
        </ListItemIcon>
        <ListItemText primary="Content Planer" />
      </ListItemButton>

      <ListItemButton>
        <ListItemIcon sx={{ color: "#B9B8B9" }}>
          <DescriptionIcon />
        </ListItemIcon>
        <ListItemText primary="File Cabinate" />
      </ListItemButton>

      <ListItemButton>
        <ListItemIcon sx={{ color: "#B9B8B9" }}>
          <LibraryBooksIcon />
        </ListItemIcon>
        <ListItemText primary="My Report" />
      </ListItemButton>

      {/* Community */}
      <ReusableNestedList drawerOpen={drawerOpen} icon={<Diversity3Icon />} primaryText="Community" items={[{ icon: <RecordVoiceOverIcon />, text: "Your Calls" }]} />

      <ListItemButton>
        <ListItemIcon sx={{ color: "#B9B8B9" }}>
          <ArchiveIcon />
        </ListItemIcon>
        <ListItemText primary="Archive" />
      </ListItemButton>

      <ListItemButton>
        <ListItemIcon sx={{ color: "#B9B8B9" }}>
          <DeleteForeverIcon />
        </ListItemIcon>
        <ListItemText primary="Trash" />
      </ListItemButton>

      <ListItemButton>
        <ListItemIcon sx={{ color: "#B9B8B9" }}>
          <HelpOutlineIcon />
        </ListItemIcon>
        <ListItemText primary="Help Center" />
      </ListItemButton>

      <ListItemButton>
        <ListItemIcon sx={{ color: "#B9B8B9" }}>
          <SupportAgentIcon />
        </ListItemIcon>
        <ListItemText primary="Support" />
      </ListItemButton>
    </List>
  );
}
