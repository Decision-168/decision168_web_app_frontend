import {
  Autocomplete,
  Box,
  Button,
  DialogActions,
  DialogContent,
  Grid,
  InputLabel,
  TextField,
  useTheme,
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
import CustomDatePicker from "../../../../common/CustomDatePicker";

const Goal = ({ individual, onUpdate }) => {
  const theme = useTheme();
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
    gname: null,
    gdept: "",
    gdes: null,
    gcreated_by: "1", //user_id
    portfolio_id: "2", //portfolio_id
    gmanager: "",
    team_member: [],
    imemail: [],
  });

  useEffect(() => {
    // Callback to parent component with updated form values
    if(!individual){
    onUpdate(formValues);
    }
  
  }, [formValues])

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

  
  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log (value);
    setFormValues((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  useEffect(() => {
    setAvailableMembers(memberData);
  }, [memberData]);

  const handleStartDateChange = (date) => {
    setFormValues({
      ...formValues,
      gstart_date: date,
    });
  };

  const handleEndDateChange = (date) => {
    setFormValues({
      ...formValues,
      gend_date: date,
    });
  };

  // const CommonForm = ({}) => {
  //   return (

  //   );
  // };

  return (
    <>
      {individual ? (
        <DialogContent dividers>
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
            <InviteMembers
              formValues={formValues}
              setFormValues={setFormValues}
            />
            <Grid container alignItems="center" style={{ marginLeft: "16px" }}>
              <Grid item xs={2}>
                <InputLabel sx={{ fontSize: "14px" }}>
                  Duration
                  <span style={{ color: theme.palette.error.main }}> *</span>
                </InputLabel>
              </Grid>
              <Grid item xs={10} container spacing={1}>
                <Grid item xs={5}>
                  <CustomDatePicker
                    label=""
                    value={formValues.gstart_date}
                    onChange={handleStartDateChange}
                  />
                </Grid>
                <Grid item xs={5}>
                  <CustomDatePicker
                    label=""
                    value={formValues.gend_date}
                    onChange={handleEndDateChange}
                  />
                </Grid>
              </Grid>
            </Grid>
            {/* <Duration
          label="Duration "
          labelColor=""
          individual={individual}
          required={true}
          onDateChange={handleDateChange}
        /> */}
            <CustomMultilineTextField
              label="Description"
              name="gdes"
              required={false}
              placeholder="Enter Description..."
              value={formValues.gdes}
              onChange={handleChange("gdes")}
            />
          </Grid>
        </DialogContent>
      ) : (
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
          <InviteMembers
            formValues={formValues}
            setFormValues={setFormValues}
          />
          <Grid container alignItems="center" style={{ marginLeft: "16px" }}>
            <Grid item xs={2}>
              <InputLabel sx={{ fontSize: "14px" }}>
                Duration
                <span style={{ color: theme.palette.error.main }}> *</span>
              </InputLabel>
            </Grid>
            <Grid item xs={10} container spacing={1}>
              <Grid item xs={5}>
                <CustomDatePicker
                  label=""
                  value={formValues.gstart_date}
                  onChange={handleStartDateChange}
                />
              </Grid>
              <Grid item xs={5}>
                <CustomDatePicker
                  label=""
                  value={formValues.gend_date}
                  onChange={handleEndDateChange}
                />
              </Grid>
            </Grid>
          </Grid>
          {/* <Duration
          label="Duration "
          labelColor=""
          individual={individual}
          required={true}
          onDateChange={handleDateChange}
        /> */}
          <CustomMultilineTextField
            label="Description"
            name="gdes"
            required={false}
            placeholder="Enter Description..."
            value={formValues.gdes}
            onChange={handleChange("gdes")}
          />
        </Grid>
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