import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { DashboardLayoutStyle } from "../../styles";
import { menuItems } from "./menuItems";
import { Collapse, Link, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ListItems({ drawerOpen }) {
  const styles = DashboardLayoutStyle();
  const [open, setOpen] = React.useState([]);
  const [redirectPath, setRedirectPath] = React.useState(null);
  const theme = useTheme();
  const isTabletMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  React.useEffect(() => {
    if (redirectPath) {
      setOpen([...open, ...redirectPath]);
      navigate(redirectPath[0]);
      setRedirectPath(null);
    }
  }, [redirectPath]);

  const handleClick = (index, path) => {
    if (drawerOpen || isTabletMobile) {
      const isOpen = open.includes(index);
      if (isOpen) {
        setOpen(open.filter((item) => item !== index));
      } else {
        setRedirectPath([path, index]);
      }
    }
  };

  return (
    <List component="nav" sx={styles.nav}>
      {menuItems.map((menuItem, index) => (
        <React.Fragment key={index}>
          <ListItemButton onClick={() => handleClick(index, menuItem.link)}>
            <ListItemIcon sx={{ color: "#B9B8B9" }}>
              {menuItem.icon}
            </ListItemIcon>
            <ListItemText primary={menuItem.text} />
            {menuItem?.subItems?.length > 0 ? (
              <React.Fragment>
                {open.includes(index) ? <ExpandLess /> : <ExpandMore />}
              </React.Fragment>
            ) : null}
          </ListItemButton>
          <Collapse in={open.includes(index)} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {menuItem?.subItems?.map((subItem, subIndex) => (
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
        </React.Fragment>
      ))}
    </List>
  );
}
