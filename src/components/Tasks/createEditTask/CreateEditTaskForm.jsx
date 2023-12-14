import React, { useState, useEffect } from "react";
import {
  Button,
  DialogActions,
  DialogContent,
  Grid,
  InputLabel,
  Box,
} from "@mui/material";
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

const projects = [
  { label: "project 1" },
  { label: "project 2" },
  { label: "project 3" },
  { label: "project 4" },
  { label: "project 5" },
  { label: "project 6" },
];
const departments = [
  { label: "Admnistration" },
  { label: "Accounting & Finanace" },
  { label: "AdmnistrCustomer Serviceation" },
  { label: "Human Resources" },
  { label: "Marketing" },
  { label: "Sales" },
  { label: "Research & Development" },
];
const portfolios = [
  { label: "Portfolio 1" },
  { label: "Portfolio 2" },
  { label: "Portfolio 3" },
  { label: "Portfolio 3" },
  { label: "Portfolio 4" },
  { label: "Portfolio 5" },
  { label: "Portfolio 6" },
];
const priorities = [{ label: "High" }, { label: "Medium" }, { label: "Low" }];
const assignees = [
  { label: "Assign To Me" },
  { label: "John Doe" },
  { label: "Sam" },
  { label: "Jams" },
];

export default function CreateEditTaskForm({ editMode }) {
  const theme = useTheme();
  const dispatch = useDispatch();

  // Attach File
  const [files, setFiles] = useState(null);
  const handleFilesChange = (newValue, info) => {
    setFiles(newValue); // Concatenate the new files with the existing ones
  };
  const displayFilesInAlert = () => {
    const fileNames = files.map((file) => file.name).join(", "); // Create a comma-separated list of file names
    alert(`Selected files: ${fileNames}`);
  };

  const [formValues, setFormValues] = useState({
    tname: "",
    project_id: null,
    tdes: "",
    dept: "",
    tnote: "",
    tpriority: "",
    team_member2: null, //Assignee
    tfile: "",
    tdue_date: "",
    links: "",
    link_comments: "",
  });

  const handleChange = (fieldName) => (event) => {
    setFormValues({
      ...formValues,
      [fieldName]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    alert(`${formValues}`);
  };

  return (
    <>
      <DialogContent dividers>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Grid container>
            <Grid item xs={12} sm={6} px={2} py={1}>
              <CustomLabelTextField
                label="Task"
                required={true}
                placeholder="Enter Task Name"
                name="tname"
                value={formValues.tname}
                onChange={handleChange("tname")}
              />
            </Grid>

            <Grid item xs={12} sm={6} px={2} py={1}>
              <CustomAutocomplete
                label="Project"
                options={projects}
                placeholder="Select Project"
                required={false}
              />
            </Grid>

            <Grid item xs={12} sm={6} px={2} py={1}>
              <CustomMultilineTextField
                label="Description"
                name="taskDescription"
                required={false}
                placeholder="Enter Task Description..."
              />
            </Grid>

            <Grid item xs={12} sm={6} px={2}>
              <Grid container>
                <Grid item xs={12} py={1}>
                  <CustomAutocomplete
                    label="Identify Department"
                    options={departments}
                    placeholder="Select Department"
                    required={true}
                  />
                </Grid>
                <Grid item xs={12} py={1}>
                  <CustomAutocomplete
                    label="Portfolio"
                    options={portfolios}
                    placeholder="Select Portfolio"
                    required={true}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={6} px={2} py={1}>
              <CustomMultilineTextField
                label="Note"
                name="note"
                required={false}
                placeholder="Enter Task Note..."
              />
            </Grid>

            <Grid item xs={12} sm={6} px={2}>
              <Grid container>
                <Grid item xs={12} py={1}>
                  <CustomAutocomplete
                    label="Priority"
                    options={priorities}
                    placeholder="Select priority"
                    required={true}
                  />
                </Grid>
                <Grid item xs={12} py={1}>
                  <CustomAutocomplete
                    label="Assignee"
                    options={assignees}
                    placeholder="Select Assignee"
                    required={true}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={6} px={2} py={1}>
              <CustomFileInput
                label="Attached File(s)"
                placeholder="Choose files..."
                multiple
                required={false}
                name="file"
                value={files}
                handleFilesChange={handleFilesChange}
              />
            </Grid>

            <Grid item xs={12} sm={6} px={2} py={1}>
              <MyDatePicker
                label="Due Date"
                required={true}
                sizeWidth="100%"
                showBorder={true}
              />
            </Grid>

            <Grid item xs={12} sm={12} px={2} py={2}>
              <InputLabel
                sx={{
                  fontSize: "14px",
                  color: "black",
                  mb: 1,
                  textAlign: "left",
                }}
              >
                Task Link(s) & Comment(s)
              </InputLabel>
              <AddAnotherLink />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Grid container>
          <Grid item xs={12} sm={12} px={2} py={2} textAlign="end">
            <Button
              onClick={() => dispatch(closeModal())}
              size="small"
              variant="contained"
              sx={{
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.secondary.light,
                "&:hover": { backgroundColor: theme.palette.secondary.dark },
              }}
            >
              Close
            </Button>
            <Button
              onClick={displayFilesInAlert}
              size="small"
              type="submit"
              variant="contained"
              sx={{ ml: 1 }}
            >
              {editMode ? "Save Changes" : "Create"}
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </>
  );
}
