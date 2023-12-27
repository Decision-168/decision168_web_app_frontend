import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Grid,
  Typography,
} from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import CustomLabelTextField from "../../common/CustomLabelTextField";
import CircularLoader from "../../common/CircularLoader";
import { duplicateTask } from "../../../api/modules/taskModule";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../redux/action/userSlice";
import { closeModal } from "../../../redux/action/modalSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import DuplicateTaskTabSection from "./DuplicateTaskTabSection";
const DuplicateTaskDialog = ({ taskData, closeModalName }) => {
  const [taskName, setTaskName] = useState("");
  const [tabvalue, setTabValue] = useState(0);
  const [isChecked, setIsChecked] = useState("1");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUserDetails);
  const userId = user?.reg_id;

  useEffect(() => {
    if (taskData) {
      setTaskName(`${taskData?.tname} [copy]`);
    }
  }, [taskData]);

  const handleTaskDuplicate = async () => {
    try {
      setLoading(true);

      const data = {
        tid: taskData?.tid,
        tname: taskName,
        copy_detail: tabvalue === 0 ? "everything" : "custom",
        cust_tws: isChecked,
        user_id: userId,
      };

      const response = await duplicateTask(data);

      navigate(`/tasks-overview/${response?.insertedTaskId}`);
      dispatch(closeModal(closeModalName));
      toast.success(`${response?.message}`);
    } catch (error) {
      toast.error(`${error?.response?.data?.error}`);
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
            <Grid item xs={12}>
              <CustomLabelTextField
                label="Task Name"
                name="task"
                required={true}
                placeholder="Enter Task Name..."
                value={taskName || ""}
                onChange={(event) => setTaskName(event.target.value)}
                isDisabled
              />
            </Grid>

            <Grid item xs={12}>
              <Box p={2} sx={{ background: "#f5f5f5" }}>
                <Typography
                  sx={{ fontSize: 15, fontWeight: "600", textAlign: "start" }}
                >
                  Import Options
                </Typography>
                <DuplicateTaskTabSection
                  tabvalue={tabvalue}
                  setTabValue={setTabValue}
                  isChecked={isChecked}
                  setIsChecked={setIsChecked}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Grid container>
          <Grid item xs={12} sm={12} px={2} py={2} textAlign="end">
            <Button
              onClick={handleTaskDuplicate}
              variant="contained"
              size="small"
              sx={{}}
            >
              {loading ? <CircularLoader /> : "Duplicate"}
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </>
  );
};

export default memo(DuplicateTaskDialog);
