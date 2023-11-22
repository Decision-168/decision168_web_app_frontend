import React, { useState, useEffect } from "react";
import { Avatar, Box, Button, Grid, Paper } from "@mui/material";
import { stringAvatar } from "../../../helpers/stringAvatar";
import { useTheme } from "@mui/material/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Client from "../../common/Client";
import CardFeatures from "../../common/CardFeatures";
import CoverImage from "../../common/CoverImage";
import CustomDialog from "../../common/CustomDialog";
import ViewProfileDialogContent from "../../profile/subComponents/ViewProfileDialogContent";
import { selectUserDetails } from "../../../redux/action/userSlice";
import { useSelector } from "react-redux";
import { getAllCounts } from "../../../api/modules/dashboardModule";

const items = [
  {
    count: 1,
    label: "Portfolio",
    link: "/portfolio-view",
  },
  {
    count: 8,
    label: "Projects",
    link: "/portfolio-projects-list",
  },
  // {
  //   count: 0,
  //   label: "Planned Content",
  // },
  {
    count: 1,
    label: "Tasks",
    link: "/portfolio-tasks-list",
  },
];

export default function DashboardProfileCard() {
  const theme = useTheme();
  const user = useSelector(selectUserDetails);
  const fullName = `${user?.first_name} ${user?.middle_name} ${user?.last_name} `;
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState({});

  useEffect(() => {
    const allCounts = async () => {
      try {
        const email = user?.email_address;
        const id = user?.reg_id;
        const response = await getAllCounts(email, id);
        setCounts(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    allCounts();
  }, [user?.email_address, user?.reg_id]);

  //Dailog code
  const handleOpenDailog = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const items = [
    {
      count: counts?.portfolioResult,
      label: "Portfolio",
      link: "/portfolio-view",
    },
    {
      count: counts?.projectResult,
      label: "Projects",
      link: "/portfolio-projects-list",
    },
    {
      count: counts?.tasksResult,
      label: "Tasks",
      link: "/portfolio-tasks-list",
    },
  ];

  return (
    <Paper elevation={0}>
      <Grid container>
        <Grid item xs={12}>
          <CoverImage />
        </Grid>

        <Grid item xs={12} sm={4}>
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
              {...stringAvatar(fullName)}
              sx={{
                width: "100px",
                height: "100px",
                backgroundColor: theme.palette.primary.main,
                border: "5px solid white",
              }}
            />
            <Client clientName={fullName} clientPosition={user?.designation} />
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          sm={8}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}>
          <CardFeatures items={items} />

          <Grid container>
            <Grid item xs={12} sm={6} p={2} textAlign="left">
              <Button variant="contained" endIcon={<ArrowForwardIcon />} size="small" onClick={handleOpenDailog}>
                View Profile
              </Button>

              <CustomDialog handleClose={handleClose} open={open} modalTitle="Profile" redirectPath={"/profile"} showModalButton={true} modalSize="md">
                <ViewProfileDialogContent />
              </CustomDialog>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
