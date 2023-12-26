import React, { useState, useEffect } from "react";
import { Grid, Stack, Typography } from "@mui/material";
import { getAllCounts } from "../../api/modules/dashboardModule";

export default function CardFeaturesTeam({ memberID, memberEmail }) {
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState({});

  useEffect(() => {
    const allCounts = async () => {
      try {
        const email = memberEmail;
        const id = memberID;
        const response = await getAllCounts(email, id);
        setCounts(response);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    allCounts();
  }, [memberEmail, memberID]);

  const items = [
    {
      count: counts?.portfolioResult,
      label: "Portfolio",
    },
    {
      count: counts?.projectResult,
      label: "Projects",
    },
    {
      count: counts?.tasksResult,
      label: "Tasks",
    },
  ];

  return (
    <Grid container>
      {items.map((item, index) => (
        <Grid item xs={6} sm={3} p={2} key={index}>
          <Stack alignItems="flex-start" flexDirection={"column"}>
            <Typography
              variant="caption"
              textAlign={"left"}
              display="block"
              gutterBottom
            >
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
            >
              {item.label}
            </Typography>
          </Stack>
        </Grid>
      ))}
    </Grid>
  );
}
