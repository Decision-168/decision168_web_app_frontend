import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import React, { memo } from "react";
import { stringAvatar } from "../../../helpers/stringAvatar";
import { ContentCopy, Delete, History, NoteAdd } from "@mui/icons-material";
import LinearProgressWithLabel from "../../common/LinearProgressWithLabel";
import useMediaQuery from "@mui/material/useMediaQuery";
const TitleWithActions = ({
  title,
  handleClick1,
  handleClick2,
  handleClick3,
  handleDelete,
  handleDuplicate,
  handleFileIt,
  handleViewHistory,
  btn1Text,
  btn2Text,
  btn3Text,
  btn1Icon,
  btn2Icon,
  btn3Icon,
  description,
  taskCount,
  progressHeading,
  progressPercentage,
  displayBtns,
}) => {
  const matches = useMediaQuery("(min-width:500px)");
  const theme = useTheme();
  const splitString = title.split(" ");
  const splitTitle = splitString[1];
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
            sx={{ bgcolor: theme.palette.secondary.main, mr: 1 }}
            aria-label="goal"
          >
            {...stringAvatar(splitTitle)}
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
      {(displayBtns === "all" || displayBtns === "some") && (
        <>
          <Grid item xs={12} sm={8} md={8} lg={8}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <Button
                  variant="contained"
                  startIcon={btn1Icon}
                  size="small"
                  sx={{ mr: 1, width: "100%" }}
                  onClick={handleClick1}
                >
                  {btn1Text}
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <Button
                  variant="contained"
                  startIcon={btn2Icon}
                  size="small"
                  sx={{ mr: 1, width: "100%" }}
                  onClick={handleClick2}
                >
                  {btn2Text}
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={4}>
                {btn3Text && (
                  <Button
                    variant="contained"
                    startIcon={btn3Icon}
                    size="small"
                    sx={{ mr: 1, width: "100%" }}
                    onClick={handleClick3}
                  >
                    {btn3Text}
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <Box
              sx={{
                display: "flex",
                alignItems: "bottom",
                justifyContent: !matches ? "center" : "end",
                flexDirection: "row",
              }}
            >
              {displayBtns === "all" && (
                <>
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
                </>
              )}
              <Tooltip arrow title="View History">
                <IconButton onClick={handleViewHistory}>
                  <History sx={{ fontSize: "20px" }} />
                </IconButton>
              </Tooltip>
            </Box>
          </Grid>
        </>
      )}
      {taskCount ? (
        <>
          <Grid item xs={12} md={12} lg={12}>
            <Typography
              sx={{ fontSize: 14, color: "#212934", textAlign: "start" }}
            >
              {progressHeading}
            </Typography>
            <LinearProgressWithLabel value={progressPercentage} />
          </Grid>
        </>
      ) : (
        <></>
      )}

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
