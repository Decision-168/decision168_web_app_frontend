import React, { Fragment, memo } from "react";
import { useTheme } from "@mui/material/styles";
import { VisibilityOutlined } from "@mui/icons-material";
import {
  CardActionArea,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  AvatarGroup,
} from "@mui/material";
import { stringAvatar } from "../../../helpers/stringAvatar";
import { useNavigate } from "react-router-dom";

const ProjectCard = ({ item, handleOpen, value }) => {
  const theme = useTheme();
  const navigate = useNavigate()
  return (
    <Card
      sx={{
        maxWidth: "100%",
        borderLeft:
          value === "accepted-project"
            ? `7px solid ${theme.palette.secondary.main}`
            : `7px solid ${theme.palette.primary.main}`,
        borderRadius: "10px",
      }}
    >
      <CardActionArea
        onClick={() => navigate("/projects-overview")}
        sx={{
          borderRadius: 0,
          height: "120px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "start",
        }}
      >
        <CardHeader
          sx={{
            padding: "10px 5px",
            "& .MuiCardHeader-avatar": {
              marginRight: "8px !important",
            },
          }}
          avatar={
            <Avatar
              sx={{ bgcolor: theme.palette.secondary.main }}
              aria-label="goal"
            >
              {...stringAvatar(item?.project?.name)}
            </Avatar>
          }
          title={
            <Typography
              sx={{
                color: "#343a40",
                fontWeight: "600",
                fontSize: "14px",
              }}
              textAlign={"start"}
            >
              {item?.project?.name}
            </Typography>
          }
        />
        <CardContent
          sx={{
            "&.MuiCardContent-root": {
              padding: "0px 10px ",
            },
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "#555a5f",
              fontWeight: "400",
              fontSize: "12px",
            }}
            textAlign={"start"}
          >
            {item?.project?.description
              ? item?.project?.description
              : "No Description!"}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions
        sx={{
          justifyContent: "space-between",
          padding: "8px 4px",
        }}
      >
        <AvatarGroup max={5}>
          {item?.acceptedTeam?.map((it, index) => {
            return (
              <Avatar
                key={index}
                sx={{
                  bgcolor: theme.palette.primary.main,
                  color: theme.palette.secondary.main,
                  width: 32,
                  height: 32,
                  fontSize: 15,
                }}
              >
                {...stringAvatar(it)}
              </Avatar>
            );
          })}
        </AvatarGroup>
        <IconButton aria-label="settings" onClick={handleOpen}>
          <VisibilityOutlined fontSize="small" />
        </IconButton>
      </CardActions>
    </Card>
  );
};
export default memo(ProjectCard);
