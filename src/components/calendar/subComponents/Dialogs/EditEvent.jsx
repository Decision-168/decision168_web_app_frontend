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
import { openModal as reduxOpenModal } from "../../../../redux/action/modalSlice";

import { useDispatch } from "react-redux";
import ReduxDialog from "../../../common/ReduxDialog";
import CustomDialog from "../../../common/CustomDialog";
import Event from "../Event";

const EditEvent = ({ handleUpdateTypeClose }) => {
  const [selectedOption, setSelectedOption] = useState("updateOnlyThis");
  const [isDialogOpen, setDialogOpen] = useState(false);

  const dispatch = useDispatch();

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleConfirmUpdate = () => {
    console.log("Event Updates");
    // Add your update logic here
    dispatch(reduxOpenModal("event-update"));
  };

  return (
    <>
      <DialogContent>
        <RadioGroup value={selectedOption} onChange={handleRadioChange}>
          <FormControlLabel
            value="updateOnlyThis"
            control={<Radio />}
            label={
              <Typography color="textPrimary" sx={{ fontSize: 14 }}>
                Update only this event
              </Typography>
            }
          />
          <FormControlLabel
            value="updateThisAndFollowing"
            control={<Radio />}
            label={
              <Typography color="textPrimary" sx={{ fontSize: 14 }}>
                Update this and following events
              </Typography>
            }
          />
          <FormControlLabel
            value="updateAll"
            control={<Radio />}
            label={
              <Typography color="textPrimary" sx={{ fontSize: 14 }}>
                Update all events
              </Typography>
            }
          />
        </RadioGroup>

        {/* Buttons for Update and Cancel */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
          <Button
            onClick={handleConfirmUpdate}
            variant="contained"
            color="primary"
          >
            Update
          </Button>
          <Button
            onClick={handleUpdateTypeClose}
            variant="outlined"
            color="primary"
            sx={{ marginLeft: 1 }}
          >
            Cancel
          </Button>
        </Box>
      </DialogContent>
    </>
  );
};

export default EditEvent;
