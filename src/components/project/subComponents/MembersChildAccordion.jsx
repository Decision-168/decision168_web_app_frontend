import React, { memo } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Avatar, Box, List, Typography, AccordionSummary, AccordionDetails, Accordion } from "@mui/material";
import UserList from "./UserList";
import { useTheme } from "@mui/material/styles";

const MembersChildAccordion = ({ value, expanded, handleChange, handleYesChange, title, bgColor, pending, displayBtns, data }) => {
  const theme = useTheme();
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
          {!pending && data?.length > 0 && (
            <Avatar
              sx={{
                width: 16,
                height: 16,
                background: theme.palette.tertiary.main,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "0.7rem",
                ml: 1,
              }}
            >
              {data?.length}
            </Avatar>
          )}
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        {data?.map((item, index) => {
          return (
            <List key={index} sx={{ m: 0, p: 0 }}>
              <UserList data={item} assignManagerFlag={value} pending={pending} displayBtns={displayBtns} passhandleYesChange={handleYesChange} />
            </List>
          );
        })}
      </AccordionDetails>
    </Accordion>
  );
};
export default memo(MembersChildAccordion);
