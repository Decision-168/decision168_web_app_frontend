import { RemoveCircleRounded } from "@mui/icons-material";
import { Button, Grid, IconButton, TextField } from "@mui/material";
import React, { Fragment, memo, useState } from "react";

const InviteMembers = ({}) => {
  const [inputFields, setInputFields] = useState([]);

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
    values.splice(index, 1);
    setInputFields(values);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item>
          <Button variant="contained" size="medium" onClick={handleAddClick}>
            Invite More
          </Button>
        </Grid>
        {inputFields.map((inputField, index) => (
          <Fragment key={index}>
            <Grid item xs={10}>
              <TextField
                fullWidth
                name="email"
                value={inputField.email}
                onChange={(event) => handleInputChange(event, index)}
                placeholder="Enter Email ID To Invite Member..."
                variant="outlined"
              />
            </Grid>
            <Grid item xs={1}>
              <IconButton onClick={() => handleRemoveClick(index)}>
                <RemoveCircleRounded />
              </IconButton>
            </Grid>
          </Fragment>
        ))}
      </Grid>
    </>
  );
};

export default memo(InviteMembers);
