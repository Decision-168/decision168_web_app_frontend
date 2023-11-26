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

// Define the AllPortfolios component
const AllPortfolios = () => {
  // State to manage the view alignment (list or grid)
  const [alignment, setAlignment] = useState("list");
  // React Router hook for navigation
  const navigate = useNavigate();
  // Callback function to handle view alignment changes
  const handleChangeSwitch = useCallback((event, newAlignment) => {
    setAlignment(newAlignment);
  }, []);
  // Check if the alignment is set to "list"
  const align = alignment === "list";
  // Render the component
  return (
    <Box sx={{ flexGrow: 1 }} mb={2}>
      {/* Container for the header and portfolio view switch */}
      <Grid container alignItems="center" justifyContent="space-between">
        {/* Section for Breadcrumbs, View Toggle Buttons, and Create New Button */}
        <Grid item xs={8} sm={8} md={4} lg={4}>
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
          <Grid item xs={8} sm={3} md={3} lg={3}>
            <CustomSearchField />
          </Grid>
        )}
        {/* Section for rendering either List or Grid View based on alignment */}
        <Grid item xs={12}>
          {/* Conditional rendering based on the alignment */}
          {align ? <PortfolioListView /> : <PortfolioCardView />}
        </Grid>
      </Grid>
    </Box>
  );
};
// Export the AllPortfolios component
export default AllPortfolios;
