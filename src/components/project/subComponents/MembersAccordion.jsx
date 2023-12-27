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
import {
  closeCnfModal,
  openCnfModal,
} from "../../../redux/action/confirmationModalSlice";
import { openModal } from "../../../redux/action/modalSlice";
import ConfirmationDialog from "../../common/ConfirmationDialog";
import ReduxDialog from "../../common/ReduxDialog";
import MembersChildAccordion from "./MembersChildAccordion";
import AddMemberDialog from "./AddMemberDialog";
import {
  AddProjectManager,
  DirectlyRemoveProjectManager,
  InsertSuggestedInvitedProjectMember,
  InsertSuggestedProjectMember,
  RemoveInvitedProjectMember,
  RemoveProjectMember,
  getProjectDetail,
} from "../../../api/modules/ProjectModule";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../redux/action/userSlice";
import AssignToSomeoneDailogProjectContent from "./AssignToSomeoneDailogProjectContent";
import CustomDialog from "../../common/CustomDialog";
import SuggestMemberDialog from "./SuggestMemberDialog";

const BasicAccordion = ({ pid, pending, displayBtns }) => {
  //get user id
  const user = useSelector(selectUserDetails);
  const userID = user?.reg_id;
  //get user id

  const [open, setOpen] = useState(false);
  const [result, setResult] = useState({});
  //get project detail
  const [gAllDetails, setprojectdetail] = useState([]);
  const [getprojectRes, setprojectRes] = useState([]);

  const [get_id, set_id] = useState("");
  const [gettype, settype] = useState("");
  const [getpassname, setpassname] = useState("");
  const [getpassmemberid, setpassmemberid] = useState("");
  const [goalId, setGoalId] = useState(null);

  const fetchAllPMembersData = async () => {
    try {
      const response = await getProjectDetail(pid);
      setprojectRes(response.project);
      setprojectdetail(response);
      setGoalId(response.project.gid);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllPMembersData();
  }, [pid]);
  //get project detail

  const [expanded, setExpanded] = useState("acceptedBy");
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveManager = (name, pass_id) => {
    set_id(pass_id);
    dispatch(
      openCnfModal({
        modalName: "removeManager",
        title: "Are you sure?",
        description: `Remove ${name} as Project Manager`,
      })
    );
  };

  const gethandleDataYes = (type, pass_id, name, pass_member_id) => {
    settype(type);
    set_id(pass_id);
    setpassname(name);
    setpassmemberid(pass_member_id);
  };

  const handleYes = async () => {
    if (gettype === "assign_manager") {
      try {
        const response = await AddProjectManager(pid, get_id);
        settype("");
        set_id("");
        setpassname("");
        fetchAllPMembersData();
        dispatch(closeCnfModal({ modalName: "assignManager" }));
        toast.success(`${response.message}`);
      } catch (error) {
        toast.error(`${error.response?.data?.error}`);
        console.error(error);
      }
    }
    if (gettype === "acceptedBy" || gettype === "sentTo") {
      try {
        const response = await RemoveProjectMember(get_id);
        if (response.message) {
          settype("");
          set_id("");
          setpassname("");
          setpassmemberid("");
          fetchAllPMembersData();
          dispatch(closeCnfModal({ modalName: "removeMember" }));
          toast.success(`${response.message}`);
        } else {
          dispatch(closeCnfModal({ modalName: "removeMember" }));
          setResult(response);
          handleClickOpen();
        }
      } catch (error) {
        toast.error(`${error.response?.data?.error}`);
        console.error(error);
      }
    }
    if (gettype === "invited") {
      try {
        const Data = {
          user_id: userID,
          im_id: get_id,
          pid: pid,
          sent_to: getpassname,
        };
        const response = await RemoveInvitedProjectMember(Data);
        settype("");
        set_id("");
        setpassname("");
        fetchAllPMembersData();
        dispatch(closeCnfModal({ modalName: "removeMember" }));
        toast.success(`${response.message}`);
      } catch (error) {
        toast.error(`${error.response?.data?.error}`);
        console.error(error);
      }
    }
    if (gettype === "suggested") {
      try {
        const response = await InsertSuggestedProjectMember(userID, pid, get_id);
        settype("");
        set_id("");
        setpassname("");
        fetchAllPMembersData();
        dispatch(closeCnfModal({ modalName: "addMember" }));
        toast.success(`${response.message}`);
      } catch (error) {
        toast.error(`${error.response?.data?.error}`);
        console.error(error);
      }
    }
    if (gettype === "suggested-invite") {
      try {
        const response = await InsertSuggestedInvitedProjectMember(userID, pid, get_id);
        settype("");
        set_id("");
        setpassname("");
        fetchAllPMembersData();
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
      const response = await DirectlyRemoveProjectManager(pid, get_id);
      settype("");
      set_id("");
      setpassname("");
      fetchAllPMembersData();
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
            {!pending && (displayBtns === "all" || displayBtns === "some") && (
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
            {!pending && displayBtns === "no" && (
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
              Project Owner:
            </Typography>
            <Typography
              sx={{ ml: 1, fontSize: 13, fontWeight: "600", color: "white" }}
            >
              {getprojectRes.get_created_by_name}
            </Typography>
          </Box>
          {getprojectRes.pmanager != 0 && (
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
                  Project Manager:
                </Typography>
                <Typography
                  sx={{
                    ml: 1,
                    fontSize: 13,
                    fontWeight: "600",
                    color: "#343A40",
                  }}
                >
                  {getprojectRes.get_pmanager_name}
                </Typography>
              </Box>

              {!pending &&
                (displayBtns === "all" || displayBtns === "some") && (
                  <Tooltip arrow title="Remove Manager" placement="left">
                    <IconButton
                      edge="end"
                      aria-label="remove"
                      onClick={() =>
                        handleRemoveManager(
                          getprojectRes.get_pmanager_name,
                          getprojectRes.pmanager
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
            data={gAllDetails.ProjectTeamMemberRes?.filter(
              (i) =>
                i.status === "accepted" && i.pmember != getprojectRes.pcreated_by
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
            data={gAllDetails.ProjectTeamMemberRes?.filter(
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
            data={gAllDetails.InvitedProjectMemberRes}
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
              data={gAllDetails.SuggestedProjectMemberRes?.filter(
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
              data={gAllDetails.SuggestedInviteProjectMemberRes?.filter(
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
      <CustomDialog
        handleClose={handleClose}
        open={open}
        modalTitle={`Remove ${getpassname}`}
        showModalButton={false}
        modalSize="sm"
      >
        <AssignToSomeoneDailogProjectContent
          result={result}
          data={gAllDetails.ProjectTeamMemberRes}
          pid={pid}
          portfolio_id={getprojectRes.portfolio_id}
          user_id={userID}
          memberName={getpassname}
          memberRegId={getpassmemberid}
          pm_id={get_id}
          handleClose={handleClose}
          fetchAllPMembersData={fetchAllPMembersData}
        />
      </CustomDialog>
      <ReduxDialog
        value="add-team-members"
        modalTitle="Add Team Members"
        showModalButton={false}
        modalSize="sm"
      >
        <AddMemberDialog
          id={pid}
          gid={goalId}
          type={"project"}
          refreshData={fetchAllPMembersData}
        />
      </ReduxDialog>

      <ReduxDialog
        value="suggest-team-members"
        modalTitle="Suggest Team Members"
        showModalButton={false}
        modalSize="sm"
      >
        <SuggestMemberDialog
          id={pid}
          gid={goalId}
          type={"project"}
          refreshData={fetchAllPMembersData}
        />
      </ReduxDialog>
    </Box>
  );
};

export default memo(BasicAccordion);
