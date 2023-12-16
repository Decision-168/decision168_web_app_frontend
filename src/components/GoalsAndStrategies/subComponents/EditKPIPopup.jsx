import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Grid,
  useTheme,
} from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import CustomLabelTextField from "./CustomLabelTextField";
import CustomMultilineTextField from "./CustomMultilineTextField";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../redux/action/userSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { closeModal } from "../../../redux/action/modalSlice";
import CircularLoader from "../../common/CircularLoader";
import { EditStrategy } from "../../../api/modules/goalkpiModule";

const EditKPIPopup = ({ kpiData, fetchAllKPIDataFun }) => {
  const theme = useTheme();
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
      sname: kpiData?.sname,
      sdes: kpiData?.sdes,
      sid: kpiData?.sid,
      user_id: user_id, 
    });
  }, [kpiData]);

  const handleChange = (fieldName) => (event) => {
    setFormValues({
      ...formValues,
      [fieldName]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const data = { ...formValues };
      const response = await EditStrategy(data);
      fetchAllKPIDataFun();
      dispatch(closeModal("edit-kpi"));
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

  const handleCloseEditKPI = () => {
    dispatch(closeModal("edit-kpi"));
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent dividers>
          <Grid container>
            <CustomLabelTextField
              label="KPI"
              name="sname"
              required={true}
              placeholder="Enter KPi..."
              value={formValues.sname}
              onChange={handleChange("sname")}
            />
            <CustomMultilineTextField
              label="Description"
              name="sdes"
              required={false}
              placeholder="Enter Description..."
              value={formValues.sdes}
              onChange={handleChange("sdes")}
            />
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            size="small"
            onClick={handleCloseEditKPI}
            sx={{
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.secondary.light,
              "&:hover": { backgroundColor: theme.palette.secondary.dark },
            }}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained" size="small">
            {loading ? <CircularLoader /> : "Save changes"}
          </Button>
        </DialogActions>
      </Box>
    </>
  );
};

export default memo(EditKPIPopup);
