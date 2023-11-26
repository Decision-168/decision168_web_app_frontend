import * as React from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import SmallAvatar from "../../../../common/SmallAvatar";
import BadgeIcon from "@mui/icons-material/Badge";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { toast } from "react-toastify";

export default function LogoutMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const theme = useTheme();
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const LogoutFromApp = () => {
    localStorage.removeItem("token");
    navigate("/");
    toast.success("Logout successful. Have a great day!");
  };
  const handleRedirect = (path) => {
    handleClose();
    navigate(path);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip arrow title="Account settings">
          <IconButton onClick={handleClick} size="small" aria-controls={open ? "account-menu" : undefined} aria-haspopup="true" aria-expanded={open ? "true" : undefined}>
            <SmallAvatar backColor="#B9B8B9" />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
        <MenuItem onClick={() => handleRedirect("/profile")}>
          <ListItemIcon>
            <BadgeIcon fontSize="small" />
          </ListItemIcon>
          My Profile
        </MenuItem>

        <MenuItem onClick={() => handleRedirect("/update-profile")}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <Link
          to="https://support.app.decision168.com/supporter/open-tickets"
          style={{
            textDecoration: "none",
            color: theme.palette.secondary.main,
          }}>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <SupportAgentIcon fontSize="small" />
            </ListItemIcon>
            Support
          </MenuItem>
        </Link>

        {/* <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <SettingsAccessibilityIcon fontSize="small" />
          </ListItemIcon>
          My Tour
        </MenuItem>

        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PlayCircleOutlineIcon fontSize="small" />
          </ListItemIcon>
          Get Started
        </MenuItem> */}

        <Divider />

        <MenuItem onClick={LogoutFromApp}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
