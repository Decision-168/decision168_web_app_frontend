import React from 'react';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';

const SecondaryButton = ({ onClick, children, startIcon, fullWidth }) => {
    const theme = useTheme();
  // You can customize the styles further if needed
  const buttonStyles = {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.light,
    fontWeight:300,
    '&:hover': { backgroundColor: theme.palette.secondary.dark },
  };

  return (
    <Button
    fullWidth= {fullWidth}
      size="small"
      variant="contained"
      sx={buttonStyles}
      onClick={onClick}
      startIcon={startIcon}
    >
      {children}
    </Button>
  );
};

export default SecondaryButton;
