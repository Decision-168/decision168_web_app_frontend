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

  // console.log('priceID',priceID);
  // console.log('packID',packID);
  // console.log('selectedPackID',selectedPackID);
  // console.log('packPrice',packPrice);
  // console.log('selectedPackPrice',selectedPackPrice);

  const [btnVal, setBtnVal] = useState();

  useEffect(() => {
    if (packID == selectedPackID) {
      setBtnVal("Selected");
    } else {
      if (selectedPackPrice < packPrice) {
        console.log('1');
        setBtnVal("Upgrade");
      } else if (packID == "1") {
        setBtnVal("Downgrade");
      } else {
        setBtnVal("");
      }
    }
  }, [packID, selectedPackID, selectedPackPrice, packPrice]);

  const handleSelectAction = async (getbtnVal) => {
    console.log("clicked", getbtnVal);
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

      {btnVal && (
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
          onClick={() => handleSelectAction(btnVal)}
          disabled={btnVal === "Selected"}
        >
          {btnVal}
        </Button>
      )}
    </Box>
  );
};

export default memo(Price);
