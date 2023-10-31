import { Box, Button, Grid, Paper } from "@mui/material";
import BasicBreadcrumbs from "../../common/BasicBreadcrumbs";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AddIcon from "@mui/icons-material/Add";
import EditPortfolioForm from "./subComponents/EditPortfolioForm";

export default function EditPortfolio() {
  return (
    <Box sx={{ flexGrow: 1 }} mb={2}>
      <BasicBreadcrumbs currentPage="Edit" />
      <Paper elevation={0}>
        <Grid container>
          <Grid item xs={12}>
            <EditPortfolioForm />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
