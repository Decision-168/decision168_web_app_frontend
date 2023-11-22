import React from "react";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import FlightIcon from "@mui/icons-material/Flight";

export const plans = [
  {
    id: 1,
    name: "Solo",
    isSpecialOffer: false,
    icon: <DirectionsRunIcon sx={{ color: "#C7DF19", width: "35px", height: "35px" }} />,
    description: "For individuals looking to organize & track their work",
    price: "0",
    validity: "Free forever",
    buttonText: "Selected",
    features: ["1 portfolio", "3 goals", "5 strategies per goal", "10 active projects", "unlimited team members", "unlimited task", "100 MB storage", "accountability tracking", "document collaboration", "kanban boards", "motivator", "internal chat", "52 posts / mo. content planner", "data recovery", "24/7 email support"],
  },
  {
    id: 2,
    name: "Professional",
    isSpecialOffer: false,
    icon: <DirectionsBikeIcon sx={{ color: "#C7DF19", width: "35px", height: "35px" }} />,
    description: "For the professional looking to collaborate with small teams to organize, track, start scaling.",
    price: "7.28",
    validity: "billed monthly",
    buttonText: "Upgrade",
    features: ["3 portfolios", "3 goals", "5 strategies per goal", "50 active projects", "unlimited team members", "unlimited task", "10 GB storage", "accountability tracking", "document collaboration", "kanban boards", "motivator (logo)", "internal chat", "100 posts / mo. content planner", "data recovery", "24/7 email support"],
  },
  {
    id: 3,
    name: "Business",
    isSpecialOffer: true,
    icon: <DirectionsCarIcon sx={{ color: "#C7DF19", width: "35px", height: "35px" }} />,
    description: "FOR A LIMITED TIME! A saving of over 56%",
    price: "201.60",
    validity: "billed annually",
    buttonText: "Upgrade",
    features: ["10 portfolios", "5 goals", "10 strategies per goal", "350 active projects", "unlimited team members", "unlimited task", "40 GB storage", "accountability tracking", "document collaboration", "kanban boards", "motivator (logo)", "internal chat", "300 posts / mo. content planner", "data recovery", "24/7 email support"],
  },
  {
    id: 4,
    name: "Enterprise",
    isSpecialOffer: false,
    icon: <FlightIcon sx={{ color: "#C7DF19", width: "35px", height: "35px" }} />,
    description: "Set clear goals & achieve objectives repeatedly. Contact us for customized pricing",
    price: 0,
    validity: "",
    buttonText: "Contact Sales",
    features: ["unlimited portfolio", "unlimited goals", "unlimited KPIs per goal", "unlimited active projects", "unlimited team members", "unlimited task", "custom storage", "accountability tracking", "document collaboration", "kanban boards", "motivator", "internal chat", "custom posts / mo. content planner", "data recovery", "24/7 email support"],
  },
];