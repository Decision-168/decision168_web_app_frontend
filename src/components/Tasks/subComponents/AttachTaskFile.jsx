import { Box, Button, DialogContent } from "@mui/material";
import React, { memo, useState } from "react";
import CustomFileInput from "../../common/CustomFileInput";
import CircularLoader from "../../common/CircularLoader";
import { insertTaskFile } from "../../../api/modules/taskModule";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../redux/action/userSlice";
import { toast } from "react-toastify";
import { closeModal } from "../../../redux/action/modalSlice";
import { useDispatch } from "react-redux";

const AttachTaskFile = ({ task }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserDetails);
  // const user_id = user?.reg_id;
  const user_id = 1; //for testing
  const [taskFiles, setTaskFiles] = useState(null);
  const [loading, setLoading] = useState(false);
  //to send DB convert files data structure

  const handleTaskFilesChange = async (newValue, info) => {
    // if (!newValue || newValue.length === 0) {
    //   // Show an error message if it is empty
    //   alert("Task files cannot be empty");
    //   return;
    // }
    setTaskFiles(newValue);
    const taskFilesArray = newValue?.map((file, index) => ({ [index]: file.name }));
    alert(`${JSON.stringify(taskFilesArray)}`);
    try {
      const data = { tid: task?.tid, task_file: taskFilesArray, tcode: task?.tcode };
      const response = await insertTaskFile(user_id, data);
      dispatch(closeModal("task-attach-file"));
      toast.success(response.message);
    } catch (error) {
      console.error(error);
      toast.error(`${error.response?.data?.error}`);
    }
  };

  return (
    <DialogContent dividers>
      <Box
        sx={{
          minHeight: "100px",
          pb: 4,
        }}
      >
        <CustomFileInput
          label="Attached File(s)"
          placeholder="Choose files..."
          multiple
          required={false}
          name="file"
          value={taskFiles}
          handleFilesChange={handleTaskFilesChange}
        />
      </Box>
    </DialogContent>
  );
};
export default memo(AttachTaskFile);
