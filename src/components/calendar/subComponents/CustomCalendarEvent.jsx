import React from "react";
import { Adjust, AssignmentTurnedInOutlined, Notifications, Link } from "@mui/icons-material";
import { getCustomStyle } from "../getCustomStyle";
import { Box, Typography } from "@mui/material";

const CustomCalendarEvent = ({ event }) => {
  const type = event?.created_type;

  const renderIconAndTitle = () => {
    switch (type) {
      case "event":
        return (
          <>
            <AssignmentTurnedInOutlined sx={{ fontSize: "0.9rem", mx: 0.5, color: "inherite" }} />
            <Typography component="h6" sx={{ fontSize: "0.7rem", fontWeight: "500", color: "inherite" }}>
              {event?.title}
            </Typography>
          </>
        );
      case "todo":
        return (
          <>
            <Adjust sx={{ fontSize: "0.9rem", mx: 0.5, color: "inherite" }} />
            <Typography component="h6" sx={{ fontSize: "0.7rem", fontWeight: "500", color: "inherite" }}>
              {event?.title}
            </Typography>
          </>
        );
      case "reminder":
        return (
          <>
            <Notifications sx={{ fontSize: "0.9rem", mx: 0.5, color: "inherite" }} />
            <Typography component="h6" sx={{ fontSize: "0.7rem", fontWeight: "500", color: "inherite" }}>
              {event?.title}
            </Typography>
          </>
        );
      case "meeting":
        return (
          <>
            <Link sx={{ fontSize: "0.9rem", mx: 0.5, color: "inherite" }} />
            <Typography component="h6" sx={{ fontSize: "0.7rem", fontWeight: "500", color: "inherite" }}>
              {event?.title}
            </Typography>
          </>
        );
      default:
        return null;
    }
  };

  return <Box sx={getCustomStyle(event)}>{renderIconAndTitle()}</Box>;
};

export default CustomCalendarEvent;
