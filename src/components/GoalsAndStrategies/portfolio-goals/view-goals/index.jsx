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
import RadioSection from "../../../common/RadioSection";
import ReduxDialog from "../../../common/ReduxDialog";
import CreateGoal from "../create-goals";
import { openModal } from "../../../../redux/action/modalSlice";

const ViewGoalsIndex = () => {
  const dispatch = useDispatch();
  const [openGoal, setOpenGoal] = useState(false);
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

  const data = [
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
              onChange={handleChangeSwitch}
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
              startIcon={<Add fontSize="small" />}
              size="small"
              sx={{ fontSize: 12 }}
              onClick={() => dispatch(openModal("create-goals-kpis"))}
            >
              Create New
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} lg={9} alignSelf={"center"}>
          <RadioSection
            value={value}
            handleChange={handleChangeRadio}
            data={data}
          />
        </Grid>
        <Grid item xs={12}>
          {alignment === "list" ? (
            <ListSection handleGoalOpen={handleGoalOpen} value={value} />
          ) : (
            <GridSection handleGoalOpen={handleGoalOpen} value={value} />
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
    </Box>
  );
};

export default memo(ViewGoalsIndex);
