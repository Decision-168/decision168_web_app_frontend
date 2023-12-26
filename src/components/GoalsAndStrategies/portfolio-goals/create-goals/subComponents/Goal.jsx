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

import {
  EditGoal,
  getGoalCreateDD,
  getGoalDetail,
} from "../../../../../api/modules/goalkpiModule";
import SelectDepartment from "../../../../common/SelectDepartment";
import SelectGoalManager from "../../../../common/SelectGoalManager";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../../../redux/action/userSlice";
import moment from "moment";
import CustomLabelTextField from "../../../subComponents/CustomLabelTextField";
import CustomDatePicker from "../../../../common/CustomDatePicker";
import MultiSelectOptionGrid from "../../../../common/MultiSelectOptionGrid";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { closeModal } from "../../../../../redux/action/modalSlice";

const Goal = ({ individual, onUpdate, passGID, refreshGoalOverview }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  //get user id
  const user = useSelector(selectUserDetails);
  const user_id = user?.reg_id;
  //get user id

  const storedPorfolioId = JSON.parse(localStorage.getItem("portfolioId"));

  const [departments, setdepartments] = useState([]);
  const [assignee, setassignee] = useState([]);
  const [memberData, setmemberData] = useState([]);
  const [availableMembers, setAvailableMembers] = useState([]);

  const [formValues, setFormValues] = useState({
    gname: "",
    gdept: "",
    gdes: "",
    gcreated_by: user_id,
    portfolio_id: storedPorfolioId,
    gmanager: 0,
    gstart_date: new Date(),
    gend_date: new Date(),
    team_member: [],
    imemail: [],
  });

  useEffect(() => {
    // Callback to parent component with updated form values
    if (!individual) {
      onUpdate(formValues);
    }
  }, [formValues]);

  useEffect(() => {
    const fetchAllHistoryData = async () => {
      try {
        const response = await getGoalCreateDD(storedPorfolioId, user_id);
        if (response) {
          setdepartments(response.PortfolioDepartmentRes);
          setassignee(response.AssignManagerListRes);
          setmemberData(response.AssignMemberListRes);
        }
      } catch (error) {}
    };

    fetchAllHistoryData();
  }, [storedPorfolioId, user_id]);

  useEffect(() => {
    setAvailableMembers(memberData);
  }, [memberData]);

  const handleChange = (fieldName) => (event) => {
    setFormValues({
      ...formValues,
      [fieldName]: event.target.value,
    });
  };

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

  //Goal Edit Part

  const [getGDetail, setGDetail] = useState([]);
  const [getGMembers, setGMembers] = useState([]);
  if (passGID) {
    useEffect(() => {
      const fetchAllEditGoalData = async () => {
        try {
          const response = await getGoalDetail(passGID);
          setGDetail(response.goalRes);
          const getGMembersData = response.GoalTeamMemberRes;
          const gmembers = getGMembersData
            .filter((member) => member.reg_id != response.goalRes?.gcreated_by)
            .map((member) => member.reg_id);
          setGMembers(gmembers);
        } catch (error) {}
      };
      fetchAllEditGoalData();
    }, [passGID]);
  }

  useEffect(() => {
    const gStartDate = getGDetail?.gstart_date
      ? new Date(getGDetail.gstart_date)
      : new Date();

    const gendDate = getGDetail?.gend_date
      ? new Date(getGDetail.gend_date)
      : new Date();

    setFormValues({
      gname: getGDetail?.gname,
      gdept: getGDetail?.gdept,
      gdes: getGDetail?.gdes,
      gcreated_by: user_id,
      portfolio_id: storedPorfolioId,
      gmanager: getGDetail?.gmanager,
      gstart_date: gStartDate,
      gend_date: gendDate,
      team_member: getGMembers,
      imemail: [],
    });
  }, [getGDetail, getGMembers]);

  const handleGoalEdit = async () => {
    let { gmanager, gstart_date, portfolio_id, ...newFormValues } = formValues;
    newFormValues.gid = passGID;

    const requiredEditFields = ["gname", "gdept", "gend_date"];

    const areAllEditFieldsFilled = requiredEditFields.every(
      (efield) => newFormValues[efield]
    );

    if (!areAllEditFieldsFilled) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const { imemail } = newFormValues;
      const edata = {
        ...newFormValues,
        imemail: imemail.map((item) => item.email),
      };

      const response = await EditGoal(edata);
      toast.success(`${response.message}`);
      refreshGoalOverview();
      dispatch(closeModal("edit-goals"));
    } catch (error) {
      // Handling error

      toast.error(`${error.response?.error}`);
    }
  };

  //Goal Edit Part

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
            <Grid item xs={12} sm={2} md={2} lg={2} alignSelf={"center"}>
              <InputLabel sx={{ fontSize: "14px", textAlign: "start" }}>
                End Date
                <span style={{ color: theme.palette.error.main }}> *</span>
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={10} md={10} lg={10}>
              <CustomDatePicker
                label=""
                value={formValues.gend_date}
                onChange={handleEndDateChange}
              />
            </Grid>
            <CustomMultilineTextField
              label="Description"
              name="gdes"
              required={false}
              placeholder="Enter Description..."
              value={formValues.gdes}
              onChange={handleChange("gdes")}
            />
            <MultiSelectOptionGrid
              label="Members"
              required={false}
              field="team_member"
              idKey="id"
              getOptionLabel={(option) => option.name}
              staticOptions={memberData}
              formValues={formValues}
              setFormValues={setFormValues}
            />
            <InviteMembers
              formValues={formValues}
              setFormValues={setFormValues}
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

          <MultiSelectOptionGrid
            label="Members"
            required={false}
            field="team_member"
            idKey="id"
            getOptionLabel={(option) => option.name}
            staticOptions={memberData}
            formValues={formValues}
            setFormValues={setFormValues}
          />

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
            <Button variant="contained" size="small" onClick={handleGoalEdit}>
              Save Changes
            </Button>
          </Box>
        </DialogActions>
      )}
    </>
  );
};

export default memo(Goal);
