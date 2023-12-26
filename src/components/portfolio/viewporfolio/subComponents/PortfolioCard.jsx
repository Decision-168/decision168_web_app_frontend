import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  Menu,
  MenuItem,
  useMediaQuery,
  Stack,
} from "@mui/material";
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
import {
  closeCnfModal,
  openCnfModal,
} from "../../../../redux/action/confirmationModalSlice";
import { useDispatch } from "react-redux";
import DeleteDailogContent from "./DeleteDailogContent";
import { openModal } from "../../../../redux/action/modalSlice";
import ReduxDialog from "../../../common/ReduxDialog";
import CreateProject from "../../../project/Dialogs/CreateProject";
import { useNavigate } from "react-router-dom";
import {
  getPortfolioDeparmentsAsync,
  getPortfolioTeamMembersAsync,
  getProjectAndTaskCountAsync,
  selectPorfolioDepartments,
  selectPorfolioDetails,
  selectPorfolioTeamMembers,
  selectProjectAndTaskCount,
} from "../../../../redux/action/portfolioSlice";
import { useSelector } from "react-redux";
import CardAvatar from "../../../common/CardAvatar";
import { selectUserDetails } from "../../../../redux/action/userSlice";
import { toast } from "react-toastify";
import { patchArchivePortfolio } from "../../../../api/modules/ArchiveModule";
import {
  patchDeleteGoal,
  patchDeletePortfolio,
} from "../../../../api/modules/TrashModule";

export default function PortfolioCard({ regId }) {
  const theme = useTheme();
  const user = useSelector(selectUserDetails);
  const count = useSelector(selectProjectAndTaskCount);
  const members = useSelector(selectPorfolioTeamMembers);
  const departments = useSelector(selectPorfolioDepartments);
  const details = useSelector(selectPorfolioDetails);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const storedPortfolioId = JSON.parse(localStorage.getItem("portfolioId"));
  const dispatch = useDispatch();
  const userID = user?.reg_id;
  const [portfId, setPortfId] = useState(null);

  useEffect(() => {
    if (storedPortfolioId) {
      dispatch(getProjectAndTaskCountAsync(storedPortfolioId));
      dispatch(getPortfolioTeamMembersAsync(storedPortfolioId));
      dispatch(getPortfolioDeparmentsAsync(storedPortfolioId));
    }
  }, [storedPortfolioId]);

  const items = [
    {
      count: count?.projectCount,
      label: "Projects",
      link: `/portfolio-projects/${storedPortfolioId}`,
    },
    {
      count: count?.taskCount,
      label: "Tasks",
      link: `/portfolio-tasks/${storedPortfolioId}`,
    },
  ];

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
  const [openViewDepartmentDialog, setOpenViewDepartmentDialog] =
    React.useState(false);

  const handleOpenViewDepartmentDailog = () => {
    setOpenViewDepartmentDialog(true);
    handleClose();
  };
  const handleCloseViewDepartmentDailog = () => {
    setOpenViewDepartmentDialog(false);
  };

  // Handler for clicking the "Archive" button
  const handleArchive = (portId) => {
    setPortfId(portId);
    dispatch(
      openCnfModal({
        modalName: "archivePortfolio",
        title: "Are you sure?",
        description: "You want to Archive Portfolio",
      })
    );
  };

  // Handler for clicking the "Delete" button
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const handleDelete = (portId) => {
    setOpenDeleteDialog(true);
    setPortfId(portId);
    handleClose();
  };
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleArchiveYes = async () => {
    try {
      const response = await patchArchivePortfolio(portfId, userID);
      dispatch(closeCnfModal({ modalName: "archivePortfolio" }));
      if (storedPortfolioId == portfId) {
        localStorage.removeItem("portfolioId");
        navigate(`/portfolio`);
      }
      toast.success(`${response.message}`);
    } catch (error) {
      dispatch(closeCnfModal({ modalName: "archivePortfolio" }));

      toast.error(`${error.response.data?.error}`);
    }
  };

  const handleDeleteYes = async (portfolioid) => {
    try {
      const response = await patchDeletePortfolio(portfolioid, userID);
      dispatch(closeCnfModal({ modalName: "deletePortfolio" }));
      if (storedPortfolioId == portfolioid) {
        localStorage.removeItem("portfolioId");
        navigate(`/portfolio`);
      }
      toast.success(`${response.message}`);
      handleCloseDeleteDialog();
    } catch (error) {
      dispatch(closeCnfModal({ modalName: "deletePortfolio" }));
      toast.error(`${error.response?.error}`);
      handleCloseDeleteDialog();
    }
  };

  const navigate = useNavigate();
  return (
    <Paper elevation={0}>
      <Grid container>
        <Grid item xs={12} md={12}>
          <CoverImage />
        </Grid>

        <Grid item xs={12} md={3}>
          <CardAvatar
            fullName={details?.portfolio_name}
            photo={details?.photo}
            designation={details?.designation}
          />
        </Grid>

        <Grid item xs={12} md={7}>
          <Grid container>
            {items.map((item, index) => (
              <Grid item xs={12} sm={4} p={2} key={index}>
                <Stack alignItems="flex-start" flexDirection={"column"}>
                  <Typography
                    variant="caption"
                    textAlign={"left"}
                    display="block"
                    gutterBottom
                  >
                    {item.count}
                  </Typography>
                  <Typography
                    variant="text"
                    sx={{
                      cursor: "pointer",
                      fontSize: 15,
                      color: "#343a40",
                      fontWeight: "900",
                      ":hover": {
                        color: "#c7df19",
                      },
                    }}
                    onClick={() => navigate(item.link)}
                  >
                    {item.label}
                  </Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* <Grid item xs={12} md={2} p={2} textAlign="left">
          <Link to="/">
            <Button
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              size="small"
            >
              Portfolio report
            </Button>
          </Link>
        </Grid> */}

        <Grid
          item
          xs={12}
          md={8}
          textAlign={isSmallScreen ? "left" : "end"}
          p={1}
        >
          <Button
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            size="small"
            sx={{ m: 1 }}
            onClick={() => dispatch(openModal("create-project"))}
          >
            Add project
          </Button>

          <Box display="inline-block" sx={{ m: 1 }}>
            <Button
              onClick={handleOpenMemberDailog}
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              size="small"
            >
              Add member
            </Button>
            <CustomDialog
              handleClose={handleCloseMemberDailog}
              open={openMemberDialog}
              modalTitle="Add to Portfolio Team Members"
              showModalButton={false}
              modalSize="sm"
            >
              <AddMemberForm handleClose={handleCloseMemberDailog} />
            </CustomDialog>
          </Box>

          <Box display="inline-block" sx={{ m: 1 }}>
            <Button
              onClick={handleOpenMembersDailog}
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              size="small"
            >
              Members
            </Button>
            <CustomDialog
              handleClose={handleCloseMembersDailog}
              open={openMembersDialog}
              modalTitle="All Portfolio Members"
              showModalButton={false}
              modalSize="md"
            >
              <AllMembersTable data={members} />
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
              onClick={handleClick}
            >
              More
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleOpenDepartmentDailog}>
                Add Department
              </MenuItem>
              <MenuItem onClick={handleOpenViewDepartmentDailog}>
                View Department
              </MenuItem>

              <MenuItem
                component={Link}
                to={`/portfolio-edit/${storedPortfolioId}`}
                onClick={handleClose}
              >
                Edit
              </MenuItem>
              <MenuItem onClick={() => handleArchive(storedPortfolioId)}>
                Archive
              </MenuItem>
              <MenuItem onClick={() => handleDelete(storedPortfolioId)}>
                Delete
              </MenuItem>
            </Menu>

            <CustomDialog
              handleClose={handleCloseDepartmentDailog}
              open={openDepartmentDialog}
              modalTitle="Add Department"
              showModalButton={false}
              modalSize="md"
            >
              <AddDepartmentForm
                handleClose={handleCloseDepartmentDailog}
                data={departments}
              />
            </CustomDialog>

            <CustomDialog
              handleClose={handleCloseViewDepartmentDailog}
              open={openViewDepartmentDialog}
              modalTitle="All Portfolio Departments"
              showModalButton={false}
              modalSize="md"
            >
              <ViewDepartmentTable data={departments} />
            </CustomDialog>

            <CustomDialog
              handleClose={handleCloseDeleteDialog}
              open={openDeleteDialog}
              modalTitle="Delete Portfolio"
              showModalButton={false}
              modalSize="sm"
            >
              <DeleteDailogContent
                handleClose={handleCloseDeleteDialog}
                portfolio_id={portfId}
                handleDelete={handleDeleteYes}
              />
            </CustomDialog>
            <ReduxDialog
              value="create-project"
              modalTitle="Create New Project"
              showModalButton={false}
              modalSize="md"
            >
              <CreateProject flag="add" gid={0} sid={0} passPID={0} />
            </ReduxDialog>
          </Box>
        </Grid>

        <Grid item xs={12} md={4} p={1}>
          <CustomAvatarGroup data={members} />
        </Grid>
      </Grid>
      <ConfirmationDialog
        value={"archivePortfolio"}
        handleYes={handleArchiveYes}
      />
      <ConfirmationDialog
        value={"deletePortfolio"}
        handleYes={handleDeleteYes}
      />
    </Paper>
  );
}
