import React, { memo } from "react";
import { Box, Typography, Button } from "@mui/material";

const Price = ({ price, validity, buttonText }) => {
  return (
    <Box sx={{ height: "150px", my: 2, py: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center" }}>
      <Box>
        <Typography component="span" sx={{ fontSize: "36px", fontWeight: 700 }}>
          <sup style={{ fontSize: "20px", verticalAlign: "top", padding: "2px", fontWeight: 700 }}>$</sup>
          {price}
        </Typography>
        <Typography variant="caption" component="span" sx={{ fontSize: "13px", opacity: 0.6, fontWeight: 500 }}>
          &nbsp; / {validity}
        </Typography>
      </Box>

      <Button fullWidth size="small" variant="contained">
        {buttonText}
      </Button>
    </Box>
  );
};

export default memo(Price);
