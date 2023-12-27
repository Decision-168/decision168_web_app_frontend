import React from "react";
import { Grid, Typography, IconButton, Box, TextField, InputLabel, Paper } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useTheme } from "@mui/material/styles";
import SelectIcon from "./SelectIcon";

export default function AddSocialMediaLinks({ fields, setFields }) {
  const theme = useTheme();

  const handleAddClick = () => {
    setFields([...fields, { social_media_icon: "", social_media: "" }]);
  };

  const handleRemoveClick = (index) => {
    const updatedFields = [...fields];
    if (updatedFields.length > 1) {
      updatedFields.splice(index, 1);
      setFields(updatedFields);
    }
  };

  const handleLinkChange = (event, index) => {
    const updatedLinks = [...fields];
    updatedLinks[index].social_media = event.target.value;
    setFields(updatedLinks);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="start" alignItems="center" px={2} color={theme.palette.secondary.main}>
        <Typography>Add Social Media Links : </Typography>
        <IconButton onClick={handleAddClick}>
          <AddCircleIcon />
        </IconButton>
      </Box>

      {fields?.map((field, index) => (
        <Paper elevation={0} sx={{ width: "100%", my: 1, bgcolor: "#F7F7F7" }}>
          <Grid container key={index}>
            <Grid item xs={12} sm={5.5} px={2} py={1}>
              <SelectIcon required={false} fields={fields} setFields={setFields} index={index} />
            </Grid>

            <Grid item xs={12} sm={5.5} px={2} py={1}>
              <Box sx={{ textAlign: "left" }}>
                <InputLabel sx={{ fontSize: "14px", color: theme.palette.secondary.main }}>Link</InputLabel>
                <TextField
                  sx={{ mt: 1 }}
                  id={`link-${index}`}
                  variant="outlined"
                  fullWidth
                  placeholder="Enter link"
                  value={fields[index].social_media || ""}
                  onChange={(event) => handleLinkChange(event, index)}
                />
              </Box>
            </Grid>

            <Grid item xs={12} sm={1} px={1} py={1}>
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  justifyContent: "end",
                  alignItems: "end",
                }}
              >
                <IconButton onClick={() => handleRemoveClick(index)}>
                  <RemoveCircleIcon />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </Box>
  );
}
