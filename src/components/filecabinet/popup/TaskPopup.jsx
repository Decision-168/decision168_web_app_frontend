import { Avatar, Box, Grid, Typography, useTheme } from "@mui/material";
import React, { memo } from "react";
import { KeyboardDoubleArrowRight } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { stringAvatar } from "../../../helpers/stringAvatar";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import BadgeIcon from "@mui/icons-material/Badge";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LowPriorityIcon from "@mui/icons-material/LowPriority";
import PersonIcon from "@mui/icons-material/Person";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
const TaskPopup = ({ nodes }) => {
  const theme = useTheme();
  const subtaskData = [1, 2];
  const CommonLinks = ({ link, linkName }) => {
    return (
      <>
        <Grid item xs={6}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "start",
            }}
          >
            <KeyboardDoubleArrowRight
              sx={{ color: "#c7df19", fontSize: 15, mr: 1 }}
            />
            <Typography
              sx={{ fontSize: 13, cursor: "pointer", color: "#212934" }}
              component={Link}
              to={link}
            >
              {link}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6} textAlign={"initial"}>
          <Typography
            sx={{
              fontSize: 13,
            }}
          >
            {linkName}
          </Typography>
        </Grid>
      </>
    );
  };
  return (
    <Box
      sx={{
        flexGrow: 1,
        width: "100%",
        background: "white",
        p: 2,
        borderRadius: 1,
      }}
      mb={2}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={12}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              flexDirection: "row",
            }}
          >
            <Avatar
              sx={{ bgcolor: theme.palette.secondary.main, mr: 1 }}
              aria-label="project"
            >
              {...stringAvatar(nodes.name)}
            </Avatar>
            <Typography
              sx={{
                color: "#343a40",
                fontWeight: "900",
                fontSize: "16px",
              }}
              textAlign={"start"}
            >
              TASK: {nodes.name}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Typography
            sx={{ fontSize: 14, color: "#212934", textAlign: "start" }}
          >
            Task Code : EM-6964
          </Typography>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Typography
            sx={{ fontSize: 14, color: "#212934", textAlign: "start" }}
          >
            Task Description :
          </Typography>
          <Typography
            sx={{
              color: "#74788d",
              whiteSpace: "pre-wrap",
              textAlign: "start",
              p: 1,
              fontSize: 13,
            }}
          >
            Account Creation Process such as - Registration - Registration
            through Social Media - Login - Login through Social Media - Forgot
            password
          </Typography>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Typography
            sx={{ fontSize: 14, color: "#212934", textAlign: "start" }}
          >
            Task Notes :
          </Typography>
          <Typography
            sx={{
              color: "#74788d",
              whiteSpace: "pre-wrap",
              textAlign: "start",
              p: 1,
              fontSize: 13,
            }}
          ></Typography>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Typography sx={{ fontSize: 13, textAlign: "left" }}>
            Tasks Links :
          </Typography>
        </Grid>
        <Grid item xs={12} md={12} lg={12} mb={2}>
          <Grid container spacing={2}>
            <CommonLinks
              link={"https://dev.decision168.com/register"}
              linkName={"registration link"}
            />
            <CommonLinks
              link={"https://dev.decision168.com/login"}
              linkName={"login link"}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Typography
            sx={{ fontSize: 14, color: "#212934", textAlign: "start" }}
          >
            Task Files :
          </Typography>
          <Typography
            sx={{
              color: "#74788d",
              textAlign: "start",
              p: 1,
              fontSize: 13,
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "start",
                  }}
                >
                  <KeyboardDoubleArrowRight
                    sx={{ color: "#c7df19", fontSize: 15, mr: 1 }}
                  />
                  <Typography sx={{ fontSize: 13, color: "#212934" }}>
                    Decision_168_Platform_Auto-Emails_Responses_17_to_21.pdf
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "start",
                  }}
                >
                  <KeyboardDoubleArrowRight
                    sx={{ color: "#c7df19", fontSize: 15, mr: 1 }}
                  />
                  <Typography sx={{ fontSize: 13, color: "#212934" }}>
                    Decision_168_Platform.pdf
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Typography>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Typography
            sx={{ fontSize: 14, color: "#212934", textAlign: "start" }}
          >
            Subtasks :
          </Typography>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          {subtaskData.map((item, index) => {
            return (
              <Grid container key={index}>
                <Grid item xs={12} md={12} lg={12} textAlign={"left"}>
                  <Typography
                    sx={{
                      fontSize: 13,
                      display: "flex",
                      fontWeight: "700",
                      textAlign: "left",
                      alignItems: "center",
                    }}
                  >
                    <CheckCircleOutlineRoundedIcon
                      fontSize="small"
                      sx={{ color: "#C7DF19", mr: 1 }}
                    />
                    EM-245 :
                    <Typography
                      sx={{
                        fontSize: 13,
                        mx: 1,
                        display: "inline",
                      }}
                    >
                      Implement Account Deactivated Notification
                    </Typography>
                  </Typography>
                </Grid>
              </Grid>
            );
          })}
        </Grid>

        <Grid item xs={6} md={6} lg={6}>
          <Box
            sx={{
              display: "flex",
              alignItems: "start",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <HomeRepairServiceIcon
                fontSize="small"
                sx={{ color: "#C7DF19", mr: 1 }}
              />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Typography sx={{ fontSize: 13, color: "#74788d", ml: 1 }}>
                  Project:{" "}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: 13,
                    color: "#212934",
                    ml: 1,
                  }}
                >
                  Account Creation Module
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6} md={6} lg={6}>
          <Box
            sx={{
              display: "flex",
              alignItems: "start",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <BadgeIcon fontSize="small" sx={{ color: "#C7DF19", mr: 1 }} />
              <Typography sx={{ fontSize: 13, color: "#74788d", ml: 1 }}>
                Portfolio : DECISION 168, Inc
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6} md={6} lg={6}>
          <Box
            sx={{
              display: "flex",
              alignItems: "start",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <AssignmentIndIcon
                fontSize="small"
                sx={{ color: "#C7DF19", mr: 1 }}
              />
              <Typography sx={{ fontSize: 13, color: "#74788d", ml: 1 }}>
                Assigned To : Afrin Sayed
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6} md={6} lg={6}>
          <Box
            sx={{
              display: "flex",
              alignItems: "start",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <CalendarTodayIcon
                fontSize="small"
                sx={{ color: "#C7DF19", mr: 1 }}
              />
              <Typography sx={{ fontSize: 13, color: "#74788d", ml: 1 }}>
                Due Date : 19 Aug, 2022
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6} md={6} lg={6}>
          <Box
            sx={{
              display: "flex",
              alignItems: "start",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <CalendarMonthIcon
                fontSize="small"
                sx={{ color: "#C7DF19", mr: 1 }}
              />
              <Typography sx={{ fontSize: 13, color: "#74788d", ml: 1 }}>
                Created Date : 12 Jun, 2022
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6} md={6} lg={6}>
          <Box
            sx={{
              display: "flex",
              alignItems: "start",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <LowPriorityIcon
                fontSize="small"
                sx={{ color: "#C7DF19", mr: 1 }}
              />
              <Typography sx={{ fontSize: 13, color: "#74788d", ml: 1 }}>
                Priority : medium
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6} md={6} lg={6}>
          <Box
            sx={{
              display: "flex",
              alignItems: "start",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <PersonIcon fontSize="small" sx={{ color: "#C7DF19", mr: 1 }} />
              <Typography sx={{ fontSize: 13, color: "#74788d", ml: 1 }}>
                Created By : Afrin Sayed
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6} md={6} lg={6}>
          <Box
            sx={{
              display: "flex",
              alignItems: "start",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <PrivacyTipIcon
                fontSize="small"
                sx={{ color: "#C7DF19", mr: 1 }}
              />
              <Typography sx={{ fontSize: 13, color: "#74788d", ml: 1 }}>
                Status : Done
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default memo(TaskPopup);
