import React from "react";
import { Avatar, Box, Button, Grid, Paper, Typography, Menu, MenuItem, useMediaQuery, Stack } from "@mui/material";
import { stringAvatar } from "../../../../helpers/stringAvatar";
import { useTheme } from "@mui/material/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Client from "../../../common/Client";
import CoverImage from "../../../common/CoverImage";
import { Link } from "react-router-dom";
import CustomAvatarGroup from "../../../common/CustomAvatarGroup";
import DecisionLogo from "../../../../assets/images/Decision1-168.png";
import CustomDialog from "../../../common/CustomDialog";
import AddMemberForm from "./AddMemberForm";
import AddDepartmentForm from "./AddDepartmentForm";
import ViewDepartmentTable from "./ViewDepartmentTable";
import AllMembersTable from "./AllMembersTable";
import ConfirmationDialog from "../../../common/ConfirmationDialog";
import { openCnfModal } from "../../../../redux/action/confirmationModalSlice";
import { useDispatch } from "react-redux";
import DeleteDailogContent from "./DeleteDailogContent";

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
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

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

  //Add Member Dailog code
  const [openMemberDialog, setOpenMemberDialog] = React.useState(false);

  const handleOpenMemberDailog = () => {
    setOpenMemberDialog(true);
  };
  const handleCloseMemberDailog = () => {
    setOpenMemberDialog(false);
  };

  //Add Department Dailog code
  const [openDepartmentDialog, setOpenDepartmentDialog] = React.useState(false);

  const handleOpenDepartmentDailog = () => {
    setOpenDepartmentDialog(true);
    handleClose();
  };
  const handleCloseDepartmentDailog = () => {
    setOpenDepartmentDialog(false);
  };

  //Members Dailog code
  const [openMembersDialog, setOpenMembersDialog] = React.useState(false);

  const handleOpenMembersDailog = () => {
    setOpenMembersDialog(true);
  };
  const handleCloseMembersDailog = () => {
    setOpenMembersDialog(false);
  };

  //View Department Dailog code
  const [openViewDepartmentDialog, setOpenViewDepartmentDialog] = React.useState(false);

  const handleOpenViewDepartmentDailog = () => {
    setOpenViewDepartmentDialog(true);
    handleClose();
  };
  const handleCloseViewDepartmentDailog = () => {
    setOpenViewDepartmentDialog(false);
  };

  //Delete Dailog code
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
    handleClose();
  };
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const dispatch = useDispatch();
  const handleArchive = () => {
    dispatch(
      openCnfModal({
        modalName: "archivePortfolio",
        title: "Are you sure?",
        description: "You want to Archive Portfolio",
      })
    );
  };

  return (
    <Paper elevation={0}>
      <Grid container>
        <Grid item xs={12} md={12}>
          <CoverImage />
        </Grid>

        <Grid item xs={12} md={4}>
          <Box
            px={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "start",
              marginTop: "-50px",
            }}>
            <Avatar
              {...stringAvatar("John Doe")}
              src={DecisionLogo}
              sx={{
                width: "100px",
                height: "100px",
                backgroundColor: theme.palette.primary.main,
                border: "5px solid white",
              }}
            />
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

        <Grid item xs={12} md={8} textAlign={isSmallScreen ? "left" : "end"} p={1}>
          <Button variant="contained" endIcon={<ArrowForwardIcon />} size="small" sx={{ m: 1 }}>
            Add project
          </Button>

          <Box display="inline-block" sx={{ m: 1 }}>
            <Button onClick={handleOpenMemberDailog} variant="contained" endIcon={<ArrowForwardIcon />} size="small">
              Add member
            </Button>
            <CustomDialog handleClose={handleCloseMemberDailog} open={openMemberDialog} modalTitle="Add to Portfolio Team Members" showModalButton={false} modalSize="sm">
              <AddMemberForm handleClose={handleCloseMemberDailog} />
            </CustomDialog>
          </Box>

          <Box display="inline-block" sx={{ m: 1 }}>
            <Button onClick={handleOpenMembersDailog} variant="contained" endIcon={<ArrowForwardIcon />} size="small">
              Members
            </Button>
            <CustomDialog handleClose={handleCloseMembersDailog} open={openMembersDialog} modalTitle="All Portfolio Members" showModalButton={false} modalSize="md">
              <AllMembersTable />
            </CustomDialog>
          </Box>

          <Box display="inline-block" sx={{ m: 1 }}>
            <Button
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              size="small"
              sx={{
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.secondary.light,
                "&:hover": { backgroundColor: theme.palette.secondary.dark },
              }}
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}>
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
              <MenuItem onClick={handleOpenDepartmentDailog}>Add Department</MenuItem>
              <MenuItem onClick={handleOpenViewDepartmentDailog}>View Department</MenuItem>

              <MenuItem component={Link} to="/portfolio-edit" onClick={handleClose}>
                Edit
              </MenuItem>
              <MenuItem onClick={handleArchive}>Archive</MenuItem>
              <MenuItem onClick={handleOpenDeleteDialog}>Delete</MenuItem>
            </Menu>

            <CustomDialog handleClose={handleCloseDepartmentDailog} open={openDepartmentDialog} modalTitle="Add Department" showModalButton={false} modalSize="sm">
              <AddDepartmentForm handleClose={handleCloseDepartmentDailog} />
            </CustomDialog>

            <CustomDialog handleClose={handleCloseViewDepartmentDailog} open={openViewDepartmentDialog} modalTitle="All Portfolio Departments" showModalButton={false} modalSize="md">
              <ViewDepartmentTable />
            </CustomDialog>

            <CustomDialog handleClose={handleCloseDeleteDialog} open={openDeleteDialog} modalTitle="Delete Portfolio" showModalButton={false} modalSize="sm">
              <DeleteDailogContent handleClose={handleCloseDeleteDialog} />
            </CustomDialog>
          </Box>
        </Grid>

        <Grid item xs={12} md={4} p={1}>
          <CustomAvatarGroup />
        </Grid>
      </Grid>
      <ConfirmationDialog value={"archivePortfolio"} />
    </Paper>
  );
}
