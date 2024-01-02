import { RemoveCircleRounded } from "@mui/icons-material";
import {
  Button,
  Grid,
  IconButton,
  InputLabel,
  TextField,
  useTheme,
} from "@mui/material";
import React, { Fragment, memo, useState } from "react";
import { useForm } from "react-hook-form";

const AddLinks = ({ validation }) => {
  const [inputFields, setInputFields] = useState([]);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const handleInputChange = (event, index) => {
    const values = [...inputFields];
    values[index][event.target.name] = event.target.value;
    setInputFields(values);
  };

  const handleAddClick = () => {
    setInputFields([...inputFields, { projectLink: "", ProjectComments: "" }]);
  };

  const handleRemoveClick = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };
  const theme = useTheme()
   const placeholderStyles = {
     fontSize: "14px",
     color: theme.palette.secondary.dark,
   };
  return (
    <>
      <Grid item xs={2} alignSelf={"center"}>
        <InputLabel sx={{ fontSize: "14px" }}>
          Project Link(s) & Comment(s)
        </InputLabel>
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          name="projectLink"
          value={inputFields.projectLink}
          onChange={(event) => handleInputChange(event, index)}
          placeholder="Enter Project Link"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          fullWidth
          name="ProjectComments"
          value={inputFields.ProjectComments}
          onChange={(event) => handleInputChange(event, index)}
          placeholder="Enter Project Link Comment"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={3} alignSelf={"center"}>
        <Button
          fullWidth
          variant="contained"
          size="medium"
          onClick={handleAddClick}
          sx={{ width: "100%", fontSize: 12 }}
        >
          Add Another Link
        </Button>
      </Grid>
      {inputFields.map((inputField, index) => (
        <Fragment key={index}>
          <Grid item xs={2}></Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              name="projectLink"
              value={inputField.projectLink}
              onChange={(event) => handleInputChange(event, index)}
              placeholder="Enter Project Link"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              name="ProjectComments"
              value={inputField.ProjectComments}
              onChange={(event) => handleInputChange(event, index)}
              placeholder="Enter Project Link Comment"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={3} alignSelf={"top"}>
            <IconButton onClick={() => handleRemoveClick(index)}>
              <RemoveCircleRounded />
            </IconButton>
          </Grid>
        </Fragment>
      ))}
    </>
  );
};

export default memo(AddLinks);
