import React from "react";
import { Box, Grid, Button } from "@mui/material";
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
import { SearchWithFuse } from "../../../helpers/SearchWithFuse";

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
  const [rows, setRows] = useState([]);
  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  const handleChangeRadio = useCallback((event) => {
    setValue(event.target.value);
  }, []);

  const [query, setQuery] = useState("");
  const newResults = SearchWithFuse(
    ["tname", "tcode", "tdue_date", "tpriority", "tstatus"],
    query,
    rows
  );
  return (
    <Box sx={{ flexGrow: 1 }} mb={2}>
      <Grid container>
        <Grid item xs={10} sm={6} md={6} lg={7} xl={7}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              flexDirection: "row",
            }}
          >
            <BasicBreadcrumbs currentPage="Tasks" />
            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
              sx={{ mx: 1 }}
            >
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
              size="small"
            >
              Create New
            </Button>

            <ReduxDialog
              value="create-new-task"
              modalTitle="Create New Task"
              showModalButton={false}
              modalSize="md"
            >
              <CreateEditTaskForm editMode={false} />
            </ReduxDialog>
          </Box>
        </Grid>

        <Grid item xs={2} sm={2} md={2} lg={2} xl={2} alignSelf={"center"}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
              flexDirection: "row",
            }}
          >
            <CustomFilter
              value={value}
              handleChange={handleChangeRadio}
              filterOption={filterOption}
            />
          </Box>
        </Grid>

        <Grid item xs={12} sm={4} md={4} lg={3} xl={3} alignSelf={"center"}>
          <CustomSearchField query={query} setQuery={setQuery} />
        </Grid>

        <Grid item xs={12} lg={12}>
          {alignment === "list" ? (
            <ListSection setRows={setRows} rows={newResults} />
          ) : (
            <GridSection setRows={setRows} rows={newResults} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default memo(DashboardTasks);
