import * as React from "react";
import Avatar from "@mui/material/Avatar";

function stringAvatar(name) {
  return {
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

export default function BackgroundLetterAvatars({ avatarBgColor }) {
  return <Avatar {...stringAvatar("Arshad Khan")} sx={{ backgroundColor: avatarBgColor }} />;
}
