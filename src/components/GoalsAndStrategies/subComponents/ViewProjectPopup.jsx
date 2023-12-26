import { Box, Grid, Typography, useTheme } from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import {
  Add,
  CalendarMonth,
  Edit,
  FolderOpenOutlined,
  KeyboardDoubleArrowRight,
  Person,
  Visibility,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import {
  closeCnfModal,
  openCnfModal,
} from "../../../redux/action/confirmationModalSlice";
import { openModal } from "../../../redux/action/modalSlice";
import ConfirmationDialog from "../../common/ConfirmationDialog";
import { Link, useNavigate } from "react-router-dom";
import ReduxDialog from "../../common/ReduxDialog";
import DuplicateProject from "../kpi-overview/project-section/DuplicateProject";
import OverallHistory from "./history-section/OverallHistory";
import GridList from "./GridList";
import TitleWithActions from "./TitleWithActions";
import { description2 } from "./style-functions";
import CreateProject from "../../project/Dialogs/CreateProject";
import CreateEditTaskForm from "../../Tasks/createEditTask/CreateEditTaskForm";
import {
  fileItProject,
  getProjectDetail,
  getViewHistoryDateProject,
} from "../../../api/modules/ProjectModule";
import { getUserData } from "../../../api/modules/FileCabinetModule";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../redux/action/userSlice";
import { patchDeleteProject } from "../../../api/modules/TrashModule";
const ViewProjectPopup = ({
  pid,
  refreshData,
  handleClose,
  projectTitleType,
}) => {
  const user = useSelector(selectUserDetails);
  const userID = user?.reg_id;
  const storedPorfolioId = JSON.parse(localStorage.getItem("portfolioId"));

  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [projectData, setProjectData] = useState([]);
  const [projectDel, setProjectDel] = useState([]);
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);

  useEffect(() => {
    const pathName = window.location.pathname;
    const pathSegments = pathName.split("/");
    const indexSecondLast = pathSegments.length - 2;
    const secondLastParameter =
      indexSecondLast >= 0 ? pathSegments[indexSecondLast] : "";
    setCurrentPage(secondLastParameter);
  }, []);

  const fetchProjectData = async () => {
    try {
      const response = await getProjectDetail(pid);
      setProjectData(response);
      setProjectDel(response.project);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProjectData();
  }, [pid]);
  const projectName = projectDel?.pname;
  const projectDescription = projectDel?.pdes;
  const AllTaskCount = projectData?.allTaskCount;
  const DoneTaskCount = projectData?.doneTaskCount;
  const links = projectDel?.plink;
  const link_comments = projectDel?.plink_comment;
  const projectStartDate = new Date(projectDel?.pcreated_date);
  const formattedProjectStartDate = `${projectStartDate.getDate()} ${projectStartDate.toLocaleString(
    "default",
    { month: "short" }
  )}, ${projectStartDate.getFullYear()}`;
  const projectType = projectDel?.ptype;

  // Creater (User) Data ----------------------------------------------
  const fetchUserData = async () => {
    try {
      const response = await getUserData(projectDel?.pcreated_by);
      setUserData(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [projectData]);

  const userName = `${userData?.first_name} ${userData?.last_name}`;

  const [history, setHistory] = useState([]);
  const fetchAllHistoryData = async () => {
    try {
      const response = await getViewHistoryDateProject(pid);
      setHistory(response.history_dates);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllHistoryData();
  }, [pid]);

  const handleFileIt = () => {
    dispatch(
      openCnfModal({
        modalName: "fileItProject",
        title: "Are you sure?",
        description: "You want to File it!",
      })
    );
  };
  const handleDelete = () => {
    dispatch(
      openCnfModal({
        modalName: "deleteProject",
        title: "Are you sure?",
        description: "You want to Delete!",
      })
    );
  };

  const handleFileItYes = async () => {
    try {
      const response = await fileItProject(pid, userID);
      dispatch(closeCnfModal({ modalName: "fileItProject" }));
      refreshData();
      toast.success(`${response.message}`);

      if (currentPage == "projects-overview") {
        navigate(-1);
      } else {
        handleClose();
      }
    } catch (error) {
      dispatch(closeCnfModal({ modalName: "fileItProject" }));
      console.log(error);
      toast.error(`${error.response?.data?.error}`);
    }
  };

  const handleDeleteYes = async () => {
    try {
      const response = await patchDeleteProject(pid, userID);
      dispatch(closeCnfModal({ modalName: "deleteProject" }));
      refreshData();
      toast.success(`${response.message}`);

      if (currentPage == "projects-overview") {
        navigate(-1);
      } else {
        handleClose();
      }
    } catch (error) {
      dispatch(closeCnfModal({ modalName: "deleteProject" }));
      console.log(error);
      toast.error(`${error.response?.data?.error}`);
    }
  };

  const handleDuplicate = () => {
    dispatch(openModal("duplicate-project"));
  };

  const handleViewHistory = () => {
    dispatch(openModal("view-project-history"));
  };
  const handleEditProject = () => {
    dispatch(openModal("edit-project"));
  };
  const handleAddTask = () => {
    dispatch(openModal("create-new-task"));
  };
  const handleViewAllTask = () => {
    navigate("/project-tasks-list");
  };

  //Check Button Visibility
  const [AccdisplayBtns, setAccdisplayBtns] = useState("no");

  useEffect(() => {
    const DisplayAccordionActions = async () => {
      try {
        if (projectDel.pcreated_by == userID) {
          setAccdisplayBtns("all");
        } else if (
          projectDel.get_portfolio_createdby_id == userID ||
          projectDel.pmanager == userID
        ) {
          setAccdisplayBtns("some");
        } else {
          setAccdisplayBtns("no");
        }
      } catch (error) {
        console.error(error);
        setAccdisplayBtns("no");
      }
    };

    DisplayAccordionActions();
  }, [projectDel, userID]);

  const CommonLinks = ({ link, linkName }) => {
    return (
      <>
        <Grid item xs={6}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "start",
            }}
          >
            <KeyboardDoubleArrowRight
              sx={{ color: "#c7df19", fontSize: 15, mr: 1 }}
            />
            <Typography
              sx={{ fontSize: 13, cursor: "pointer", color: "#212934" }}
              component={Link}
              to={link}
            >
              {link}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6} textAlign={"initial"}>
          <Typography
            sx={{
              fontSize: 13,
            }}
          >
            {linkName}
          </Typography>
        </Grid>
      </>
    );
  };
  return (
    <Box
      sx={{
        flexGrow: 1,
        width: "100%",
        background: "white",
        p: 2,
        borderRadius: 1,
      }}
      mb={2}
    >
      <Grid container spacing={2}>
        {
          projectDel?.portfolio_id != storedPorfolioId && (
            <Typography sx={{
              color: "red", fontSize: 14, textAlign: "left", ml:1, fontWeight: 500
            }}>Different Portfolio is Selected!</Typography>
          )
        }  
        <TitleWithActions
          title={`Project: ${projectName}`}
          handleClick1={handleEditProject}
          handleClick2={handleAddTask}
          handleClick3={handleViewAllTask}
          handleDelete={handleDelete}
          handleDuplicate={handleDuplicate}
          handleFileIt={handleFileIt}
          handleViewHistory={handleViewHistory}
          btn1Text={"Edit Project"}
          btn2Text={"Add Task"}
          btn3Text={"View All Tasks"}
          btn1Icon={<Edit />}
          btn2Icon={<Add />}
          btn3Icon={<Visibility />}
          description={projectDescription}
          taskCount={AllTaskCount}
          progressHeading={`Status :- Done: ${DoneTaskCount} Total: ${AllTaskCount}`}
          progressPercentage={projectData?.taskProgress}
          displayBtns={AccdisplayBtns}
        />
        <Grid item xs={12} md={12} lg={12}>
          <Typography sx={{ fontSize: 13, textAlign: "left" }}>
            Links & Comments :
          </Typography>
        </Grid>
        <Grid item xs={12} md={12} lg={12} mb={2}>
          <Grid container spacing={2}>
            {links &&
              links
                .split(",")
                .map((link, index) => (
                  <CommonLinks
                    key={index}
                    link={link}
                    linkName={
                      link_comments.split(",")[index] &&
                      link_comments.split(",")[index]
                    }
                  />
                ))}
          </Grid>
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={3}>
          <GridList
            icon={<CalendarMonth sx={{ color: "#c7df19", fontSize: "14px" }} />}
            title={"Created Date"}
            info={formattedProjectStartDate}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={3}>
          <GridList
            icon={<Person sx={{ color: "#c7df19", fontSize: "14px" }} />}
            title={"Created By"}
            info={userName}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={3}>
          <GridList
            icon={
              <FolderOpenOutlined sx={{ color: "#c7df19", fontSize: "14px" }} />
            }
            title={"Type"}
            info={
              projectType === "content"
                ? "Content"
                : projectType === "goal_strategy"
                ? "Goals & Strategies"
                : "Project"
            }
          />
        </Grid>
      </Grid>
      <ConfirmationDialog value={"fileItProject"} handleYes={handleFileItYes} />
      <ConfirmationDialog value={"deleteProject"} handleYes={handleDeleteYes} />
      <ReduxDialog
        value="duplicate-project"
        modalTitle="Copy Project"
        showModalButton={false}
        modalSize="sm"
      >
        <DuplicateProject projectData={projectData} />
      </ReduxDialog>

      <ReduxDialog
        value="view-project-history"
        modalTitle="HISTORY"
        showModalButton={false}
        modalSize="md"
      >
        <OverallHistory
          allHist={history}
          name={projectName}
          type={"project"}
          id={pid}
        />
      </ReduxDialog>
      <ReduxDialog
        value="edit-project"
        modalTitle="Edit Project"
        showModalButton={false}
        modalSize="md"
      >
        <CreateProject
          flag="edit"
          gid={projectDel?.gid}
          sid={projectDel?.sid}
          passPID={pid}
          refreshData={fetchProjectData}
        />
      </ReduxDialog>
      <ReduxDialog
        value="create-new-task"
        modalTitle="Create New Task"
        showModalButton={false}
        modalSize="md"
      >
        <CreateEditTaskForm editMode={false} />
      </ReduxDialog>
    </Box>
  );
};

export default memo(ViewProjectPopup);
