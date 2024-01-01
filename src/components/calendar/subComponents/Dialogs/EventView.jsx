import { useTheme } from "@emotion/react";
import { Box, Button, DialogContent, Grid, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState } from "react";
import moment from "moment"; // Import moment library for date formatting
import CustomDialog from "../../../common/CustomDialog";
import DeleteEvent from "./DeleteEvent";
import EditEvent from "./EditEvent";
import { openModal as reduxOpenModal } from "../../../../redux/action/modalSlice";
import { useDispatch } from "react-redux";

const EventView = ({ selectedEvent }) => {
  const theme = useTheme();

  const dispatch = useDispatch();

  // State to manage the delete dialog open/close
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);

  // Function to handle the delete button click
  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };
  // Function to handle the edit button click
  const handleEditClick = () => {
    setEditDialogOpen(true);
  };

  const handleDeleteClose = () => {
    console.log("cancel delete");
    setDeleteDialogOpen(false);
  };

  const handleUpdateTypeClose = () => {
    console.log("Update cancel");
    setEditDialogOpen(false);
  };

  const handleAddTodo = () => {
    console.log("add todo clicked");

    dispatch(reduxOpenModal("add-todo"));
  };

  return (
    <>
      <DialogContent dividers>
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <Button
              sx={{ backgroundColor: theme.palette.primary.light }}
              onClick={handleAddTodo}
            >
              <AddIcon /> Add Todo
            </Button>
          </Grid>
          <Grid item>
            <Button
              sx={{ backgroundColor: theme.palette.primary.light }}
              onClick={handleEditClick}
            >
              <EditIcon />
              Edit
            </Button>
          </Grid>
          <Grid item>
            <Button
              sx={{
                backgroundColor: theme.palette.secondary.dark,
                color: "#888",
              }}
              onClick={handleDeleteClick}
            >
              <DeleteIcon />
              Delete
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <Box
              sx={{
                width: "20px",
                height: "20px",
                backgroundColor: selectedEvent?.color,
                marginRight: "8px",
                borderRadius: "4px", // Optional: Add border-radius for a rounded appearance
              }}
            />
          </Grid>
          <Grid item>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ textAlign: "left", marginTop: "28px" }}
            >
              {selectedEvent?.title}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ textAlign: "left" }}
            >
              Date: {moment(selectedEvent?.start).format("YYYY-MM-DD")} | Time:{" "}
              {moment(selectedEvent?.start).format("HH:mm")} -{" "}
              {moment(selectedEvent?.end).format("HH:mm")}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <CustomDialog
        handleClose={() => setDeleteDialogOpen(false)}
        open={isDeleteDialogOpen}
        modalTitle="Delete Event"
        showModalButton={false}
        modalSize="md"
        redirectPath=""
      >
        <DeleteEvent handleDeleteClose={handleDeleteClose} />
      </CustomDialog>
      <CustomDialog
        handleClose={() => setEditDialogOpen(false)}
        open={isEditDialogOpen}
        modalTitle="Update Event"
        showModalButton={false}
        modalSize="lg"
        redirectPath=""
      >
        <EditEvent handleUpdateTypeClose={handleUpdateTypeClose} />
      </CustomDialog>
    </>
  );
};

export default EventView;
