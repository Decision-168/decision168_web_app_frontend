import { Box, Button, Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { openModal } from "../../../../../redux/action/modalSlice";
import AddIcon from "@mui/icons-material/Add";
import ReduxDialog from "../../../common/ReduxDialog";
import AddEditCategoryForm from "./subComponents/AddEditCategoryForm";
import BasicBreadcrumbs from "./../../../common/BasicBreadcrumbs";
import DecisionMakerCategoryTable from "./subComponents/ReactTable/DecisionMakerCategoryTable";

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
            <BasicBreadcrumbs currentPage="decision maker category" />
            <Button
              sx={{ ml: 2, fontSize: "12px" }}
              size="small"
              variant="contained"
              onClick={() => dispatch(openModal("addCategory"))}
            >
              <AddIcon sx={{ fontSize: "14px", mr: "2px" }} />
              Add Category
            </Button>
            <ReduxDialog
              value={"addCategory"}
              modalTitle={"Add Category"}
              showModalButton={false}
              modalSize={"xs"}
            >
              <AddEditCategoryForm />
            </ReduxDialog>
          </Box>
        </Grid>
        <Grid item xs={12} lg={12}>
          <DecisionMakerCategoryTable />
        </Grid>
      </Grid>
    </Box>
  );
};
export default Index;
