import React, { memo } from "react";
import {
  Avatar,
  Box,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  AddBox,
  DisabledByDefaultRounded,
  PersonAddAlt1,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { stringAvatar } from "../../../helpers/stringAvatar";
import { openCnfModal } from "../../../redux/action/confirmationModalSlice";

const UserList = ({
  assignManagerFlag,
  pending,
  displayBtns,
  data,
  passhandleYesChange,
}) => {
  const dispatch = useDispatch();
  let username = "";
  let pass_table_id = "";
  let pass_member_id = "";

  if (assignManagerFlag === "acceptedBy" || assignManagerFlag === "sentTo") {
    username = data.first_name + " " + data.last_name;
    pass_table_id = data.pm_id;
    pass_member_id = data.reg_id;
  } else if (assignManagerFlag === "invited") {
    username = data.sent_to;
    pass_table_id = data.im_id;
  } else if (assignManagerFlag === "suggested") {
    username = data.first_name + " " + data.last_name;
    pass_table_id = data.suggest_id;
  } else {
    username = data.suggest_id;
    pass_table_id = data.suggest_id;
  }

  const handleAddUser = (type, name, pass_id) => {
    passhandleYesChange(type, pass_id, name, "");
    dispatch(
      openCnfModal({
        modalName: "addMember",
        title: "Are you sure?",
        description: `You want to Add Member : ${name}`,
      })
    );
  };
  const handleRemoveUser = (type, name, pass_id, pass_member_id) => {
    passhandleYesChange(type, pass_id, name, pass_member_id);
    dispatch(
      openCnfModal({
        modalName: "removeMember",
        title: "Are you sure?",
        description: `You want to Remove Member : ${name}`,
      })
    );
  };
  const handleAssignManager = (name, pass_id) => {
    passhandleYesChange("assign_manager", pass_id, name, "");
    dispatch(
      openCnfModal({
        modalName: "assignManager",
        title: "Are you sure?",
        description: `Assign ${name} as Project Manager`,
      })
    );
  };
  return (
    <ListItem
      sx={{ m: 1, p: 0 }}
      secondaryAction={
        <Box>
          {assignManagerFlag === "acceptedBy" &&
            !pending &&
            (displayBtns === "all" || displayBtns === "some") && (
              <Tooltip arrow title="Assign as Manager" placement="left">
                <IconButton
                  edge="end"
                  aria-label="add"
                  onClick={() => handleAssignManager(username, pass_member_id)}
                >
                  <PersonAddAlt1 sx={{ color: "#c7df19", fontSize: 20 }} />
                </IconButton>
              </Tooltip>
            )}
          {(assignManagerFlag === "acceptedBy" ||
            assignManagerFlag === "sentTo" ||
            assignManagerFlag === "invited") &&
            !pending &&
            (displayBtns === "all" || displayBtns === "some") && (
              <Tooltip arrow title="Remove Member" placement="left">
                <IconButton
                  edge="end"
                  aria-label="remove"
                  onClick={() =>
                    handleRemoveUser(
                      assignManagerFlag,
                      username,
                      pass_table_id,
                      pass_member_id
                    )
                  }
                >
                  <DisabledByDefaultRounded sx={{ fontSize: 20 }} />
                </IconButton>
              </Tooltip>
            )}
          {(assignManagerFlag === "suggested" ||
            assignManagerFlag === "suggested-invite") &&
            !pending &&
            (displayBtns === "all" || displayBtns === "some") && (
              <Tooltip arrow title="Add Member" placement="left">
                <IconButton
                  edge="end"
                  aria-label="add"
                  onClick={() =>
                    handleAddUser(assignManagerFlag, username, pass_table_id)
                  }
                >
                  <AddBox sx={{ color: "#c7df19", fontSize: 20 }} />
                </IconButton>
              </Tooltip>
            )}
        </Box>
      }
    >
      <ListItemAvatar>
        <Avatar
          sx={{
            fontSize: 12,
            height: 32,
            width: 32,
            bgcolor: "#343a40",
          }}
        >
          {...stringAvatar(username)}
        </Avatar>
      </ListItemAvatar>
      <ListItemText>
        <Typography sx={{ fontSize: 14, color: "#343a40" }}>
          {username}
        </Typography>
      </ListItemText>
    </ListItem>
  );
};

export default memo(UserList);