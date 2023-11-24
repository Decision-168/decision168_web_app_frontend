//necessary imports
import React from "react";
import { Box, Grid } from "@mui/material";
import PortfolioCard from "./PortfolioCard";
// Sample data for portfolio cards
const data = [
  {
    name: "Owais",
    company: "Decision168 Inc",
    image:
      "https://dev.decision168.com/assets/portfolio_photos/1635209286_Decision_168_icon.png",
  },
  {
    name: "Jameel",
    company: "Decision168 Inc",
    image:
      "https://dev.decision168.com/assets/portfolio_photos/1635209286_Decision_168_icon.png",
  },
  {
    name: "Alim",
    company: "Decision168 Inc",
    image:
      "https://dev.decision168.com/assets/portfolio_photos/1635209286_Decision_168_icon.png",
  },
  {
    name: "Zaheer",
    company: "Decision168 Inc",
    image:
      "https://dev.decision168.com/assets/portfolio_photos/1635209286_Decision_168_icon.png",
  },
  {
    name: "Owais",
    company: "Decision168 Inc",
    image:
      "https://dev.decision168.com/assets/portfolio_photos/1635209286_Decision_168_icon.png",
  },
  {
    name: "Jameel",
    company: "Decision168 Inc",
    image:
      "https://dev.decision168.com/assets/portfolio_photos/1635209286_Decision_168_icon.png",
  },
  {
    name: "Alim",
    company: "Decision168 Inc",
    image:
      "https://dev.decision168.com/assets/portfolio_photos/1635209286_Decision_168_icon.png",
  },
  {
    name: "Zaheer",
    company: "Decision168 Inc",
    image:
      "https://dev.decision168.com/assets/portfolio_photos/1635209286_Decision_168_icon.png",
  },
];
// Define the main component - PortfolioCardView
const PortfolioCardView = () => {
  // Render the component
  return (
    <Box sx={{ flexGrow: 1 }} mb={2}>
      {/* Create a grid container for displaying portfolio cards */}
      <Grid container mt={2} spacing={2}>
        {/* Map through the data array to create individual PortfolioCard components */}
        {data.map((item, index) => {
          return (
            // Each PortfolioCard is placed in a Grid item
            <Grid item xs={12} lg={3} key={index}>
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
export default PortfolioCardView;
