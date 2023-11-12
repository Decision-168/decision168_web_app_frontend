import React, { memo } from "react";
import { Avatar, Box, Button, Divider, Grid, IconButton, Tooltip, Typography, useMediaQuery, useTheme } from "@mui/material";
import { ContentCopy, Delete, NoteAdd } from "@mui/icons-material";
import AssignmentIcon from "@mui/icons-material/Assignment";

const OverviewCardHeader = ({ title, handleClick1, handleClick2, handleClick3, handleDuplicate, handleFileIt, handleDelete, btn1Text, btn2Text, btn3Text, btn1Icon, btn2Icon, btn3Icon }) => {
  const theme = useTheme();
  const isSamllScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid container>
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
      <Grid item xs={12} sm={9} lg={6}>
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
          <Button variant="contained" startIcon={btn2Icon} size="small" onClick={handleClick2} sx={{ mr: 1 }}>
            {btn2Text}
          </Button>
          <Button variant="contained" startIcon={btn3Icon} size="small" onClick={handleClick3}>
            {btn3Text}
          </Button>
        </Box>
        <Divider />
      </Grid>
      <Grid item xs={12} sm={3} lg={6}>
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

export default memo(OverviewCardHeader);
