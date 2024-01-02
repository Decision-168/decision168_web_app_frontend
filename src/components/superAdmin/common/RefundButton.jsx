/* eslint-disable react/prop-types */
import { KeyboardArrowDown } from "@mui/icons-material";
import { Button, Menu, MenuItem, Typography } from "@mui/material";
import { useState } from "react";

const RefundButton = ({ refundStatus, reg_id }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleRefundComplete = (reg_id) => {
    // refund completion logic here
    console.log("Refund complete for registration ID:", reg_id);

    setAnchorEl(null); // for closing the menu
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (refundStatus === "refund") {
    return (
      <div>
        <Button
          sx={{
            minWidth: "120px",
            padding: "5px 10px",
            fontSize: "12px",
            background: "#f1b44c",
            color: "white",
            ":hover": {
              background: "#cd9941",
            },
          }}
          endIcon={<KeyboardArrowDown />}
          variant="contained"
          size="medium"
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}>
          Refund Initiated
        </Button>
        <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem onClick={() => handleRefundComplete(reg_id)}>Refund Complete</MenuItem>
        </Menu>
      </div>
    );
  } else if (refundStatus === "refund_succeeded") {
    return (
      <Typography textTransform="uppercase" color="green" fontSize="14px">
        REFUND COMPLETED
      </Typography>
    );
  } else {
    return (
      <Typography color="blue" textTransform="uppercase" fontSize="14px">
        NO REFUND
      </Typography>
    );
  }
};

export default RefundButton;
