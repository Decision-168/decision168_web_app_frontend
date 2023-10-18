import { Stack, Typography, IconButton } from "@mui/material";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GoogleIcon from "@mui/icons-material/Google";
import React from "react";

export default function SocialMedia({title}) {
  return (
    <Stack direction="column" spacing={1}>
      <Typography component="p" variant="body1">
       {title}
      </Typography>

      <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
        <IconButton aria-label="facebook">
          <FacebookRoundedIcon sx={{ color: "white" }} />
        </IconButton>
        <IconButton aria-label="linkedIn">
          <LinkedInIcon sx={{ color: "white" }} />
        </IconButton>
        <IconButton aria-label="google">
          <GoogleIcon sx={{ color: "white" }} />
        </IconButton>
      </Stack>
    </Stack>
  );
}
