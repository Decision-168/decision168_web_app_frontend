import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import ListItems from "./ListItems";
import decision168 from "../../../../../assets/images/decision-168.png";
import logo from "../../../../../assets/images/logo.png";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function DrawerContent({ open }) {
  const theme = useTheme();
  const isTabletMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div>
      <Box sx={{ borderRight: "5px solid #006E3E", maxHeight: "100vh", overflowY: "hidden" }}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#383838",
            height: "10vh",
            px: [1],
          }}>
          {open || isTabletMobile ? (
            <Box sx={{ display: "flex", justifyContent: "center", padding: "10px 0" }}>
              <img src={decision168} alt="Decision-168-logo" style={{ width: "65%" }} />
            </Box>
          ) : (
            <Box sx={{ display: "flex", justifyContent: "center", padding: "10px 4px", height: "60px" }}>
              <img src={logo} alt="logo" style={{ width: "100%" }} />
            </Box>
          )}
        </Toolbar>

        <Divider />

        <ListItems drawerOpen={open} />
      </Box>
    </div>
  );
}
