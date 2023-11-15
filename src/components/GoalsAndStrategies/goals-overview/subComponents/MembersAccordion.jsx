import React, { memo, useState } from "react";
import { Add, Groups, ExpandMore, PersonRemoveAlt1Rounded } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Tooltip,
  Typography,
  AccordionDetails,
  AccordionSummary,
  Accordion,
} from "@mui/material";
import { openModal } from "../../../../redux/action/modalSlice";
import { useDispatch } from "react-redux";
import ConfirmationDialog from "../../../common/ConfirmationDialog";
import AddMemberDialog from "./AddMemberDialog";
import ReduxDialog from "../../../common/ReduxDialog";
import MembersChildAccordion from "./MembersChildAccordion";
import { openCnfModal } from "../../../../redux/action/confirmationModalSlice";

const BasicAccordion = ({}) => {
  const [expanded, setExpanded] = useState("acceptedBy");
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const dispatch = useDispatch();

  const handleRemoveManager = (name) => {
    dispatch(
      openCnfModal({
        modalName: "removeManager",
        title: "Are you sure?",
        description: `Remove ${name} as Goal Manager`,
      })
    );
  };

  return (
    <Box sx={{ borderRadius: 1 }}>
      <Accordion elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
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
            <Tooltip arrow title="Add Team Member" placement="right">
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
              p: 2,
              mt: 1,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent:'space-between'
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{ fontSize: 13, fontWeight: "600", color: "#343A40" }}
              >
                Goal Manager:
              </Typography>
              <Typography
                sx={{
                  ml: 1,
                  fontSize: 13,
                  fontWeight: "600",
                  color: "#343A40",
                }}
              >
                Uzma Karjikar
              </Typography>
            </Box>
            <Tooltip arrow title="Remove Manager" placement="left">
              <IconButton
                edge="end"
                aria-label="remove"
                onClick={() => handleRemoveManager("Uzma Karjikar")}
              >
                <PersonRemoveAlt1Rounded
                  sx={{ color: "#c7df19", fontSize: 20 }}
                />
              </IconButton>
            </Tooltip>
          </Box>

          <MembersChildAccordion
            value={"acceptedBy"}
            expanded={expanded}
            handleChange={() => handleChange("acceptedBy")}
            title={"Request Accepted By:"}
            bgColor={"#d6f3e9"}
          />
          <MembersChildAccordion
            value={"sentTo"}
            expanded={expanded}
            handleChange={() => handleChange("sentTo")}
            title={"Request Sent To:"}
            bgColor={"#fcf0db"}
          />
          <MembersChildAccordion
            value={"invited"}
            expanded={expanded}
            handleChange={() => handleChange("invited")}
            title={"Invited Members:"}
            bgColor={"#fde1e1"}
          />
          <MembersChildAccordion
            value={"suggested"}
            expanded={expanded}
            handleChange={() => handleChange("suggested")}
            title={"Suggested Members:"}
            bgColor={"#dde2fa"}
          />
          <MembersChildAccordion
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
      <ConfirmationDialog value={"removeManager"} />
      <ReduxDialog
        value="add-team-members"
        modalTitle="Add Team Members"
        showModalButton={false}
        modalSize="sm"
      >
        <AddMemberDialog />
      </ReduxDialog>
    </Box>
  );
};

export default memo(BasicAccordion);
