import React, { memo, useEffect, useState } from "react";
import {
  Add,
  Groups,
  ExpandMore,
  PersonRemoveAlt1Rounded,
} from "@mui/icons-material";
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
import {
  closeCnfModal,
  openCnfModal,
} from "../../../../redux/action/confirmationModalSlice";
import {
  AddGoalManager,
  DirectlyRemoveGoalManager,
  InsertSuggestedGMember,
  InsertSuggestedIGmember,
  RemoveGMember,
  RemoveIGMember,
  getGoalDetail,
} from "../../../../api/modules/goalkpiModule";
import { toast } from "react-toastify";
import SuggestMemberDialog from "./SuggestMemberDialog";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../../redux/action/userSlice";

const BasicAccordion = ({ goalID, pending, displayBtns }) => {

  //console.log("displayBtns", displayBtns);

  //get user id
  const user = useSelector(selectUserDetails);
  const user_id = user?.reg_id;
  //get user id
  
  const gid = goalID;
  //get goal detail
  const [gAllDetails, setgoaldetail] = useState([]);
  const [getgoalRes, setgoalRes] = useState([]);

  const [get_id, set_id] = useState("");
  const [gettype, settype] = useState("");
  const [getpassname, setpassname] = useState("");

  const fetchAllGMembersData = async () => {
    try {
      const response = await getGoalDetail(gid);
      setgoalRes(response.goalRes);
      setgoaldetail(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllGMembersData();
  }, []);
  //get goal detail

  const [expanded, setExpanded] = useState("acceptedBy");
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const dispatch = useDispatch();

  const handleRemoveManager = (name, pass_id) => {
    set_id(pass_id);
    dispatch(
      openCnfModal({
        modalName: "removeManager",
        title: "Are you sure?",
        description: `Remove ${name} as Goal Manager`,
      })
    );
  };

  const gethandleDataYes = (type, pass_id, name) => {
    settype(type);
    set_id(pass_id);
    setpassname(name);
  };

  const handleYes = async () => {
    if (gettype === "assign_manager") {
      try {
        const response = await AddGoalManager(gid, get_id);
        settype("");
        set_id("");
        setpassname("");
        fetchAllGMembersData();
        dispatch(closeCnfModal({ modalName: "assignManager" }));
        toast.success(`${response.message}`);
      } catch (error) {
        toast.error(`${error.response?.data?.error}`);
        console.error(error);
      }
    }
    if (gettype === "acceptedBy" || gettype === "sentTo") {
      try {
        const response = await RemoveGMember(get_id);
        settype("");
        set_id("");
        setpassname("");
        fetchAllGMembersData();
        dispatch(closeCnfModal({ modalName: "removeMember" }));
        toast.success(`${response.message}`);
      } catch (error) {
        toast.error(`${error.response?.data?.error}`);
        console.error(error);
      }
    }
    if (gettype === "invited") {
      try {
        const Data = {
          user_id: user_id,
          igm_id: get_id,
          gid: gid,
          sent_to: getpassname,
        };
        const response = await RemoveIGMember(Data);
        settype("");
        set_id("");
        setpassname("");
        fetchAllGMembersData();
        dispatch(closeCnfModal({ modalName: "removeMember" }));
        toast.success(`${response.message}`);
      } catch (error) {
        toast.error(`${error.response?.data?.error}`);
        console.error(error);
      }
    }
    if (gettype === "suggested") {
      try {
        const response = await InsertSuggestedGMember(user_id, gid, get_id);
        settype("");
        set_id("");
        setpassname("");
        fetchAllGMembersData();
        dispatch(closeCnfModal({ modalName: "addMember" }));
        toast.success(`${response.message}`);
      } catch (error) {
        toast.error(`${error.response?.data?.error}`);
        console.error(error);
      }
    }
    if (gettype === "suggested-invite") {
      try {
        const response = await InsertSuggestedIGmember(user_id, gid, get_id); 
        settype("");
        set_id("");
        setpassname("");
        fetchAllGMembersData();
        dispatch(closeCnfModal({ modalName: "addMember" }));
        toast.success(`${response.message}`);
      } catch (error) {
        toast.error(`${error.response?.data?.error}`);
        console.error(error);
      }
    }
  };

  const handleRemoveManagerYes = async () => {
    try {
      const response = await DirectlyRemoveGoalManager(gid, get_id);
      settype("");
      set_id("");
      setpassname("");
      fetchAllGMembersData();
      dispatch(closeCnfModal({ modalName: "removeManager" }));
      toast.success(`${response.message}`);
    } catch (error) {
      toast.error(`${error.response?.data?.error}`);
      console.error(error);
    }
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
            {(!pending && (displayBtns === "all" || displayBtns === "some")) && (
              <Tooltip arrow title="Add Team Member" placement="right">
                <IconButton
                  aria-label="add"
                  color="primary"
                  onClick={() => dispatch(openModal("add-team-members"))}
                >
                  <Add />
                </IconButton>
              </Tooltip>
            )}
            {(!pending && displayBtns === "no") && (
              <Tooltip arrow title="Suggest Team Member" placement="right">
                <IconButton
                  aria-label="Suggest"
                  color="primary"
                  onClick={() => dispatch(openModal("suggest-team-members"))}
                >
                  <Add />
                </IconButton>
              </Tooltip>
            )}
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
              {getgoalRes.get_created_by_name}
            </Typography>
          </Box>
          {getgoalRes.gmanager != 0 && (
            <Box
              sx={{
                height: 46,
                background: "white",
                p: 2,
                mt: 1,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
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
                  {getgoalRes.get_gmanager_name}
                </Typography>
              </Box>

              {(!pending && (displayBtns === "all" || displayBtns === "some")) && (
                <Tooltip arrow title="Remove Manager" placement="left">
                  <IconButton
                    edge="end"
                    aria-label="remove"
                    onClick={() =>
                      handleRemoveManager(
                        getgoalRes.get_gmanager_name,
                        getgoalRes.gmanager
                      )
                    }
                  >
                    <PersonRemoveAlt1Rounded
                      sx={{ color: "#c7df19", fontSize: 20 }}
                    />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          )}

          <MembersChildAccordion
            value={"acceptedBy"}
            expanded={expanded}
            handleChange={() => handleChange("acceptedBy")}
            handleYesChange={gethandleDataYes}
            title={"Request Accepted By:"}
            bgColor={"#d6f3e9"}
            pending={pending}
            displayBtns={displayBtns}
            data={gAllDetails.GoalTeamMemberRes?.filter(
              (i) =>
                i.status === "accepted" && i.gmember != getgoalRes.gcreated_by
            )}
          />
          <MembersChildAccordion
            value={"sentTo"}
            expanded={expanded}
            handleChange={() => handleChange("sentTo")}
            handleYesChange={gethandleDataYes}
            title={"Request Sent To:"}
            bgColor={"#fcf0db"}
            pending={pending}
            displayBtns={displayBtns}
            data={gAllDetails.GoalTeamMemberRes?.filter(
              (i) => i.status === "send"
            )}
          />
          <MembersChildAccordion
            value={"invited"}
            expanded={expanded}
            handleChange={() => handleChange("invited")}
            handleYesChange={gethandleDataYes}
            title={"Invited Members:"}
            bgColor={"#fde1e1"}
            pending={pending}
            displayBtns={displayBtns}
            data={gAllDetails.InvitedGoalMemberRes}
          />
          {!pending && (
            <MembersChildAccordion
              value={"suggested"}
              expanded={expanded}
              handleChange={() => handleChange("suggested")}
              handleYesChange={gethandleDataYes}
              title={"Suggested Members:"}
              bgColor={"#dde2fa"}
              pending={pending}
              displayBtns={displayBtns}
              data={gAllDetails.SuggestedGoalMemberRes?.filter(
                (i) => i.status === "suggested"
              )}
            />
          )}
          {!pending && (
            <MembersChildAccordion
              value={"suggested-invite"}
              expanded={expanded}
              handleChange={() => handleChange("suggested-invite")}
              handleYesChange={gethandleDataYes}
              title={"Suggested Invite Members:"}
              bgColor={"lavenderblush"}
              pending={pending}
              displayBtns={displayBtns}
              data={gAllDetails.SuggestedInviteGoalMemberRes?.filter(
                (i) => i.status === "suggested"
              )}
            />
          )}
        </AccordionDetails>
      </Accordion>
      <ConfirmationDialog value={"addMember"} handleYes={handleYes} />
      <ConfirmationDialog value={"removeMember"} handleYes={handleYes} />
      <ConfirmationDialog value={"assignManager"} handleYes={handleYes} />
      <ConfirmationDialog
        value={"removeManager"}
        handleYes={handleRemoveManagerYes}
      />
      <ReduxDialog
        value="add-team-members"
        modalTitle="Add Team Members"
        showModalButton={false}
        modalSize="sm"
      >
        <AddMemberDialog
          id={gid}
          type={"goal"}
          refreshData={fetchAllGMembersData}
        />
      </ReduxDialog>

      <ReduxDialog
        value="suggest-team-members"
        modalTitle="Suggest Team Members"
        showModalButton={false}
        modalSize="sm"
      >
        <SuggestMemberDialog
          id={gid}
          type={"goal"}
          refreshData={fetchAllGMembersData}
        />
      </ReduxDialog>
    </Box>
  );
};

export default memo(BasicAccordion);
