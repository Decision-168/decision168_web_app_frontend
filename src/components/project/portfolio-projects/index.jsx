import {
  Box,
  Grid,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
  useMediaQuery,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useState, useCallback, useEffect } from "react";
import {
  FormatListBulleted,
  GridView,
  Add,
  ArrowBack,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import BasicBreadcrumbs from "../../common/BasicBreadcrumbs";
import CustomFilter from "../../common/CustomFilter";
import CustomSearchField from "../../common/CustomSearchField";
import ProjectListView from ".././portfolio-projects-list/ProjectListView";
import ProjectGridView from ".././portfolio-projects-list/ProjectGridView";
import { openModal } from "../../../redux/action/modalSlice";
import ReduxDialog from "../../common/ReduxDialog";
import CreateProject from ".././Dialogs/CreateProject";
import CustomDialog from "../../common/CustomDialog";
import ViewProjectPopup from "../../GoalsAndStrategies/subComponents/ViewProjectPopup";
import PendingProjectPopup from ".././portfolio-projects-list/PendingProjectPopup";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../redux/action/userSlice";
import { getPortfolioProjectList } from "../../../api/modules/ProjectModule";
import { SearchWithFuse } from "../../../helpers/SearchWithFuse";
import { useNavigate, useParams } from "react-router";
const filterOption = [
  {
    value: "all",
    label: "All",
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
const PortfolioProjects = () => {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const user = useSelector(selectUserDetails);
  const userID = user?.reg_id;
  const { portfolioId } = useParams();
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState([]);
  const [projectId, setProjectId] = useState(0);
  const [projectTitle, setProjectTitle] = useState("");
  const [projectTitleType, setProjectTitleType] = useState(null);

  const fetchProjectData = async () => {
    try {
      const response = await getPortfolioProjectList(userID, portfolioId);
      setProjectData(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProjectData();
  }, [userID]);

  const [alignment, setAlignment] = useState("list");
  const [value, setValue] = useState("all");
  const handleChangeSwitch = useCallback((event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  }, []);
  const handleChangeRadio = useCallback((event) => {
    setValue(event.target.value);
  }, []);
  const [previewProject, setPreviewProject] = useState(false);
  const [openPreviewPendingProj, setOpenPreviewPendingProj] = useState(false);

  const handleProjectPreviewClose = () => {
    setPreviewProject(false);
  };
  const handleProjectPreviewOpen = (type, pid, pname) => {
    setProjectTitleType(type);
    setProjectId(pid);
    setProjectTitle(pname);
    setPreviewProject(true);
  };
  const handlePendingProjectClose = () => {
    setOpenPreviewPendingProj(false);
  };
  const handlePendingProjectOpen = (type, pid, pname) => {
    setProjectTitleType(type);
    setProjectId(pid);
    setProjectTitle(pname);
    setOpenPreviewPendingProj(true);
  };
  const dispatch = useDispatch();
  const align = alignment === "list";

  const [query, setQuery] = useState("");
  const createData = projectData.projectRegularList;
  const cardData = {
    all: [...(createData || [])],
    "regular-projects": [
      ...(createData?.filter((i) => i.projectType === 0) || []),
    ],
    "goal-projects": [
      ...(createData?.filter((i) => i.projectType === 1) || []),
    ],
  };
  const cardsToRender = cardData[value] || [];
  const newResults = SearchWithFuse(
    ["project.name"],
    query,
    cardsToRender || []
  );
  const tableData = {
    all: [{ title: "Created Projects", data: createData }],
    "regular-projects": [
      {
        title: "Created Projects",
        data: createData?.filter((i) => i.projectType === 0),
      },
    ],
    "goal-projects": [
      {
        title: "Created Projects",
        data: createData?.filter((i) => i.projectType === 1),
      },
    ],
  };

  const tablesToRender = tableData[value] || [];
  return (
    <Box sx={{ flexGrow: 1 }} mb={2}>
      <Grid container>
        <Grid item xs={10} sm={6} md={6} lg={7} xl={7}>
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
              startIcon={<ArrowBack />}
              size="small"
              variant="contained"
              sx={{
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.secondary.light,
                "&:hover": { backgroundColor: theme.palette.secondary.dark },
                mx: 2,
              }}
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
            {isMediumScreen ? (
              <Tooltip arrow title="Add Project" placement="right">
                <IconButton
                  onClick={() => dispatch(openModal("create-project"))}
                >
                  <Add />
                </IconButton>
              </Tooltip>
            ) : (
              <Button
                variant="contained"
                startIcon={<Add fontSize="small" />}
                size="small"
                sx={{ fontSize: 12 }}
                onClick={() => dispatch(openModal("create-project"))}
              >
                Add Project
              </Button>
            )}
          </Box>
        </Grid>
        <Grid
          item
          xs={2}
          sm={align ? 6 : 2}
          md={align ? 6 : 2}
          lg={align ? 5 : 2}
          xl={align ? 5 : 2}
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
          <Grid item xs={12} sm={4} md={4} lg={3} alignSelf={"center"}>
            <CustomSearchField query={query} setQuery={setQuery} />
          </Grid>
        )}

        <Grid item xs={12}>
          {align ? (
            <ProjectListView
              handleOpen={handleProjectPreviewOpen}
              handlePendingOpen={handlePendingProjectOpen}
              value={value}
              projectData={tablesToRender}
            />
          ) : (
            <ProjectGridView
              handleOpen={handleProjectPreviewOpen}
              handlePendingOpen={handlePendingProjectOpen}
              value={value}
              filterData={newResults}
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
        <CreateProject flag="add" gid={0} sid={0} passPID={0} />
      </ReduxDialog>
      <CustomDialog
        handleClose={handleProjectPreviewClose}
        open={previewProject}
        modalTitle={projectTitle}
        redirectPath={`/projects-overview/${projectId}`}
        showModalButton={true}
        modalSize="md"
      >
        <ViewProjectPopup
          pid={projectId}
          projectTitleType={projectTitleType}
          refreshData={fetchProjectData}
          handleClose={handleProjectPreviewClose}
        />
      </CustomDialog>
      <CustomDialog
        handleClose={handlePendingProjectClose}
        open={openPreviewPendingProj}
        modalTitle={projectTitle}
        redirectPath={`/projects-overview-request/${projectId}`}
        showModalButton={true}
        modalSize="md"
      >
        <PendingProjectPopup
          pid={projectId}
          refreshData={fetchProjectData}
          handleClose={handlePendingProjectClose}
        />
      </CustomDialog>
    </Box>
  );
};

export default PortfolioProjects;
