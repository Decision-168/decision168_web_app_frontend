import React, { useCallback, useState } from "react";
import { Box, Grid } from "@mui/material";
import BasicBreadcrumbs from "../common/BasicBreadcrumbs";
import RadioSection from "./subComponents/RadioSection";
import ArchiveAll from "./subComponents/ReactTable/ArchiveAll";
import ArchiveGoals from "./subComponents/ReactTable/ArchiveGoals";
import ArchiveKPIs from "./subComponents/ReactTable/ArchiveKPIs";
import ArchiveProjects from "./subComponents/ReactTable/ArchiveProjects";
import ArchiveContent from "./subComponents/ReactTable/ArchiveContent";
import ArchiveTaskAndSubtask from "./subComponents/ReactTable/ArchiveTaskAndSubtask";

const index = () => {
  const [value, setValue] = useState("all");
  const handleChangeRadio = useCallback((event) => {
    setValue(event.target.value);
  }, []);
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
            <BasicBreadcrumbs currentPage="archive" />
          </Box>
        </Grid>
        <Grid item xs={12} lg={9} alignSelf={"center"}>
          <RadioSection value={value} handleChange={handleChangeRadio} />
        </Grid>
        <Grid item xs={12} lg={12}>
          {value === "all" && <ArchiveAll />}
          {value === "goal" && <ArchiveGoals value={value} />}
          {value === "kpi" && <ArchiveKPIs value={value} />}
          {value === "project" && <ArchiveProjects value={value} />}
          {value === "task" && <ArchiveTaskAndSubtask value={value} />}
          {value === "content" && <ArchiveContent value={value} />}
        </Grid>
      </Grid>
    </Box>
  );
};
export default index;
