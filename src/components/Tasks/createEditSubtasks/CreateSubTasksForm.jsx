import React from "react";
import { Box, Button, Chip, DialogActions, DialogContent, Divider, Grid, InputLabel, Paper, Stack, Tooltip, IconButton } from "@mui/material";
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
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";

const projects = [{ label: "project 1" }, { label: "project 2" }, { label: "project 3" }, { label: "project 4" }, { label: "project 5" }, { label: "project 6" }];
const departments = [{ label: "Admnistration" }, { label: "Accounting & Finanace" }, { label: "AdmnistrCustomer Serviceation" }, { label: "Human Resources" }, { label: "Marketing" }, { label: "Sales" }, { label: "Research & Development" }];
const portfolios = [{ label: "Portfolio 1" }, { label: "Portfolio 2" }, { label: "Portfolio 3" }, { label: "Portfolio 3" }, { label: "Portfolio 4" }, { label: "Portfolio 5" }, { label: "Portfolio 6" }];
const priorities = [{ label: "High" }, { label: "Medium" }, { label: "Low" }];
const assignees = [{ label: "Assign To Me" }, { label: "John Doe" }, { label: "Sam" }, { label: "Jams" }];

export default function CreateSubTasksForm() {
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

  // Add another Subtask code start
  const [inputFields, setInputFields] = React.useState([
    {
      subtask: "",
      dueDate: "",
      description: "",
      note: "",
      priority: "",
      assignee: "",
      files: "",
      taskLinkAndComment: "",
    },
  ]);

  const handleInputChange = (event, index) => {
    const values = [...inputFields];
    values[index][event.target.name] = event.target.value;
    setInputFields(values);
  };

  const handleAddClick = () => {
    setInputFields([
      ...inputFields,
      {
        subtask: "",
        dueDate: "",
        description: "",
        note: "",
        priority: "",
        assignee: "",
        files: "",
        taskLinkAndComment: "",
      },
    ]);
  };

  const handleRemoveClick = (index) => {
    const values = [...inputFields];
    if (values.length > 1) {
      values.splice(index, 1);
      setInputFields(values);
    }
  };
  // Add another Subtask code end

  return (
    <>
      <DialogContent dividers>
        <Grid container>
          <Grid item xs={12} sm={6} px={2} py={1}>
            <CustomLabelTextField
              label="Task"
              name="task"
              required={true}
              placeholder="Enter Task Name"
              register={register}
              errors={errors}
              validation={globalValidations.task} // Pass the validation rules as a prop
            />
          </Grid>

          <Grid item xs={12} sm={6} px={2} py={1}>
            <CustomAutocomplete label="Project" options={projects} placeholder="Select Project" required={false} />
          </Grid>
        </Grid>

        {/* Sub Task Form */}

        {inputFields.map((inputField, index) => (
          <Box key={index}>
            <Divider sx={{ my: 3 }}>
              <Chip label={inputFields.length === 1 ? "Please Enter Subtask Details" : `Please enter details for Subtask ${index + 1}`} />
            </Divider>
            <Paper elevation={0} sx={{ width: "100%", padding: "5px", bgcolor: "#F7F7F7" }}>
              <Stack direction="row" justifyContent="end" alignItems="center">
                {inputFields.length > 1 && (
                  <Tooltip title="Remove Subtask" arrow size="small" placement="top-end">
                    <IconButton onClick={handleRemoveClick}>
                      <RemoveCircleRoundedIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </Stack>

              <Grid container>
                <Grid item xs={12} sm={6} px={2} py={1}>
                  <CustomLabelTextField
                    label="Sub Task"
                    name="subtask"
                    required={true}
                    placeholder="Enter Subtask Name"
                    register={register}
                    errors={errors}
                    validation={globalValidations.task} // Pass the validation rules as a prop
                  />
                </Grid>

                <Grid item xs={12} sm={6} px={2} py={1}>
                  <MyDatePicker label="Due Date" required={true} sizeWidth="100%" showBorder={true}/>
                </Grid>

                <Grid item xs={12} sm={6} px={2} py={1}>
                  <CustomMultilineTextField
                    label="Description"
                    name="taskDescription"
                    required={false}
                    placeholder="Enter Task Description..."
                    register={register}
                    errors={errors}
                    validation={globalValidations.taskDescription} // Pass the validation rules as a prop
                  />
                </Grid>

                <Grid item xs={12} sm={6} px={2} py={1}>
                  <CustomMultilineTextField
                    label="Note"
                    name="note"
                    required={false}
                    placeholder="Enter Task Note..."
                    register={register}
                    errors={errors}
                    validation={globalValidations.taskNote} // Pass the validation rules as a prop
                  />
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
          </Box>
        ))}
      </DialogContent>

      <DialogActions>
        <Grid container>
          <Grid item xs={12} sm={12} px={2} py={2} textAlign="end">
            <Button onClick={() => dispatch(closeModal())} size="small" variant="contained" sx={{ backgroundColor: theme.palette.secondary.main, color: theme.palette.secondary.light, "&:hover": { backgroundColor: theme.palette.secondary.dark } }}>
              Close
            </Button>
            <Button onClick={handleAddClick} size="small" type="submit" variant="contained" sx={{ ml: 1, backgroundColor: theme.palette.secondary.light, color: theme.palette.secondary.dark, "&:hover": { color: theme.palette.secondary.dark, backgroundColor: "#EBEBEB" } }}>
              Add Another Subtask
            </Button>
            <Button onClick={displayFilesInAlert} size="small" type="submit" variant="contained" sx={{ ml: 1 }}>
               Add
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </>
  );
}
