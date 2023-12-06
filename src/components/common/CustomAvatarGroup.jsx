import React, { useEffect, useState } from "react";
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
import { useSelector } from "react-redux";
import { stringAvatar } from "../../helpers/stringAvatar";

export default function CustomAvatarGroup({ data }) {
  const [activeTeamMembers, setActiveTeamMembers] = useState([]);

  useEffect(() => {
    const filteredData = data?.filter((item) => item.working_status === "active");
    setActiveTeamMembers(filteredData);
  }, [data]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "baseline",
      }}>
      <AvatarGroup max={6} total={activeTeamMembers?.length}>
        {activeTeamMembers?.map((member, index) => (
          <Avatar
            alt={member?.member_name?.toUpperCase()}
            src={member?.photo}
            sx={{ bgcolor: "black", fontSize: "0.9rem" }}>
            {typeof member?.photo === "string" && member?.photo
              ? null
              : stringAvatar(member?.member_name?.toUpperCase())}
          </Avatar>
        ))}
      </AvatarGroup>
    </Box>
  );
}
