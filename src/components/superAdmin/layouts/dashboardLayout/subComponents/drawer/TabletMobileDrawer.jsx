import React from "react";
import { Drawer } from "@mui/material";
import DrawerContent from "./DrawerContent";

export default function TabletMobileDrawer({ open, toggleDrawer }) {
  const drawerWidth = 250;
  return (
    <Drawer
      open={open}
      onClose={toggleDrawer}
      style={{ zIndex: 1300}} // Set a higher zIndex to make the Drawer appear above the AppBar
    >
      {/* Content of the Drawer */}
      <div style={{ width: drawerWidth }}>
        <DrawerContent />
      </div>
    </Drawer>
  );
}
