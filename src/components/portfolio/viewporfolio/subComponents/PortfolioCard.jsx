import React from "react";
import { Avatar, Box, Button, Grid, Paper, Typography, Menu, MenuItem } from "@mui/material";
import { stringAvatar } from "../../../../helpers/stringAvatar";
import { useTheme } from "@mui/material/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Client from "../../../common/Client";

import CoverImage from "../../../common/CoverImage";
import { Link } from "react-router-dom";
import CustomAvatarGroup from "../../../common/CustomAvatarGroup";
import DecisionLogo from "../../../../assets/images/Decision1-168.png";

const items = [
  {
    count: 10,
    label: "Portfolio",
  },
  {
    count: 5,
    label: "Projects",
  },
  {
    count: 28,
    label: "Tasks",
  },
];

export default function PortfolioCard() {
  const theme = useTheme();

  //Menu Code
  //TODO : We will use Redux State
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Paper elevation={0}>
      <Grid container>
        <Grid item xs={12}>
          <CoverImage />
        </Grid>

        <Grid item xs={12} sm={4}>
          <Box px={4} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "start", marginTop: "-50px" }}>
            <Avatar {...stringAvatar("John Doe")} src={DecisionLogo} sx={{ width: "100px", height: "100px", backgroundColor: theme.palette.primary.main, border: "5px solid white" }} />
            <Client clientName="DECISION 168, Inc" clientPosition="" />
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Grid container>
            {items.map((item, index) => (
              <Grid item xs={12} sm={4} p={2} key={index}>
                <Typography variant="caption" display="block" textAlign="left" gutterBottom>
                  {item.count}
                </Typography>
                <Typography variant="subtitle2" textAlign="left">
                  {item.label}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12} md={2} p={2} textAlign="left">
          <Link to="/">
            <Button variant="contained" endIcon={<ArrowForwardIcon />} size="small">
              Portfolio report
            </Button>
          </Link>
        </Grid>

        <Grid item xs={12} md={8} textAlign="end" p={2}>
          <Button variant="contained" endIcon={<ArrowForwardIcon />} size="small" sx={{ m: 1 }}>
            Add project
          </Button>

          <Button variant="contained" endIcon={<ArrowForwardIcon />} size="small" sx={{ m: 1 }}>
            Add member
          </Button>

          <Button variant="contained" endIcon={<ArrowForwardIcon />} size="small" sx={{ m: 1 }}>
            Members
          </Button>

          <div>
            <Button variant="contained" endIcon={<ArrowForwardIcon />} size="small" sx={{ m: 1, backgroundColor: theme.palette.secondary.main, color: theme.palette.secondary.light, "&:hover": { backgroundColor: theme.palette.secondary.dark } }} id="basic-button" aria-controls={open ? "basic-menu" : undefined} aria-haspopup="true" aria-expanded={open ? "true" : undefined} onClick={handleClick}>
              More
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}>
              <MenuItem onClick={handleClose}>Add Department</MenuItem>
              <MenuItem onClick={handleClose}>View Department</MenuItem>

              <MenuItem component={Link} to="/portfolio-edit" onClick={handleClose}>
                Edit
              </MenuItem>

              <MenuItem onClick={handleClose}>Archive</MenuItem>
              <MenuItem onClick={handleClose}>Delete</MenuItem>
            </Menu>
          </div>
        </Grid>

        <Grid item xs={12} md={4} p={2}>
          <CustomAvatarGroup />
        </Grid>
      </Grid>
    </Paper>
  );
}
