//necessary imports
import { Add, FormatListBulleted, GridView } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import BasicBreadcrumbs from "../../common/BasicBreadcrumbs";
import { useNavigate } from "react-router-dom";
import CustomSearchField from "../../common/CustomSearchField";
import PortfolioListView from "./subComponents/views/PortfolioListView";
import PortfolioCardView from "./subComponents/views/PortfolioCardView";
import { SearchWithFuse } from "../../../helpers/SearchWithFuse";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../redux/action/userSlice";
import { allPortfolios } from "../../../api/modules/porfolioModule";
// Define the AllPortfolios component
const AllPortfolios = () => {
  const user = useSelector(selectUserDetails);
  const storedPortfolioId = JSON.parse(localStorage.getItem("portfolioId"));
  const [portfolioData, setPortfolioData] = useState([]);
  const userID = user?.reg_id;
  const userEmail = user?.email_address;

  const fetchPortfolioData = async () => {
    try {
      const response = await allPortfolios(userEmail, userID);
      setPortfolioData(response.portfolioGrid);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPortfolioData();
  }, [userEmail]);

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
    const newResults = SearchWithFuse(["name", "company"], query, portfolioData);

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
