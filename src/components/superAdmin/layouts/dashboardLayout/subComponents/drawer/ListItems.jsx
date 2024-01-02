/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
// import ExpandLess from '@mui/icons-material/ExpandLess';
// import ExpandMore from '@mui/icons-material/ExpandMore';
import { DashboardLayoutStyle } from "../../styles";
import { menuItems } from "./menuItems";
import { Collapse, Tooltip, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ListItems({ drawerOpen }) {
  const styles = DashboardLayoutStyle();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [activeMenuItem, setActiveMenuItem] = useState("");
  const [activeSubItem, setActiveSubItem] = useState("");

  useEffect(() => {
    if (!drawerOpen) {
      setOpen(false);
    } else if (drawerOpen) {
      setOpen(true);
    }
  }, [drawerOpen]);

  const handleClick = (path, menuItemText, subItemText) => {
    navigate(path);

    if (subItemText) {
      setActiveMenuItem(menuItemText);
      setActiveSubItem(subItemText);
    } else {
      setActiveMenuItem(menuItemText);
      setActiveSubItem("");
    }
  };

  const CustomButton = ({ menuItem, isActive }) => {
    return (
      <>
        <Tooltip title={menuItem.text} placement="right">
          <ListItemIcon
            sx={{
              color: window.location.pathname === menuItem?.link || isActive ? "#c7df19" : "#6a7187",
              minWidth: "50px",
            }}>
            {menuItem.icon}
          </ListItemIcon>
        </Tooltip>
        <ListItemText
          primary={
            <Typography
              sx={{
                fontSize: 13,
                color: window.location.pathname === menuItem?.link || isActive ? "#c7df19" : "#6a7187",
              }}>
              {menuItem.text}
            </Typography>
          }
        />
      </>
    );
  };

  return (
    <List component="nav" sx={styles.nav}>
      <Typography
        sx={{
          fontSize: 11,
          fontWeight: "600",
          textAlign: "left",
          p: 2,
          color: "#6a7187",
        }}>
        MENU
      </Typography>
      {menuItems?.map((menuItem, index) => (
        <React.Fragment key={index}>
          <ListItemButton onClick={() => handleClick(menuItem?.link, menuItem.text)}>
            <CustomButton menuItem={menuItem} isActive={activeMenuItem === menuItem.text} />
          </ListItemButton>

          {menuItem?.subItems?.length > 0 && (
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {menuItem.subItems.map((subItem, subIndex) => (
                  <ListItemButton key={subIndex} sx={{ pl: 4 }} onClick={() => handleClick(subItem?.link, menuItem.text, subItem.text)}>
                    <CustomButton menuItem={subItem} isActive={activeSubItem === subItem.text} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          )}
        </React.Fragment>
      ))}
    </List>
  );
}
