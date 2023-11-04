import React, { memo } from "react";
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { DisabledByDefaultRounded } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { openCnfModal } from "../../../../redux/action/confirmationModalSlice";
import { stringAvatar } from "../../../../helpers/stringAvatar";
const UserList = ({ username }) => {
  const dispatch = useDispatch();

  const handleRemoveUser = (name) => {
    dispatch(
      openCnfModal({
        modalName: "removeMember",
        title: "Are you sure?",
        description: `You want to Remove Member : ${name}`,
      })
    );
  };
  return (
    <ListItem
      sx={{ m: 1, p: 0 }}
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="remove"
          onClick={() => handleRemoveUser(username)}
        >
          <DisabledByDefaultRounded />
        </IconButton>
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
