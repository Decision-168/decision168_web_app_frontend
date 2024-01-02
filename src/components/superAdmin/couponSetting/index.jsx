import { Box, Grid, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import { openModal } from "../../../redux/action/modalSlice";
import ReduxDialog from "../common/ReduxDialog";
import CouponSettingTable from "./subComponents/ReactTable/CouponSettingTable";
import BasicBreadcrumbs from "./../common/BasicBreadcrumbs";
import ViewEditPackageForm from "./subComponents/ViewEditPackageForm";

const Index = () => {
  const dispatch = useDispatch();

  return (
    <Box sx={{ flexGrow: 1 }} mt="-20px" mb={2}>
      <Grid container>
        <Grid item xs={12} lg={12} mb={1}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <BasicBreadcrumbs currentPage="coupon's" />
            <Button
              sx={{ ml: 2, fontSize: "12px" }}
              size="small"
              variant="contained"
              onClick={() => dispatch(openModal("addCoupon"))}
            >
              <AddIcon sx={{ fontSize: "14px", mr: "2px" }} />
              Add New
            </Button>
            <ReduxDialog
              value={"addCoupon"}
              modalTitle={"Add Coupon & it's package"}
              showModalButton={false}
              modalSize={"sm"}
            >
              <ViewEditPackageForm editMode={false} />
            </ReduxDialog>
          </Box>
        </Grid>
        <Grid item xs={12} lg={12}>
          <CouponSettingTable />
        </Grid>
      </Grid>
    </Box>
  );
};
export default Index;
