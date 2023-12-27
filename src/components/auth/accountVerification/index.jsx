import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Divider,
  Grid,
  Link,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import logo from "../../../assets/images/logo-bottom-shadow.png";
import { Link as RDLink, useNavigate } from "react-router-dom";
import { verifyUser } from "../../../api/modules/authModule";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function AccountVerification() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { token } = useParams();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const verifyUserAccount = async () => {
      try {
        const response = await verifyUser(token);
        toast.success(`${response?.message}`);
      } catch (error) {
        if (error.response?.status === 400) {
          navigate("/");
        }
        toast.error(`${error.response?.data?.error}`);
        setError(error.response?.data?.error || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    verifyUserAccount();
  }, [token]);

  // if (loading) {
  //   return <div>Loading...</div>; // You can replace this with a loading spinner
  // }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  return loading ? null : (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100vw",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: theme.palette.secondary.light,
      }}
    >
      <Paper
        elevation={4}
        sx={{ width: isMediumScreen ? "100%" : "40%", height: "80%", m: 2 }}
      >
        <Box p={2}>
          <Typography
            component="h6"
            sx={{
              fontSize: "24px",
              fontWeight: 900,
              color: theme.palette.primary.main,
            }}
          >
            How awesome is that...
          </Typography>
          <Typography
            component="p"
            sx={{
              my: 4,
              textAlign: "left",
              fontSize: "16px",
              fontWeight: 500,
              color: theme.palette.secondary.main,
            }}
          >
            Congratulations, You've verified your account. Login credentials
            have been sent to the email address you used to register
          </Typography>

          <Button
            component={RDLink}
            to="/"
            variant="contained"
            sx={{ color: "white" }}
          >
            Continue to Login
          </Button>

          <Box sx={{ textAlign: "left", my: 2 }}>
            <Typography
              component="h6"
              sx={{
                fontSize: "16px",
                fontWeight: 500,
                color: theme.palette.secondary.main,
              }}
            >
              Thanks,
            </Typography>
            <Typography
              component="h6"
              sx={{
                fontSize: "16px",
                fontWeight: 500,
                color: theme.palette.primary.main,
              }}
            >
              Decision 168
            </Typography>
            <Typography
              component="h6"
              sx={{
                fontSize: "16px",
                fontWeight: 500,
                color: theme.palette.secondary.main,
              }}
            >
              Support Team
            </Typography>
          </Box>

          <Box sx={{ textAlign: "right", my: 1 }}>
            <img src={logo} alt="logo" width="100" />
          </Box>
        </Box>

        <Divider />

        <Box
          sx={{
            p: 2,
            mb: 1,
            backgroundColor: "whitesmoke",
            color: theme.palette.primary.contrastText,
          }}
        >
          <Grid container>
            <Grid item xs={12}>
              <Typography
                component="div"
                sx={{
                  fontSize: "16px",
                  fontWeight: 400,
                  color: theme.palette.secondary.main,
                  textAlign: "center",
                }}
                px={2}
              >
                © Copyright 2013 - {new Date().getFullYear()} |{" "}
                <Link href="https://www.decision168.com/">
                  DECISION 168, Inc
                </Link>{" "}
                | All Rights Reserved
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
}
