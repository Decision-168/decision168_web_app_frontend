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
  Grid,
} from "@mui/material";
import { stringAvatar } from "../../../../../helpers/stringAvatar";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const CustomCard = ({ item, handleOpen, value, handlePendingGoalOpen }) => {
  const formatDate = (timestamp) => {
    const formattedDate = moment(timestamp).format("YYYY-MM-DD");
    return formattedDate;
  };

  const handleOpenCondition = (type, gid, gname) => {
    if (["accepted-goals", "created-goals"].includes(type)) {
      handleOpen(gid, gname);
    } else {
      handlePendingGoalOpen(gid, gname);
    }
  };

  const handleRedirectCondition = (type, gid) => {
    if (["accepted-goals", "created-goals"].includes(type)) {
      navigate(`/goal-overview/${gid}`);
    } else {
      navigate(`/goal-overview-request/${gid}`);
    }
  };

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
        onClick={() => handleRedirectCondition(value, item?.gid)}
        sx={{
          borderRadius: 0,
          height: "130px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "start",
          pb: 1,
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
              {...stringAvatar(item?.gname)}
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
              {item?.gname}
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
            {item?.gdes ? item?.gdes : "No Description!"}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions
        sx={{
          justifyContent: "space-between",
          padding: "8px 4px",
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item>
            <Typography
              sx={{
                color: "#b5b5b5",
                textTransform: "uppercase",
                fontSize: "12px",
                pl: 1,
              }}
            >
              END: {formatDate(item?.gend_date)}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton
              aria-label="settings"
              onClick={() => handleOpenCondition(value, item?.gid, item?.gname)}
            >
              <VisibilityOutlined fontSize="small" />
            </IconButton>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};
export default memo(CustomCard);
