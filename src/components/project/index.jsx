import {
  Box,
  Grid,
  Button,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useState, useCallback } from "react";
import { FormatListBulleted, GridView, Add } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import BasicBreadcrumbs from "../common/BasicBreadcrumbs";
import RadioSection from "../common/RadioSection";

const ProjectIndex = () => {
  const [alignment, setAlignment] = useState("list");
  const [value, setValue] = useState("all");
  const handleChangeSwitch = useCallback((event, newAlignment) => {
    setAlignment(newAlignment);
  }, []);
  const handleChangeRadio = useCallback((event) => {
    setValue(event.target.value);
  }, []);

  const data = [
    {
      value: "all",
      label: "All",
    },
    {
      value: "created",
      label: "Created",
    },
    {
      value: "accepted",
      label: "Accepted",
    },
    {
      value: "pending",
      label: "Pending",
    },
    {
      value: "more-info-requests",
      label: "More Info Requests",
    },
    {
      value: "regular-projects",
      label: "Regular Projects",
    },
    {
      value: "goal-projects",
      label: "Goal Projects",
    },
  ];

  return (
    <Box sx={{ flexGrow: 1 }} mb={2}>
      <Grid container>
        <Grid item xs={5} lg={3}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <BasicBreadcrumbs currentPage="PROJECTS" />
            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              onChange={handleChangeSwitch}
              aria-label="Platform"
            >
              <ToggleButton value="list">
                <FormatListBulleted sx={{ fontSize: 14 }} />
              </ToggleButton>
              <ToggleButton value="grid">
                <GridView sx={{ fontSize: 14 }} />
              </ToggleButton>
            </ToggleButtonGroup>
            <Button
              variant="contained"
              startIcon={<Add fontSize="small" />}
              size="small"
              sx={{ fontSize: 12 }}
            >
              Create New
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} lg={9} alignSelf={"center"}>
          <RadioSection
            value={value}
            handleChange={handleChangeRadio}
            data={data}
          />
        </Grid>
        {/* <Grid item xs={12}>
          {alignment === "list" ? (
            <ListSection handleGoalOpen={handleGoalOpen} value={value} />
          ) : (
            <GridSection handleGoalOpen={handleGoalOpen} />
          )}
        </Grid> */}
      </Grid>
    </Box>
  );
};

export default ProjectIndex;
