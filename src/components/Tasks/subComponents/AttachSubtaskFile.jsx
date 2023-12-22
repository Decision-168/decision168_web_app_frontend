import { Box, DialogContent } from "@mui/material";
import React, { useState, memo } from "react";
import CustomFileInput from "../../common/CustomFileInput";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../redux/action/userSlice";
import { toast } from "react-toastify";
import { closeModal } from "../../../redux/action/modalSlice";
import { useDispatch } from "react-redux";
import { insertSubtaskFile } from "../../../api/modules/taskModule";

const AttachSubtaskFile = ({ subtask }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserDetails);
  // const user_id = user?.reg_id;
  const user_id = 1; //for testing
  const [subtaskFiles, setSubtaskFiles] = useState(null);
  const [loading, setLoading] = useState(false);
  //to send DB convert files data structure

  const handleSubtaskFilesChange = async (newValue, info) => {
    // if (!newValue || newValue.length === 0) {
    //   // Show an error message if it is empty
    //   alert("Subask files cannot be empty");
    //   return;
    // }
    setSubtaskFiles(newValue);
    const subtaskFilesArray = newValue?.map((file, index) => ({ [index]: file.name }));
    alert(`${JSON.stringify(subtaskFilesArray)}`);
    try {
      const data = {
        stid: subtask?.stid,
        subtask_file: subtaskFilesArray,
        stcode: subtask?.stcode,
      };
      const response = await insertSubtaskFile(user_id, data);
      dispatch(closeModal("subtask-attach-file"));
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
          value={subtaskFiles}
          handleFilesChange={handleSubtaskFilesChange}
        />
      </Box>
    </DialogContent>
  );
};
export default memo(AttachSubtaskFile);
