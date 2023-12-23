import React from "react";
import { Box, Grid, IconButton, Stack, TextField, Tooltip } from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";

export default function AddAnotherLink({ fields, setFields }) {
  const handleAddClick = () => {
    setFields([...fields, { link: "", linkComment: "" }]);
  };

  const handleRemoveClick = (index) => {
    const updatedFields = [...fields];
    if (updatedFields.length > 1) {
      updatedFields.splice(index, 1);
      setFields(updatedFields);
    }
  };

  const handleChange = (fieldName) => (event, index) => {
    const updatedLinks = [...fields];
    updatedLinks[index][fieldName] = event.target.value;
    setFields(updatedLinks);
  };

  return (
    <Grid container>
      <Grid item xs={12} py={1} textAlign="start">
        {fields?.map((inputField, index) => (
          <Grid container key={index} spacing={2} sx={{ my: 1, px: 1, bgcolor: "#F7F7F7" }}>
            <Grid item xs={12} sm={6} py={2} textAlign="start">
              <TextField fullWidth name="link" value={fields[index].link || ""} onChange={(event) => handleChange("link")(event, index)} placeholder="Enter Task Link" variant="outlined" />
            </Grid>
            <Grid item xs={12} sm={5} py={2} textAlign="start">
              <TextField fullWidth name="linkComment" value={fields[index].linkComment || ""} onChange={(event) => handleChange("linkComment")(event, index)} placeholder="Enter Task Link Comment" variant="outlined" />
            </Grid>
            <Grid item xs={12} sm={1} py={2}>
              <Stack direction="row" justifyContent="end" alignItems="center">
                <Tooltip arrow title="Add another link" size="small" placement="top-end">
                  <IconButton onClick={handleAddClick}>
                    <AddCircleRoundedIcon />
                  </IconButton>
                </Tooltip>

                {fields.length > 1 && (
                  <Tooltip arrow title="Remove link" size="small" placement="top-end">
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
  );
}
