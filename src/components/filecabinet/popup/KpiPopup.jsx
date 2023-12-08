import { Avatar, Box, Grid, IconButton, Tooltip, Typography, useTheme } from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import { BusinessCenter, CalendarMonth, Delete, Person } from "@mui/icons-material";
import ArchiveIcon from '@mui/icons-material/Archive';
import GridList from "../../GoalsAndStrategies/subComponents/GridList";
import ProgressBar from "../subComponents/ProgressBar";
import { stringAvatar } from "../../../helpers/stringAvatar";
import { getDepartmentData, getKPIData, getKpiProjectData, getUserData } from "../../../api/modules/FileCabinetModule";
import { closeCnfModal, openCnfModal } from "../../../redux/action/confirmationModalSlice";
import { useDispatch } from "react-redux";
import ConfirmationDialog from "../../common/ConfirmationDialog";
import { toast } from "react-toastify";
import { patchArchiveKpi } from "../../../api/modules/ArchiveModule";
const KpiPopup = ({ nodes, regId, portfolioId, handleClose, fetchTreeData }) => {
  const [kpiData, setKpiData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [projectData, setProjectData] = useState([]);

  const [module, setModule] = useState(null);
  const dispatch = useDispatch();

  // KPI Data
  const fetchKPIData = async () => {
    try {
      const response = await getKPIData(nodes?.table_id);
      setKpiData(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchKPIData();
  }, [nodes]);

  const kpiStartDate = new Date(kpiData.screated_date);
  const formattedKpiStartDate = `${kpiStartDate.getDate()} ${kpiStartDate.toLocaleString('default', { month: 'short' })}, ${kpiStartDate.getFullYear()}`;

  // Department Data ----------------------------------------------
  const fetchDepartmentData = async () => {
    try {
      const response = await getDepartmentData(kpiData?.gdept_id);
      setDepartmentData(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDepartmentData();
  }, [kpiData]);

  const departmentName = departmentData?.department;

  // Creater (User) Data ----------------------------------------------
  const fetchUserData = async () => {
    try {
      const response = await getUserData(kpiData?.screated_by);
      setUserData(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [kpiData]);

  const userName = `${userData?.first_name} ${userData?.last_name}`;

  // KPI Project Data ----------------------------------------------
  const fetchKpiProjectData = async () => {
    try {
      const response = await getKpiProjectData(regId,kpiData?.sid,kpiData?.gdept_id,portfolioId);
      setProjectData(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchKpiProjectData();
  }, [kpiData]);

  // Archive
  const handleArchive = () => {
    setModule('archive');
    dispatch(
      openCnfModal({
        modalName: "archiveKpi",
        title: "Are you sure?",
        description: "You want to Archive!",
      })
    );
  };

  // Trash
  const handleDelete = () => {
    setModule('delete');
    dispatch(
      openCnfModal({
        modalName: "deleteKpi",
        title: "Are you sure?",
        description: "You want to Delete!",
      })
    );
  };

  const handleYes = async () => {
    if(module == 'archive') {
      try {
        const response = await patchArchiveKpi(kpiData?.sid, regId);
        fetchTreeData()
        dispatch(closeCnfModal({ modalName: 'archiveKpi' }));
        handleClose()
        toast.success(`${response.message}`);
      } catch (error) {
        dispatch(closeCnfModal({ modalName: 'archiveKpi' }));
        handleClose()
        toast.error(`${error.response.data?.error}`);
      };
    }else if(module == 'delete') {
      try {
        const response = await deleteKpi(kpiData?.sid, regId);
        fetchTreeData()
        dispatch(closeCnfModal({ modalName: 'deleteKpi' }));
        handleClose()
        toast.success(`${response.message}`);
      } catch (error) {
        dispatch(closeCnfModal({ modalName: 'deleteKpi' }));
        handleClose()
        toast.error(`${error.response?.error}`);
      };
    }
  };
  // -----------End -----------------------------------------

  const theme = useTheme();
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
        <Grid item xs={12} md={12} lg={12}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              flexDirection: "row",
            }}
          >
            <Avatar
              sx={{ bgcolor: theme.palette.primary.main, mr: 1 }}
              aria-label="KPI"
            >
              {...stringAvatar(nodes.name)}
            </Avatar>
            <Typography
              sx={{
                color: "#343a40",
                fontWeight: "900",
                fontSize: "16px",
              }}
              textAlign={"start"}
            >
              KPI: {nodes.name}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={12} lg={8}>
        </Grid>
        <Grid item xs={12} md={12} lg={4}>
          <Box
            sx={{
              display: "flex",
              alignItems: "bottom",
              justifyContent: "end",
              flexDirection: "row",
            }}
          >
            <Tooltip arrow title="Archive">
              <IconButton onClick={() => handleArchive()}>
                <ArchiveIcon sx={{ fontSize: "20px" }} />
              </IconButton>
            </Tooltip>
            <Tooltip arrow title="Delete">
              <IconButton onClick={() => handleDelete()}>
                <Delete sx={{ fontSize: "20px" }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Typography
            sx={{ fontSize: 14, color: "#212934", textAlign: "start" }}
          >
            Progress :
          </Typography>
          <ProgressBar />
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
            {nodes.description}
          </Typography>
        </Grid>
        <Grid item xs={4} md={4} lg={4}>
          <GridList
            icon={<CalendarMonth sx={{ color: "#c7df19", fontSize: "14px" }} />}
            title={"Created Date"}
            info={formattedKpiStartDate}
          />
        </Grid>
        <Grid item xs={4} md={4} lg={4}>
          <GridList
            icon={
              <BusinessCenter sx={{ color: "#c7df19", fontSize: "14px" }} />
            }
            title={"Department"}
            info={departmentName}
          />
        </Grid>
        <Grid item xs={4} md={4} lg={4}>
          <GridList
            icon={<Person sx={{ color: "#c7df19", fontSize: "14px" }} />}
            title={"Created By"}
            info={userName}
          />
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Typography
            sx={{
              color: "#495057",
              fontSize: 15,
              fontWeight: "600",
              ml: 0.5,
              textAlign: "left",
            }}
          >
            Projects
          </Typography>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          {projectData.map((item, index) => {
            return (
              <Grid
                container
                key={index}
                p={1}
                sx={{ borderBottom: "1px solid #f5f5f5" }}
              >
                <Grid item xs={7} md={7} lg={7} textAlign={"left"}>
                  <Typography
                    sx={{
                      fontSize: 13,
                      display: "inline",
                      fontWeight: "700",
                      textAlign: "left",
                    }}
                  >
                    PROJECT:
                    <Typography
                      sx={{
                        fontSize: 13,
                        mx: 1,

                        display: "inline",
                      }}
                    >
                      {item.pname}
                    </Typography>
                  </Typography>
                </Grid>
                <Grid xs={5} alignSelf={"center"}>
                  <ProgressBar />
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
      <ConfirmationDialog value={"archiveKpi"} handleYes={handleYes} />
      <ConfirmationDialog value={"deleteKpi"} handleYes={handleYes} />
    </Box>
  );
};
export default memo(KpiPopup);
