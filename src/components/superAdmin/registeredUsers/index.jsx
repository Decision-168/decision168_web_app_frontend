import { Box, Grid } from "@mui/material";
import BasicBreadcrumbs from "../common/BasicBreadcrumbs";
import { Stack } from "@mui/material";
import { Button } from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import RegisteredUsersTable from "./subComponents/ReactTable/RegisteredUsersTable";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <Box sx={{ flexGrow: 1 }} mt="-20px" mb={2}>
      <Grid container>
        <Grid item xs={12} lg={12} mb={2}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
            }}>
            <BasicBreadcrumbs currentPage="registered list" />
            <Stack direction={"row"} spacing={1}>
              <Link to="/super-admin/deactivated-users">
                <Button sx={{ fontSize: "12px", color: "white" }} size="small" color="secondary" variant="contained">
                  <PeopleAltIcon fontSize="12px" sx={{ mr: "4px" }} />
                  Deactivated Users
                </Button>
              </Link>
              <Link to="/super-admin/refund-list">
                <Button sx={{ fontSize: "12px" }} size="small" variant="contained">
                  <ListAltOutlinedIcon fontSize="12px" sx={{ mr: "4px" }} />
                  Refund List
                </Button>
              </Link>
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={12} lg={12}>
          <RegisteredUsersTable />
        </Grid>
      </Grid>
    </Box>
  );
};
export default Index;
