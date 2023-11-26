import { Box, Button, DialogActions, DialogContent, Grid } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import CustomLabelTextField from "../../GoalsAndStrategies/subComponents/CustomLabelTextField";
import { globalValidations } from "../../../utils/GlobalValidation";
import CustomMultilineTextField from "../../GoalsAndStrategies/subComponents/CustomMultilineTextField";
import CustomAutocomplete from "../../GoalsAndStrategies/subComponents/CustomAutocomplete";
import FilterSelectedOptions from "../../GoalsAndStrategies/subComponents/FilterSelectedOptions";
import InviteMembers from "../../GoalsAndStrategies/subComponents/InviteMembers";
import AddLinks from "../portfolio-projects-list/AddLinks";
import AttachedFile from "../portfolio-projects-list/AttachedFile";
const departments = [{ label: "Marketing" }, { label: "Implementation" }, { label: "Marketing & Sales" }];
const portfolio = [{ label: "DECISION168" }, { label: "MedSmarter" }, { label: "Oxcytech" }];
const assignee = [{ label: "Afrin Syed" }, { label: "Amin Syed" }, { label: "Don Mehmood" }];
const member = [{ title: "Afrin Syed" }, { title: "Amin Syed" }, { title: "Don Mehmood" }];
const CreateProject = ({ flag }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [files, setFiles] = React.useState(null);

  const handleFilesChange = (newValue, info) => {
    setFiles(newValue); // Concatenate the new files with the existing ones
  };

  return (
    <>
      <DialogContent dividers>
        <Box sx={{ width: "100%", background: "white", p: 2, borderRadius: 1 }}>
          <Grid container spacing={1}>
            <CustomLabelTextField label="Project Name" name="projectName" required={true} placeholder="Enter Project Name..." />
            <CustomMultilineTextField label="Project Description" name="projectDescription" required={false} placeholder="Enter Project Description..." />
            <CustomAutocomplete label="Identify Department" options={departments} name="department" required={true} placeholder="Select Department" register={register} errors={errors} validation={globalValidations.department} />
            <CustomAutocomplete label="Assign Portfolio" options={portfolio} name="portfolio" required={true} placeholder="Select Portfolio" register={register} errors={errors} validation={globalValidations.portfolio} />
            <CustomAutocomplete label="Assign Project Manager" options={assignee} name="assignee" required={false} placeholder="Select Member" register={register} errors={errors} validation={globalValidations.assignee} />
            <FilterSelectedOptions label="Add Team Members" labelColor="" required={false} placeholder="Add Team Members..." items={member} />
            <InviteMembers />
            <AddLinks />
            <AttachedFile label="Attached File(s)" placeholder="Choose files..." multiple required={false} name="file" value={files} handleFilesChange={handleFilesChange} />
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "end",
            pt: 1,
            mr: 2,
            width: "100%",
          }}>
          <Button variant="contained" size="small">
            {flag === "add" ? "Create Project" : "Save Changes"}
          </Button>
        </Box>
      </DialogActions>
    </>
  );
};

export default CreateProject;
