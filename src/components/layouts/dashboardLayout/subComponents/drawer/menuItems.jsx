import React from "react";
import {
  Dashboard,
  CalendarMonth,
  Event,
  ListAlt,
  Groups,
  Badge,
  Adjust,
  AccountTree,
  AssignmentTurnedIn,
  Description,
  Archive,
  DeleteForever,
  HelpOutline,
  SupportAgent,
} from "@mui/icons-material";

const generateMenuItems = (portfolioId) => {
  const baseItems = [
    { icon: <Dashboard />, text: "Dashboard", link: "/dashboard" },
    {
      icon: <HelpOutline />,
      text: "Help Center",
      link: "https://www.decision168.com/help-center/",
    },
    {
      icon: <SupportAgent />,
      text: "Support",
      link: "https://support.dev.decision168.com/login",
    },
  ];

  // Check if a portfolioId is provided
  if (portfolioId) {
    const portfolioItems = [
      {
        icon: <CalendarMonth />,
        text: "Calendar",
        link: "/calendar",
        subItems: [
          { icon: <Event />, text: "Events", link: "/calendar-event-list" },
          { icon: <ListAlt />, text: "To Do's", link: "/calendar-todo-list" },
          {
            icon: <Groups />,
            text: "Meetings",
            link: "/calendar-meeting-list",
          },
        ],
      },
      { icon: <Badge />, text: "Portfolio", link: "/portfolio-view" },
      {
        icon: <Adjust />,
        text: "Goals & Strategies",
        link: "/portfolio-goals",
      },
      {
        icon: <AccountTree />,
        text: "Projects",
        link: `/portfolio-projects-list/${portfolioId}`,
      },
      {
        icon: <AssignmentTurnedIn />,
        text: "Tasks",
        link: "/portfolio-tasks-list",
      },
      { icon: <Description />, text: "File Cabinet", link: "/file-cabinet" },
      { icon: <Archive />, text: "Archive", link: "/archive" },
      { icon: <DeleteForever />, text: "Trash", link: "/trash" },
    ];

    return [baseItems[0], ...portfolioItems, baseItems[1], baseItems[2]];
  }

  return baseItems;
};

export default generateMenuItems;
