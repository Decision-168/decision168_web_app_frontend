import React from 'react';
import Box from '@mui/material/Box';

const EventColorBox = ({ backgroundColor, color, ...restProps }) => {
  const boxStyles = {
    width: "20px",
    height: "20px",
    backgroundColor: backgroundColor || "pink",
    marginRight: "8px",
    borderLeft: `5px solid ${color || "red"}`,
    borderRadius: "5px",
  };

  return <Box sx={boxStyles} {...restProps}>&nbsp;</Box>;
};

export default EventColorBox;
