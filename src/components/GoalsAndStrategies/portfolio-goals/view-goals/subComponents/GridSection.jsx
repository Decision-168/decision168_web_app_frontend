import { Box, Grid } from "@mui/material";
import React, { memo } from "react";
import CustomCard from "./CustomCard";

const GridSection = ({ handleGoalOpen, handlePendingGoalOpen, filterData }) => {
  return (
    <Box sx={{ flexGrow: 1 }} mb={2}>
      <Grid container mt={2} spacing={2}>
        {filterData?.map((item, index) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <CustomCard
                value={item?.type}
                item={item}
                handleOpen={handleGoalOpen}
                handlePendingGoalOpen={handlePendingGoalOpen}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default memo(GridSection);
