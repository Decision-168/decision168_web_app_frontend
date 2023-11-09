import React, { useCallback, useState } from "react";
import { Box, Grid } from "@mui/material";
import BasicBreadcrumbs from "../common/BasicBreadcrumbs";
import RadioSection from "./subComponents/RadioSection";
import TrashAll from "./subComponents/ReactTable/TrashAll";
import TrashGoals from "./subComponents/ReactTable/TrashGoals";
import TrashKPIs from "./subComponents/ReactTable/TrashKPIs";
import TrashProjects from "./subComponents/ReactTable/TrashProjects";
import TrashTaskAndSubtask from "./subComponents/ReactTable/TrashTaskAndSubtask";
import TrashContent from "./subComponents/ReactTable/TrashContent";
import TrashFiles from "./subComponents/ReactTable/TrashFiles";

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
            <BasicBreadcrumbs currentPage="trash" />
          </Box>
        </Grid>
        <Grid item xs={12} lg={9} alignSelf={"center"}>
          <RadioSection value={value} handleChange={handleChangeRadio} />
        </Grid>
        <Grid item xs={12} lg={12}>
          {value === "all" && <TrashAll />}
          {value === "goal" && <TrashGoals value={value} />}
          {value === "kpi" && <TrashKPIs value={value} />}
          {value === "project" && <TrashProjects value={value} />}
          {value === "task" && <TrashTaskAndSubtask value={value} />}
          {value === "file" && <TrashFiles value={value} />}
          {value === "content" && <TrashContent value={value} />}
        </Grid>
      </Grid>
    </Box>
  );
};
export default index;