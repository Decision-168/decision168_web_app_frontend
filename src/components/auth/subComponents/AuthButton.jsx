import React from "react";
import CircularLoader from "../../common/CircularLoader";
import { Button } from "@mui/material";

export default function AuthButton({ loading, buttonText, disabled }) {
  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      sx={{
        my: 2,
        height: "35px",
        borderRadius: "3px",
        "&:disabled": {
          backgroundColor: "#DEE1E6", // Add  disabled styles here
          color: "#000000",
        },
      }}
      disabled={disabled}>
      {loading ? <CircularLoader /> : buttonText}
    </Button>
  );
}
