import Chips from "../../dashboard/subComponents/Chips";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Button, Grid, useMediaQuery, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";

export default function ProfileCardContent() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // Adjust breakpoint as needed

  return (
    <Grid container p={1}>
      <Grid item xs={12} sm={4} sx={{ marginTop: isSmallScreen ? "20px" : "auto", height: "50px", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Link to="/update-profile">
          <Button variant="outlined" startIcon={<VisibilityIcon />}>
            <Typography component="div" noWrap>
              Update Profile
            </Typography>
          </Button>
        </Link>
      </Grid>
      <Grid item xs={12} sm={8} sx={{ marginTop: isSmallScreen ? "20px" : "auto", height: "50px", display: "flex", justifyContent: "start", alignItems: "center" }}>
        <Chips />
      </Grid>
    </Grid>
  );
}
