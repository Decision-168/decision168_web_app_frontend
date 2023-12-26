import { Box, DialogContent } from "@mui/material";
import React, { useState, memo } from "react";
import CustomFileInput from "../../common/CustomFileInput";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../redux/action/userSlice";
import { toast } from "react-toastify";
import { closeModal } from "../../../redux/action/modalSlice";
import { useDispatch } from "react-redux";
import { insertSubtaskFile } from "../../../api/modules/taskModule";
import { taskOverviewStyles } from "../taskOverview/styles";
import SubtaskFiles from "../subtaskOverview/subComponent/SubtaskFiles";

const AttachSubtaskFile = ({ subtask }) => {
  const styles = taskOverviewStyles();
  const dispatch = useDispatch();
  const user = useSelector(selectUserDetails);
  // const user_id = user?.reg_id;
  const user_id = 1; //for testing
  const [subtaskFiles, setSubtaskFiles] = useState(null);
  const [loading, setLoading] = useState(false);
  //to send DB convert files data structure

  const handleSubtaskFilesChange = async (newValue, info) => {
    setSubtaskFiles(newValue);
    const time = Math.floor(Date.now() / 1000);
    const taskFilesArray = newValue?.map(
      (file, index) => `${time}_${file.name.toLowerCase()}`
    );
    const stringFormat = taskFilesArray.join(",");

    try {
      const data = {
        stid: subtask?.stid,
        stask_file: stringFormat,
        stcode: subtask?.stcode,
      };

      const response = await insertSubtaskFile(user_id, data);
      dispatch(closeModal("subtask-attach-file"));
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
          value={subtaskFiles}
          handleFilesChange={handleSubtaskFilesChange}
        />

        {subtask?.stfile && (
          <SubtaskFiles styles={styles} files={subtask?.stfile} />
        )}
      </Box>
    </DialogContent>
  );
};
export default memo(AttachSubtaskFile);
