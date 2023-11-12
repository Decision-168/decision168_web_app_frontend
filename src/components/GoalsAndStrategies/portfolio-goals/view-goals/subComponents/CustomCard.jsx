import React, { memo } from "react";
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
} from "@mui/material";
import { stringAvatar } from "../../../../../helpers/stringAvatar";
import { useNavigate } from "react-router-dom";

const CustomCard = ({ item, handleOpen, value }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        maxWidth: "100%",
        borderLeft:
          value === "accepted-goals"
            ? `7px solid ${theme.palette.secondary.main}`
            : `7px solid ${theme.palette.primary.main}`,
        borderRadius: "10px",
      }}
    >
      <CardActionArea
        onClick={() => navigate("/goal-overview")}
        sx={{
          borderRadius: 0,
          height: "120px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "start",
          pb:1
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
              {...stringAvatar(item?.goals?.name)}
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
              {item?.goals?.name}
            </Typography>
          }
        />
        <CardContent
          sx={{
            "&.MuiCardContent-root": {
              padding: "0px 10px 5px",
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
            {item?.goals?.description
              ? item?.goals?.description
              : "No Description!"}
          </Typography>
          <Typography
            sx={{
              color: "#b5b5b5",
              textTransform: "uppercase",
              fontSize: "12px",
              pl: 1,
              textAlign: "end",
            }}
          >
            END: 2023-04-30
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions
        sx={{
          justifyContent: "end",
          padding: "8px 4px",
        }}
      >
        <IconButton aria-label="settings" onClick={handleOpen}>
          <VisibilityOutlined fontSize="small" />
        </IconButton>
      </CardActions>
    </Card>
  );
};
export default memo(CustomCard);
