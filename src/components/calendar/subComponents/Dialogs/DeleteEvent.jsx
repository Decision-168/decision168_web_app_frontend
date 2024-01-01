import React, { useState } from "react";
import {
  DialogContent,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  Button,
  Box,
} from "@mui/material";

const DeleteEvent = ({ handleDeleteClose }) => {
  const [selectedOption, setSelectedOption] = useState("deleteOnlyThis");

  //select radio option
  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleConfirmDelete = () => {
    console.log("delete");
    // Add your delete logic here
  };

  return (
    <DialogContent>
      <RadioGroup value={selectedOption} onChange={handleRadioChange}>
        <FormControlLabel
          value="deleteOnlyThis"
          control={<Radio />}
          label={
            <Typography color="textPrimary">Delete only this event</Typography>
          }
        />
        {/* Add more options if needed */}
      </RadioGroup>

      {/* Buttons for Delete and Cancel */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
        <Button
          onClick={handleConfirmDelete}
          variant="contained"
          color="primary"
        >
          Delete
        </Button>
        <Button
          onClick={handleDeleteClose}
          variant="outlined"
          color="primary"
          sx={{ marginLeft: 1 }}
        >
          Cancel
        </Button>
      </Box>
    </DialogContent>
  );
};

export default DeleteEvent;
