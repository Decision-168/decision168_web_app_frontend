import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import { Box } from "@mui/material";
import { stringAvatar } from "../../helpers/stringAvatar";
import TeamViewProfileDialogContent from "../profile/subComponents/TeamViewProfileDialogContent";
import CustomDialog from "./CustomDialog";

export default function CustomAvatarGroup({ data }) {
  const [activeTeamMembers, setActiveTeamMembers] = useState([]);
  const [open, setOpen] = useState(false);
  const [memberID, setMemberID] = useState("");

  //Dailog code
  const handleOpenDailog = (member) => {
    setMemberID(member);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const filteredData = data?.filter(
      (item) => item.working_status === "active"
    );
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
      }}
    >
      <AvatarGroup max={6} total={activeTeamMembers?.length}>
        {activeTeamMembers?.map((member, index) => (
          <Avatar
            onClick={() => handleOpenDailog(member.reg_id)}
            alt={member?.member_name?.toUpperCase()}
            src={member?.photo}
            sx={{ bgcolor: "black", fontSize: "0.9rem", cursor: "pointer" }}
          >
            {typeof member?.photo === "string" && member?.photo
              ? null
              : stringAvatar(member?.member_name?.toUpperCase())}
          </Avatar>
        ))}
      </AvatarGroup>
      <CustomDialog
        open={open}
        handleClose={handleClose}
        modalTitle="Team Profile"
        modalSize="md"
      >
        <TeamViewProfileDialogContent memberID={memberID} />
      </CustomDialog>
    </Box>
  );
}
