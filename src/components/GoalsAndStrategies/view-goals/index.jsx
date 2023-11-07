import { Box, Grid, Button } from "@mui/material";
import { memo, useState } from "react";
import BasicBreadcrumbs from "../../common/BasicBreadcrumbs";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { FormatListBulleted, GridView, Add } from "@mui/icons-material";
import ListSection from "./subComponents/ListSection";
import GridSection from "./subComponents/GridSection";
import RadioSection from "./subComponents/RadioSection";
import { useDispatch } from "react-redux";
import { openModal } from "../../../redux/action/modalSlice";
import CreateGoal from "../create-goals";
import ViewGoalsPopup from "../subComponents/ViewGoalsPopup";
import CustomDialog from "../../common/CustomDialog";
const ViewGoalsIndex = () => {
  const [alignment, setAlignment] = useState("list");
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const dispatch = useDispatch();

  const [openGoal, setOpenGoal] = useState(false);

  const handleGoalClose = () => {
    setOpenGoal(false);
  };
  const handleGoalOpen = () => {
    setOpenGoal(true);
  };
  return (
    <Box sx={{ flexGrow: 1 }} mb={2}>
      <Grid container>
        <Grid item xs={12} lg={3}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <BasicBreadcrumbs currentPage="GOALS" />
            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
            >
              <ToggleButton value="list">
                <FormatListBulleted sx={{ fontSize: 14 }} />
              </ToggleButton>
              <ToggleButton value="grid">
                <GridView sx={{ fontSize: 14 }} />
              </ToggleButton>
            </ToggleButtonGroup>
            <Button
              variant="contained"
              startIcon={<Add />}
              size="small"
              onClick={() => dispatch(openModal("create-goals-kpis"))}
            >
              Create New
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} lg={9}>
          <RadioSection />
        </Grid>
        <Grid item xs={12}>
          {alignment === "list" ? (
            <ListSection handleGoalOpen={handleGoalOpen} />
          ) : (
            <GridSection handleGoalOpen={handleGoalOpen} />
          )}
        </Grid>
      </Grid>
      <CreateGoal />

      <CustomDialog
        handleClose={handleGoalClose}
        open={openGoal}
        modalTitle="Demo Goal"
        redirectPath={"/goal-overview"}
        showModalButton={true}
        modalSize="md"
      >
        <ViewGoalsPopup />
      </CustomDialog>
    </Box>
  );
};

export default memo(ViewGoalsIndex);
