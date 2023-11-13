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

const CustomCard = ({ item, handleClick, handleOpen, value }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        maxWidth: "100%",
        height: "200px",
        borderLeft:
          value === "accepted-goals"
            ? `7px solid ${theme.palette.secondary.main}`
            : `7px solid ${theme.palette.primary.main}`,
        borderRadius: "10px",
      }}
    >
      <CardActionArea onClick={handleClick} sx={{ borderRadius: 0 }}>
        <CardHeader
          sx={{ pb: 0 }}
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
                fontWeight: "900",
                fontSize: "18px",
              }}
              textAlign={"start"}
            >
              {item?.goals?.name}
            </Typography>
          }
        />
        <CardContent>
          <Typography
            variant="body2"
            sx={{
              color: "#555a5f",
              fontWeight: "400",
              fontSize: "12px",
            }}
            textAlign={"start"}
          >
            {item?.goals?.description ? item?.goals?.description :"No Description!"}
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
      <CardActions sx={{ justifyContent: "end", padding: "1px 4px" }}>
        <IconButton aria-label="settings" onClick={handleOpen}>
          <VisibilityOutlined fontSize="small" />
        </IconButton>
      </CardActions>
    </Card>
  );
};
export default memo(CustomCard);
