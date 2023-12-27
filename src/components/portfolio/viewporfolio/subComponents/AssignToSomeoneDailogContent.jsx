import { Typography, Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import SelectTeamMember from "../../../common/SelectTeamMember";
import { selectUserDetails } from "../../../../redux/action/userSlice";
import { useSelector } from "react-redux";
import { assignOpenWorkToMember } from "../../../../api/modules/porfolioModule";
import { toast } from "react-toastify";
import { closeCnfModal } from "../../../../redux/action/confirmationModalSlice";
import { useDispatch } from "react-redux";
import CircularLoader from "../../../common/CircularLoader";
import {
  getPortfolioTeamMembersAsync,
  selectPorfolioTeamMembers,
} from "../../../../redux/action/portfolioSlice";

export default function AssignToSomeoneDailogContent({
  result,
  memberName,
  memberRegId,
  pimId,
  portfolioId,
  fetchTeamMembers,
  handleClose,
}) {
  const [selectedMember, setSelectedMember] = useState("");
  const [otherTeamMembers, setOtherTeamMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector(selectUserDetails);
  const dispatch = useDispatch();
  const data = useSelector(selectPorfolioTeamMembers);
  // const userRegId = user?.reg_id;
  const userRegId = 1;
  const newMemberRegId = selectedMember;
  const oldMemberRegId = memberRegId;
  const oldMemberPrimaryId = pimId;

  useEffect(() => {
    const filteredData = data?.filter(
      (item) =>
        item.member_name !== memberName && item.working_status === "active"
    );
    setOtherTeamMembers(filteredData);
  }, [data, memberName]);

  const handleAssign = async () => {
    try {
      setLoading(true);

      const response = await assignOpenWorkToMember(
        userRegId,
        newMemberRegId,
        oldMemberRegId,
        oldMemberPrimaryId,
        portfolioId
      );
      dispatch(getPortfolioTeamMembersAsync(portfolioId));
      dispatch(closeCnfModal({ modalName: "changeStatus" }));
      handleClose();
      toast.success(`${response.message}`);
    } catch (error) {
      toast.error(`${error?.response?.data?.error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Typography
        component="p"
        sx={{ color: "red", fontSize: "12px", textAlign: "left", mb: 2 }}
      >
        {memberName} have some open projects or tasks. To Inactive, Please
        Assign to Someone!
      </Typography>

      <Typography
        component="p"
        sx={{ fontSize: "12px", textAlign: "left", mb: 1 }}
      >
        Open works:
      </Typography>

      <Box sx={{ mb: 2 }}>
        {result?.goal_countResult + result?.goal_tm_countResult !== 0 && (
          <Typography
            component="p"
            sx={{ fontSize: "12px", textAlign: "left", ml: 2 }}
          >
            {result?.goal_countResult + result?.goal_tm_countResult} goal(s)
          </Typography>
        )}

        {result?.strategies_countResult !== 0 && (
          <Typography
            component="p"
            sx={{ fontSize: "12px", textAlign: "left", ml: 2 }}
          >
            {result?.strategies_countResult} strategies
          </Typography>
        )}

        {result?.only_pro_countResult + result?.pro_tm_countResult !== 0 && (
          <Typography
            component="p"
            sx={{ fontSize: "12px", textAlign: "left", ml: 2 }}
          >
            {result?.only_pro_countResult + result?.pro_tm_countResult} planned
            content
          </Typography>
        )}

        {result?.task_countResult !== 0 && (
          <Typography
            component="p"
            sx={{ fontSize: "12px", textAlign: "left", ml: 2 }}
          >
            {result?.task_countResult} task(s)
          </Typography>
        )}

        {result?.subtask_countResult !== 0 && (
          <Typography
            component="p"
            sx={{ fontSize: "12px", textAlign: "left", ml: 2 }}
          >
            {result?.subtask_countResult} subtask(s)
          </Typography>
        )}
      </Box>

      <SelectTeamMember
        required={true}
        selectedMember={selectedMember}
        setSelectedMember={setSelectedMember}
        otherTeamMembers={otherTeamMembers}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          mt: 2,
        }}
      >
        <Button
          size="small"
          type="button"
          onClick={handleAssign}
          variant="contained"
          sx={{ ml: 1, width: "130px" }}
        >
          {loading ? <CircularLoader /> : "Assign"}
        </Button>
      </Box>
    </div>
  );
}
