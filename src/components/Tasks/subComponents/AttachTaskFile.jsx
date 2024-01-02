import { Box,DialogContent } from "@mui/material";
import React, { memo, useState } from "react";
import CustomFileInput from "../../common/CustomFileInput";
import { insertTaskFile } from "../../../api/modules/taskModule";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../redux/action/userSlice";
import { toast } from "react-toastify";
import { closeModal } from "../../../redux/action/modalSlice";
import { useDispatch } from "react-redux";
import { taskOverviewStyles } from "../taskOverview/styles";
import TaskFiles from "../taskOverview/subComponents/TaskFiles";

const AttachTaskFile = ({ task , fetchData , currentPage}) => {
  const styles = taskOverviewStyles();
  const dispatch = useDispatch();
  const user = useSelector(selectUserDetails);
  const user_id = user?.reg_id;
  const [taskFiles, setTaskFiles] = useState(null);
  const [loading, setLoading] = useState(false);
  //to send DB convert files data structure

  const handleTaskFilesChange = async (newValue, info) => {
    setTaskFiles(newValue);
    const time = Math.floor(Date.now() / 1000);
    const taskFilesArray = newValue?.map(
      (file, index) => `${time}_${file.name.toLowerCase()}`
    );
    const stringFormat = taskFilesArray.join(",");
    try {
      const data = {
        tid: task?.tid,
        task_file: stringFormat,
        tcode: task?.tcode,
      };
      const response = await insertTaskFile(user_id, data);
      dispatch(closeModal("task-attach-file"));
      if(currentPage){
        fetchData(currentPage);
      }else{
        fetchData();
      }
      toast.success(response.message);
    } catch (error) {
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

        {task?.tfile && <TaskFiles styles={styles} files={task?.tfile} />}
      </Box>
    </DialogContent>
  );
};
export default memo(AttachTaskFile);
