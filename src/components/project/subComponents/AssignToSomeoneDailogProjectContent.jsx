import { Typography, Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SelectOption from "../../common/SelectOption";
import CircularLoader from "../../common/CircularLoader";
import { UpdateProjectOpenWorkNewAssignee } from "../../../api/modules/ProjectModule";

export default function AssignToSomeoneDailogProjectContent({
  result,
  data,
  pid,
  portfolio_id,
  user_id,
  memberName,
  memberRegId,
  pm_id,
  handleClose,
  fetchAllPMembersData,
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
          pm_id: pm_id,
          portfolio_id: portfolio_id,
        };

        const response = await UpdateProjectOpenWorkNewAssignee(SendData);
        fetchAllPMembersData();
        handleClose();
        toast.success(`${response.message}`);
      } catch (error) {
        toast.error(`${error?.response?.data?.error}`);
        console.error("Error in assign open work to other team member:", error);
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