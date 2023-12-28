import React from "react";
import { Box, Avatar, Skeleton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { stringAvatar } from "../../helpers/stringAvatar";
import Client from "./Client";

export default function CardAvatar({ fullName, photo, designation }) {
  const theme = useTheme();

  // Function to render either the avatar image or the skeleton based on the presence of the photo
  const renderAvatar = () => {
    if (typeof photo === "string" && photo) {
      return (
        <Avatar
          alt={fullName?.toUpperCase()}
          src={photo}
          sx={{
            width: "100px",
            height: "100px",
            backgroundColor: theme.palette.primary.main,
            border: "5px solid white",
          }}
        />
      );
    } else {
      return (
        <Skeleton
          variant="circular"
          width={100}
          height={100}
          animation={false}
          sx={{
            backgroundColor:"#E3E3E3",
            border: "5px solid white",
          }}
        />
      );
    }
  };

  return (
    <Box
      px={4}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "-50px",
      }}
    >
      {renderAvatar()}
      <Client clientName={fullName} designation={designation} />
    </Box>
  );
}
