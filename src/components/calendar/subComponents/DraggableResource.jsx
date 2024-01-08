import { Box, Checkbox, FormControlLabel, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../../redux/action/modalSlice";
import ConfirmationDialog from "../../common/ConfirmationDialog";
import { openCnfModal } from "../../../redux/action/confirmationModalSlice";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SecondaryButton from "../../common/SecondaryButton";
import { useTheme } from "@mui/material/styles";
import { getCustomStyle } from "../getCustomStyle";
import { EVENTS } from "../data";
import CircleIcon from "@mui/icons-material/Circle";
import CreateIcon from "@mui/icons-material/Create";
import CloseIcon from "@mui/icons-material/Close";

const DraggableResource = ({ setDraggedEvent }) => {
  const theme = useTheme();
  const [removeAfterDrop, setRemoveAfterDrop] = useState(false);
  const [localDraggedEvent, setLocalDraggedEvent] = useState(null);

  const dispatch = useDispatch();
  const handleCheckboxChange = (event) => {
    setRemoveAfterDrop(event.target.checked);
  };

  const handleDragStart = (event, item) => {
    setDraggedEvent(item);
    setLocalDraggedEvent(item);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    handleDrop();
  };

  const handleDrop = () => {
    if (removeAfterDrop && localDraggedEvent) {
      // Remove the dragged item from the list using a unique identifier
      const updatedList = boxes.filter((box) => box.text !== localDraggedEvent.text);
      setBoxes(updatedList);
    } else {
      // Add the dragged item back to the list if removeAfterDrop is false
      setBoxes((prevBoxes) => [...prevBoxes, localDraggedEvent]);
    }
    // Reset the localDraggedEvent state
    setLocalDraggedEvent(null);
  };

  const handleCreateDraggableEvent = () => {
    dispatch(openModal("create-draggable-event"));
  };

  const handleUpdateDraggableEventClick = () => {
    dispatch(openModal("update-draggable-event"));
  };

  const handleDelete = () => {
    dispatch(
      openCnfModal({
        modalName: "deleteDraggableEvent",
        title: "Are you sure?",
        description: "You want to Delete Draggable Event",
      })
    );
  };

  return (
    <>
      <Paper
        sx={{
          p: 2,
          height: "100%",
        }}
      >
        <SecondaryButton onClick={handleCreateDraggableEvent} startIcon={<AddCircleOutlineIcon />} fullWidth={true}>
          Create Draggable Event
        </SecondaryButton>

        <Typography
          sx={{
            fontSize: "12px",
            color: theme.palette.tertiary.main,
            mt: 1,
            textAlign: "left",
          }}
        >
          Drag and drop your draggable event in the calendar.
        </Typography>

        <Box
          sx={{
            overflowY: "auto",
            overflowX: "hidden",
            maxHeight: "100px",
            my: 2,
            "&::-webkit-scrollbar": {
              backgroundColor: theme.palette.tertiary.light,
              borderRadius: "4px",
              width: "5px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: theme.palette.tertiary.main,
              borderRadius: "4px",
            },
          }}
          onDragOver={handleDragOver}
        >
          <>
            {EVENTS.map((event, index) => (
              <Box key={index} sx={{ ...getCustomStyle(event), p: 0.7, my: 0.5, cursor: "move" }} draggable="true" onDragStart={(e) => handleDragStart(e, event)}>
                <CircleIcon sx={{ fontSize: "0.9rem", mx: 0.5, color: "inherite" }} />
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                  <Typography component="h6" sx={{ fontSize: "0.7rem", fontWeight: "500", color: "inherite" }}>
                    {event?.title}
                  </Typography>
                  <Box>
                    <CreateIcon color="inherite" fontSize="inherite" sx={{ cursor: "pointer", mr: 1 }} />
                    <CloseIcon color="inherite" fontSize="inherite" sx={{ cursor: "pointer" }} />
                  </Box>
                </Box>
              </Box>
            ))}
          </>
        </Box>

        <Box sx={{ width: "100%", textAlign: "left" }}>
          <FormControlLabel
            control={<Checkbox size="small" checked={removeAfterDrop} onChange={handleCheckboxChange} style={{ color: theme.palette.secondary.main }} />}
            label={
              <Typography
                sx={{
                  fontSize: "12px",
                  color: theme.palette.tertiary.main,
                  textAlign: "left",
                }}
              >
                Remove after drop
              </Typography>
            }
          />
        </Box>
      </Paper>
      <ConfirmationDialog value={"deleteDraggableEvent"} />
    </>
  );
};

export default DraggableResource;
