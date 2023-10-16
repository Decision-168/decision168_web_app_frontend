import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

export default function ReusableNestedList({ drawerOpen, icon, primaryText, items }) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const isTabletMobile = useMediaQuery(theme.breakpoints.down("md"));

  React.useEffect(() => {
    if (!drawerOpen) {
      setOpen(false);
    }
  }, [drawerOpen]);

  console.log(isTabletMobile);
  const handleClick = () => {
    console.log(drawerOpen);
    if (drawerOpen) {
      setOpen(!open);
    }
    //less than 900 px
    if (isTabletMobile) {
      setOpen(!open);
    }
  };

  return (
    <List sx={{ width: "100%", color: "#B9B8B9", backgroundColor: "#383838", paddingY: 0 }} component="nav" aria-labelledby="nested-list-subheader">
      <ListItemButton onClick={handleClick}>
        <ListItemIcon sx={{ color: "#B9B8B9" }}>{icon}</ListItemIcon>
        <ListItemText primary={primaryText} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {items.map((item, index) => (
            <ListItemButton sx={{ pl: 4 }} key={index}>
              <ListItemIcon sx={{ color: "#B9B8B9" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </List>
  );
}
