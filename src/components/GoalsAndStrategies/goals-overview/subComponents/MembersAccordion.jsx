import React, { memo, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Add, Groups } from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";
import ChildAccordion from "./ChildAccordion";
import { openModal } from "../../../../redux/action/modalSlice";
import { useDispatch } from "react-redux";
import ConfirmationDialog from "../../../common/ConfirmationDialog";

const BasicAccordion = ({}) => {
  const [expanded, setExpanded] = useState("acceptedBy");
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const dispatch = useDispatch();
  return (
    <Box sx={{ borderRadius: 1 }}>
      <Accordion elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Groups sx={{ color: "#495057", fontSize: 20 }} />
          <Typography
            sx={{ color: "#495057", fontSize: 15, fontWeight: "600", ml: 0.5 }}
          >
            Members
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Typography
              sx={{
                color: "#495057",
                fontSize: 15,
                fontWeight: "600",
              }}
            >
              Team Members
            </Typography>
            <Tooltip title="Add Team Member" placement="right">
              <IconButton
                aria-label="add"
                color="primary"
                onClick={() => dispatch(openModal("add-team-members"))}
              >
                <Add />
              </IconButton>
            </Tooltip>
          </Box>
          <Box
            sx={{
              height: 46,
              background: "#343A40",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              p: 2,
              mt: 1,
            }}
          >
            <Typography
              sx={{ fontSize: 13, fontWeight: "600", color: "white" }}
            >
              Goal Owner:
            </Typography>
            <Typography
              sx={{ ml: 1, fontSize: 13, fontWeight: "600", color: "white" }}
            >
              Don Mahmood
            </Typography>
          </Box>
          <Box
            sx={{
              height: 46,
              background: "white",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              p: 2,
              mt: 1,
            }}
          >
            <Typography
              sx={{ fontSize: 13, fontWeight: "600", color: "#343A40" }}
            >
              Goal Manager:
            </Typography>
            <Typography
              sx={{ ml: 1, fontSize: 13, fontWeight: "600", color: "#343A40" }}
            >
              Uzma Karjikar
            </Typography>
          </Box>
          <ChildAccordion
            value={"acceptedBy"}
            expanded={expanded}
            handleChange={() => handleChange("acceptedBy")}
            title={"Request Accepted By:"}
            bgColor={"#d6f3e9"}
          />
          <ChildAccordion
            value={"sentTo"}
            expanded={expanded}
            handleChange={() => handleChange("sentTo")}
            title={"Request Sent To:"}
            bgColor={"#fcf0db"}
          />
          <ChildAccordion
            value={"invited"}
            expanded={expanded}
            handleChange={() => handleChange("invited")}
            title={"Invited Members:"}
            bgColor={"#fde1e1"}
          />
          <ChildAccordion
            value={"suggested"}
            expanded={expanded}
            handleChange={() => handleChange("suggested")}
            title={"Suggested Members:"}
            bgColor={"#dde2fa"}
          />
          <ChildAccordion
            value={"suggested-invite"}
            expanded={expanded}
            handleChange={() => handleChange("suggested-invite")}
            title={"Suggested Invite Members:"}
            bgColor={"lavenderblush"}
          />
        </AccordionDetails>
      </Accordion>
      <ConfirmationDialog value={"removeMember"} />
      <ConfirmationDialog value={"assignManager"} />
    </Box>
  );
};

export default memo(BasicAccordion);
