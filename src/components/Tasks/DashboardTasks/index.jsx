import React from "react";
import { Box, Grid, Button,} from "@mui/material";
import { memo, useState, useCallback } from "react";
import BasicBreadcrumbs from "../../common/BasicBreadcrumbs";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { FormatListBulleted, GridView, Add } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { openModal } from "../../../redux/action/modalSlice";
import CustomSearchField from "../../common/CustomSearchField";
import ListSection from "../subComponents/ListSection";
import GridSection from "../subComponents/GridSection";
import ReduxDialog from "../../common/ReduxDialog";
import CreateEditTaskForm from "../createEditTask/CreateEditTaskForm";
import CustomFilter from "../../common/CustomFilter";

const filterOption = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "tomorrow",
    label: " Tomorrow",
  },
  {
    value: "next 168",
    label: "Next 168",
  },
  {
    value: "my created",
    label: "My Created",
  },
  {
    value: "today",
    label: "Today",
  },
  {
    value: "this week",
    label: "This Week",
  },
  {
    value: " overdue",
    label: " Overdue",
  },
];

const DashboardTasks = () => {
  const [alignment, setAlignment] = useState("list");
  const [value, setValue] = useState("all");
  const dispatch = useDispatch();

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleChangeRadio = useCallback((event) => {
    setValue(event.target.value);
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }} mb={2}>
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
            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              onChange={handleChange}
              aria-label="Platform">
              <ToggleButton value="list">
                <FormatListBulleted sx={{ fontSize: 14 }} />
              </ToggleButton>
              <ToggleButton value="grid">
                <GridView sx={{ fontSize: 14 }} />
              </ToggleButton>
            </ToggleButtonGroup>

            <Button
              onClick={() => dispatch(openModal("create-new-task"))}
              variant="contained"
              startIcon={<Add />}
              size="small">
              Create New
            </Button>

            <ReduxDialog
              value="create-new-task"
              modalTitle="Create New Task"
              showModalButton={false}
              modalSize="md">
              <CreateEditTaskForm editMode={false} />
            </ReduxDialog>
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
            {/* <IconButton>
              <FilterAltIcon />
            </IconButton> */}

            <CustomFilter
              value={value}
              handleChange={handleChangeRadio}
              filterOption={filterOption}
            />
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

        <Grid item xs={12} lg={12}>
          {alignment === "list" ? <ListSection/> : <GridSection/>}
        </Grid>
      </Grid>

    </Box>
  );
};

export default memo(DashboardTasks);
