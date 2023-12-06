import React from "react";
import { Box, Avatar } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { stringAvatar } from "../../helpers/stringAvatar";
import Client from "./Client";

export default function CardAvatar({ fullName, photo, designation }) {
  const theme = useTheme();
  return (
    <Box
      px={4}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "-50px",
      }}>
      <Avatar
        alt={fullName?.toUpperCase()}
        src={photo}
        sx={{
          width: "100px",
          height: "100px",
          backgroundColor: theme.palette.primary.main,
          border: "5px solid white",
        }}>
        {typeof photo === "string" && photo ? null : stringAvatar(fullName?.toUpperCase())}
      </Avatar>
      <Client clientName={fullName} designation={designation} />
    </Box>
  );
}
