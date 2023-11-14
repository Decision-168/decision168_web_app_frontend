import { Avatar, Box, Grid, Typography, useTheme } from "@mui/material";
import React, { memo } from "react";
import {
  CalendarMonth,
  FolderOpenOutlined,
  KeyboardDoubleArrowRight,
  Person,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import GridList from "../../GoalsAndStrategies/subComponents/GridList";
import { stringAvatar } from "../../../helpers/stringAvatar";
import ProgressBar from "../subComponents/ProgressBar";
const ProjectPopup = ({ nodes }) => {
  const theme = useTheme();
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
              PROJECT: {nodes.name}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Typography
            sx={{ fontSize: 14, color: "#212934", textAlign: "start" }}
          >
            Status :- Done: 4 Total: 11
          </Typography>
          <ProgressBar />
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Typography
            sx={{ fontSize: 14, color: "#212934", textAlign: "start" }}
          >
            Description :
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
            Account Creation Process such as 
            - Registration 
            - Registration through Social Media 
            - Login 
            - Login through Social Media 
            - Forgot password
          </Typography>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Typography sx={{ fontSize: 13, textAlign: "left" }}>
            Links & Comments :
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

        <Grid item xs={3} md={3} lg={3}>
          <GridList
            icon={<CalendarMonth sx={{ color: "#c7df19", fontSize: "14px" }} />}
            title={"Created Date"}
            info={"6 Nov, 2023"}
          />
        </Grid>
        <Grid item xs={3} md={3} lg={3}>
          <GridList
            icon={<Person sx={{ color: "#c7df19", fontSize: "14px" }} />}
            title={"Created By"}
            info={"Uzma Karjikar"}
          />
        </Grid>
        <Grid item xs={3} md={3} lg={3}>
          <GridList
            icon={
              <FolderOpenOutlined sx={{ color: "#c7df19", fontSize: "14px" }} />
            }
            title={"Type"}
            info={"Goals & Strategies"}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default memo(ProjectPopup);
