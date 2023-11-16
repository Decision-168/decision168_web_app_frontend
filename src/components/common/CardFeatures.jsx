import { Button, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function CardFeatures({ items }) {
  const navigate = useNavigate();
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
              onClick={() => navigate(item.link)}
            >
              {item.label}
            </Typography>
          </Stack>
        </Grid>
      ))}
    </Grid>
  );
}
