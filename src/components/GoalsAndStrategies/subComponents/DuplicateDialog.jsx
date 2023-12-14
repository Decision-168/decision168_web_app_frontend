import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Grid,
  InputLabel,
  Typography,
  useTheme,
} from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import CustomLabelTextField from "./CustomLabelTextField";
import Duration from "./Duration";
import TabSection from "../goals-overview/subComponents/GoalTabSection";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../redux/action/userSlice";
import { toast } from "react-toastify";
import moment from "moment";
import { closeModal } from "../../../redux/action/modalSlice";
import { CopyGoal } from "../../../api/modules/goalkpiModule";
import CustomDatePicker from "../../common/CustomDatePicker";
import { parseISO } from "date-fns";

const DuplicateDialog = ({ goalData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  //get user id
  const user = useSelector(selectUserDetails);
  const user_id = user?.reg_id;
  //get user id

  const [formValues, setFormValues] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormValues({
      ...formValues,
      gname: `${goalData?.gname} [copy]`,
      gstart_date: goalData?.gstart_date
        ? parseISO(goalData.gstart_date)
        : null,
      gend_date: goalData?.gend_date ? parseISO(goalData.gend_date) : null,
      gid: goalData?.gid,
      gcreated_by: "1", //user_id
      copy_detail: "everything",
      cust_goal: "",
    });
  }, [goalData]);

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

  const handleCopyGoal = async (event) => {
    event.preventDefault();
    if (
      formValues.gname.trim() !== "" &&
      formValues.gstart_date &&
      formValues.gend_date &&
      moment(formValues.gstart_date, moment.ISO_8601, true).isValid() &&
      moment(formValues.gend_date, moment.ISO_8601, true).isValid()
    ) {
      setLoading(true);
      //console.log("formValues", formValues);
      try {
        const response = await CopyGoal(formValues);
        toast.success(`${response.message}`);
        navigate(`/goal-overview/${response.gid}`);
        dispatch(closeModal("duplicate-goal"));
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        // Handling error
        toast.error(`${error.response?.error}`);
        console.error("Error updating:", error);
      } finally {
        setLoading(false);
      }
    } else {
      // Show an error because gname is empty
      toast.error("Goal name, start date, and end date cannot be empty");
    }
  };

  return (
    <>
      <DialogContent dividers>
        <Box
          sx={{ flexGrow: 1, width: "100%", background: "white", p: 2 }}
          mb={2}
        >
          <Grid container spacing={2}>
            <CustomLabelTextField
              label="Goal"
              name="gname"
              required={true}
              placeholder="Enter Objective/Goal..."
              value={formValues.gname}
              onChange={handleChange("gname")}
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

            <Grid item xs={12}>
              <Box p={2} sx={{ background: "#f5f5f5" }}>
                <Typography
                  sx={{ fontSize: 15, fontWeight: "600", textAlign: "start" }}
                >
                  Import Options
                </Typography>
                <TabSection
                  formValues={formValues}
                  setFormValues={setFormValues}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCopyGoal} variant="contained" size="small">
          Duplicate
        </Button>
      </DialogActions>
    </>
  );
};

export default memo(DuplicateDialog);
