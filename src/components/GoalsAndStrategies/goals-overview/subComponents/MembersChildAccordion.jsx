import React, { memo } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Avatar,
  Box,
  List,
  Typography,
  AccordionSummary,
  AccordionDetails,
  Accordion,
} from "@mui/material";
import UserList from "./UserList";

const MembersChildAccordion = ({
  value,
  expanded,
  handleChange,
  title,
  bgColor,
  pending,
}) => {
  const username = ["Alim Mohammad", "Arshad Khan", "Syed Jameel"];
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
          {!pending && (
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
          )}
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        {username.map((item, index) => {
          return (
            <List key={index} sx={{ m: 0, p: 0 }}>
              <UserList username={item} assignManagerFlag={value} pending ={pending}/>
            </List>
          );
        })}
      </AccordionDetails>
    </Accordion>
  );
};
export default memo(MembersChildAccordion);
