import { Typography, Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CircularLoader from "../../../common/CircularLoader";
import { UpdateGoalOpenWorkNewAssignee } from "../../../../api/modules/goalkpiModule";
import SelectOption from "../../../common/SelectOption";

export default function AssignToSomeoneDailogGoalContent({
  result,
  data,
  gid,
  portfolio_id,
  user_id,
  memberName,
  memberRegId,
  gmid_id,
  handleClose,
  fetchAllGMembersData,
}) {
  const [selectedMember, setSelectedMember] = useState({ memberID: null });
  const [otherTeamMembers, setOtherTeamMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const filteredData = data?.filter((item) => item.reg_id !== memberRegId);
    setOtherTeamMembers(filteredData);
  }, [data, memberRegId]);

  const handleAssign = async () => {
    const new_memID = selectedMember?.memberID;
    if (new_memID === null) {
      toast.error("Please select member to assign.");
    } else {
      try {
        setLoading(true);
        const SendData = {
          reg_id: user_id,
          new_reg_id: new_memID,
          old_reg_id: memberRegId,
          gmid_id: gmid_id,
          portfolio_id: portfolio_id,
        };

        const response = await UpdateGoalOpenWorkNewAssignee(SendData);
        fetchAllGMembersData();
        handleClose();
        toast.success(`${response.message}`);
      } catch (error) {
        toast.error(`${error?.response?.data?.error}`);
      } finally {
        setLoading(false);
      }
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
        {result?.strategies_countResult !== 0 && (
          <Typography
            component="p"
            sx={{ fontSize: "12px", textAlign: "left", ml: 2 }}
          >
            {result?.strategies_countResult} KPI(s)
          </Typography>
        )}

        {result?.only_pro_countResult + result?.pro_tm_countResult !== 0 && (
          <Typography
            component="p"
            sx={{ fontSize: "12px", textAlign: "left", ml: 2 }}
          >
            {result?.only_pro_countResult + result?.pro_tm_countResult}{" "}
            Project(s)
          </Typography>
        )}

        {result?.task_countResult !== 0 && (
          <Typography
            component="p"
            sx={{ fontSize: "12px", textAlign: "left", ml: 2 }}
          >
            {result?.task_countResult} Task(s)
          </Typography>
        )}

        {result?.subtask_countResult !== 0 && (
          <Typography
            component="p"
            sx={{ fontSize: "12px", textAlign: "left", ml: 2 }}
          >
            {result?.subtask_countResult} Subtask(s)
          </Typography>
        )}
      </Box>

      <SelectOption
        label=""
        required={false}
        field="memberID" // Unique identifier for this field
        idKey="reg_id" // Key to identify each option
        getOptionLabel={(option) => `${option.first_name} ${option.last_name}`} // which want to display after select
        staticOptions={otherTeamMembers || []} // Your static options array
        formValues={selectedMember}
        setFormValues={setSelectedMember}
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
