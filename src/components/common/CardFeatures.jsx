import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { selectUserDetails } from "../../redux/action/userSlice";
import { useSelector } from "react-redux";
import { Grid, Stack, Typography } from "@mui/material";
import { getAllCounts } from "../../api/modules/dashboardModule";

export default function CardFeatures() {
  const navigate = useNavigate();
  const user = useSelector(selectUserDetails);
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState({});

  useEffect(() => {
    const allCounts = async () => {
      try {
        const email = user?.email_address;
        const id = user?.reg_id;
        const response = await getAllCounts(email, id);
        setCounts(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    allCounts();
  }, [user?.email_address, user?.reg_id]);

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
          <Stack alignItems="flex-start" flexDirection={"column"}>
            <Typography variant="caption" textAlign={"left"} display="block" gutterBottom>
              {item.count}
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
              onClick={() => navigate(item.link)}>
              {item.label}
            </Typography>
          </Stack>
        </Grid>
      ))}
    </Grid>
  );
}
