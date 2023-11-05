import { Box, Grid } from "@mui/material";
import React from "react";
import CustomSearchField from "./CustomSearchField";
import { useNavigate } from "react-router-dom";
import CustomCard from "./CustomCard";

const GridSection = () => {
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate("/goal-overview");
  };
  const data = [1, 2, 3, 4];
  return (
    <Box sx={{ flexGrow: 1 }} mb={2}>
      <Grid container>
        <Grid item xs={12} lg={9}></Grid>
        <Grid item xs={12} lg={3}>
          <CustomSearchField />
        </Grid>
      </Grid>
      <Grid container mt={2} spacing={2}>
        {data.map((item, index) => {
          return (
            <Grid item xs={12} lg={3} key={index}>
              <CustomCard handleClick={handleRedirect} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default GridSection;
