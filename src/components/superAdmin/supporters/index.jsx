import { Box, Button, Grid } from "@mui/material";
import BasicBreadcrumbs from "./../common/BasicBreadcrumbs";
import { openModal } from "../../redux/action/modalSlice";
import ReduxDialog from "../common/ReduxDialog";
import { useDispatch } from "react-redux";
import { Add } from "@mui/icons-material";
import SupportersTable from "./subComponents/ReactTable/SupportersTable";
import AddResourcesForm from "./subComponents/AddResourcesForm";
import InvitedTable from "./subComponents/ReactTable/InvitedTable";

const Index = () => {
  const dispatch = useDispatch();
  return (
    <>
      <Box sx={{ flexGrow: 1 }} mt="-20px" mb={2}>
        <Grid item>
          <Grid item xs={12} lg={12} mb={1}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}>
              <BasicBreadcrumbs currentPage="supporters" />
              <Button sx={{ ml: 2, fontSize: "12px" }} size="small" variant="contained" onClick={() => dispatch(openModal("addResources"))}>
                <Add sx={{ fontSize: "14px", mr: "2px" }} />
                Add Resources
              </Button>
              <ReduxDialog value={"addResources"} modalTitle={"Add Supporter"} showModalButton={false} modalSize={"xs"}>
                <AddResourcesForm />
              </ReduxDialog>
            </Box>
          </Grid>
          <Grid item xs={12} lg={12}>
            <SupportersTable />
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ flexGrow: 1 }} mt={3} mb={2}>
        <Grid item>
          <Grid item xs={12} lg={12}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}>
              <BasicBreadcrumbs currentPage="invited email addresses" />
            </Box>
          </Grid>
          <Grid item xs={12} lg={12}>
            <InvitedTable />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
export default Index;
