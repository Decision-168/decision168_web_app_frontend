import { Box, Grid } from "@mui/material";
import React from "react";
import CustomSearchField from "./CustomSearchField";
import CustomCard from "../../../common/CustomCard";
import ViewGoalsPopup from "./ViewGoalsPopup";
import ReduxDialog from "../../../common/ReduxDialog";

const GridSection = () => {

  const data = [1, 2, 3, 4];
  return (
    <Box sx={{ flexGrow: 1 }} mb={2}>
      <Grid container >
        <Grid item xs={12} lg={9}></Grid>
        <Grid item xs={12} lg={3}>
          <CustomSearchField />
        </Grid>
      </Grid>
      <Grid container mt={2} spacing={2}>
        {data.map((item, index) => {
          return (
            <Grid item xs={12} lg={3} key={index}>
              <CustomCard />
            </Grid>
          );
        })}
      </Grid>
      <ReduxDialog
        value="overview-goals-kpis"
        modalTitle="Demo Goal"
        redirectPath={"/goal-overview"}
        showModalButton={true}
        modalSize="sm"
      >
        <ViewGoalsPopup />
      </ReduxDialog>
    </Box>
  );
};

export default GridSection;
