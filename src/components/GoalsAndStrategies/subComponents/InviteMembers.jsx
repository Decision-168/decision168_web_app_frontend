import { RemoveCircleRounded } from "@mui/icons-material";
import { Button, Grid, IconButton, TextField } from "@mui/material";
import React, { Fragment, memo } from "react";

const InviteMembers = ({ formValues, setFormValues }) => {
  const handleInputChange = (event, index) => {
    setFormValues((prevFormValues) => {
      const updatedImEmail = [...prevFormValues.imemail];
      updatedImEmail[index] = {
        ...updatedImEmail[index],
        [event.target.name]: event.target.value,
      };

      return {
        ...prevFormValues,
        imemail: updatedImEmail,
      };
    });
  };

  const handleAddClick = () => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      imemail: [...prevFormValues.imemail, { email: "" }],
    }));
  };

  const handleRemoveClick = (index) => {
    setFormValues((prevFormValues) => {
      const updatedImEmail = [...prevFormValues.imemail];
      updatedImEmail.splice(index, 1);

      return {
        ...prevFormValues,
        imemail: updatedImEmail,
      };
    });
  };

  return (
    <>
      <Grid item xs={12} sm={4} md={3} lg={3} alignSelf={"center"}>
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
      {formValues?.imemail?.map((inputField, index) => (
        <Fragment key={index}>
          <Grid item xs={12} sm={2} md={2} lg={2}></Grid>
          <Grid item xs={10} sm={7} md={7} lg={7} textAlign="start">
            <TextField
              fullWidth
              name="email"
              value={inputField?.email}
              onChange={(event) => handleInputChange(event, index)}
              placeholder="Enter Email ID To Invite Member..."
              variant="outlined"
            />
          </Grid>
          <Grid item xs={2} sm={3} md={3} lg={3} alignSelf={"top"}>
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
