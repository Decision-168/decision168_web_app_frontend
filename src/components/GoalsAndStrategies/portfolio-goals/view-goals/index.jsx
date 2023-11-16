import {
  Box,
  Grid,
  Button,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { memo, useState, useCallback } from "react";
import { FormatListBulleted, GridView, Add } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import BasicBreadcrumbs from "../../../common/BasicBreadcrumbs";
import ListSection from './subComponents/ListSection'
import CustomDialog from "../../../common/CustomDialog";
import ViewGoalsPopup from "../../subComponents/ViewGoalsPopup";
import GridSection from "./subComponents/GridSection";
import CustomFilter from "../../../common/CustomFilter";
import ReduxDialog from "../../../common/ReduxDialog";
import CreateGoal from "../create-goals";
import { openModal } from "../../../../redux/action/modalSlice";
import CustomSearchField from "../../../common/CustomSearchField";
import PendingPopup from "../../subComponents/PendingPopup";

const ViewGoalsIndex = () => {
  const dispatch = useDispatch();
  const [openGoal, setOpenGoal] = useState(false);
    const [openPendingGoal, setOpenPendingGoal] = useState(false);
  const [alignment, setAlignment] = useState("list");
  const [value, setValue] = useState("all");
  const handleChangeSwitch = useCallback((event, newAlignment) => {
    setAlignment(newAlignment);
  }, []);
  const handleChangeRadio = useCallback((event) => {
    setValue(event.target.value);
  }, []);
  const handleGoalClose = () => {
    setOpenGoal(false);
  };
  const handleGoalOpen = () => {
    setOpenGoal(true);
  };
 const handlePendingGoalClose = () => {
   setOpenPendingGoal(false);
 };
 const handlePendingGoalOpen = () => {
   setOpenPendingGoal(true);
 };
  const filterOption = [
    {
      value: "all",
      label: "All",
    },
    {
      value: "created-goals",
      label: "Created Goals",
    },
    {
      value: "accepted-goals",
      label: "Accepted Goals",
    },
    {
      value: "pending-requests",
      label: "Pending Requests",
    },
    {
      value: "more-info-requests",
      label: "More Info Requests",
    },
  ];
  const align = alignment === "list";
  return (
    <Box sx={{ flexGrow: 1 }} mb={2}>
      <Grid container>
        <Grid item xs={8} sm={4} md={4} lg={4}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              flexDirection: "row",
            }}
          >
            <BasicBreadcrumbs currentPage="GOALS" />
            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              onChange={handleChangeSwitch}
              aria-label="Platform"
              sx={{ mx: 1 }}
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
              startIcon={<Add fontSize="small" />}
              size="small"
              sx={{ fontSize: 12 }}
              onClick={() => dispatch(openModal("create-goals-kpis"))}
            >
              Create New
            </Button>
          </Box>
        </Grid>
        <Grid
          item
          xs={4}
          sm={align ? 8 : 5}
          md={align ? 8 : 5}
          lg={align ? 8 : 5}
          alignSelf={"center"}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
              flexDirection: "row",
            }}
          >
            <CustomFilter
              value={value}
              handleChange={handleChangeRadio}
              filterOption={filterOption}
            />
          </Box>
        </Grid>
        {!align && (
          <Grid item xs={8} sm={3} md={3} lg={3} alignSelf={"center"}>
            <CustomSearchField />
          </Grid>
        )}

        <Grid item xs={12}>
          {align ? (
            <ListSection
              handleGoalOpen={handleGoalOpen}
              handlePendingGoalOpen={handlePendingGoalOpen}
              value={value}
            />
          ) : (
            <GridSection
              handleGoalOpen={handleGoalOpen}
              handlePendingGoalOpen={handlePendingGoalOpen}
              value={value}
            />
          )}
        </Grid>
      </Grid>

      <ReduxDialog
        value="create-goals-kpis"
        modalTitle="Create Goal and KPIs"
        showModalButton={false}
        modalSize="md"
      >
        <CreateGoal />
      </ReduxDialog>

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
      <CustomDialog
        handleClose={handlePendingGoalClose}
        open={openPendingGoal}
        modalTitle="Nov Goal"
        redirectPath={"/goal-overview-request"}
        showModalButton={true}
        modalSize="md"
      >
        <PendingPopup />
      </CustomDialog>
    </Box>
  );
};

export default memo(ViewGoalsIndex);
