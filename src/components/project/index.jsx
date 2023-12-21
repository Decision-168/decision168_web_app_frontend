import {
  Box,
  Grid,
  Button,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useState, useCallback, useEffect } from "react";
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
import PendingProjectPopup from "./portfolio-projects-list/PendingProjectPopup";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../redux/action/userSlice";
import {
  getProjectDetail,
  getProjectList,
} from "../../api/modules/ProjectModule";
import { SearchWithFuse } from "../../helpers/SearchWithFuse";
import { useParams } from "react-router";
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
  const user = useSelector(selectUserDetails);
  const userID = user?.reg_id;
  const { portfolioId } = useParams();

  const [projectData, setProjectData] = useState([]);
  const [projectId, setProjectId] = useState(0);
  const [projectTitle, setProjectTitle] = useState("");
  const [projectTitleType, setProjectTitleType] = useState(null);

  const fetchProjectData = async () => {
    try {
      const response = await getProjectList(userID, portfolioId);
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
  const acceptedData = projectData.projectAcceptedList;
  const pendingRequest = projectData.projectPendingList;
  const moreInfoRequest = projectData.projectReadMoreList;
  const cardData = {
    all: [
      ...(createData || []),
      ...(acceptedData || []),
      ...(pendingRequest || []),
      ...(moreInfoRequest || []),
    ],
    created: [...(createData || [])],
    accepted: [...(acceptedData || [])],
    "pending-requests": [...(pendingRequest || [])],
    "more-info-requests": [...(moreInfoRequest || [])],
    "regular-projects": [
      ...(createData?.filter((i) => i.projectType === 0) || []),
      ...(acceptedData?.filter((i) => i.projectType === 0) || []),
      ...(pendingRequest?.filter((i) => i.projectType === 0) || []),
      ...(moreInfoRequest?.filter((i) => i.projectType === 0) || []),
    ],
    "goal-projects": [
      ...(createData?.filter((i) => i.projectType === 1) || []),
      ...(acceptedData?.filter((i) => i.projectType === 1) || []),
      ...(pendingRequest?.filter((i) => i.projectType === 1) || []),
      ...(moreInfoRequest?.filter((i) => i.projectType === 1) || []),
    ],
  };
  const cardsToRender = cardData[value] || [];
  const newResults = SearchWithFuse(
    ["project.name"],
    query,
    cardsToRender || []
  );

  const tableData = {
    all: [
      { title: "Created Projects", data: createData },
      { title: "Accepted Projects", data: acceptedData },
      { title: "Pending Requests", data: pendingRequest },
      { title: "More Info Requests", data: moreInfoRequest },
    ],
    created: [{ title: "Created Projects", data: createData }],
    accepted: [{ title: "Accepted Projects", data: acceptedData }],
    pending: [{ title: "Pending Requests", data: pendingRequest }],
    "more-info-requests": [
      { title: "More Info Requests", data: moreInfoRequest },
    ],
    "regular-projects": [
      {
        title: "Created Projects",
        data: createData?.filter((i) => i.projectType === 0),
      },
      {
        title: "Accepted Projects",
        data: acceptedData?.filter((i) => i.projectType === 0),
      },
      {
        title: "Pending Requests",
        data: pendingRequest?.filter((i) => i.projectType === 0),
      },
      {
        title: "More Info Requests",
        data: moreInfoRequest?.filter((i) => i.projectType === 0),
      },
    ],
    "goal-projects": [
      {
        title: "Created Projects",
        data: createData?.filter((i) => i.projectType === 1),
      },
      {
        title: "Accepted Projects",
        data: acceptedData?.filter((i) => i.projectType === 1),
      },
      {
        title: "Pending Requests",
        data: pendingRequest?.filter((i) => i.projectType === 1),
      },
      {
        title: "More Info Requests",
        data: moreInfoRequest?.filter((i) => i.projectType === 1),
      },
    ],
  };

  const tablesToRender = tableData[value] || [];

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
        <CreateProject flag="add" />
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

export default ProjectIndex;
