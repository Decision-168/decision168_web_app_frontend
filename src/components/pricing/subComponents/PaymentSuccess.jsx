import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { InsertCheckoutPayment } from "../../../api/modules/upgradeplanModule";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const sessionId = searchParams.get("session_id");
  const user_id = searchParams.get("user_id");

  useEffect(() => {
    const InsertPaymentSuccess = async () => {
      if (user_id && sessionId) {
        try {
          const data = {
            session_id: sessionId,
            user_id: user_id,
          };
          const response = await InsertCheckoutPayment(data);
          toast.success(`${response.message}`);
          navigate("/pricing-packages");
        } catch (error) {
          // Handling error
          toast.error(`${error.response?.error}`);
        }
      }
    };
    InsertPaymentSuccess();
  }, [user_id, sessionId]);

  return (
    sessionId && (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h4" textAlign="center">
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          Hold On! Don't Press BACK button or RELOAD page!
        </Typography>
      </Box>
    )
  );
};

export default PaymentSuccess;
