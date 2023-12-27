import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function CustomLinkButton({ path, text, data }) {
  // Check if 'data' is present before constructing the URL
  const fullPath = data ? `${path}?${new URLSearchParams(data).toString()}` : path;
  return (
    <Link to={fullPath}>
      <Button variant="contained" size="small">
        {text}
      </Button>
    </Link>
  );
}
