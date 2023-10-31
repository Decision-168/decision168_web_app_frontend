import { Box, Button, Grid, Paper } from "@mui/material";
import BasicBreadcrumbs from "../../common/BasicBreadcrumbs";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AddIcon from "@mui/icons-material/Add";
import CreatePortfolioForm from "./subComponents/CreatePortfolioForm";

export default function CreatePortfolio() {
  return (
    <Box sx={{ flexGrow: 1 }} mb={2}>
      <BasicBreadcrumbs currentPage="Create" />
      <Paper elevation={0}>
        <Grid container>
          <Grid item xs={12}>
            <CreatePortfolioForm />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
