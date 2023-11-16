import React, { useCallback, useState } from "react";
import { Box, Grid } from "@mui/material";
import BasicBreadcrumbs from "../common/BasicBreadcrumbs";
import TrashAll from "./subComponents/ReactTable/TrashAll";
import TrashGoals from "./subComponents/ReactTable/TrashGoals";
import TrashKPIs from "./subComponents/ReactTable/TrashKPIs";
import TrashProjects from "./subComponents/ReactTable/TrashProjects";
import TrashTaskAndSubtask from "./subComponents/ReactTable/TrashTaskAndSubtask";
import TrashFiles from "./subComponents/ReactTable/TrashFiles";
import CustomFilter from "../common/CustomFilter";
const filterOption = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "goals",
    label: "Goals",
  },
  {
    value: "kpis",
    label: "KPIs",
  },
  {
    value: "projects",
    label: "Projects",
  },
  {
    value: "tasks & subtasks",
    label: "Tasks & Subtasks",
  },
  {
    value: "files",
    label: "Files",
  },
  //  {
  //    value: "content",
  //    label: "Content",
  //  },
];
const index = () => {
  const [value, setValue] = useState("all");
  const handleChangeRadio = useCallback((event) => {
    setValue(event.target.value);
  }, []);
  return (
    <Box sx={{ flexGrow: 1 }} mb={2}>
      <Grid container>
        <Grid item xs={12} lg={12}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <BasicBreadcrumbs currentPage="trash" />
            <CustomFilter
              value={value}
              handleChange={handleChangeRadio}
              filterOption={filterOption}
            />
          </Box>
        </Grid>

        <Grid item xs={12} lg={12}>
          {value === "all" && <TrashAll />}
          {value === "goals" && <TrashGoals value={value} />}
          {value === "kpis" && <TrashKPIs value={value} />}
          {value === "projects" && <TrashProjects value={value} />}
          {value === "tasks & subtasks" && (
            <TrashTaskAndSubtask value={value} />
          )}
          {value === "files" && <TrashFiles value={value} />}
          {/* {value === "content" && <TrashContent value={value} />} */}
        </Grid>
      </Grid>
    </Box>
  );
};
export default index;