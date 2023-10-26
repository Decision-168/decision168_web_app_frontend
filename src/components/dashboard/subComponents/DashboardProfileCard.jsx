import React from "react";
import { Avatar, Box, Button, Grid, Paper } from "@mui/material";
import { stringAvatar } from "../../../helpers/stringAvatar";
import { useTheme } from "@mui/material/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Client from "../../common/Client";
import CardFeatures from "../../common/CardFeatures";
import CoverImage from "../../common/CoverImage";
import CustomDailog from "../../common/CustomDailog";
import ViewProfileDialogContent from "../../profile/subComponents/ViewProfileDialogContent";

export default function DashboardProfileCard() {
  const theme = useTheme();

  //Dailog code
  const [open, setOpen] = React.useState(false);

  const handleOpenDailog = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Paper elevation={0}>
      <Grid container>
        <Grid item xs={12}>
          <CoverImage />
        </Grid>

        <Grid item xs={12} sm={4}>
          <Box px={4} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "start", marginTop: "-50px" }}>
            <Avatar {...stringAvatar("Arshad Khan")} sx={{ width: "100px", height: "100px", backgroundColor: theme.palette.primary.main, border: "5px solid white" }} />
            <Client clientName="Arshad Khan" clientPosition="Project Manager" />
          </Box>
        </Grid>

        <Grid item xs={12} sm={8} sx={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "center" }}>
          <CardFeatures />

          <Grid container>
            <Grid item xs={12} sm={6} p={2} textAlign="left">
              <Button variant="contained" endIcon={<ArrowForwardIcon />} size="small" onClick={handleOpenDailog}>
                View Profile
              </Button>

              <CustomDailog handleClose={handleClose} open={open} modalTitle="Profile">
                <ViewProfileDialogContent />
              </CustomDailog>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
