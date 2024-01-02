import { Box, Grid, Button } from "@mui/material";
import BasicBreadcrumbs from "../../../common/BasicBreadcrumbs";
import DeactivatedUsersTable from "../ReactTable/DeactivatedUsersTable";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";

const Index = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }} mt="-20px" mb={2}>
      <Grid container>
        <Grid item xs={12} lg={12} mb={2}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}>
            <BasicBreadcrumbs currentPage="deactivated users" />
            <Button
              sx={{ fontSize: "12px", color: "white", ml: "40px" }}
              size="small"
              color="secondary"
              variant="contained"
              onClick={() => navigate("/super-admin/registered-list")}>
              <ArrowBack sx={{ fontSize: "12px", mr: "5px" }} />
              Back
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} lg={12}>
          <DeactivatedUsersTable />
        </Grid>
      </Grid>
    </Box>
  );
};
export default Index;
