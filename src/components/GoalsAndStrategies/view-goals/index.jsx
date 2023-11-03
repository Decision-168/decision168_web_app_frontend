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
import Goal from "../create-goals/subComponents/Goal";
import KPIs from "../create-goals/subComponents/KPIs";
import ReduxDialog from "../../common/ReduxDialog";
const ViewGoalsIndex = () => {
  const [alignment, setAlignment] = useState("list");
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const dispatch = useDispatch();
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
          {alignment === "list" ? <ListSection /> : <GridSection />}
        </Grid>
      </Grid>
      <CreateGoal />
      <ReduxDialog
        value="create-goals"
        modalTitle="Edit Goal"
        showModalButton={false}
        modalSize="md"
      >
        <Goal individual={true} />
      </ReduxDialog>
      <ReduxDialog
        value="create-kpis"
        modalTitle="Add KPIs"
        showModalButton={false}
        modalSize="sm"
      >
        <KPIs individual={true} />
      </ReduxDialog>
    </Box>
  );
};

export default memo(ViewGoalsIndex);
