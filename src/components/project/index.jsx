import {
  Box,
  Grid,
  Button,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useState, useCallback } from "react";
import { FormatListBulleted, GridView, Add } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import BasicBreadcrumbs from "../common/BasicBreadcrumbs";
import CustomFilter from "../common/CustomFilter";
import CustomSearchField from "../common/CustomSearchField";
import ProjectListView from "./portfolio-projects-list/ProjectListView";
import ProjectGridView from "./portfolio-projects-list/ProjectGridView";
import { openModal } from "../../redux/action/modalSlice";
import ReduxDialog from "../common/ReduxDialog";
import CreateProject from "./Dialogs/CreateProject";
import CustomDialog from "../common/CustomDialog";
import ViewProjectPopup from "../GoalsAndStrategies/subComponents/ViewProjectPopup";
 const filterOption = [
   {
     value: "all",
     label: "All",
   },
   {
     value: "created",
     label: "Created",
   },
   {
     value: "accepted",
     label: "Accepted",
   },
   {
     value: "pending",
     label: "Pending",
   },
   {
     value: "more-info-requests",
     label: "More Info Requests",
   },
   {
     value: "regular-projects",
     label: "Regular Projects",
   },
   {
     value: "goal-projects",
     label: "Goal Projects",
   },
 ];
const ProjectIndex = () => {
  const [alignment, setAlignment] = useState("list");
  const [value, setValue] = useState("all");
  const handleChangeSwitch = useCallback((event, newAlignment) => {
    setAlignment(newAlignment);
  }, []);
  const handleChangeRadio = useCallback((event) => {
    setValue(event.target.value);
  }, []);
  const [previewProject, setPreviewProject] = useState(false);
 
  const handleProjectPreviewClose = () => {
    setPreviewProject(false);
  };
  const handleProjectPreviewOpen = () => {
    setPreviewProject(true);
  };

  const dispatch = useDispatch();
  const align = alignment === "list";
  return (
    <Box sx={{ flexGrow: 1 }} mb={2}>
      <Grid container>
        <Grid item xs={8} sm={8} md={4} lg={4}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              flexDirection: "row",
            }}
          >
            <BasicBreadcrumbs currentPage="PROJECTS" />
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
              onClick={() => dispatch(openModal("create-project"))}
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
            <ProjectListView
              handleOpen={handleProjectPreviewOpen}
              value={value}
            />
          ) : (
            <ProjectGridView
              handleOpen={handleProjectPreviewOpen}
              value={value}
            />
          )}
        </Grid>
      </Grid>
      <ReduxDialog
        value="create-project"
        modalTitle="Create New Project"
        showModalButton={false}
        modalSize="md"
      >
        <CreateProject flag="add" />
      </ReduxDialog>
      <CustomDialog
        handleClose={handleProjectPreviewClose}
        open={previewProject}
        modalTitle="Dashboard Module"
        redirectPath={"/projects-overview"}
        showModalButton={true}
        modalSize="md"
      >
        <ViewProjectPopup />
      </CustomDialog>
    </Box>
  );
};

export default ProjectIndex;
