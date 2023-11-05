import { Box, Grid, Typography } from "@mui/material";
import React, { Fragment } from "react";
import CustomSearchField from "../../view-goals/subComponents/CustomSearchField";
import KPIAccordion from "./KPIAccordion";
import PerfectScrollbar from "react-perfect-scrollbar";
const KPISection = () => {
  const data = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3];
  return (
    <PerfectScrollbar>
      <Box
        sx={{
          width: "100%",
          background: "white",
          p: 2,
          borderRadius: 1,
        }}
        mb={2}
      >
        <Grid container>
          <Grid item xs={8} alignSelf={"center"}>
            <Typography
              sx={{
                color: "#495057",
                fontSize: 15,
                fontWeight: "600",
                ml: 0.5,
              }}
            >
              KPIs
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <CustomSearchField />
          </Grid>
          <Grid item xs={12} mt={2}>
            {data.map((item, index) => {
              return (
                <Fragment key={index}>
                  <KPIAccordion />
                </Fragment>
              );
            })}
          </Grid>
        </Grid>
      </Box>
    </PerfectScrollbar>
  );
};

export default KPISection;
