import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { plans } from "./subComponents/plansData";
import { pricingStyles } from "./styles";
import PricingCardHeader from "./subComponents/PricingCardHeader";
import PricingCardBody from "./subComponents/PricingCardBody";
import { KeyboardDoubleArrowRight } from "@mui/icons-material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ReduxDialog from "../common/ReduxDialog";
import FreeTrial from "./subComponents/FreeTrial";
import { openModal } from "../../redux/action/modalSlice";
import { useDispatch } from "react-redux";
export default function Pricing() {
    const [validity, setValidity] = React.useState("monthly");
  const styles = pricingStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const [btnIndex, setBtnIndex] = useState();
  const subscriptionPlan = "Professional";
  useEffect(() => {
    if (subscriptionPlan === "Solo") {
      setBtnIndex(0);
    }
    if (subscriptionPlan === "Professional") {
      setBtnIndex(1);
    }
    if (subscriptionPlan === "Business") {
      setBtnIndex(2);
    }
  }, []);

   const handleValidity = (event, newValue) => {
     if (newValue !== null) {
       setValidity(newValue);
     }
   };

  return (
    <Box sx={{ flexGrow: 1 }} mb={2}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        py={2}
      >
        <Typography
          component="h4"
          variant="subtitle2"
          sx={{
            color: theme.palette.secondary.dark,
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
        >
          PRICING
        </Typography>
        <ToggleButtonGroup value={validity} exclusive onChange={handleValidity}>
          <ToggleButton value="monthly">
            <Typography
              component="h6"
              variant="subtitle2"
              sx={{
                color: theme.palette.secondary.dark,
                textTransform: "uppercase",
                fontWeight: "bold",
              }}
            >
              Monthly
            </Typography>
          </ToggleButton>
          <ToggleButton value="yearly">
            <Typography
              component="h6"
              variant="subtitle2"
              sx={{
                color: theme.palette.secondary.dark,
                textTransform: "uppercase",
                fontWeight: "bold",
              }}
            >
              Yearly
            </Typography>
          </ToggleButton>
        </ToggleButtonGroup>
        <Button
          startIcon={<KeyboardDoubleArrowRight />}
          size="small"
          variant="contained"
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.secondary.dark,
            "&:hover": { backgroundColor: theme.palette.primary.dark },
          }}
          onClick={() => dispatch(openModal("free-trial"))}
        >
          Free Trial
        </Button>
      </Stack>
      <Grid container spacing={2}>
        {plans.map((plan, index) => (
          <Grid key={index} item xs={12} sm={6} lg={3}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <PricingCardHeader
                name={plan.name}
                icon={plan.icon}
                description={plan.description}
              />
              <PricingCardBody
                styles={styles}
                features={plan.features}
                price={plan.price}
                validity={plan.validity}
                isSpecialOffer={plan.isSpecialOffer}
                name={plan.name}
                index={index}
                btnIndex={btnIndex}
              />
            </Paper>
          </Grid>
        ))}
      </Grid>
      <ReduxDialog
        value="free-trial"
        modalTitle="Free Trial"
        showModalButton={false}
        modalSize="xs"
      >
        <FreeTrial />
      </ReduxDialog>
    </Box>
  );
}
