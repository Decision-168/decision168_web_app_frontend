import React from "react";
import { Box, Button, Chip, DialogActions, DialogContent, Divider, Grid, InputLabel, Paper } from "@mui/material";
import { useForm } from "react-hook-form";
import CustomLabelTextField from "../../common/CustomLabelTextField";
import { globalValidations } from "../../../utils/GlobalValidation";
import { useTheme } from "@mui/material/styles";
import CustomAutocomplete from "../../common/CustomAutocomplete";
import CustomMultilineTextField from "../../common/CustomMultilineTextField";
import CustomFileInput from "../../common/CustomFileInput";
import MyDatePicker from "../subComponents/MyDatePicker ";
import AddAnotherLink from "../subComponents/AddAnotherLink";
import { closeModal } from "../../../redux/action/modalSlice";
import { useDispatch } from "react-redux";

const projects = [{ label: "project 1" }, { label: "project 2" }, { label: "project 3" }, { label: "project 4" }, { label: "project 5" }, { label: "project 6" }];
const priorities = [{ label: "High" }, { label: "Medium" }, { label: "Low" }];
const assignees = [{ label: "Assign To Me" }, { label: "John Doe" }, { label: "Sam" }, { label: "Jams" }];

export default function EditSubTasksForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [files, setFiles] = React.useState(null);

  const handleFilesChange = (newValue, info) => {
    setFiles(newValue); // Concatenate the new files with the existing ones
  };

  const displayFilesInAlert = () => {
    const fileNames = files.map((file) => file.name).join(", "); // Create a comma-separated list of file names
    alert(`Selected files: ${fileNames}`);
  };

  // const onSubmit = (data) => {
  //   alert(JSON.stringify(data));
  // };

  return (
    <>
      <DialogContent dividers>
        <Grid container>
          <Grid item xs={12} sm={6} px={2} py={1}>
            <CustomLabelTextField label="Task" name="task" required={true} placeholder="Enter Task Name" />
          </Grid>

          <Grid item xs={12} sm={6} px={2} py={1}>
            <CustomAutocomplete label="Project" options={projects} placeholder="Select Project" required={false} />
          </Grid>
        </Grid>

        {/* Sub Task Form */}

        <Divider sx={{ my: 3 }}>
          <Chip label="Please Edit Subtask Details" />
        </Divider>

        <Paper elevation={0} sx={{ width: "100%", padding: "5px", bgcolor: "#F7F7F7" }}>
          <Grid container>
            <Grid item xs={12} sm={6} px={2} py={1}>
              <CustomLabelTextField label="Sub Task" name="subtask" required={true} placeholder="Enter Subtask Name" />
            </Grid>

            <Grid item xs={12} sm={6} px={2} py={1}>
              <MyDatePicker label="Due Date" required={true} sizeWidth="100%" showBorder={true} />
            </Grid>

            <Grid item xs={12} sm={6} px={2} py={1}>
              <CustomMultilineTextField label="Description" name="taskDescription" required={false} placeholder="Enter Task Description..." />
            </Grid>

            <Grid item xs={12} sm={6} px={2} py={1}>
              <CustomMultilineTextField label="Note" name="note" required={false} placeholder="Enter Task Note..." />
            </Grid>

            <Grid item xs={12} sm={6} px={2} py={1}>
              <CustomAutocomplete label="Priority" options={priorities} placeholder="Select priority" required={true} />
            </Grid>

            <Grid item xs={12} sm={6} px={2} py={1}>
              <CustomAutocomplete label="Assignee" options={assignees} placeholder="Select Assignee" required={true} />
            </Grid>

            <Grid item xs={12} sm={6} px={2} py={1}>
              <CustomFileInput label="Attached File(s)" placeholder="Choose files..." multiple required={false} name="file" value={files} handleFilesChange={handleFilesChange} />
            </Grid>

            <Grid item xs={12} sm={12} px={2} py={2}>
              <InputLabel sx={{ fontSize: "14px", color: "black", mb: 1, textAlign: "left" }}>Task Link(s) & Comment(s)</InputLabel>
              <AddAnotherLink />
            </Grid>
          </Grid>
        </Paper>
      </DialogContent>

      <DialogActions>
        <Grid container>
          <Grid item xs={12} sm={12} px={2} py={2} textAlign="end">
            <Button onClick={() => dispatch(closeModal())} size="small" variant="contained" sx={{ backgroundColor: theme.palette.secondary.main, color: theme.palette.secondary.light, "&:hover": { backgroundColor: theme.palette.secondary.dark } }}>
              Close
            </Button>

            <Button onClick={displayFilesInAlert} size="small" type="submit" variant="contained" sx={{ ml: 1 }}>
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </>
  );
}