import React, { useState, useEffect } from "react";
import { Button, DialogActions, DialogContent, Grid, InputLabel } from "@mui/material";
import CustomLabelTextField from "../../common/CustomLabelTextField";
import { useTheme } from "@mui/material/styles";
import CustomMultilineTextField from "../../common/CustomMultilineTextField";
import CustomFileInput from "../../common/CustomFileInput";
import AddAnotherLink from "../subComponents/AddAnotherLink";
import { closeModal } from "../../../redux/action/modalSlice";
import { useDispatch } from "react-redux";
import SelectOption from "../../common/SelectOption";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../redux/action/userSlice";
import { getPorfolioDepartments, getPortfolios } from "../../../api/modules/porfolioModule";
import { getProjectTeamMembers, getProjectsForSelectMenu, insertTask, updateTask } from "../../../api/modules/taskModule";
import CustomDatePicker from "../../common/CustomDatePicker";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CircularLoader from "../../common/CircularLoader";
import { createFileArray } from "../../../helpers/createFileArray";

const priorities = [
  { name: "High", value: "high" },
  { name: "Medium", value: "medium" },
  { name: "Low", value: "low" },
];

export default function CreateEditTaskForm({ editMode, taskEditData }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUserDetails);
  // const userId = user?.reg_id;
  // const email = user?.email_address;
  const userId = 1; // for testing
  const email = "uzmakarjikar@gmail.com"; // for testing

  const storedPortfolioId = JSON.parse(localStorage.getItem("portfolioId"));
  const [projects, setProjects] = useState([]);
  const [selectedProjectIdObject, setSelectedProjectIdObject] = useState({ project_id: null });
  const [selectedProjectDeptId, setSelectedProjectDeptId] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [portfolios, setPortfolios] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [fields, setFields] = useState([
    {
      link: "",
      linkComment: "",
    },
  ]);
  const [formValues, setFormValues] = useState({
    tname: "",
    tdes: "",
    dept: "",
    tnote: "",
    tpriority: "",
    team_member2: null, //Assignee
    portfolio_id: storedPortfolioId,
  });

  // Attach File
  const [files, setFiles] = useState(null);
  const filesArray = files?.map((file, index) => ({ [index]: file.name }));

  const handleFilesChange = (newValue, info) => {
    setFiles(newValue); 
  };

  useEffect(() => {
    if (editMode) {
      setFormValues({
        ...formValues,
        tname: taskEditData?.tname,
        tdes: taskEditData?.tdes,
        dept: taskEditData?.dept_id,
        tnote: taskEditData?.tnote,
        tpriority: taskEditData?.tpriority,
        team_member2: taskEditData?.tassignee, //Assignee
        portfolio_id: storedPortfolioId,
        tdue_date: taskEditData?.tdue_date ? new Date(taskEditData?.tdue_date) : "",
      });
      setSelectedProjectIdObject({ project_id: taskEditData?.tproject_assign });
    }
  }, [editMode, taskEditData]);


  useEffect(() => {
    // Split the comma-separated strings into arrays
    const linksArray = taskEditData?.tlink?.split(",");
    const commentsArray = taskEditData?.tlink_comment?.split(",");

    // Combine the arrays into an array of objects
    const resultArray =
      linksArray?.map((link, index) => ({
        link,
        linkComment: commentsArray[index],
      })) || [];

    setFields(resultArray);
  }, [editMode, taskEditData?.tlink, taskEditData?.tlink_comment]);

  useEffect(() => {
    const filenames = taskEditData?.tfile;
    (async () => {
      try {
        const fileArray = await createFileArray(filenames);
        setFiles(fileArray);
      } catch (error) {
        console.error("Error:", error);
      }
    })();
  }, [editMode, taskEditData?.tfile]);

  //fetch Projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getProjectsForSelectMenu({
          portfolio_id: storedPortfolioId,
          user_id: userId,
        });
        setProjects(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProjects();
  }, [storedPortfolioId, userId]);

  
  console.log("projects",projects)
  console.log("tproject_assign",taskEditData?.tproject_assign)

  //fetch departments
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await getPorfolioDepartments(storedPortfolioId);
        setDepartments(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDepartments();
  }, [storedPortfolioId]);

  useEffect(() => {
    // it will return the object of the selected project id from that we require dept_id
    const selectedProjectObject = projects?.find((p) => p.pid === selectedProjectIdObject?.project_id);
    // console.log("selectedProjectObject", selectedProjectObject);
    setSelectedProjectDeptId(selectedProjectObject?.dept_id);
  }, [projects, selectedProjectIdObject?.project_id]);


  useEffect(() => {
    // Update filtered departments based on selected project
    if (selectedProjectDeptId !== undefined && selectedProjectDeptId !== null) {
      const filteredDepts = selectedProjectDeptId !== 0 ? departments.filter((d) => d.portfolio_dept_id === selectedProjectDeptId) : [];
      setFilteredDepartments(filteredDepts);
    }
  }, [selectedProjectDeptId, departments]);

  //fecth portfolios
  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const portfoliosData = await getPortfolios({ email: email });
        setPortfolios(portfoliosData);
      } catch (error) {
        console.error("Error fetching portfolios:", error);
      }
    };

    // Fetch portfolios when the component mounts
    fetchPortfolios();
  }, []);

  // fetch project team member (Assignees)
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await getProjectTeamMembers({ pid: selectedProjectIdObject?.project_id });

        // Add the user to assignee to assignee list
        const updatedResponse = [...response, { reg_id: userId, name: "To Me" }];
        setTeamMembers(updatedResponse);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTeamMembers();
  }, [selectedProjectIdObject?.project_id, userId]);

  const convertFieldsToObjects = (newFields, objProperty) => {
    const dataObjects = newFields?.map((item, index) => {
      const object = {};
      object[index] = item[objProperty];
      return object;
    });

    return dataObjects;
  };

  //due Date
  const handleDueDate = (date) => {
    setFormValues({
      ...formValues,
      tdue_date: date,
    });
  };

  const handleChange = (fieldName) => (event) => {
    setFormValues({
      ...formValues,
      [fieldName]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const linksData = convertFieldsToObjects(fields, "link");
    const commentsData = convertFieldsToObjects(fields, "linkComment");
    const formData = {
      ...formValues,
      project_id: (selectedProjectIdObject || {}).project_id,
      tfile: filesArray,
      links: linksData,
      link_comments: commentsData,
    };

    const fieldLabels = {
      tname: "Task Name",
      portfolio_id: "Portfolio",
      dept: "Department",
      tdue_date: "Due Date",
      tpriority: "Task Priority",
      team_member2: "Assignee",
    };

    // Check for empty required fields
    const requiredFields = Object.keys(formData);
    const emptyFields = requiredFields.filter((field) => !formData[field]);

    // Display a toast message with custom field names
    if (emptyFields.length > 0) {
      const errorFields = emptyFields.map((field) => fieldLabels[field]);
      toast.error(`Please fill in all required fields: ${errorFields.join(", ")}`);
      return;
    }

    try {
      setLoading(true);

      const response = editMode ? await updateTask({ user_id: userId, data: { ...formData, tid: taskEditData?.tid } }) : await insertTask({ regId: userId, data: formData });

      dispatch(closeModal(`${editMode ? "edit-task" : "create-new-task" }`));
      navigate(`/tasks-overview/${editMode ? (taskEditData || {}).tid : response?.taskInsertedId}`);
      toast.success(response.message);
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error(error.response?.data?.error || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DialogContent dividers>
        <Grid container>
          <Grid item xs={12} sm={6} px={2} py={1}>
            <CustomLabelTextField label="Task" required={true} placeholder="Enter Task Name" name="tname" value={formValues.tname} onChange={handleChange("tname")} />
          </Grid>
          <Grid item xs={12} sm={6} px={2} py={1}>
            <SelectOption
              label="Project"
              required={false}
              field="project_id" // Unique identifier for this field
              idKey="pid" // Key to identify each option
              getOptionLabel={(option) => option.pname} // which want to display after select
              dynamicOptions={false} // true or false based on your condition
              // loadOptions={getProjectsForSelectMenu} //pass only if dynamicOptions true
              staticOptions={projects || []} // Your static options array
              // loadOptionsParams={{ portfolio_id: storedPortfolioId, user_id: userId }}
              formValues={selectedProjectIdObject}
              setFormValues={setSelectedProjectIdObject}
            />
          </Grid>
          <Grid item xs={12} sm={6} px={2} py={1}>
            <CustomMultilineTextField label="Description" required={false} placeholder="Enter Task Description..." name="tdes" value={formValues.tdes} onChange={handleChange("tdes")} />
          </Grid>
          <Grid item xs={12} sm={6} px={2}>
            <Grid container>
              <Grid item xs={12} py={1}>
                <SelectOption
                  label="Department"
                  required={true}
                  field="dept"
                  idKey="portfolio_dept_id"
                  getOptionLabel={(option) => option.department}
                  dynamicOptions={false}
                  staticOptions={selectedProjectDeptId !== undefined && selectedProjectDeptId !== null && selectedProjectDeptId !== 0 ? filteredDepartments : departments}
                  formValues={formValues}
                  setFormValues={setFormValues}
                />
              </Grid>
              <Grid item xs={12} py={1}>
                <SelectOption
                  label="Portfolio"
                  required={true}
                  field="portfolio_id" // Unique identifier for this field
                  idKey="portfolio_id" // Key to identify each option
                  getOptionLabel={(option) => option.portfolio_name} // which want to display after select
                  // dynamicOptions={true}
                  // loadOptions={getPortfolios} // Pass the API function directly
                  // loadOptionsParams={{ email: email }} // Set parameters as needed
                  staticOptions={portfolios}
                  formValues={formValues}
                  setFormValues={setFormValues}
                  isDisabled={true}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6} px={2} py={1}>
            <CustomMultilineTextField label="Note" required={false} placeholder="Enter Task Note..." name="tnote" value={formValues.tnote} onChange={handleChange("tnote")} />
          </Grid>

          <Grid item xs={12} sm={6} px={2}>
            <Grid container>
              <Grid item xs={12} py={1}>
                <SelectOption
                  label="Priority"
                  required={true}
                  field="tpriority" // Unique identifier for this field
                  idKey="value" // Key to identify each option
                  getOptionLabel={(option) => option.name} // which want to display after select
                  dynamicOptions={false} // true or false based on your condition
                  // loadOptions={loadOptionsFromApi} //pass only if dynamicOptions true
                  staticOptions={priorities} // Your static options array
                  formValues={formValues}
                  setFormValues={setFormValues}
                />
              </Grid>
              <Grid item xs={12} py={1}>
                <SelectOption
                  label="Assignee"
                  required={true}
                  field="team_member2" // Unique identifier for this field
                  idKey="reg_id" // Key to identify each option
                  getOptionLabel={(option) => option.name} // which want to display after select
                  staticOptions={teamMembers || []} // Your static options array
                  formValues={formValues}
                  setFormValues={setFormValues}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} px={2} py={1}>
            <CustomFileInput label="Attached File(s)" placeholder="Choose files..." multiple required={false} name="file" value={files} handleFilesChange={handleFilesChange} />
          </Grid>
          <Grid item xs={12} sm={6} px={2} py={1}>
            <CustomDatePicker
              label="Due Date"
              required
              minDate={new Date()} // Set the minimum date to today
              maxDate={new Date(new Date().getFullYear() + 1, 11, 31)} // Set the maximum date to one year from today
              value={formValues.tdue_date}
              onChange={handleDueDate}
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
            <AddAnotherLink fields={fields} setFields={setFields} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Grid container>
          <Grid item xs={12} sm={12} px={2} py={2} textAlign="end">
            <Button
              onClick={() => dispatch(closeModal())}
              size="small"
              variant="contained"
              type="button"
              sx={{
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.secondary.light,
                "&:hover": { backgroundColor: theme.palette.secondary.dark },
              }}
            >
              Close
            </Button>
            <Button onClick={handleSubmit} size="small" type="button" variant="contained" sx={{ ml: 1 }}>
              {loading ? <CircularLoader /> : editMode ? "Save Changes" : "Create"}
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </>
  );
}
