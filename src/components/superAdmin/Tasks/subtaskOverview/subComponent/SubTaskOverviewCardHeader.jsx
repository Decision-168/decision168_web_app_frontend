import React, { memo } from "react";
import { Avatar, Box, Button, Divider, Grid, IconButton, Tooltip, Typography, useMediaQuery, useTheme } from "@mui/material";
import { ContentCopy, Delete, NoteAdd } from "@mui/icons-material";
import AssignmentIcon from "@mui/icons-material/Assignment";

const SubTaskOverviewCardHeader = ({ title, handleClick1, handleDuplicate, handleFileIt, handleDelete, btn1Text, btn1Icon }) => {
  const theme = useTheme();
  const isSamllScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid container pr={2}>
      <Grid item xs={12} sm={12} lg={12}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            flexDirection: "row",
            mb: 1,
          }}>
          <Avatar sx={{ bgcolor: theme.palette.secondary.dark, mr: 1 }} aria-label="goal">
            <AssignmentIcon />
          </Avatar>
          <Typography
            sx={{
              color: "#343a40",
              fontWeight: "900",
              fontSize: "16px",
            }}
            textAlign={"start"}>
            {title}
          </Typography>
        </Box>
        <Divider />
      </Grid>
      <Grid item xs={12} sm={9} lg={8}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            flexDirection: "row",
            height: "50px",
          }}>
          <Button variant="contained" startIcon={btn1Icon} size="small" onClick={handleClick1} sx={{ mr: 1 }}>
            {btn1Text}
          </Button>
        </Box>
        <Divider />
      </Grid>
      <Grid item xs={12} sm={3} lg={4}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: isSamllScreen ? "start" : "end",
            flexDirection: "row",
            height: "50px",
          }}>
          <Tooltip arrow title="Duplicate">
            <IconButton onClick={handleDuplicate}>
              <ContentCopy sx={{ fontSize: "20px" }} />
            </IconButton>
          </Tooltip>
          <Tooltip arrow title="File It">
            <IconButton onClick={handleFileIt}>
              <NoteAdd sx={{ fontSize: "20px" }} />
            </IconButton>
          </Tooltip>
          <Tooltip arrow title="Delete">
            <IconButton onClick={handleDelete}>
              <Delete sx={{ fontSize: "20px" }} />
            </IconButton>
          </Tooltip>
        </Box>
        <Divider />
      </Grid>
    </Grid>
  );
};

export default memo(SubTaskOverviewCardHeader);
