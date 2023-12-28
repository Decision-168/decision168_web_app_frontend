import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { selectUserDetails } from "../../redux/action/userSlice";
import { useSelector } from "react-redux";
import { Grid, Skeleton, Stack, Typography } from "@mui/material";
import { getAllCounts } from "../../api/modules/dashboardModule";

export default function CardFeatures() {
  const navigate = useNavigate();
  const user = useSelector(selectUserDetails);
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState({});

  const fetchAllCounts = useCallback(async (email, id) => {
    try {
      // Check if both email and id are valid before making the API call
      if (email && id) {
        const response = await getAllCounts(email, id);
        setCounts(response);
      }
    } catch (error) {
      // Handle error as needed
    } finally {
      setLoading(false);
    }
  }, [setCounts, getAllCounts]);
  
  useEffect(() => {
    const email = user?.email_address;
    const id = user?.reg_id;
    if (email && id) {
      fetchAllCounts(email, id);
    }
  }, [fetchAllCounts, user]);
  

  const items = [
    {
      count: counts?.portfolioResult,
      label: "Portfolio",
      link: "/portfolio",
    },
    {
      count: counts?.projectResult,
      label: "Projects",
      link: "/projects-list",
    },
    {
      count: counts?.tasksResult,
      label: "Tasks",
      link: "/all-tasks",
    },
  ];

  return (
    <Grid container>
      {items.map((item, index) => (
        <Grid item xs={6} sm={3} p={2} key={index}>
          <Stack alignItems="center" justifyContent={"center"} flexDirection={"column"}>
            <Typography
              variant="caption"
              textAlign={"center"}
              display="block"
              gutterBottom
            >
              {item?.count ? item.count : <Skeleton variant="circular" width={30} height={30} animation="wave"/>  }
            </Typography>
            <Typography
              variant="text"
              sx={{
                cursor: "pointer",
                fontSize: 15,
                color: "#343a40",
                fontWeight: "900",
                ":hover": {
                  color: "#c7df19",
                },
              }}
              onClick={() => navigate(item.link)}
            >
              {item?.label ? item?.label : <Skeleton variant="rounded" width={100} height={20} animation="wave"/> }
            </Typography>
          </Stack>
        </Grid>
      ))}
    </Grid>
  );
}
