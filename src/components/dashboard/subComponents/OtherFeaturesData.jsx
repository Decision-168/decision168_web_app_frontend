import { Stack, Typography } from "@mui/material";
import React from "react";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";
import { useTheme } from "@mui/material/styles";

export default function OtherFeaturesData({ type, text }) {
  const theme = useTheme();
  return (
    <>
      <Stack
        direction="row"
        justifyContent="start"
        alignItems="center"
        spacing={2}
        p={2}
        sx={{
          "&:hover": {
            color: theme.palette.primary.dark,
            "& .type-text": {
              color: "black",
            },
          },
        }}>
        <ArrowCircleRightOutlinedIcon />
        <Typography component="div" variant="subtitle2" className="type-text">
          {type}
        </Typography>
        <ArrowRightAltOutlinedIcon />
        <Typography component="div" variant="body2" gutterBottom>
          {text}
        </Typography>
      </Stack>
    </>
  );
}
