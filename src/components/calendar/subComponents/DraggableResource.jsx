import { Box, Button, Checkbox, FormControlLabel, IconButton, Paper, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../../redux/action/modalSlice";
import ConfirmationDialog from "../../common/ConfirmationDialog";
import { openCnfModal } from "../../../redux/action/confirmationModalSlice";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SecondaryButton from "../../common/SecondaryButton";
import { useTheme } from "@mui/material/styles";

const DraggableResource = ({ setDraggedEvent }) => {
  const theme = useTheme();
  const [removeAfterDrop, setRemoveAfterDrop] = useState(false);
  const [localDraggedEvent, setLocalDraggedEvent] = useState(null);
  const [boxes, setBoxes] = useState([
    { backgroundColor: "#999", text: "event", fontSize: "14px" },
    { backgroundColor: "#397", text: "test", fontSize: "14px" },
    { backgroundColor: "#167", text: "does not repeat", fontSize: "14px" },
    { backgroundColor: "#999", text: "dr2", fontSize: "14px" },
    { backgroundColor: "#397", text: "test", fontSize: "14px" },
    { backgroundColor: "#167", text: "does not repeat", fontSize: "14px" },
  ]);

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
    // console.log("click", localDraggedEvent.text);
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

  const handleCreateDraggableEventClick = () => {
    // console.log("createDraggableEventClick");
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
          padding: "16px",
          height: "100%",
        }}
      >
        <SecondaryButton onClick={handleCreateDraggableEventClick} startIcon={<AddCircleOutlineIcon />} fullWidth={true}>
          Create Draggable Event
        </SecondaryButton>

        <Typography
          variant="body2"
          color="textSecondary"
          sx={{
            fontSize: "13px",
            color: theme.palette.secondary.main,
            opacity: 0.7,
            mt: "10px",
            textAlign: "start",
          }}
        >
          Drag and drop your draggable event in the calendar.
        </Typography>

        <Box
          sx={{
            overflowY: "auto",
            overflowX: "hidden",
            maxHeight: "150px", // Adjust this value as needed
            mt: "20px",
            "&::-webkit-scrollbar": {
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              borderRadius: "4px",
              width: "5px", // Adjust the width as needed
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the color as needed
              borderRadius: "4px",
            },
          }}
          onDragOver={handleDragOver}
        >
          <>
            {boxes.map((box, index) => (
              <Box
                key={index}
                sx={{
                  backgroundColor: box?.backgroundColor,
                  borderRadius: "3px",
                  mb: "2px",
                  textAlign: "left",
                  px: "10px",
                  py: "2px",
                  fontSize: box?.fontSize || "inherit",
                  cursor: "move",
                }}
                draggable="true"
                onDragStart={(e) => handleDragStart(e, box)}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Box
                    sx={{
                      height: "10px",
                      width: "10px",
                      borderRadius: "50%",
                      border: "1px solid white",
                      mt: "10px",
                    }}
                  ></Box>
                  {box?.text}
                  {/* Edit Icon */}
                  <Box>
                    <IconButton color="primary" aria-label={`edit ${box?.text}`}>
                      <EditIcon onClick={handleUpdateDraggableEventClick} sx={{ fontSize: "14px" }} />
                    </IconButton>
                    {/* Close Icon */}
                    <IconButton color="secondary" aria-label={`close ${box?.text}`}>
                      <CloseIcon
                        sx={{
                          fontSize: "14px",
                        }}
                        onClick={handleDelete}
                      />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            ))}
          </>
        </Box>

        <Box sx={{ width: "100%", textAlign: "left" }}>
          <FormControlLabel
            control={<Checkbox size="small" checked={removeAfterDrop} onChange={handleCheckboxChange} color="secondary" />}
            label={
              <Typography variant="body2" color="textSecondary">
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
