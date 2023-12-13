import { RemoveCircleRounded } from "@mui/icons-material";
import { Button, Grid, IconButton, TextField } from "@mui/material";
import React, { Fragment, memo, useState } from "react";

const InviteMembers = ({ formValues, setFormValues }) => {
  const [inputFields, setInputFields] = useState([]);

  // const updateInviteEmails = (emails) => {
  //   setFormValues({
  //     ...formValues,
  //     imemail: emails,
  //   });
  // };

  const handleInputChange = (event, index) => {
    const values = [...inputFields];
    values[index][event.target.name] = event.target.value;
    setInputFields(values);
    setFormValues({
      ...formValues,
      imemail: values,
    });
  };

  const handleAddClick = () => {
    setInputFields([...inputFields, { email: "" }]);
  };

  const handleRemoveClick = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  return (
    <>
      <Grid item xs={3} alignSelf={"top"}>
        <Button
          fullWidth
          variant="contained"
          size="medium"
          onClick={handleAddClick}
          sx={{ width: "100%", fontSize: 12 }}
        >
          Invite More Member
        </Button>
      </Grid>
      {inputFields.map((inputField, index) => (
        <Fragment key={index}>
          <Grid item xs={2}></Grid>
          <Grid item xs={7} textAlign="start">
            <TextField
              fullWidth
              name="email"
              value={inputField.email}
              onChange={(event) => handleInputChange(event, index)}
              placeholder="Enter Email ID To Invite Member..."
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

export default memo(InviteMembers);
