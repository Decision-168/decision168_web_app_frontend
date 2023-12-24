import React, {  } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { DashboardLayoutStyle } from "../../styles";
import generateMenuItems from "./menuItems";
import {
  Collapse,
  Link,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ListItems({ drawerOpen }) {
  const styles = DashboardLayoutStyle();
  const theme = useTheme();
  const isTabletMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const portfolioId = JSON.parse(localStorage.getItem("portfolioId"));
  const menuItems = generateMenuItems(portfolioId);

  React.useEffect(() => {
    if (!drawerOpen) {
      setOpen(false);
    }
  }, [drawerOpen]);

  const handleClick = (path) => {
    navigate(path, { replace: true });
    //  if (drawerOpen) {
    //    setOpen(!open);
    //  }
    //  //less than 900 px
    //  if (isTabletMobile) {
    //    setOpen(!open);
    //  }
  };
const CustomButton = ({ menuItem }) => {
  return (
    <>
      <Tooltip title={menuItem.text} placement="right">
        <ListItemIcon
          sx={{
            color:
              window.location.pathname === menuItem?.link
                ? "#c7df19"
                : "#6a7187",
          }}
        >
          {menuItem.icon}
        </ListItemIcon>
      </Tooltip>
      <ListItemText
        primary={
          <Typography
            sx={{
              fontSize: 13,
              color: window.location.pathname === menuItem?.link && "#c7df19",
            }}
          >
            {menuItem.text}
          </Typography>
        }
      />
      {menuItem?.subItems?.length > 0 ? (
        <React.Fragment>
          {open ? <ExpandLess /> : <ExpandMore />}
        </React.Fragment>
      ) : null}
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
        }}
      >
        MENU
      </Typography>
      {menuItems?.map((menuItem, index) => (
        <React.Fragment key={index}>
          {["Help Center", "Support"].includes(menuItem.text) ? (
            <ListItemButton to={menuItem?.link} component={Link}>
              <CustomButton menuItem={menuItem} />
            </ListItemButton>
          ) : (
            <ListItemButton onClick={() => handleClick(menuItem?.link)}>
              <CustomButton menuItem={menuItem} />
            </ListItemButton>
          )}

          {menuItem?.subItems?.length > 0 && (
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {menuItem.subItems.map((subItem, subIndex) => (
                  <ListItemButton
                    sx={{ pl: 4 }}
                    key={subIndex}
                    to={subItem.link}
                    component={Link}
                  >
                    <ListItemIcon sx={{ color: "#B9B8B9" }}>
                      {subItem.icon}
                    </ListItemIcon>
                    <ListItemText primary={subItem.text} />
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
