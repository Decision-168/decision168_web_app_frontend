import { Box, Button, Grid } from "@mui/material";
import BasicBreadcrumbs from "../../common/BasicBreadcrumbs";
import PortfolioCard from "./subComponents/PortfolioCard";
import PersonalInfo from "./subComponents/PersonalInfo";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AddIcon from "@mui/icons-material/Add";

export default function PortfolioView() {
  return (
    <Box sx={{ flexGrow: 1 }} mb={2}>
      {/* <BasicBreadcrumbs currentPage="profile" /> */}
      <Grid container>
        <Grid item xs={6} lg={10}>
          <BasicBreadcrumbs currentPage="Portfolio" />
        </Grid>
        <Grid item xs={6} lg={2}>
          <Box sx={{ display: "flex", justifyContent: "end", alignItems: "baseline" }}>
            <Link to="/portfolio-create">
              <Button variant="contained" startIcon={<AddIcon />} size="small">
                Create New Portfolio
              </Button>
            </Link>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <PortfolioCard />
        </Grid>
      </Grid>

      <Grid container mt={2}>
        <Grid item xs={12}>
          <PersonalInfo />
        </Grid>
      </Grid>
    </Box>
  );
}
