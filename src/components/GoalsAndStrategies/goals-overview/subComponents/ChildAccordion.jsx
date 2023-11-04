import React, { memo } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Avatar, Box, List,
} from "@mui/material";
import UserList from "./UserList";

const ChildAccordion = ({ value, expanded, handleChange, title, bgColor }) => {
  const username = ["Alim Mohammad","Arshad Khan","Syed Jameel"]
  return (
    <Accordion expanded={expanded === value} onChange={handleChange(value)}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
        sx={{
          background: bgColor,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Typography
            sx={{
              color: "#383838",
              fontWeight: "500",
              fontSize: 12,
            }}
          >
            {title}
          </Typography>
          <Avatar
            sx={{
              width: 16,
              height: 16,
              background: "tomato",
              p: 0.2,
              fontSize: 10,
              ml: 1,
            }}
          >
            {username.length}
          </Avatar>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        {username.map((item, index) => {
          return (
            <List key={index} sx={{ m: 0, p: 0 }}>
              <UserList username={item} />
            </List>
          );
        })}
      </AccordionDetails>
    </Accordion>
  );
};
export default memo(ChildAccordion);
