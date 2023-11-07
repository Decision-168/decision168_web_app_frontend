import { Box, Grid } from "@mui/material";
import React,{memo} from "react";
import CustomTable from "../../subComponents/CustomTable";

const ListSection = ({ handleGoalOpen, value }) => {
  return (
    <Box sx={{ flexGrow: 1 }} mb={2} mt={2}>
      {value === "all" && (
        <Grid container spacing={4}>
          <Grid item xs={12} lg={12}>
            <CustomTable title={"Created Goals"} handleOpen={handleGoalOpen} />
          </Grid>
          <Grid item xs={12} lg={12}>
            <CustomTable title={"Accepted Goals"} handleOpen={handleGoalOpen} />
          </Grid>
          <Grid item xs={12} lg={12}>
            <CustomTable
              title={"Pending Requests"}
              handleOpen={handleGoalOpen}
            />
          </Grid>
          <Grid item xs={12} lg={12}>
            <CustomTable
              title={"More Info Requests"}
              handleOpen={handleGoalOpen}
            />
          </Grid>
        </Grid>
      )}
      {value === "created-goals" && (
        <Grid container spacing={4}>
          <Grid item xs={12} lg={12}>
            <CustomTable title={"Created Goals"} handleOpen={handleGoalOpen} />
          </Grid>
        </Grid>
      )}
      {value === "accepted-goals" && (
        <Grid container spacing={4}>
          <Grid item xs={12} lg={12}>
            <CustomTable title={"Accepted Goals"} handleOpen={handleGoalOpen} />
          </Grid>
        </Grid>
      )}
      {value === "pending-requests" && (
        <Grid container spacing={4}>
          <Grid item xs={12} lg={12}>
            <CustomTable
              title={"Pending Requests"}
              handleOpen={handleGoalOpen}
            />
          </Grid>
        </Grid>
      )}
      {value === "more-info-requests" && (
        <Grid container spacing={4}>
          <Grid item xs={12} lg={12}>
            <CustomTable
              title={"More Info Requests"}
              handleOpen={handleGoalOpen}
            />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default memo(ListSection)