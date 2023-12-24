//necessary imports
import { Add, FormatListBulleted, GridView } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import BasicBreadcrumbs from "../../common/BasicBreadcrumbs";
import { useNavigate } from "react-router-dom";
import CustomSearchField from "../../common/CustomSearchField";
import PortfolioListView from "./subComponents/views/PortfolioListView";
import PortfolioCardView from "./subComponents/views/PortfolioCardView";
import { SearchWithFuse } from "../../../helpers/SearchWithFuse";
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
    name: "Arshad",
    company: "Decision168 Inc",
    image:
      "https://dev.decision168.com/assets/portfolio_photos/1635209286_Decision_168_icon.png",
  },
];
// Define the AllPortfolios component
const AllPortfolios = () => {
  // State to manage the view alignment (list or grid)
  const [alignment, setAlignment] = useState("list");
  // React Router hook for navigation
  const navigate = useNavigate();
  // Callback function to handle view alignment changes
  const handleChangeSwitch = useCallback((event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  }, []);
  // Check if the alignment is set to "list"
  const align = alignment === "list";
  // Render the component

  const [query, setQuery] = useState("");
  const newResults = SearchWithFuse(["name", "company"], query, data);

  return (
    <Box sx={{ flexGrow: 1 }} mb={2}>
      {/* Container for the header and portfolio view switch */}
      <Grid container alignItems="center" justifyContent="space-between">
        {/* Section for Breadcrumbs, View Toggle Buttons, and Create New Button */}
        <Grid item xs={12} sm={6} md={8} lg={9}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              flexDirection: "row",
            }}
          >
            {/* Breadcrumbs for navigation */}
            <BasicBreadcrumbs currentPage="PORTFOLIO" />
            {/* Toggle buttons to switch between list and grid views */}
            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              onChange={handleChangeSwitch}
              aria-label="Platform"
              sx={{ mx: 1 }}
            >
              {/* Button for List View */}
              <ToggleButton value="list">
                <FormatListBulleted sx={{ fontSize: 14 }} />
              </ToggleButton>
              {/* Button for Grid View */}

              <ToggleButton value="grid">
                <GridView sx={{ fontSize: 14 }} />
              </ToggleButton>
            </ToggleButtonGroup>
            {/* Button to navigate and create a new portfolio */}
            <Button
              variant="contained"
              startIcon={<Add fontSize="small" />}
              size="small"
              sx={{ fontSize: 12 }}
              onClick={() => navigate("/portfolio-create")}
            >
              Create New
            </Button>
          </Box>
        </Grid>
        {/* Section for Search Field (only visible in grid view) */}
        {!align && (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomSearchField query={query} setQuery={setQuery} />
          </Grid>
        )}
        {/* Section for rendering either List or Grid View based on alignment */}
        <Grid item xs={12}>
          {/* Conditional rendering based on the alignment */}
          {align ? (
            <PortfolioListView />
          ) : (
            <PortfolioCardView newResults={newResults} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};
// Export the AllPortfolios component
export default AllPortfolios;
