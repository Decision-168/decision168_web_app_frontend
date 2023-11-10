import { Box, Button, Checkbox, FormControlLabel, Grid, List, ListItem, Typography } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";

export default function DeleteDailogContent({ handleClose }) {
  const theme = useTheme();

  const handleDelete = () => {
    handleClose();
  };

  return (
    <Box sx={{ p: 1, textAlign: "left" }}>
      <Typography component="p" color="primary" variant="h6">
        Are you sure you want to delete this Portfolio?
      </Typography>
      <Typography component="p" variant="caption" my={1}>
        You are about to delete the SamTech Portfolio.
      </Typography>
      <Typography component="p" variant="caption" my={1}>
        Note: Deleting this Portfolio is permanent. You will not have access to this Portfolio and its contents.
      </Typography>

      <List
        sx={{
          listStyleType: "disc",
          lineHeight: "0.4rem",
          pl: 6,
        }}>
        <ListItem sx={{ display: "list-item", fontSize: "12px" }}>All Goals & KPIs</ListItem>
        <ListItem sx={{ display: "list-item", fontSize: "12px" }}>All Projects</ListItem>
        <ListItem sx={{ display: "list-item", fontSize: "12px" }}>All Contents</ListItem>
        <ListItem sx={{ display: "list-item", fontSize: "12px" }}>All Task & Subtasks</ListItem>
        <ListItem sx={{ display: "list-item", fontSize: "12px" }}>All uploaded files</ListItem>
        <ListItem sx={{ display: "list-item", fontSize: "12px" }}>Everything else</ListItem>
      </List>

      <Box my={1}>
        <FormControlLabel
          control={<Checkbox value="dataDelete" size="small" />}
          label={
            <Typography component="p" variant="caption" color="secondary" textAlign="left">
              I understand that all data will be deleted permanently after 30 days!
            </Typography>
          }
        />
      </Box>

      <Grid item xs={12} sm={12} py={1} textAlign="end">
        <Button onClick={handleClose} size="small" variant="contained" sx={{ mr: 1, backgroundColor: theme.palette.secondary.main, color: theme.palette.secondary.light, "&:hover": { backgroundColor: theme.palette.secondary.dark } }}>
          Close
        </Button>
        <Button onClick={handleDelete} size="small" type="submit" variant="contained">
          Delete Portfolio
        </Button>
      </Grid>
    </Box>
  );
}
