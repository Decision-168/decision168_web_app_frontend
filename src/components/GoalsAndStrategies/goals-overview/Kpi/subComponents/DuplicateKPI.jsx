import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomLabelTextField from "../../../subComponents/CustomLabelTextField";
import KpiTabSection from "./KpiTabSection";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../../../redux/action/userSlice";
import { CopyStrategy } from "../../../../../api/modules/goalkpiModule";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { closeModal } from "../../../../../redux/action/modalSlice";
const DuplicateKPI = ({ kpiData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //get user id
  const user = useSelector(selectUserDetails);
  const user_id = user?.reg_id;
  //get user id

  const [formValues, setFormValues] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormValues({
      ...formValues,
      sname: `${kpiData?.sname} [copy]`,
      sid: kpiData?.sid,
      screated_by: "1", //user_id
      copy_detail: "everything",
      cust_strategy: "",
    });
  }, [kpiData]);

  const handleChange = (fieldName) => (event) => {
    setFormValues({
      ...formValues,
      [fieldName]: event.target.value,
    });
  };

  const handleCopyKpi = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await CopyStrategy(formValues);
      console.log(response.sid);
      navigate(`/kpi-overview/${response.sid}`);
      dispatch(closeModal("duplicate-kpi"));
      // Handling success
      toast.success(`${response.message}`);
    } catch (error) {
      // Handling error
      toast.error(`${error.response?.error}`);
      console.error("Error updating:", error);
    } finally {
      setLoading(false);
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
              label="KPI"
              name="sname"
              required={true}
              placeholder="Enter KPI..."
              value={formValues.sname}
              onChange={handleChange("sname")}
            />
            <Grid item xs={12}>
              <Box p={2} sx={{ background: "#f5f5f5" }}>
                <Typography
                  sx={{ fontSize: 15, fontWeight: "600", textAlign: "start" }}
                >
                  Import Options
                </Typography>
                <KpiTabSection
                  formValues={formValues}
                  setFormValues={setFormValues}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCopyKpi} variant="contained" size="small">
          Duplicate
        </Button>
      </DialogActions>
    </>
  );
};

export default DuplicateKPI;
