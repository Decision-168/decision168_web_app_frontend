import React, { memo, useEffect, useState } from "react";
import { Box, Typography, Button, useTheme } from "@mui/material";

const Price = ({
  priceID,
  price,
  validity,
  packID,
  selectedPackID,
  packPrice,
  selectedPackPrice,
}) => {
  const theme = useTheme();
  // const selectedPackID = 1;
  // const selectedPackPrice = 0;

  // const handleSelectAction = async (getbtnVal) => {
  //   console.log("clicked", getbtnVal);
  // };

  const getButtonText = () => {
    if (packID == selectedPackID) {
      return "Selected";
    } else {
      if (selectedPackPrice <= packPrice) {
        return "Upgrade";
      }
      if (packID == 1) {
        return "Downgrade";
      }
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

      {getButtonText() && (
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
          // onClick={() => handleSelectAction(btnVal)}
          disabled={getButtonText() === "Selected"}
        >
          {getButtonText()}
        </Button>
      )}
    </Box>
  );
};

export default memo(Price);
