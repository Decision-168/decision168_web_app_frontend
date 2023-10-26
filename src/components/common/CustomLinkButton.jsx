import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function CustomLinkButton({ path, text }) {
  return (
    <Link to={path}>
      <Button variant="contained" size="small">
        {text}
      </Button>
    </Link>
  );
}
