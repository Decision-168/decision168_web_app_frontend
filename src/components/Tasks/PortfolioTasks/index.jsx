import React from "react";
import { Box, Grid } from "@mui/material";
import { memo, useState, useCallback } from "react";
import BasicBreadcrumbs from "../../common/BasicBreadcrumbs";
import { useDispatch } from "react-redux";
import CustomSearchField from "../../common/CustomSearchField";
import CustomFilter from "../../common/CustomFilter";
import PortfolioTaskListSection from "../subComponents/PortfolioTaskListSection";
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

const PortfolioTasks = () => {
  const [alignment, setAlignment] = useState("list");
  const [value, setValue] = useState("all");
  const dispatch = useDispatch();

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  const handleChangeRadio = useCallback((event) => {
    setValue(event.target.value);
  }, []);

  const [rows, setRows] = useState([]);
  const [query, setQuery] = useState("");
  const newResults = SearchWithFuse(
    ["tname", "tcode", "tdue_date", "tpriority", "tstatus"],
    query,
    rows
  );

  return (
    <Box sx={{ flexGrow: 1 }} mb={2}>
      <Grid container>
        <Grid item xs={10} lg={5}>
          <Box
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <BasicBreadcrumbs currentPage="Tasks" showBackButton={true} />
          </Box>
        </Grid>

        <Grid item xs={2} lg={4}>
          <Box
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
              flexDirection: "row",
              padding: "5px",
            }}
          >
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
            }}
          >
            <CustomSearchField query={query} setQuery={setQuery} />
          </Box>
        </Grid>

        <Grid item xs={12} lg={12}>
          <PortfolioTaskListSection setRows={setRows} rows={newResults} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default memo(PortfolioTasks);
