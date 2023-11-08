import { Avatar, Box, Button, Grid, IconButton, Tooltip, Typography, useTheme } from "@mui/material";
import React, { memo } from "react";
import { stringAvatar } from "../../../helpers/stringAvatar";
import { ContentCopy, Delete, History, NoteAdd } from "@mui/icons-material";
import ProgressBar from "./ProgressBar";

const TitleWithActions = ({
  title,
  handleClick1,
  handleClick2,
  handleDelete,
  handleDuplicate,
  handleFileIt,
  handleViewHistory,
  btn1Text,
  btn2Text,
  btn1Icon,btn2Icon,
  description,progressHeading
}) => {
  const theme = useTheme();
  return (
    <>
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
            sx={{ bgcolor: theme.palette.primary.main, mr: 1 }}
            aria-label="goal"
          >
            {...stringAvatar(title)}
          </Avatar>
          <Typography
            sx={{
              color: "#343a40",
              fontWeight: "900",
              fontSize: "16px",
            }}
            textAlign={"start"}
          >
            {title}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={6} md={6} lg={6}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            pt: 1,
            pb: 1,
          }}
        >
          <Button
            variant="contained"
            startIcon={btn1Icon}
            size="small"
            sx={{ mr: 1 }}
            onClick={handleClick1}
          >
            {btn1Text}
          </Button>
          <Button
            variant="contained"
            startIcon={btn2Icon}
            size="small"
            onClick={handleClick2}
          >
            {btn2Text}
          </Button>
        </Box>
      </Grid>
      <Grid item xs={6} md={6} lg={6}>
        <Box
          sx={{
            display: "flex",
            alignItems: "bottom",
            justifyContent: "end",
            flexDirection: "row",
          }}
        >
          <Tooltip title="Duplicate">
            <IconButton onClick={handleDuplicate}>
              <ContentCopy sx={{ fontSize: "20px" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="File It">
            <IconButton onClick={handleFileIt}>
              <NoteAdd sx={{ fontSize: "20px" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={handleDelete}>
              <Delete sx={{ fontSize: "20px" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="View History">
            <IconButton onClick={handleViewHistory}>
              <History sx={{ fontSize: "20px" }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <Typography sx={{ fontSize: 14, color: "#212934", textAlign: "start" }}>
          {progressHeading}
        </Typography>
        <ProgressBar />
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <Typography sx={{ fontSize: 14, color: "#212934", textAlign: "start" }}>
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
          {description}
        </Typography>
      </Grid>
    </>
  );
};

export default memo(TitleWithActions);
