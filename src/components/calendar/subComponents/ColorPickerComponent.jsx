import React, { useState } from 'react';
import {Button, Box} from '@mui/material';
import Popover from '@mui/material/Popover';
import { TwitterPicker   } from 'react-color';
import BrushIcon from '@mui/icons-material/Brush';

const ColorPickerComponent = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedColor, setSelectedColor] = useState('#F2F2F2'); // Initial color

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (color) => {
    setSelectedColor(color.hex);
  };

  const open = Boolean(anchorEl);

  return (
    <Box sx={{pt:1}}>
      <Button
      onClick={handleClick}
        fullWidth
        sx={{ backgroundColor: selectedColor, border:"1px solid lightgrey",  height:"37px", '&:hover': {
            bgcolor:selectedColor
        } }}
        startIcon={<BrushIcon />}
      >
        Choose Color
      </Button>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        fullWidth
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <TwitterPicker   color={selectedColor} onChange={handleChange} />
      </Popover>
    </Box>
  );
};

export default ColorPickerComponent;
