import { Box, Grid } from "@mui/material";
import React,{memo} from "react";
import CustomSearchField from "./CustomSearchField";

const GridSection = ({ value }) => {
  const data = [1, 2, 3, 4];
  return (
    <Box sx={{ flexGrow: 1 }} mb={2}>
      <Grid container>
        <Grid item xs={12} lg={9}></Grid>
        <Grid item xs={12} lg={3}>
          <CustomSearchField />
        </Grid>
      </Grid>
      <Grid container mt={2} spacing={2}>
        {data.map((item, index) => {
          return (
            <Grid item xs={12} lg={3} key={index}>
              
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default memo(GridSection);