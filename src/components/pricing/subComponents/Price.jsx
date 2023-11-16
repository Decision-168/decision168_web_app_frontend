import React, { memo } from "react";
import { Box, Typography, Button, useTheme } from "@mui/material";

const Price = ({ price, validity, index, btnIndex }) => {
  const theme = useTheme();

  const renderButtonText = () => {
    if (btnIndex === index) {
      return "Selected";
    } else if (btnIndex > index) {
      return "Downgrade";
    } else {
      return "Upgrade";
    }
  };
  return (
    <Box
      sx={{
        height: "150px",
        my: 2,
        py: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box>
        <Typography component="span" sx={{ fontSize: "36px", fontWeight: 700 }}>
          <sup
            style={{
              fontSize: "20px",
              verticalAlign: "top",
              padding: "2px",
              fontWeight: 700,
            }}
          >
            $
          </sup>
          {price}
        </Typography>
        <Typography
          variant="caption"
          component="span"
          sx={{ fontSize: "13px", opacity: 0.6, fontWeight: 500 }}
        >
          &nbsp; / {validity}
        </Typography>
      </Box>

      <Button
        fullWidth
        size="small"
        variant="contained"
        sx={{
          ":disabled": {
            background: theme.palette.secondary.main,
            color: "white",
          },
        }}
        disabled={btnIndex === index}
      >
        {renderButtonText()}
      </Button>
    </Box>
  );
};

export default memo(Price);
