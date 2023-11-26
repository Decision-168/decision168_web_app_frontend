import { Button, Grid, Paper } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CardFeatures from "../../common/CardFeatures";
import CoverImage from "../../common/CoverImage";
import { Link } from "react-router-dom";
import { selectUserDetails } from "../../../redux/action/userSlice";
import { useSelector } from "react-redux";
import CardAvatar from "../../common/CardAvatar";

export default function ProfileCard() {
  const user = useSelector(selectUserDetails);
  const fullName = `${user?.first_name} ${user?.middle_name} ${user?.last_name} `;
  return (
    <Paper elevation={0}>
      <Grid container>
        <Grid item xs={12}>
          <CoverImage />
        </Grid>

        <Grid item xs={12} sm={4}>
          <CardAvatar fullName={fullName} photo={user?.photo} designation={user?.designation} />
        </Grid>

        <Grid item xs={12} sm={8} sx={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "center" }}>
          <CardFeatures />

          <Grid container>
            <Grid item xs={12} sm={6} p={2} textAlign="left">
              <Link to="/update-profile">
                <Button variant="contained" endIcon={<ArrowForwardIcon />} size="small">
                  Update Profile
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
