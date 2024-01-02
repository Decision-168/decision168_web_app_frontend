import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import React from "react";

export default function CustomLink({ children, path }) {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Button
      sx={{
        fontWeight:'100',
        fontSize:12,
        display: "inline",
        color: theme.palette.primary.main,
        margin: "0px",
        padding:'0px 2px',
        textDecoration: "none",
        "&:hover": {
          textDecoration: "underline",
        },
      }}
      component={Link}
      variant="text"
      to={path}
    >
      {children}
    </Button>
  );
}
