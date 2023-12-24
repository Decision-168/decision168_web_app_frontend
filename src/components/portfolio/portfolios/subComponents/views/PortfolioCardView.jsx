//necessary imports
import React, { memo } from "react";
import { Box, Grid } from "@mui/material";
import PortfolioCard from "./PortfolioCard";
// Sample data for portfolio cards

// Define the main component - PortfolioCardView
const PortfolioCardView = ({ newResults }) => {
  // Render the component
  return (
    <Box sx={{ flexGrow: 1 }} mb={2}>
      {/* Create a grid container for displaying portfolio cards */}
      <Grid container mt={2} spacing={2}>
        {/* Map through the data array to create individual PortfolioCard components */}
        {newResults.map((item, index) => {
          return (
            // Each PortfolioCard is placed in a Grid item
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              {/* Render the PortfolioCard component with the corresponding data */}
              <PortfolioCard item={item} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};
// Export the PortfolioCardView component
export default memo(PortfolioCardView);
