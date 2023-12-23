import { Box, Button, Grid, Typography } from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import {
  BusinessCenter,
  CalendarMonth,
  CheckCircleOutline,
  Person,
} from "@mui/icons-material";
import GridList from "./GridList";
import {
  checkPortfolioMemberActive,
  getGoalMemberDetailbyGID,
  getGoalOverviewRequest,
  getGoalRequest,
} from "../../../api/modules/goalkpiModule";
import moment from "moment";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../redux/action/userSlice";

const PendingPopup = ({ goalID, id, handleClose, fetchAllData }) => {
  const gid = goalID;

  //get user id
  const user = useSelector(selectUserDetails);
  const user_id = user?.reg_id;
  const user_email = user?.email_address;
  //get user id

  const storedPorfolioId = JSON.parse(localStorage.getItem("portfolioId"));

  const [gmid, set_gmid] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkMemberToDisplay = async () => {
      try {
        const response = await checkPortfolioMemberActive(
          user_email,
          storedPorfolioId
        );
        if (response) {
          const response2 = await getGoalMemberDetailbyGID(user_id, gid);
          if (response2) {
            set_gmid(response2.gmid);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkMemberToDisplay();
  }, [user_id, gid]);

  const formatDate = (timestamp) => {
    // Check if the timestamp is valid
    if (!timestamp) {
      return "No Date";
    }

    // Assuming your timestamp is in milliseconds
    const formattedDate = moment(timestamp).format("D MMM, YYYY");
    return formattedDate;
  };

  //get goal detail
  const [gdetail, setgdetail] = useState([]);

  useEffect(() => {
    const fetchOverviewReqData = async () => {
      try {
        const response = await getGoalOverviewRequest(user_id, gid);

        setgdetail(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOverviewReqData();
  }, [user_id, gid]);
  //get goal detail

  const handleRequestPerform = (flag) => {
    const RequestPerformAction = async () => {
      try {
        const response = await getGoalRequest(gid, gmid, flag);
        if (response?.user_status === "pages-404") {
          return navigate("/portfolio-goals", { replace: true });
        }
        if (response?.user_status === "accepted") {
          toast.success("Goal Request Successfully Accepted!");
        } else {
          toast.success("Read More Goal Request Sent!");
        }
        if (["/portfolio-goals"].includes(window.location.pathname)) {
          handleClose();
        } else {
          navigate("/portfolio-goals");
        }
        fetchAllData();
      } catch (error) {
        toast.error(`${error.response?.data?.error}`);
        console.error(error);
      }
    };

    RequestPerformAction();
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
        <Grid item xs={12} sm={6} md={6} lg={6} alignSelf={"center"}>
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
              GOAL: {gdetail.gname}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} alignSelf={"center"}>
          <Grid container spacing={1}>
            <Grid item xs={6} sm={6} md={6} lg={6}>
              <Button
                variant="contained"
                size="small"
                onClick={() => handleRequestPerform("1")}
              >
                Accept Request
              </Button>
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6}>
              <Button
                variant="contained"
                size="small"
                sx={{ background: "#383838", color: "#fff" }}
                onClick={() => handleRequestPerform("2")}
              >
                Request More Info
              </Button>
            </Grid>
          </Grid>
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
            {gdetail?.gdes ? gdetail?.gdes : "No Description!"}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={3}>
          <GridList
            icon={<CalendarMonth sx={{ color: "#c7df19", fontSize: "14px" }} />}
            title={"Start Date"}
            info={formatDate(gdetail.gstart_date)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={3}>
          <GridList
            icon={<CalendarMonth sx={{ color: "#c7df19", fontSize: "14px" }} />}
            title={"End Date"}
            info={formatDate(gdetail.gend_date)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={3}>
          <GridList
            icon={
              <BusinessCenter sx={{ color: "#c7df19", fontSize: "14px" }} />
            }
            title={"Department"}
            info={gdetail.get_dept_name}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={3}>
          <GridList
            icon={<Person sx={{ color: "#c7df19", fontSize: "14px" }} />}
            title={"Created By"}
            info={gdetail.get_created_by_name}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
export default memo(PendingPopup);
