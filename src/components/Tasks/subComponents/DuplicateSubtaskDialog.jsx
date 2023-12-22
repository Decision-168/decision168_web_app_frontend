import { Box, Button, DialogActions, DialogContent, Grid, Typography } from "@mui/material";
import React, { memo, useState, useEffect } from "react";
import CustomLabelTextField from "../../common/CustomLabelTextField";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../redux/action/userSlice";
import CircularLoader from "../../common/CircularLoader";
import { closeModal } from "../../../redux/action/modalSlice";
import { toast } from "react-toastify";
import { duplicateSubtask } from "../../../api/modules/taskModule";
import DuplicateSubTaskTabSection from "./DuplicateSubTaskTabSection";

const DuplicateSubtaskDialog = ({ subtaskData, closeModalName }) => {
  const [subTaskName, setSubTaskName] = useState("");
  const [tabvalue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUserDetails);
  // const userId = user?.reg_id;
  const userId = 1; // for testing

  useEffect(() => {
    if (subtaskData) {
      setSubTaskName(`${subtaskData?.stname} [copy]`);
    }
  }, [subtaskData]);

  const handleSubTaskDuplicate = async () => {
    try {
      setLoading(true);

      const data = {
        stid: subtaskData?.stid,
        stname: subTaskName,
        copy_detail: tabvalue === 0 ? "everything" : "custom",
        user_id: userId,
      };

      const response = await duplicateSubtask(data);

      navigate(`/subtasks-overview/${response?.insertedSubTaskId}`);
      dispatch(closeModal(closeModalName));
      toast.success(`${response?.message}`);
    } catch (error) {
      console.log(error);
      toast.error(`${error?.response?.data?.error}`);
      console.error("Error in task Duplication:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DialogContent dividers>
        <Box sx={{ flexGrow: 1, width: "100%", background: "white", p: 2 }} mb={2}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CustomLabelTextField label="Subtask Name" name="stname" required={true} placeholder="Enter Subtask Name" value={subTaskName || ""} onChange={(event) => setSubTaskName(event.target.value)} isDisabled />
            </Grid>

            <Grid item xs={12}>
              <Box p={2} sx={{ background: "#f5f5f5" }}>
                <Typography sx={{ fontSize: 15, fontWeight: "600", textAlign: "start" }}>Import Options</Typography>
                <DuplicateSubTaskTabSection tabvalue={tabvalue} setTabValue={setTabValue} />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Grid container>
          <Grid item xs={12} sm={12} px={2} py={2} textAlign="end">
            <Button onClick={handleSubTaskDuplicate} variant="contained" size="small" sx={{}}>
              {loading ? <CircularLoader /> : "Duplicate"}
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </>
  );
};

export default memo(DuplicateSubtaskDialog);
