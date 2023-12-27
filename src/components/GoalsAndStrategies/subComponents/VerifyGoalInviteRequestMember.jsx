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
import { Navigate, Link as RDLink, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getGoalInviteRejectRequest } from "../../../api/modules/goalkpiModule";

export default function VerifyGoalInviteRequestMember() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { goalId, primaryId, flag } = useParams();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [userStatus, setUserStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyMember = async () => {
      try {
        const response = await getGoalInviteRejectRequest(
          goalId,
          primaryId,
          flag
        );

        if (response?.user_status === "registration") {
          return navigate("/register", { replace: true });
        }

        if (response?.user_status === "pages-404") {
          return navigate("/", { replace: true });
        }

        setUserStatus(response?.user_status);
      } catch (error) {
        setUserStatus(error.response?.data?.user_status);
      } finally {
        setLoading(false);
      }
    };

    verifyMember();
  }, [goalId, primaryId, flag, navigate]);

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
            {userStatus === "rejected" && "Oops, did you mean to..."}

            {userStatus === "already_rejected" && "Hmm, are you sure..."}
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
            {userStatus === "rejected" &&
              "You've rejected the invitation to be a team member for goal. If this was by mistake, reach out to the person that invited you."}

            {userStatus === "already_rejected" &&
              "You've already rejected the invitation to be a team member for goal. If this was by mistake, reach out to the person that invited you."}
          </Typography>

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
