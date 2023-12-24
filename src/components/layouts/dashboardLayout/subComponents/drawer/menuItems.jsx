// import {
//   Dashboard,
//   CalendarMonth,
//   Event,
//   ListAlt,
//   Groups,
//   Badge,
//   Adjust,
//   AccountTree,
//   AssignmentTurnedIn,
//   Notes,
//   DashboardCustomize,
//   Description,
//   LibraryBooks,
//   Diversity3,
//   RecordVoiceOver,
//   Archive,
//   DeleteForever,
//   HelpOutline,
//   SupportAgent,
// } from "@mui/icons-material";
// const portfolioId = JSON.parse(localStorage.getItem("portfolioId"));
// console.log("portfolio id:", portfolioId)
// export const menuItems = [
//   { icon: <Dashboard />, text: "Dashboard", link: "/dashboard" },
//   // {
//   //   icon: <CalendarMonth />,
//   //   text: "Calendar",
//   //   link: "/calendar",
//   //   subItems: [
//   //     { icon: <Event />, text: "Events", link: "/calendar/events" },
//   //     { icon: <ListAlt />, text: "To Do's", link: "/calendar/todos" },
//   //     { icon: <Groups />, text: "Meetings", link: "/calendar/meetings" },
//   //   ],
//   // },
//   { icon: <Badge />, text: "Portfolio", link: "/portfolio-view" },
//   { icon: <Adjust />, text: "Goals & Strategies", link: "/portfolio-goals" },
//   {
//     icon: <AccountTree />,
//     text: "Projects",
//     link: `/portfolio-projects-list/${portfolioId}`,
//   },
//   {
//     icon: <AssignmentTurnedIn />,
//     text: "Tasks",
//     link: "/portfolio-tasks-list",
//   },
//   // { icon: <Notes />, text: "Notes", link: "/notes" },
//   // {
//   //   icon: <DashboardCustomize />,
//   //   text: "Content Planner",
//   //   link: "/content-planner",
//   // },
//   { icon: <Description />, text: "File Cabinet", link: "/file-cabinet" },
//   // { icon: <LibraryBooks />, text: "My Report", link: "/reports" },
//   // {
//   //   icon: <Diversity3 />,
//   //   text: "Community",
//   //   link: "/community",
//   //   subItems: [
//   //     {
//   //       icon: <RecordVoiceOver />,
//   //       text: "Your Calls",
//   //       link: "/community/calls",
//   //     },
//   //     {
//   //       icon: <ListAlt />,
//   //       text: "Community Posts",
//   //       link: "/community/posts",
//   //     },
//   //   ],
//   // },
//   { icon: <Archive />, text: "Archive", link: "/archive" },
//   { icon: <DeleteForever />, text: "Trash", link: "/trash" },
//   {
//     icon: <HelpOutline />,
//     text: "Help Center",
//     link: "https://www.decision168.com/help-center/",
//   },
//   {
//     icon: <SupportAgent />,
//     text: "Support",
//     link: "https://support.dev.decision168.com/login",
//   },
// ];

// MenuItems.js

import React from 'react';
import {
  Dashboard,
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
  return [
    { icon: <Dashboard />, text: "Dashboard", link: "/dashboard" },
    { icon: <Badge />, text: "Portfolio", link: "/portfolio-view" },
    { icon: <Adjust />, text: "Goals & Strategies", link: "/portfolio-goals" },
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
};

export default generateMenuItems;