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
  Notes,
  DashboardCustomize,
  Description,
  LibraryBooks,
  Diversity3,
  RecordVoiceOver,
  Archive,
  DeleteForever,
  HelpOutline,
  SupportAgent,
} from "@mui/icons-material";

export const menuItems = [
  { icon: <Dashboard />, text: "Dashboard", link: "/dashboard" },
  // {
  //   icon: <CalendarMonth />,
  //   text: "Calendar",
  //   link: "/calendar",
  //   subItems: [
  //     { icon: <Event />, text: "Events", link: "/calendar/events" },
  //     { icon: <ListAlt />, text: "To Do's", link: "/calendar/todos" },
  //     { icon: <Groups />, text: "Meetings", link: "/calendar/meetings" },
  //   ],
  // },
  { icon: <Badge />, text: "Portfolio", link: "/portfolio-view" },
  { icon: <Adjust />, text: "Goals & Strategies", link: "/portfolio-goals" },
  { icon: <AccountTree />, text: "Projects", link: "/projects" },
  { icon: <AssignmentTurnedIn />, text: "Tasks", link: "/tasks" },
  { icon: <Notes />, text: "Notes", link: "/notes" },
  // {
  //   icon: <DashboardCustomize />,
  //   text: "Content Planner",
  //   link: "/content-planner",
  // },
  { icon: <Description />, text: "File Cabinet", link: "/file-cabinet" },
  { icon: <LibraryBooks />, text: "My Report", link: "/reports" },
  // {
  //   icon: <Diversity3 />,
  //   text: "Community",
  //   link: "/community",
  //   subItems: [
  //     {
  //       icon: <RecordVoiceOver />,
  //       text: "Your Calls",
  //       link: "/community/calls",
  //     },
  //     {
  //       icon: <ListAlt />,
  //       text: "Community Posts",
  //       link: "/community/posts",
  //     },
  //   ],
  // },
  { icon: <Archive />, text: "Archive", link: "/archive" },
  { icon: <DeleteForever />, text: "Trash", link: "/trash" },
  { icon: <HelpOutline />, text: "Help Center", link: "/help" },
  { icon: <SupportAgent />, text: "Support", link: "/support" },
];
