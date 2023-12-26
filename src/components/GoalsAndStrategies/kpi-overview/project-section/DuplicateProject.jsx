import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ProjectTabSection from "./ProjectTabSection";
import CustomLabelTextField from "../../subComponents/CustomLabelTextField";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../../redux/action/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { closeModal } from "../../../../redux/action/modalSlice";
import { copyProject } from "../../../../api/modules/ProjectModule";

const DuplicateProject = ({ projectData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();

  const user = useSelector(selectUserDetails);
  const userId = user?.reg_id;

  const [formValues, setFormValues] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormValues({
      ...formValues,
      pname: `${projectData?.project?.pname} [copy]`,
      pid: projectData?.project?.pid,
      pcreated_by: userId,
      copy_detail: "everything",
      cust_project: "",
    });
  }, [projectData]);

  const handleChange = (fieldName) => (event) => {
    setFormValues({
      ...formValues,
      [fieldName]: event.target.value,
    });
  };

  const handleCopyProject = async (event) => {
    event.preventDefault();
    if (formValues.pname.trim() !== "") {
      setLoading(true);
      try {
        const response = await copyProject(formValues);
        toast.success(`${response.message}`);
        navigate(`/projects-overview/${response.pid}`);
        dispatch(closeModal("duplicate-project"));
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        // Handling error
        toast.error(`${error.response?.error}`);
      } finally {
        setLoading(false);
      }
    } else {
      // Show an error because gname is empty
      toast.error("Project name cannot be empty");
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
            <CustomLabelTextField
              label="Project Name"
              name="pname"
              required={true}
              placeholder="Enter Project Name..."
              value={formValues.pname}
              onChange={handleChange("pname")}
            />
            <Grid item xs={12}>
              <Box p={2} sx={{ background: "#f5f5f5" }}>
                <Typography
                  sx={{ fontSize: 15, fontWeight: "600", textAlign: "start" }}
                >
                  Import Options
                </Typography>
                <ProjectTabSection
                  formValues={formValues}
                  setFormValues={setFormValues}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCopyProject} variant="contained" size="small">
          Duplicate
        </Button>
      </DialogActions>
    </>
  );
};

export default DuplicateProject;
