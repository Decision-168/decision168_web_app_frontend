import React from "react";
import {
  Box,
  Grid,
  IconButton,
  InputLabel,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";

export default function AddLinks({ fields, setFields }) {
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
    <>
      <Grid item xs={12} sm={2} md={2} lg={2} alignSelf={"center"}>
        <InputLabel
          sx={{
            fontSize: "14px",
            mb: 1,
            mt: 2,
            textAlign: "start",
          }}
        >
          Task Link(s) & Comment(s)
        </InputLabel>
      </Grid>
      <Grid item xs={12} sm={10} md={10} lg={10}>
        {fields?.map((inputField, index) => (
          <Grid
            container
            spacing={2}
            key={index}
            xs={12}
            sm={12}
            md={12}
            lg={12}
          >
            <Grid item xs={12} sm={5} py={2} textAlign="start">
              <TextField
                fullWidth
                name="link"
                value={fields[index].link || ""}
                onChange={(event) => handleChange("link")(event, index)}
                placeholder="Enter Task Link"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={5} py={2} textAlign="start">
              <TextField
                fullWidth
                name="linkComment"
                value={fields[index].linkComment || ""}
                onChange={(event) => handleChange("linkComment")(event, index)}
                placeholder="Enter Task Link Comment"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={2} py={2}>
              <Stack direction="row" justifyContent="end" alignItems="center">
                <Tooltip
                  arrow
                  title="Add another link"
                  size="small"
                  placement="top-end"
                >
                  <IconButton onClick={handleAddClick}>
                    <AddCircleRoundedIcon />
                  </IconButton>
                </Tooltip>

                {fields.length > 1 && (
                  <Tooltip
                    arrow
                    title="Remove link"
                    size="small"
                    placement="top-end"
                  >
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
    </>
  );
}
