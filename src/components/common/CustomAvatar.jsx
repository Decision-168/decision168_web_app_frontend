import * as React from "react";
import Avatar from "@mui/material/Avatar";
import { stringAvatar } from "../../helpers/stringAvatar";


export default function CustomAvatar({ backColor, name }) {
  return <Avatar sx={{ backgroundColor: backColor }}>{stringAvatar(name)}</Avatar>;
}
