import React from "react";
import CustomTextField from "../../../common/CustomTextField";
import { Box, Button, Grid, IconButton, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { authValidations } from "../../../auth/authValidations";
import { useTheme } from "@mui/material/styles";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";

export default function AddMemberForm({ handleClose }) {
  const [inputFields, setInputFields] = React.useState([
    {
      email: "",
    },
  ]);

  const theme = useTheme();

  const handleInputChange = (event, index) => {
    const values = [...inputFields];
    values[index][event.target.name] = event.target.value;
    setInputFields(values);
  };

  const handleAddClick = () => {
    setInputFields([...inputFields, { email: "" }]);
  };

  const handleRemoveClick = (index) => {
    const values = [...inputFields];
    if (values.length > 1) {
      values.splice(index, 1);
      setInputFields(values);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(JSON.stringify(inputFields));
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Grid container>
        <Grid item xs={12} py={1} textAlign="start" >
          {inputFields.map((inputField, index) => (
            <Grid container key={index} spacing={5}>
              <Grid item xs={10} py={2} textAlign="start">
                <TextField fullWidth name="email" onChange={(event) => handleInputChange(event, index)} placeholder="Enter email to invite portfolio member..." variant="outlined" />
              </Grid>
              <Grid item xs={2} py={2}>
                <Stack direction="row" justifyContent="end" alignItems="center">
                  <IconButton onClick={handleAddClick}>
                    <AddCircleRoundedIcon />
                  </IconButton>

                  {inputFields.length > 1 && (
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
          <Button onClick={handleClose} size="small" variant="contained" sx={{ mr:1, backgroundColor: theme.palette.secondary.main, color: theme.palette.secondary.light, "&:hover": { backgroundColor: theme.palette.secondary.dark } }}>
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


