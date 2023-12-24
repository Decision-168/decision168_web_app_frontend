import { Button, Grid, Paper } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CardFeatures from "../../common/CardFeatures";
import CoverImage from "../../common/CoverImage";
import { Link } from "react-router-dom";
import PersonalInfo from "./PersonalInfo";
import { useState } from "react";
import CustomDialog from "../../common/CustomDialog";
import ChangePasswordForm from "../../updateprofile/subComponents/ChangePasswordForm";
import { selectUserDetails } from "../../../redux/action/userSlice";
import { useSelector } from "react-redux";
import CardAvatar from "../../common/CardAvatar";

export default function ViewProfileDialogContent() {
  const user = useSelector(selectUserDetails);
  const fullName = `${user?.first_name} ${user?.middle_name} ${user?.last_name} `;
  const [openChangePasswordDialog, setOpenChangePasswordDialog] = useState(false);

  const handleOpenChangePasswordDailog = () => {
    setOpenChangePasswordDialog(true);
  };
  const handleCloseChangePasswordDailog = () => {
    setOpenChangePasswordDialog(false);
  };


  return (
    <Paper elevation={0} sx={{ height: "80vh" }}>
      <Grid container>
        <Grid item xs={12}>
          <CoverImage />
        </Grid>

        <Grid item xs={12} sm={4}>
          <CardAvatar fullName={fullName} photo={user?.photo} designation={user?.designation} />
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
          <CardFeatures />

          <Grid container>
            <Grid item xs={12} md={4} p={2} textAlign="left">
              <Link to="/update-profile">
                <Button variant="contained" endIcon={<ArrowForwardIcon />} size="small">
                  Update Profile
                </Button>
              </Link>
            </Grid>
            <Grid item xs={12} md={4} p={2} textAlign="left">
              <Button variant="contained" endIcon={<ArrowForwardIcon />} size="small" onClick={handleOpenChangePasswordDailog}>
                Change Password
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container mt={2}>
        <Grid item xs={12}>
          <PersonalInfo />
        </Grid>
      </Grid>
      <CustomDialog handleClose={handleCloseChangePasswordDailog} open={openChangePasswordDialog} modalTitle="Change Password" showModalButton={false} modalSize="md">
        <ChangePasswordForm handleClose={handleCloseChangePasswordDailog} />
      </CustomDialog>
    </Paper>
  );
}
