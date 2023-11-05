import React, { memo } from "react";
import {
  Avatar,
  Box,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { DisabledByDefaultRounded, PersonAddAlt1 } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { openCnfModal } from "../../../../redux/action/confirmationModalSlice";
import { stringAvatar } from "../../../../helpers/stringAvatar";
const UserList = ({ username, assignManagerFlag }) => {
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
    const handleAssignManager = (name) => {
      dispatch(
        openCnfModal({
          modalName: "assignManager",
          title: "Are you sure?",
          description: `Assign ${name} as Goal Manager`,
        })
      );
    };
  return (
    <ListItem
      sx={{ m: 1, p: 0 }}
      secondaryAction={
        <Box>
        {
          assignManagerFlag==="acceptedBy" &&   
          <IconButton
            edge="end"
            aria-label="remove"
            onClick={() => handleAssignManager(username)}
          >
            <PersonAddAlt1 sx={{color:'#c7df19',fontSize: 20, }}/>
          </IconButton>
        }
        
          <IconButton
            edge="end"
            aria-label="remove"
            onClick={() => handleRemoveUser(username)}
          >
            <DisabledByDefaultRounded sx={{fontSize: 20,}}/>
          </IconButton>
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
