import React from "react";
import { Box, Grid, IconButton, Stack, TextField, Tooltip } from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";

export default function AddAnotherLink() {
  const [inputFields, setInputFields] = React.useState([
    {
      taskLink: "",
      taskLinkComment: "",
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
        taskLink: "",
        taskLinkComment: "",
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
  return (
    <div>
      {/* <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}> */}
      <Grid container>
        <Grid item xs={12} py={1} textAlign="start">
          {inputFields.map((inputField, index) => (
            <Grid container key={index} spacing={5}>
              <Grid item xs={12} sm={6} py={2} textAlign="start">
                <TextField fullWidth name="taskLink" onChange={(event) => handleInputChange(event, index)} placeholder="Enter Task Link" variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={5} py={2} textAlign="start">
                <TextField fullWidth name="taskLink" onChange={(event) => handleInputChange(event, index)} placeholder="Enter Task Link Comment" variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={1} py={2}>
                <Stack direction="row" justifyContent="end" alignItems="center">
                  <Tooltip title="Add another link" arrow size="small" placement="top-start">
                    <IconButton onClick={handleAddClick}>
                      <AddCircleRoundedIcon />
                    </IconButton>
                  </Tooltip>

                  {inputFields.length > 1 && (
                    <Tooltip title="Remove link" arrow size="small" placement="top-start">
                      <IconButton onClick={() => handleRemoveClick(index)}>
                        <RemoveCircleRoundedIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                </Stack>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
      {/* </Box> */}
    </div>
  );
}
