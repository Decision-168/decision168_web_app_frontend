import * as React from "react";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Avatar1 from "../../assets/images/avatar-1.jpg";
import Avatar2 from "../../assets/images/avatar-2.jpg";
import Avatar3 from "../../assets/images/avatar-3.jpg";
import Avatar4 from "../../assets/images/avatar-4.jpg";
import Avatar5 from "../../assets/images/avatar-5.jpg";
import Avatar6 from "../../assets/images/avatar-6.jpg";
import Avatar7 from "../../assets/images/avatar-7.jpg";
import Avatar8 from "../../assets/images/avatar-8.jpg";
import { Box } from "@mui/material";

export default function CustomAvatarGroup() {
  return (
    <Box sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "baseline" }}>
      <AvatarGroup max={6} total={8}>
        <Avatar alt="Avatar1" src={Avatar1} />
        <Avatar alt="Avatar2" src={Avatar2} />
        <Avatar alt="Avatar3" src={Avatar3} />
        <Avatar alt="Avatar4" src={Avatar4} />
        <Avatar alt="Avatar5" src={Avatar5} />
        <Avatar alt="Avatar6" src={Avatar6} />
        <Avatar alt="Avatar7" src={Avatar7} />
        <Avatar alt="Avatar8" src={Avatar8} />
      </AvatarGroup>
    </Box>
  );
}
