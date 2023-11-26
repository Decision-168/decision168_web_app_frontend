import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { selectUserDetails } from "../../../../../redux/action/userSlice";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import SmallAvatar from "../../../../common/SmallAvatar";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "left",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "left",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: theme.palette.mode === "light" ? "rgb(55, 65, 81)" : theme.palette.grey[300],
    boxShadow: "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      },
    },
  },
}));

export default function CustomizedMenus() {
  const user = useSelector(selectUserDetails);
  const fullName = `${user?.first_name} ${user?.middle_name} ${user?.last_name} `;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button sx={{ color: "#B9B8B9" }} id="demo-customized-button" aria-controls={open ? "demo-customized-menu" : undefined} aria-haspopup="true" aria-expanded={open ? "true" : undefined} variant="text" disableElevation onClick={handleClick} endIcon={<KeyboardArrowDownIcon />}>
        <SmallAvatar backColor="#383838"/>
        <Typography component="div" variant="subtitle2" sx={{ textTransform: "capitalize", paddingLeft: "5px", color: "#B9B8B9" }}>
          {fullName}
        </Typography>
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}>
        <MenuItem onClick={handleClose} disableRipple>
          <SmallAvatar backColor="#383838"/>
          <Typography component="div" variant="subtitle2" sx={{ textTransform: "capitalize", paddingX: "5px" }}>
            {fullName}
          </Typography>
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleClose} disableRipple>
          <AddIcon />
          Create New Portfolio
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
