import React, { useState, memo } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { stringAvatar } from "../../../../helpers/stringAvatar";
import { PersonRemove } from "@mui/icons-material";

const ChildAccordion = ({ value, expanded, handleChange, title, bgColor }) => {
  return (
    <Accordion expanded={expanded === value} onChange={handleChange(value)}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
        sx={{ background: bgColor }}
      >
        <Typography
          sx={{
            color: "#383838",
            fontWeight: "500",
            fontSize: 12,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {title}
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
            1
          </Avatar>
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List sx={{ m: 0, p: 0 }}>
          <ListItem
            sx={{ m: 0, p: 0 }}
            secondaryAction={
              <IconButton edge="end" aria-label="remove">
                <PersonRemove />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar
                sx={{
                  p: 0.2,
                  fontSize: 12,
                }}
              >
                {...stringAvatar("Alim Mohammad")}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={"Alim Mohammad"} />
          </ListItem>
        </List>
      </AccordionDetails>
    </Accordion>
  );
};
export default memo(ChildAccordion);
