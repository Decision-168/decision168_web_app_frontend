import { Box, Grid, Button, Icon, IconButton } from "@mui/material";
import { memo, useState } from "react";
import BasicBreadcrumbs from "../common/BasicBreadcrumbs";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { FormatListBulleted, GridView, Add } from "@mui/icons-material";
import RadioSection from "../GoalsAndStrategies/view-goals/subComponents/RadioSection";
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/action/modalSlice";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CustomSearchField from "../common/CustomSearchField";
import ListSection from "./subComponents/ListSection";
import GridSection from "./subComponents/GridSection";

const Tasks = () => {
  const [alignment, setAlignment] = useState("list");
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const dispatch = useDispatch();
  const [inputFields, setInputFields] = useState([]);

  return (
    <Box sx={{ flexGrow: 1 }} mb={2} >
      <Grid container>
        <Grid item xs={10} lg={3}>
          <Box
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
            }}>
            <BasicBreadcrumbs currentPage="Tasks" />
            <ToggleButtonGroup color="primary" value={alignment} exclusive onChange={handleChange} aria-label="Platform">
              <ToggleButton value="list">
                <FormatListBulleted sx={{ fontSize: 14 }} />
              </ToggleButton>
              <ToggleButton value="grid">
                <GridView sx={{ fontSize: 14 }} />
              </ToggleButton>
            </ToggleButtonGroup>

            <Button variant="contained" startIcon={<Add />} size="small" onClick={() => dispatch(openModal("create-goals-kpis"))}>
              Create New
            </Button>
          </Box>
        </Grid>

        <Grid item xs={2} lg={6}>
          <Box
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
              flexDirection: "row",
              padding: "5px",
            }}>
            <IconButton>
              <FilterAltIcon />
            </IconButton>
          </Box>
        </Grid>

        <Grid item xs={12} lg={3}>
          <Box
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
              flexDirection: "row",
            }}>
            <CustomSearchField />
          </Box>
        </Grid>

        <Grid item xs={12}>
          {alignment === "list" ? <ListSection /> : <GridSection />}
        </Grid>
      </Grid>
    </Box>
  );
};

export default memo(Tasks);
