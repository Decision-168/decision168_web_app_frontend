import { Box, Grid } from "@mui/material";
import BasicBreadcrumbs from "../common/BasicBreadcrumbs";
import EnterpriseLeadsTable from "./subComponents/ReactTable/EnterpriseLeadsTable";

const Index = () => {
  return (
    <Box sx={{ flexGrow: 1 }} mt="-20px" mb={2}>
      <Grid container>
        <Grid item xs={12} lg={12} mb={2}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}>
            <BasicBreadcrumbs currentPage="contacted sales list" />
          </Box>
        </Grid>
        <Grid item xs={12} lg={12}>
          <EnterpriseLeadsTable />
        </Grid>
      </Grid>
    </Box>
  );
};
export default Index;
