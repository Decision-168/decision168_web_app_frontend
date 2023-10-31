import { Grid, Typography } from "@mui/material";
import React from "react";



export default function CardFeatures({items}) {
  return (
    <Grid container>
      {items.map((item, index) => (
        <Grid item xs={6} sm={3} p={2} key={index}>
          <Typography variant="caption" display="block" textAlign="left" gutterBottom>
            {item.count}
          </Typography>
          <Typography variant="subtitle2" textAlign="left">
            {item.label}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
}
