import React, { useCallback, useState } from "react";
import { Box, Grid } from "@mui/material";
import BasicBreadcrumbs from "../common/BasicBreadcrumbs";
import ArchiveAll from "./subComponents/ReactTable/ArchiveAll";
import ArchiveGoals from "./subComponents/ReactTable/ArchiveGoals";
import ArchiveKPIs from "./subComponents/ReactTable/ArchiveKPIs";
import ArchiveProjects from "./subComponents/ReactTable/ArchiveProjects";
import ArchiveTaskAndSubtask from "./subComponents/ReactTable/ArchiveTaskAndSubtask";
import CustomFilter from "../common/CustomFilter";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../redux/action/userSlice";
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
  const user = useSelector(selectUserDetails);
  const userID = user?.reg_id;
  const storedPortfolioId = JSON.parse(localStorage.getItem('portfolioId'));

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
          {value === "all" && <ArchiveAll regId={userID} portfolioId={storedPortfolioId} />}
          {value === "goals" && <ArchiveGoals value={value} regId={userID} portfolioId={storedPortfolioId} />}
          {value === "kpis" && <ArchiveKPIs value={value} regId={userID} portfolioId={storedPortfolioId} />}
          {value === "projects" && <ArchiveProjects value={value} regId={userID} portfolioId={storedPortfolioId} />}
          {value === "tasks & subtasks" && (
            <ArchiveTaskAndSubtask value={value} regId={userID} portfolioId={storedPortfolioId} />
          )}
          {/* {value === "content" && <ArchiveContent value={value} />} */}
        </Grid>
      </Grid>
    </Box>
  );
};
export default index;
