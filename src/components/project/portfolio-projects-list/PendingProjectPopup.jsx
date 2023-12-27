import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import {
  BusinessCenter,
  CalendarMonth,
  CheckCircleOutline,
  FolderOpenOutlined,
  Person,
} from "@mui/icons-material";
import GridList from "../../GoalsAndStrategies/subComponents/GridList";
import {
  getProjectDetail,
  getProjectMemberData,
  patchProjectRequest,
} from "../../../api/modules/ProjectModule";
import { getUserData } from "../../../api/modules/FileCabinetModule";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../redux/action/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const PendingProjectPopup = ({ pid, refreshData, handleClose }) => {
  const user = useSelector(selectUserDetails);
  const userID = user?.reg_id;

  const theme = useTheme();
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [pmId, setPmId] = useState(null);
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
    } catch (error) {}
  };

  useEffect(() => {
    fetchProjectData();
  }, [pid]);
  const projectDetail = projectData?.project;
  const projectName = projectDetail?.pname;
  const projectDescription = projectDetail?.pdes;
  const AllTaskCount = projectData?.allTaskCount;
  const DoneTaskCount = projectData?.doneTaskCount;
  const links = projectDetail?.plink;
  const link_comments = projectDetail?.plink_comment;
  const projectStartDate = new Date(projectDetail?.pcreated_date);
  const formattedProjectStartDate = `${projectStartDate.getDate()} ${projectStartDate.toLocaleString(
    "default",
    { month: "short" }
  )}, ${projectStartDate.getFullYear()}`;
  const projectType = projectDetail?.ptype;

  // Creater (User) Data ----------------------------------------------
  const fetchUserData = async () => {
    try {
      const response = await getUserData(projectDetail?.pcreated_by);
      setUserData(response);
    } catch (error) {}
  };

  useEffect(() => {
    fetchUserData();
  }, [projectData]);
  const userName = `${userData?.first_name} ${userData?.last_name}`;

  const fetchProjectMemberData = async () => {
    try {
      const response = await getProjectMemberData(pid, userID);
      setPmId(response.pm_id);
    } catch (error) {}
  };

  useEffect(() => {
    fetchProjectMemberData();
  }, [pid, userID]);

  const handleProjectRequest = async (flag) => {
    try {
      const response = await patchProjectRequest(pid, pmId, flag);
      refreshData();
      if (response.user_status == "accepted") {
        toast.success("Request Accepted Successfully");
      } else if (response.user_status == "read_more") {
        toast.success("Request marked as Read More");
      }

      if (currentPage == "projects-overview-request") {
        navigate(-1);
      } else {
        handleClose();
      }
    } catch (error) {
      if (error.response.data.user_status == "accepted") {
        toast.error("Request Accepted Successfully");
      } else if (error.response.data.user_status == "read_more") {
        toast.error("Request marked as Read More");
      }
    }
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
        <Grid item xs={6} md={6} lg={6} alignSelf={"center"}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              flexDirection: "row",
            }}
          >
            <CheckCircleOutline
              sx={{ color: "#008E00", mr: 1, fontSize: 40 }}
            />
            <Typography
              sx={{
                color: "#343a40",
                fontWeight: "900",
                fontSize: "16px",
              }}
              textAlign={"start"}
            >
              PROJECT: {projectName}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6} md={6} lg={6} alignSelf={"center"}>
          <Button
            variant="contained"
            size="small"
            sx={{ mr: 1 }}
            onClick={() => handleProjectRequest(1)}
          >
            Accept Request
          </Button>
          <Button
            variant="contained"
            size="small"
            sx={{ background: "#383838", color: "#fff" }}
            onClick={() => handleProjectRequest(2)}
          >
            Request More Info
          </Button>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Typography
            sx={{ fontSize: 14, color: "#212934", textAlign: "start" }}
          >
            Description :
          </Typography>
          <Typography
            sx={{
              color: "#74788d",
              whiteSpace: "pre-wrap",
              textAlign: "start",
              p: 1,
              fontSize: 13,
            }}
          >
            {projectDescription}
          </Typography>
        </Grid>
        <Grid item xs={3} md={3} lg={3}>
          <GridList
            icon={<CalendarMonth sx={{ color: "#c7df19", fontSize: "14px" }} />}
            title={"Created Date"}
            info={formattedProjectStartDate}
          />
        </Grid>
        <Grid item xs={3} md={3} lg={3}>
          <GridList
            icon={<Person sx={{ color: "#c7df19", fontSize: "14px" }} />}
            title={"Created By"}
            info={userName}
          />
        </Grid>
        <Grid item xs={3} md={3} lg={3}>
          <GridList
            icon={
              <FolderOpenOutlined sx={{ color: "#c7df19", fontSize: "14px" }} />
            }
            title={"Type"}
            info={projectType}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
export default memo(PendingProjectPopup);
