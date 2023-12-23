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
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../redux/action/userSlice";
import {
  getActiveCoupons,
  getAllPack,
} from "../../api/modules/upgradeplanModule";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import FlightIcon from "@mui/icons-material/Flight";
import { getPackageDetails } from "../../api/modules/dashboardModule";

export default function Pricing() {
  //get user id
  const user = useSelector(selectUserDetails);
  const user_id = user?.reg_id;
  const user_used_co_id = user?.used_package_coupon_id;
  const user_package_id = user?.package_id;
  //get user id

  const [validity, setValidity] = useState("monthly");
  const styles = pricingStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const [btnIndex, setBtnIndex] = useState();
  const subscriptionPlan = "Professional";

  // useEffect(() => {
  //   if (subscriptionPlan === "Solo") {
  //     setBtnIndex(0);
  //   }
  //   if (subscriptionPlan === "Professional") {
  //     setBtnIndex(1);
  //   }
  //   if (subscriptionPlan === "Business") {
  //     setBtnIndex(2);
  //   }
  // }, []);

  const [getPackages, setPackages] = useState();
  const [showFreeBut, setShowFreeBut] = useState("no");
  const [userPackagePrice, setUserPackagePrice] = useState();

  const fetchPricingPackages = async () => {
    try {
      const response = await getAllPack(user_id);
      const response3 = await getPackageDetails(user_package_id);
      setUserPackagePrice(response3.pack_price);
      setPackages(response);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchActiveCoupons = async () => {
    try {
      const response2 = await getActiveCoupons();
      if (response2) {
        response2.forEach((gacd) => {
          const co_id = gacd.co_id;
          const index = user_used_co_id.indexOf(co_id);
          if (index === -1) {
            if (showFreeBut === "no") {
              setShowFreeBut("yes");
            }
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPricingPackages();
    fetchActiveCoupons();
  }, [user_id]);

  // console.log("getPackages", getPackages);
  // console.log("user_id", user_id);
  // console.log("user_used_co_id", user_used_co_id);
  // console.log("user_package_coupon_id", user_package_coupon_id);
  // console.log("showFreeBut", showFreeBut);

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
        {showFreeBut === "yes" ? (
          <Button
            startIcon={<KeyboardDoubleArrowRight />}
            size="small"
            variant="contained"
            sx={{
              width: "10%",
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.secondary.dark,
              "&:hover": { backgroundColor: theme.palette.primary.dark },
            }}
            onClick={() => dispatch(openModal("free-trial"))}
          >
            Free Trial
          </Button>
        ) : (
          <Box
            sx={{
              width: "10%",
            }}
          ></Box>
        )}
      </Stack>
      <Grid container spacing={2}>
        {getPackages &&
          getPackages?.map((plan, index) => (
            <Grid key={index} item xs={12} sm={6} lg={3}>
              <Paper elevation={2} sx={{ p: 2 }}>
                <PricingCardHeader
                  name={plan.pack_name}
                  icon={
                    plan.pack_id == "1" || plan.coupon_pack == "yes" ? (
                      <DirectionsRunIcon
                        sx={{ color: "#C7DF19", width: "35px", height: "35px" }}
                      />
                    ) : plan.pack_name == "Professional" ? (
                      <DirectionsBikeIcon
                        sx={{ color: "#C7DF19", width: "35px", height: "35px" }}
                      />
                    ) : plan.pack_name == "Business" ? (
                      <DirectionsCarIcon
                        sx={{ color: "#C7DF19", width: "35px", height: "35px" }}
                      />
                    ) : (
                      <FlightIcon
                        sx={{ color: "#C7DF19", width: "35px", height: "35px" }}
                      />
                    )
                  }
                  description={plan.pack_tagline}
                />
                <PricingCardBody
                  styles={styles}
                  features={plan.features}
                  priceID={plan.stripe_price_id}
                  price={plan.pack_price}
                  validity={plan.validity}
                  isSpecialOffer={plan.pack_name == "Business" && true}
                  contactUs={plan.stripe_link == "no" && true}
                  packID={plan.pack_id}
                  selectedPackID={user_package_id}
                  packPrice={plan.pack_price}
                  selectedPackPrice={userPackagePrice}
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
        <FreeTrial passfetchPricingPackages={fetchPricingPackages} />
      </ReduxDialog>
    </Box>
  );
}
