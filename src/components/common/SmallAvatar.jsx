import * as React from "react";
import Avatar from "@mui/material/Avatar";
import { stringAvatar } from "../../helpers/stringAvatar";
import { selectUserDetails } from "../../redux/action/userSlice";
import { useSelector } from "react-redux";

export default function SmallAvatar({ backColor }) {
  const user = useSelector(selectUserDetails);
  const fullName = `${user?.first_name} ${user?.middle_name} ${user?.last_name} `;

  return (
    <Avatar alt={fullName} src={user?.photo} sx={{ backgroundColor: backColor }}>
      {user?.photo ? null : stringAvatar(fullName)}
    </Avatar>
  );
}
