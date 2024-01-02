import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PlaylistAddOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import PersonIcon from "@mui/icons-material/Person";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import SocialDistanceOutlinedIcon from "@mui/icons-material/SocialDistanceOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import { RadioButtonUnchecked } from "@mui/icons-material";

export const menuItems = [
  { icon: <HomeOutlinedIcon />, text: "Dashboard", link: "/super-admin/dashboard" },
  { icon: <PlaylistAddOutlinedIcon />, text: "Quotes", link: "/super-admin/quotes-list" },
  { icon: <PeopleAltIcon />, text: "Registered Users", link: "/super-admin/registered-list" },
  { icon: <LocalAtmIcon />, text: "Pricing", link: "/super-admin/pricing-list" },
  { icon: <PersonIcon />, text: "Enterprise Leads", link: "/super-admin/contacted-sales-list" },
  { icon: <AddPhotoAlternateOutlinedIcon />, text: "Ad Setting", link: "/super-admin/ad-list" },
  { icon: <ConfirmationNumberOutlinedIcon />, text: "Coupon Setting", link: "/super-admin/coupon-list" },
  {
    icon: <SocialDistanceOutlinedIcon />,
    text: "Community",
    link: "/super-admin/community",
    subItems: [
      { icon: <RadioButtonUnchecked sx={{ fontSize: "large", minWidth: "40px" }} />, text: "Decision Makers", link: "/super-admin/community" },
      {
        icon: <RadioButtonUnchecked sx={{ fontSize: "large", minWidth: "40px" }} />,
        text: "Categories",
        link: "/super-admin/decision-maker-category",
      },
      { icon: <RadioButtonUnchecked sx={{ fontSize: "large", minWidth: "40px" }} />, text: "Agreement", link: "/super-admin/agreement" },
    ],
  },
  { icon: <SupportAgentOutlinedIcon />, text: "Ticket Management", link: "/super-admin/support-list" },
  { icon: <PeopleAltIcon />, text: "Supporters", link: "/super-admin/supporters" },
];
