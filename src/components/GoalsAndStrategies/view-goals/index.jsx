import { Box, Grid, Button } from "@mui/material";
import { memo, useState } from "react";
import BasicBreadcrumbs from "../../common/BasicBreadcrumbs";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { FormatListBulleted, GridView, Add } from "@mui/icons-material";
import ListSection from "./subComponents/ListSection";
import GridSection from "./subComponents/GridSection";
import RadioSection from "./subComponents/RadioSection";
import { useNavigate } from "react-router-dom";
const ViewGoalsIndex = () => {
  const [alignment, setAlignment] = useState("list");
  const navigate = useNavigate();
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <Box sx={{ flexGrow: 1 }} mb={2}>
      <Grid container>
        <Grid item xs={12} lg={3}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <BasicBreadcrumbs currentPage="GOALS" />
            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              onChange={handleChange}
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
              startIcon={<Add />}
              size="small"
              onClick={() => navigate("/goal-create")}
            >
              Create New
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} lg={9}>
          <RadioSection />
        </Grid>
        <Grid item xs={12}>
          {alignment === "list" ? <ListSection /> : <GridSection />}
        </Grid>
      </Grid>
    </Box>
  );
};

export default memo(ViewGoalsIndex);
