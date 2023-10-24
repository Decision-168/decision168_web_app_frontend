import { Chip, Grid, Avatar } from "@mui/material";
import React from "react";

const items = [
  {
    count: 1,
    label: "Portfolio",
  },
  {
    count: 8,
    label: "Projects",
  },
  {
    count: 0,
    label: "Planned Content",
  },
  {
    count: 1,
    label: "Tasks",
  },
];

export default function Chips() {
  return (
    <Grid container justifyContent="center">
      {items.map((item, index) => (
        <Grid item key={index} p={1}>
          <Chip avatar={<Avatar>{item.count}</Avatar>} label={item.label} />
        </Grid>
      ))}
    </Grid>
  );
}
