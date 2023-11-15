import React from "react";
import { Box, Grid, Paper } from "@mui/material";
import BasicBreadcrumbs from "../common/BasicBreadcrumbs";
import { plans } from "./subComponents/plansData";
import { pricingStyles } from "./styles";
import PricingCardHeader from "./subComponents/PricingCardHeader";
import PricingCardBody from "./subComponents/PricingCardBody";

export default function Pricing() {
  const styles = pricingStyles();
  return (
    <Box sx={{ flexGrow: 1 }} mb={2}>
      <BasicBreadcrumbs currentPage="Pricing" showBackButton={true} />
      <Grid container spacing={2}>
        {plans.map((plan, index) => (
          <Grid key={index} item xs={12} sm={6} lg={3}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <PricingCardHeader name={plan.name} icon={plan.icon} description={plan.description} />
              <PricingCardBody styles={styles} features={plan.features} price={plan.price} validity={plan.validity} isSpecialOffer={plan.isSpecialOffer} name={plan.name} buttonText={plan.buttonText}/>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
