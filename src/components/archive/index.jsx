import React, { useCallback, useState } from "react";
import { Box, Grid } from "@mui/material";
import BasicBreadcrumbs from "../common/BasicBreadcrumbs";
import ArchiveAll from "./subComponents/ReactTable/ArchiveAll";
import ArchiveGoals from "./subComponents/ReactTable/ArchiveGoals";
import ArchiveKPIs from "./subComponents/ReactTable/ArchiveKPIs";
import ArchiveProjects from "./subComponents/ReactTable/ArchiveProjects";
import ArchiveTaskAndSubtask from "./subComponents/ReactTable/ArchiveTaskAndSubtask";
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
            <BasicBreadcrumbs currentPage="archive" />
            <CustomFilter
              value={value}
              handleChange={handleChangeRadio}
              filterOption={filterOption}
            />
          </Box>
        </Grid>
        <Grid item xs={12} lg={12}>
          {value === "all" && <ArchiveAll />}
          {value === "goals" && <ArchiveGoals value={value} />}
          {value === "kpis" && <ArchiveKPIs value={value} />}
          {value === "projects" && <ArchiveProjects value={value} />}
          {value === "tasks & subtasks" && (
            <ArchiveTaskAndSubtask value={value} />
          )}
          {/* {value === "content" && <ArchiveContent value={value} />} */}
        </Grid>
      </Grid>
    </Box>
  );
};
export default index;
