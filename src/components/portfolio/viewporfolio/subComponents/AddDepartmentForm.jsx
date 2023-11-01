import React from "react";
import CustomTextField from "../../../common/CustomTextField";
import { Box, Button, Grid, IconButton, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { authValidations } from "../../../auth/authValidations";
import { useTheme } from "@mui/material/styles";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import FilterSelectedOptions from "../../../common/FilterSelectedOptions";

const departments = [{ title: "Admnistration" }, { title: "Accounting & Finanace" }, { title: "Customer Service" }, { title: "Human Resources" }, { title: "Marketing" }, { title: "Sales" }, { title: "Research & Development" }];

export default function AddDepartmentForm({ handleClose }) {
  const [show, setShow] = React.useState(true);
  const [inputFields, setInputFields] = React.useState([]);

  const theme = useTheme();

  const handleInputChange = (event, index) => {
    const values = [...inputFields];
    values[index][event.target.name] = event.target.value;
    setInputFields(values);
  };

  const handleAddClick = () => {
    setInputFields([...inputFields, { email: "" }]);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(JSON.stringify(inputFields));
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Grid container>
        {show && (
          <Grid item xs={12} py={1} textAlign="start">
            <FilterSelectedOptions label="" labelColor="" required={false} placeholder="Departments" items={departments} />
          </Grid>
        )}

        <Grid item xs={12} py={1} textAlign="start">
          <Button onClick={handleAddClick} size="small" variant="contained">
            Add Custom Department
          </Button>
        </Grid>

        <Grid item xs={12} py={1} textAlign="start">
          {inputFields.map((inputField, index) => (
            <Grid container key={index}>
              <Grid item xs={10} py={2} textAlign="start">
                <TextField fullWidth name="email" onChange={(event) => handleInputChange(event, index)} placeholder="Enter email to invite portfolio member..." variant="outlined" />
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
          <Button onClick={handleClose} size="small" variant="contained" sx={{  mr:1, backgroundColor: theme.palette.secondary.main, color: theme.palette.secondary.light, "&:hover": { backgroundColor: theme.palette.secondary.dark } }}>
            Close
          </Button>
          <Button size="small" type="submit" variant="contained" >
            Add
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

{
  /* <CustomTextField
                  name="email"
                  placeholder="Enter email id to invite portfolio member..."
                  register={register}
                  errors={errors}
                  value={inputField.email}
                  validation={authValidations.email} // Pass the validation rules as a prop
                /> */
}
