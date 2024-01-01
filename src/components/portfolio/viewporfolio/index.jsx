import { Box, Button, Grid } from "@mui/material";
import BasicBreadcrumbs from "../../common/BasicBreadcrumbs";
import PortfolioCard from "./subComponents/PortfolioCard";
import PersonalInfo from "./subComponents/PersonalInfo";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useEffect } from "react";
import Quote from "../../dashboard/subComponents/Quote";

export default function PortfolioView() {
  return (
    <Box sx={{ flexGrow: 1 }} mb={2}>
      {/* <BasicBreadcrumbs currentPage="profile" showBackButton={false} /> */}

      <Grid container>
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <BasicBreadcrumbs currentPage="Portfolio" />
       
              <Link to="/portfolio-create">
                <Button variant="contained" startIcon={<AddIcon />} size="small" sx={{mx:2}}>
                  Create New Portfolio
                </Button>
              </Link>
        
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ flexGrow: 1 }} mb={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={8}>
            <PortfolioCard />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Quote />
          </Grid>
        </Grid>
      </Box>

      <Grid container mt={2}>
        <Grid item xs={12} lg={8}>
          <PersonalInfo />
        </Grid>
      </Grid>
    </Box>
  );
}
