import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Chip,
  DialogActions,
  DialogContent,
  Divider,
  Grid,
  InputLabel,
  Paper,
  Stack,
  Tooltip,
  IconButton,
  Autocomplete,
  TextField,
} from "@mui/material";
import CustomLabelTextField from "../../common/CustomLabelTextField";
import { useTheme } from "@mui/material/styles";
import CustomMultilineTextField from "../../common/CustomMultilineTextField";
import CustomFileInput from "../../common/CustomFileInput";
import { closeModal } from "../../../redux/action/modalSlice";
import { useDispatch } from "react-redux";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../redux/action/userSlice";
import SelectOption from "../../common/SelectOption";
import {
  getProjectTeamMembers,
  getProjectsForSelectMenu,
  insertSubtask,
  updateSubtask,
} from "../../../api/modules/taskModule";
import CircularLoader from "../../common/CircularLoader";
import CustomDatePicker from "../../common/CustomDatePicker";
import SelectOptionSubtaskForm from "../../common/SelectOptionSubtaskForm";
import AddAnotherLinkSubtaskForm from "../subComponents/AddAnotherLinkSubtaskForm";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createFileArray } from "../../../helpers/createFileArray";

const priorities = [
  { name: "High", value: "high" },
  { name: "Medium", value: "medium" },
  { name: "Low", value: "low" },
];

export default function CreateEditSubTasksForm({ editMode, taskData, subtaskData }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUserDetails);
  const userId = user?.reg_id;
  const storedPortfolioId = JSON.parse(localStorage.getItem("portfolioId"));
  const [formValues, setFormValues] = useState({
    tid: taskData?.tid,
    tname: taskData?.tname, // no need to post it
    tproject_assign: taskData?.tproject_assign,
    dept: taskData?.dept_id,
    taskArray: [
      {
        team_member2: 1,
        slinks: [
          {
            0: "link1",
          },
          {
            1: "link2",
          },
        ],
        slink_comments: [
          {
            0: "comment",
          },
          {
            1: "comment2",
          },
        ],
        stname: "my New SubTask",
        stdes: "my Sutask description",
        stnote: "this is my test note",
        stfile: [
          {
            0: "file1",
          },
          {
            1: "file2",
          },
        ],
        stpriority: "",
        stdue_date: "2023-12-15",
      },
    ],
  });
  const [projects, setProjects] = useState([]);
  const [assignees, setAssignees] = useState([]);
  const [files, setFiles] = useState([]);

  //fetch Projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getProjectsForSelectMenu({
          portfolio_id: storedPortfolioId,
          user_id: userId,
        });
        setProjects(response);
      } catch (error) {}
    };
    fetchProjects();
  }, [storedPortfolioId, userId]);

  // fetch project team member (Assignees)
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
<<<<<<< HEAD
        const response = await getProjectTeamMembers({ pid: taskData?.tproject_assign });

        // Find the user in the team members
        const foundAssignee = response.find((assignee) => assignee.reg_id === userId);

          // Check if an assignee with the given reg_id was found
          if (foundAssignee) {
            // Check for duplicates before adding the new entry
            const isDuplicate = response.some((member) => member.reg_id === userId);
  
            // Update state with a new entry only if not a duplicate
            if (!isDuplicate) {
              setAssignees([...response, { ...foundAssignee, name: 'Assign to me' }]);
            } else {
              setAssignees(response);
            }
          } else {
            // No assignee found, update state with the original team members
            setAssignees(response);
          }
      } catch (error) {
        console.error(error);
      }
=======
        const response = await getProjectTeamMembers({
          pid: taskData?.tproject_assign,
        });
        // Add the user to assignee to assignee list
        const updatedResponse = [
          ...response,
          { reg_id: userId, name: "To Me" },
        ];
        setAssignees(updatedResponse);
      } catch (error) {}
>>>>>>> c8e20cae2265221430370582776db8fcea1d39fd
    };

    fetchTeamMembers();
  }, [taskData?.tproject_assign, userId]);

  useEffect(() => {
    if (editMode) {
      setFormValues({
        ...formValues,
        tid: taskData?.tid,
        tname: taskData?.tname, // no need to post it
        tproject_assign: taskData?.tproject_assign,
        dept: taskData?.dept_id,
      });
    }
  }, [editMode, taskData]);

  useEffect(() => {
    // stfile = "file1,file2"
    const filenames = subtaskData?.stfile;
<<<<<<< HEAD
=======

>>>>>>> c8e20cae2265221430370582776db8fcea1d39fd
    (async () => {
      try {
        const fileArray = await createFileArray(filenames);
        setFiles(fileArray);
      } catch (error) {}
    })();
  }, [editMode, subtaskData?.stfile]);

  useEffect(() => {
    if (editMode) {
      setFields([
        {
          stname: subtaskData?.stname,
          stdes: subtaskData?.stdes,
          stnote: subtaskData?.stnote,
          stfile: files ? files : [],
          stpriority: subtaskData?.stpriority,
          stdue_date: subtaskData?.stdue_date
            ? new Date(subtaskData?.stdue_date)
            : "",
          team_member2: subtaskData?.stassignee,
          slinks: [],
          slink_comments: [],
        },
      ]);
    }
  }, [editMode, subtaskData, files]);

<<<<<<< HEAD
=======
  // const fileObjects = [{"0": "file1"}, {"1": "file2"}]
  // Output will be like [file1,file2 ]
  // function createFileArrayToValueInField(fileObjects) {
  //   const filenameArray = fileObjects.map((fileObj) => Object.values(fileObj)[0]);
  //   const fileArray = [];
  //   for (const filename of filenameArray) {
  //     const content = "Placeholder content for" + filename;
  //     const file = new File([content], filename, {
  //       type: "text/plain", // adjust the type based on the actual file type
  //     });
  //     fileArray.push(file);
  //   }
  //
  //   return fileArray;
  // }
>>>>>>> c8e20cae2265221430370582776db8fcea1d39fd

  const handleFilesChange = (index) => (newValue) => {
    setFiles(newValue);
    setFields((prevFields) => {
      return prevFields.map((field, i) => {
        if (i === index) {
          return {
            ...field,
            stfile:
              newValue?.map((file, fileIndex) => ({
                [fileIndex]: file.name,
              })) || [],
          };
        }

        return field;
      });
    });
  };

  // Add another Subtask code start
  const [fields, setFields] = React.useState([
    {
      stname: "",
      stdes: "",
      stnote: "",
      stfile: [],
      stpriority: "",
      stdue_date: "",
      team_member2: "",
      slinks: [],
      slink_comments: [],
    },
  ]);

  const handleFieldChange = (fieldName) => (event, index) => {
    const values = [...fields];
    values[index][fieldName] = event.target.value;
    setFields(values);
  };

  const handleAddClick = () => {
    setFields([
      ...fields,
      {
        stname: "",
        stdes: "",
        stnote: "",
        stfile: [],
        stpriority: "",
        stdue_date: "",
        team_member2: "",
        slinks: [],
        slink_comments: [],
      },
    ]);
  };

  const handleRemoveClick = (index) => {
    const values = [...fields];
    if (values.length > 1) {
      values.splice(index, 1);
      setFields(values);
    }
  };

  const handleChange = (fieldName) => (event) => {
    setFormValues({
      ...formValues,
      [fieldName]: event.target.value,
    });
  };

  // Due Date
  const handleDueDate = (date, index) => {
    const updatedFields = [...fields]; // Create a copy of the fields array
    updatedFields[index] = {
      ...updatedFields[index],
      stdue_date: date, // Update the stdue_date for the specific subtask
    };
    setFields(updatedFields);
  };

  const [linksComments, setLinksComments] = useState([
    {
      link: "",
      linkComment: "",
    },
  ]);

  const [loading, setLoading] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Define the required fields for the main form
    const requiredFields = ["tname", "tproject_assign"];

    const formData = { ...formValues, taskArray: [...fields] };

    // Check for empty required fields in the main form
    const emptyFields = requiredFields.filter((field) => !formData[field]);

    const fieldLabels = {
      tname: "Task Name",
      stname: "Subtask Name",
      stdue_date: "Due Date",
      stpriority: "Priority",
      team_member2: "Assignee",
    };

    // Display a toast message for empty fields in the main form
    if (emptyFields.length > 0) {
      const errorFields = emptyFields.map((field) => fieldLabels[field]);
      toast.error(
        `Please fill in all required fields: ${errorFields.join(", ")}`
      );
      return;
    }

    // Validate each task within taskArray
    for (const task of formData.taskArray) {
      // Define the required fields for each task
      const taskRequiredFields = [
        "stname",
        "stdue_date",
        "stpriority",
        "team_member2",
      ];

      // Check for empty required fields in each task
      const emptyTaskFields = taskRequiredFields.filter(
        (field) => !task[field]
      );

      // Display a toast message for empty fields in each task
      if (emptyTaskFields.length > 0) {
        const errorTaskFields = emptyTaskFields.map(
          (field) => fieldLabels[field]
        );
        toast.error(
          `Please fill in all required fields: ${errorTaskFields.join(", ")}`
        );
        return;
      }
    }

    const editeData = {
      stid: subtaskData?.stid,
      stproject_assign: subtaskData?.stproject_assign,
      dept: subtaskData?.stdept_id,
      team_member2: formData?.taskArray[0]?.team_member2,
      slinks: formData?.taskArray[0]?.slinks,
      slink_comments: formData?.taskArray[0]?.slink_comments,
      stname: formData?.taskArray[0]?.stname,
      stdes: formData?.taskArray[0]?.stdes,
      stnote: formData?.taskArray[0]?.stnote,
      stfile:
        files?.map((file, index) => ({ [index]: file.name })) ||
        formData?.taskArray[0]?.stfile,
      tpriority: formData?.taskArray[0]?.stpriority,
      tdue_date: formData?.taskArray[0]?.stdue_date,
    };

<<<<<<< HEAD
    const finalData = { user_id: userId, portfolio_id: storedPortfolioId, data: editeData }
=======
    const finalData = {
      user_id: userId,
      portfolio_id: storedPortfolioId,
      data: editeData,
    };
>>>>>>> c8e20cae2265221430370582776db8fcea1d39fd

    try {
      setLoading(true);

      const response = editMode
        ? await updateSubtask({
            user_id: userId,
            portfolio_id: storedPortfolioId,
            data: editeData,
          })
        : await insertSubtask({
            user_id: userId,
            portfolio_id: storedPortfolioId,
            data: formData,
          });
      dispatch(closeModal(`${editMode ? "edit-subtask" : "add-sub-tasks"}`));
      navigate(`/tasks-overview/${taskData?.tid}`); // it is creating issue if adding multiple subtasks
      toast.success(response.message);
    } catch (error) {
      toast.error(
        error.response?.data?.error || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DialogContent dividers>
        <Grid container>
          <Grid item xs={12} sm={6} px={2} py={1}>
            <CustomLabelTextField
              label="Task"
              name="tname"
              required={true}
              placeholder="Enter Task Name"
              value={formValues.tname}
              onChange={handleChange("tname")}
              isDisabled={true}
            />
          </Grid>

          <Grid item xs={12} sm={6} px={2} py={1}>
            <SelectOption
              label="Project"
              required={false}
              field="tproject_assign"
              idKey="pid"
              getOptionLabel={(option) => option.pname}
              staticOptions={projects || []}
              formValues={formValues}
              setFormValues={setFormValues}
              isDisabled={true}
            />
          </Grid>
        </Grid>

        {/* Sub Task Form */}

        {fields?.map((field, index) => (
          <Box key={index}>
            <Divider sx={{ my: 3 }}>
              <Chip
                label={
                  field.length === 1
                    ? "Please Enter Subtask Details"
                    : `Please enter details for Subtask ${index + 1}`
                }
              />
            </Divider>
            <Paper
              elevation={0}
              sx={{ width: "100%", padding: "5px", bgcolor: "#F7F7F7" }}
            >
              <Stack direction="row" justifyContent="end" alignItems="center">
                {field.length > 1 && (
                  <Tooltip
                    arrow
                    title="Remove Subtask"
                    size="small"
                    placement="top-end"
                  >
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
                    required={true}
                    placeholder="Enter Subtask Name"
                    name="stname"
                    value={fields[index].stname || ""}
                    onChange={(event) =>
                      handleFieldChange("stname")(event, index)
                    }
                  />
                </Grid>

                <Grid item xs={12} sm={6} px={2} py={1}>
                  <CustomDatePicker
                    label="Due Date"
                    required
                    minDate={new Date()} // Set the minimum date to today
                    maxDate={new Date(taskData?.tdue_date)} // Set the maximum date to Task due date
                    value={fields[index].stdue_date || new Date()}
                    onChange={(date) => handleDueDate(date, index)}
                  />
                </Grid>

                <Grid item xs={12} sm={6} px={2} py={1}>
                  <CustomMultilineTextField
                    label="Description"
                    required={false}
                    placeholder="Enter Subtask Description..."
                    name="stdes"
                    value={fields[index].stdes || ""}
                    onChange={(event) =>
                      handleFieldChange("stdes")(event, index)
                    }
                  />
                </Grid>

                <Grid item xs={12} sm={6} px={2} py={1}>
                  <CustomMultilineTextField
                    label="Note"
                    required={false}
                    placeholder="Enter Subtask Note"
                    name="stnote"
                    value={fields[index].stnote || ""}
                    onChange={(event) =>
                      handleFieldChange("stnote")(event, index)
                    }
                  />
                </Grid>

                <Grid item xs={12} sm={6} px={2} py={1}>
                  <Box sx={{ textAlign: "left" }}>
                    <SelectOptionSubtaskForm
                      label="Priority"
                      required={true}
                      field="stpriority"
                      idKey="value"
                      getOptionLabel={(option) => option.name}
                      staticOptions={priorities}
                      formValues={fields}
                      setFormValues={setFields}
                      isDisabled={false}
                      index={index}
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6} px={2} py={1}>
                  <SelectOptionSubtaskForm
                    label="Assignee"
                    required={true}
                    field="team_member2"
                    idKey="reg_id"
                    getOptionLabel={(option) => option.name}
                    staticOptions={assignees || []}
                    formValues={fields}
                    setFormValues={setFields}
                    isDisabled={false}
                    index={index}
                  />
                </Grid>

                <Grid item xs={12} sm={6} px={2} py={1}>
                  <CustomFileInput
                    label="Attached File(s)"
                    placeholder="Choose files..."
                    multiple
                    required={false}
                    name="stfile"
                    value={files}
                    handleFilesChange={handleFilesChange(index)}
                  />
                </Grid>

                {/* <Grid item xs={12} sm={12} px={2} py={2}>
                  <InputLabel sx={{ fontSize: "14px", color: "black", mb: 1, textAlign: "left" }}>Task Link(s) & Comment(s)</InputLabel>
                  <AddAnotherLinkSubtaskForm fields={linksComments} setFields={setLinksComments} />
                </Grid> */}
              </Grid>
            </Paper>
          </Box>
        ))}
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

            {editMode ? null : (
              <Button
                onClick={handleAddClick}
                size="small"
                type="submit"
                variant="contained"
                sx={{
                  ml: 1,
                  backgroundColor: theme.palette.secondary.light,
                  color: theme.palette.secondary.dark,
                  "&:hover": {
                    color: theme.palette.secondary.dark,
                    backgroundColor: "#EBEBEB",
                  },
                }}
              >
                Add Another Subtask
              </Button>
            )}

            <Button
              onClick={handleSubmit}
              size="small"
              type="submit"
              variant="contained"
              sx={{ ml: 1 }}
            >
              {loading ? (
                <CircularLoader />
              ) : editMode ? (
                "Save Changes"
              ) : (
                "Create"
              )}
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </>
  );
}
