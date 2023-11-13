import { useState, useCallback } from "react";
import BasicBreadcrumbs from "../common/BasicBreadcrumbs";
import { Box, Grid, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { FormatListBulleted, GridView } from "@mui/icons-material";
import GridSection from "./sections/GridSection";
import RadioSection from "./sections/RadioSection";
import TreeSection from "./sections/TreeSection";
import RecentFiles from "./sections/RecentFiles";
import GoalPopup from "./popup/GoalPopup";
import CustomPopup from "./subComponents/CustomPopup";
import KpiPopup from "./popup/KpiPopup";
import ProjectPopup from "./popup/ProjectPopup";

const FileCabinet = () => {
  const [openModule, setOpenModule] = useState(false);
  const [nodesData, setNodesData] = useState([]);
  const [alignment, setAlignment] = useState("list");
  const [value, setValue] = useState("all");

  const handleChangeSwitch = useCallback((event, newAlignment) => {
    setAlignment(newAlignment);
  }, []);
  const handleChangeRadio = useCallback((event) => {
    setValue(event.target.value);
  }, []);

  const handleModuleClose = () => {
    setOpenModule(false);
  };
  const handleModuleOpen = (nodes) => {
    setOpenModule(true);
    setNodesData(nodes);
  };
  const handleFileOpen = (nodes) => {
    setOpenModule(true);
    setNodesData(nodes);
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
            <BasicBreadcrumbs currentPage="file-cabinet" />
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
          </Box>
        </Grid>
        <Grid item xs={12} lg={9}>
          <RadioSection value={value} handleChange={handleChangeRadio} />
        </Grid>
        <Grid item xs={12} lg={9}>
          {alignment === "list" ? (
            <TreeSection
              handleModuleOpen={handleModuleOpen}
              handleFileOpen={handleFileOpen}
              value={value}
            />
          ) : (
            <GridSection
              handleModuleOpen={handleModuleOpen}
              handleFileOpen={handleFileOpen}
              value={value}
            />
          )}
        </Grid>
        <Grid item xs={12} lg={3}>
          <RecentFiles />
        </Grid>
      </Grid>
      <CustomPopup
        handleClose={handleModuleClose}
        open={openModule}
        modalTitle={nodesData.name}
        modalSize="md"
      >
        {nodesData.type === "goal-content" && (<GoalPopup nodes={nodesData} />)}
        {nodesData.type === "kpi-content" && (<KpiPopup nodes={nodesData} />)}
        {nodesData.type === "project-content" && (<ProjectPopup nodes={nodesData} />)}
        {nodesData.type === "task-content" && (<GoalPopup nodes={nodesData} />)}
        {nodesData.type === "subtask-content" && (<GoalPopup nodes={nodesData} />)}
      </CustomPopup>
    </Box>
  );
};

export default FileCabinet;
