import React, { memo, useState } from "react";
import { Box, Typography, Button, useTheme, Divider } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../redux/action/userSlice";
import { toast } from "react-toastify";
import { CheckoutPaymentSessionCreate, DowngradePackage, UpgradeSubscription } from "../../../api/modules/upgradeplanModule";
import { loadStripe } from "@stripe/stripe-js";

const Price = ({ priceID, price, validity, packID, selectedPackID, packPrice, selectedPackPrice, CouponPack }) => {
  const theme = useTheme();
  const user = useSelector(selectUserDetails);
  const [disabled, setDisabled] = useState(false);
  const user_id = user?.reg_id;

  const handleSelectAction = async (getbtnVal) => {
    setDisabled(true);
    if (getbtnVal === "Upgrade") {
      if (selectedPackID == 1 || CouponPack == "yes") {
        try {
          const stripe = await loadStripe("pk_test_51KLZITECBZEQ4z2NFQOa4erhztY7yxHZr0aw9qThfNGxWqBI9vKFR1MolJsKDYzkVmwYQwVaVA229U1hvvQVznIe00PJ2IpJDz");
          const data = {
            price_id: priceID,
            user_id: user_id,
          };
          const response = await CheckoutPaymentSessionCreate(data);
          const result = stripe.redirectToCheckout({
            sessionId: response.session_id,
          });

          if (result.error) {
          }
        } catch (error) {
          toast.error(`${error.response?.error}`);
        }
      } else {
        try {
          const data = {
            price_id: priceID,
            user_id: user_id,
          };
          const response = await UpgradeSubscription(data);
          toast.success(`${response.message}`);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } catch (error) {
          toast.error(`${error.response?.error}`);
        }
      }
    } else if (getbtnVal === "Downgrade") {
      try {
        const data = {
          user_id: user_id,
        };
        const response = await DowngradePackage(data);
        toast.success(`${response.message}`);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        toast.error(`${error.response?.error}`);
      }
    }
  };
  const getButtonText = () => {
    if (packID == selectedPackID) {
      return "Selected";
    } else {
      if (packID == 1) {
        return "Downgrade";
      }

      if (parseFloat(Number(selectedPackPrice).toFixed(2)) <= parseFloat(Number(packPrice).toFixed(2))) {
        return "Upgrade";
      }
      return null;
    }
  };

  return (
    <Box
      sx={{
        height: "150px",
        my: 2,
        py: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box>
        <Typography component="span" sx={{ fontSize: "36px", fontWeight: 700 }}>
          <sup
            style={{
              fontSize: "20px",
              verticalAlign: "top",
              padding: "2px",
              fontWeight: 700,
            }}
          >
            $
          </sup>
          {price}
        </Typography>
        <Typography variant="caption" component="span" sx={{ fontSize: "13px", opacity: 0.6, fontWeight: 500 }}>
          &nbsp; / {validity}
        </Typography>
      </Box>

      {getButtonText() ? (
        <Box sx={{ width: "100%" }}>
          <Divider>
            <Button
              size="small"
              variant="contained"
              sx={{
                ":disabled": {
                  background: theme.palette.secondary.main,
                  color: "white",
                },
              }}
              onClick={() => handleSelectAction(getButtonText())}
              disabled={getButtonText() === "Selected" || disabled}
            >
              {getButtonText()}
            </Button>
          </Divider>
        </Box>
      ) :  <Box sx={{width:"100%", mb:1.7}}><Divider/></Box>}
    </Box>
  );
};

export default memo(Price);
