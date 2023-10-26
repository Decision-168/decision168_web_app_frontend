import * as React from "react";
import Avatar from "@mui/material/Avatar";
import { stringAvatar } from "../../helpers/stringAvatar";

export default function BackgroundLetterAvatars({ avatarBgColor }) {
  return <Avatar {...stringAvatar("Arshad Khan")} sx={{ backgroundColor: avatarBgColor }} />;
}
