import { useState, useCallback, useEffect } from "react";
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
import TaskPopup from "./popup/TaskPopup";
import SubtaskPopup from "./popup/SubtaskPopup";
import CustomFilter from "../common/CustomFilter";
import CustomSearchField from "../common/CustomSearchField";
import FilePopup from "./popup/FilePopup";
import { getTreeData } from "../../api/modules/FileCabinetModule";
import { selectUserDetails } from "../../redux/action/userSlice";
import { useSelector } from "react-redux";

const FileCabinet = () => {
  const [treeData, setTreeData] = useState([]);
  
  const user = useSelector(selectUserDetails);
  // const storedPortfolioId = JSON.parse(localStorage.getItem('portfolioId'));
  const storedPortfolioId = 3;
  const userID = user?.reg_id;

  const fetchTreeData = async () => {
    try {
      const response = await getTreeData(storedPortfolioId,userID);
      setTreeData(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTreeData();
  }, [userID]);

  const [openModule, setOpenModule] = useState(false);
  const [nodesData, setNodesData] = useState([]);
  const [alignment, setAlignment] = useState("list");
  const [value, setValue] = useState("department");

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
  const filterOption = [
    {
      value: "department",
      label: "All",
    },
    {
      value: "goal",
      label: "Goals",
    },
    {
      value: "kpi",
      label: "KPIs",
    },
    {
      value: "project",
      label: "Projects",
    },
    {
      value: "task",
      label: "Tasks",
    },
    {
      value: "subtask",
      label: "Subtasks",
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
          {alignment === "list" && (
            <Grid container>
              <Grid item xs={12} lg={8}>
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
              <Grid item xs={12} lg={4}>
                <CustomSearchField />
              </Grid>
            </Grid>
          )}
        </Grid>
        <Grid item xs={12} lg={9}>
          {alignment === "list" ? (
            <TreeSection
              handleModuleOpen={handleModuleOpen}
              handleFileOpen={handleFileOpen}
              value={value}
              data={treeData}
            />
          ) : (
            <GridSection
              handleModuleOpen={handleModuleOpen}
              handleFileOpen={handleFileOpen}
              value={value}
              data={treeData}
            />
          )}
        </Grid>
        <Grid item xs={12} lg={3}>
          <RecentFiles handleFileOpen={handleFileOpen} regId={userID} portfolioId={storedPortfolioId} />
        </Grid>
      </Grid>
      <CustomPopup
        handleClose={handleModuleClose}
        open={openModule}
        modalTitle={nodesData.name}
        modalType={nodesData.type}
        modalId={nodesData.table_id}
        portfolioId={storedPortfolioId}
        regId={userID}
        fetchTreeData={fetchTreeData}
        modalSize="md"
      >
        {nodesData.type === "goal-content" && ( <GoalPopup nodes={nodesData} regId={userID} portfolioId={storedPortfolioId} /> )}
        {nodesData.type === "kpi-content" && ( <KpiPopup nodes={nodesData} regId={userID} portfolioId={storedPortfolioId} /> )}
        {nodesData.type === "project-content" && ( <ProjectPopup nodes={nodesData} regId={userID} portfolioId={storedPortfolioId} /> )}
        {nodesData.type === "task-content" && ( <TaskPopup nodes={nodesData} regId={userID} portfolioId={storedPortfolioId} /> )}
        {nodesData.type === "subtask-content" && ( <SubtaskPopup nodes={nodesData} regId={userID} portfolioId={storedPortfolioId} /> )}
        {(nodesData.type == "project-file" ||
            nodesData.type == "task-file" ||
            nodesData.type == "subtask-file" ||
            nodesData.type == "content-file") && (
              <FilePopup nodes={nodesData} />
          )}
      </CustomPopup>
    </Box>
  );
};

export default FileCabinet;
