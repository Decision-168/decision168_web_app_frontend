import {
  Autocomplete,
  Box,
  Button,
  DialogActions,
  DialogContent,
  Grid,
  InputLabel,
  TextField,
} from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import CustomMultilineTextField from "../../../subComponents/CustomMultilineTextField";
import InviteMembers from "../../../subComponents/InviteMembers";
import Duration from "../../../subComponents/Duration";

import { getGoalCreateDD } from "../../../../../api/modules/goalkpiModule";
import SelectDepartment from "../../../../common/SelectDepartment";
import SelectGoalManager from "../../../../common/SelectGoalManager";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../../../redux/action/userSlice";
import moment from "moment";
import CustomLabelTextField from "../../../subComponents/CustomLabelTextField";

const Goal = ({ individual, onUpdate }) => {
  //get user id
  const user = useSelector(selectUserDetails);
  const user_id = user?.reg_id;
  //get user id
  const [departments, setdepartments] = useState([]);
  const [assignee, setassignee] = useState([]);
  const [memberData, setmemberData] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [memberInputValue, setMemberInputValue] = useState("");
  const [availableMembers, setAvailableMembers] = useState([]);

  const [formValues, setFormValues] = useState({
    gname: "",
    gdept: "",
    gstart_date: "",
    gend_date: "",
    gdes: "",
    gcreated_by: "1", //user_id
    portfolio_id: "2", //portfolio_id
    gmanager: "",
    team_member: [],
    imemail: [],
  });

  useEffect(() => {
    // Callback to parent component with updated form values
    onUpdate(formValues);
  }, [formValues, onUpdate]);

  useEffect(() => {
    const fetchAllHistoryData = async () => {
      try {
        const response = await getGoalCreateDD("2", "1"); //portfolio_id,user_id
        if (response) {
          setdepartments(response.PortfolioDepartmentRes);
          setassignee(response.AssignManagerListRes);
          setmemberData(response.AssignMemberListRes);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllHistoryData();
  }, []);

  useEffect(() => {
    setAvailableMembers(memberData);
  }, [memberData]);

  const handleChange = (fieldName) => (event) => {
    setFormValues({
      ...formValues,
      [fieldName]: event.target.value,
    });
  };

  const handleDateChange = ({ startDate, endDate }) => {
    console.log("startDate", startDate);
    console.log("endDate", endDate);
    const parsedstartDate = moment(startDate);
    const parsedendDate = moment(endDate);
    const PassformattedstartDate = parsedstartDate.format("YYYY-MM-DD");
    const PassformattedendDate = parsedendDate.format("YYYY-MM-DD");
    console.log("PassformattedstartDate", PassformattedstartDate);
    console.log("PassformattedendDate", PassformattedendDate);

    setFormValues({
      ...formValues,
      gstart_date: PassformattedstartDate,
      gend_date: PassformattedendDate,
    });
  };

  const CommonForm = ({}) => {
    return (
      <Grid container spacing={2} px={individual && 2}>
        <CustomLabelTextField
          label="Objective/Goal"
          name="gname"
          required={true}
          placeholder="Enter Objective/Goal..."
          value={formValues.gname}
          onChange={handleChange("gname")}
        />
        <SelectDepartment
          required={true}
          departments={departments}
          formValues={formValues}
          setFormValues={setFormValues}
        />

        <SelectGoalManager
          required={false}
          managers={assignee}
          formValues={formValues}
          setFormValues={setFormValues}
        />
        <Grid item xs={2} alignSelf={"center"}>
          <InputLabel sx={{ fontSize: "14px" }}>Select Members</InputLabel>
        </Grid>
        <Grid item xs={7}>
          <Autocomplete
            multiple
            value={selectedMembers}
            fullWidth
            options={availableMembers}
            getOptionLabel={(option) => option.name}
            getOptionSelected={(option, value) => option.id === value.id}
            onChange={(event, newMembers) => {
              setSelectedMembers(newMembers);
              const members = newMembers?.map((member) => member.id);
              setAvailableMembers(
                memberData.filter((member) => !newMembers.includes(member))
              );
              setFormValues({
                ...formValues,
                team_member: members,
              });
            }}
            inputValue={memberInputValue}
            onInputChange={(event, newMemberInputValue) => {
              setMemberInputValue(newMemberInputValue);
            }}
            renderInput={(params) => {
              return <TextField {...params} />;
            }}
          />
        </Grid>
        <InviteMembers formValues={formValues} setFormValues={setFormValues} />
        <Duration
          label="Duration "
          labelColor=""
          individual={individual}
          required={true}
          onDateChange={handleDateChange}
        />
        <CustomMultilineTextField
          label="Description"
          name="gdes"
          required={false}
          placeholder="Enter Description..."
          value={formValues.gdes}
          onChange={handleChange("gdes")}
        />
      </Grid>
    );
  };

  return (
    <>
      {individual ? (
        <DialogContent dividers>
          <CommonForm />
        </DialogContent>
      ) : (
        <CommonForm />
      )}

      {individual && (
        <DialogActions>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "end",
              pt: 1,
              width: "100%",
            }}
          >
            <Box sx={{ flex: "1 1 auto" }} />
            <Button variant="contained" size="small">
              Save Changes
            </Button>
          </Box>
        </DialogActions>
      )}
    </>
  );
};

export default memo(Goal);
