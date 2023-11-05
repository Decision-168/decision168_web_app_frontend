import { Box, Button, Grid } from "@mui/material";
import BasicBreadcrumbs from "../../common/BasicBreadcrumbs";
import PortfolioCard from "./subComponents/PortfolioCard";
import PersonalInfo from "./subComponents/PersonalInfo";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

export default function PortfolioView() {
  return (
    <Box sx={{ flexGrow: 1 }} mb={2}>
      {/* <BasicBreadcrumbs currentPage="profile" showBackButton={false} /> */}
      <Grid container>
        <Grid item xs={6} lg={10}>
          <BasicBreadcrumbs currentPage="Portfolio" />
        </Grid>
        <Grid item xs={6} lg={2}>
          <Box sx={{ height:"100%", display: "flex", justifyContent: "end", alignItems: "center" }}>
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
