import React from "react";
import Button from '@mui/material/Button';


const PrimaryButton = ({ onClick, children, startIcon, fullWidth }) => {
  return (
    <Button fullWidth={fullWidth} size="small" variant="contained" onClick={onClick} startIcon={startIcon}>
      {children}
    </Button>
  );
};

export default PrimaryButton;
