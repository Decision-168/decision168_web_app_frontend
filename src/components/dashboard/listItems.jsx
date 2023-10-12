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
import AssignmentIcon from "@mui/icons-material/Assignment";
import NestedList from "../common/NestedList";
import { Button, List, Tooltip } from "@mui/material";

export default function ListItems({ open }) {
  return (
    <List
      component="nav"
      sx={{
        // "&::-webkit-scrollbar": {
        //   width: "4px",
        // },
        // "&::-webkit-scrollbar-thumb": {
        //   // background: "primary.main", // Change this to your desired color
        //   background: "#B9B8B9",
        //   borderRadius: "6px",
        // },
        // "&::-webkit-scrollbar-thumb:hover": {
        //   background: "primary.dark", // Change this to your desired hover color
        // },
        // "&::-webkit-scrollbar-track": {
        //   background: "background.paper", // Change this to your desired background color
        // },
        position: "relative",
        "&::before": {
          content: "''",
          position: "absolute",
          top: 0,
          left: 0,
          width: "12px", // Adjust the width as needed
          background: "white", // Change this to your desired color
          borderRadius: "6px",
        },
        "&::-webkit-scrollbar": {
          width: 0, // Set the default scrollbar width to 0
        },
        "&::-webkit-scrollbar-thumb": {
          width: 0,
        },
        "&::-webkit-scrollbar-track": {
          width: 0,
        },
        "&::-webkit-scrollbar-thumb:hover": {
          width: 0,
        },
        height: "90vh",
        overflowY: "auto",
        overflowX: "hidden",
        color: "#B9B8B9",
        backgroundColor: "#383838",
      }}>
      <Tooltip title="Dashboard" placement="right">
        <ListItemButton>
          <ListItemIcon>
            <DashboardIcon sx={{ color: "#B9B8B9" }} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </Tooltip>

      {/* Calender */}
      <NestedList drawerOpen={open} />
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
    </List>
  );
}
