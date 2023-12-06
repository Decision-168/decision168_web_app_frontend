import React from "react";
import CustomTextField from "../../../common/CustomTextField";
import { Box, Button, Grid, IconButton, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { authValidations } from "../../../auth/authValidations";
import { useTheme } from "@mui/material/styles";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import FilterSelectedOptions from "../../../common/FilterSelectedOptions";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../../redux/action/userSlice";
import CircularLoader from "../../../common/CircularLoader";
import { insertProjectPortfolioDepartment } from "../../../../api/modules/porfolioModule";
import { toast } from "react-toastify";

const departments = [
  { title: "Admnistration" },
  { title: "Accounting & Finanace" },
  { title: "Customer Service" },
  { title: "Human Resources" },
  { title: "Marketing" },
  { title: "Sales" },
  { title: "Research & Development" },
];

export default function AddDepartmentForm({ handleClose, data }) {
  console.log(data);
  const [show, setShow] = React.useState(true);
  const [inputFields, setInputFields] = React.useState([]);
  const [departments, setDepartments] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const storedPorfolioId = JSON.parse(localStorage.getItem("portfolioId"));
  const theme = useTheme();
  const user = useSelector(selectUserDetails);

  const handleInputChange = (event, index) => {
    const values = [...inputFields];
    values[index][event.target.name] = event.target.value;
    setInputFields(values);
  };

  console.log(inputFields);

  const handleAddClick = () => {
    setInputFields([...inputFields, { cus_department: "", error: false }]);
    setShow(false);
  };

  const handleRemoveClick = (index) => {
    const values = [...inputFields];
    // if (values.length > 0) {
    //   values.splice(index, 1);
    //   setInputFields(values);
    // }

    if (values.length > 1) {
      values.splice(index, 1);
      setInputFields(values);
    }

    if (inputFields.length === 1) {
      values.splice(index, 1);
      setInputFields(values);
      setShow(true);
    }
  };

  const handleDepartmentChange = (selectedOptions) => {
    console.log("Selected departments:", selectedOptions);
    const departmentsArray = selectedOptions?.map((item) => item.department);
    setDepartments(departmentsArray);
  };

  const isDepartmentValid = (department) => {
    // Allow only letters and spaces in the department name
    const departmentPattern = /^[A-Za-z ]+$/;
    return departmentPattern.test(department);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check for empty email fields and invalid email pattern
    const updatedFields = inputFields.map((field) => {
      if (!field.cus_department.trim()) {
        return { ...field, error: "Department cannot be empty" };
      } else if (!isDepartmentValid(field.cus_department)) {
        return { ...field, error: "Invalid department" };
      }
      return { ...field, error: false };
    });

    setInputFields(updatedFields);

    // If there are errors, prevent form submission
    if (updatedFields.some((field) => field.error)) {
      return;
    }

    const customDepartmentArray = updatedFields.map((item) => item.cus_department);
    const data = {
      portfolio_id: storedPorfolioId,
      departments: departments,
      cus_departments: customDepartmentArray,
      createdby: user?.reg_id,
    };

    alert(JSON.stringify(data));

    try {
      setLoading(true);
      const response = await insertProjectPortfolioDepartment(data);
      handleClose();
      toast.success(`${response.message}`);
    } catch (error) {
      toast.error(`${error?.response?.data?.error}`);
      console.error("Error in inserting portfolio department:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Grid container>
        <Grid item xs={12} py={2} textAlign="start">
          {show && (
            <FilterSelectedOptions
              label=""
              labelColor=""
              required={false}
              placeholder="Departments"
              items={data}
              onSelectionChange={handleDepartmentChange}
              getOptionLabelFn={(option) => option.department}
            />
          )}
        </Grid>

        <Grid item xs={12} py={2} textAlign="start">
          <Button onClick={handleAddClick} size="small" variant="contained">
            Add Custom Department
          </Button>
        </Grid>

        <Grid item xs={12} py={1} textAlign="start">
          {inputFields.map((inputField, index) => (
            <Grid container key={index} spacing={2}>
              <Grid item xs={10} py={2} textAlign="start">
                <TextField
                  fullWidth
                  name="cus_department"
                  onChange={(event) => handleInputChange(event, index)}
                  placeholder="Enter custom department"
                  variant="outlined"
                  error={inputField.error}
                  helperText={inputField.error}
                />
              </Grid>
              <Grid item xs={2} py={2}>
                <Stack direction="row" justifyContent="end" alignItems="center">
                  {inputFields.length > 0 && (
                    <IconButton onClick={() => handleRemoveClick(index)}>
                      <RemoveCircleRoundedIcon />
                    </IconButton>
                  )}
                </Stack>
              </Grid>
            </Grid>
          ))}
        </Grid>

        <Grid item xs={12} sm={12} py={1} textAlign="end">
          <Button
            onClick={handleClose}
            size="small"
            variant="contained"
            sx={{
              mr: 1,
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.secondary.light,
              "&:hover": { backgroundColor: theme.palette.secondary.dark },
            }}>
            Close
          </Button>
          <Button size="small" type="submit" variant="contained">
            {loading ? <CircularLoader /> : "Add"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
