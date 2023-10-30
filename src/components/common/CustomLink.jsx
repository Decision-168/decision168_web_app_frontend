import { Link } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function CustomLink({ children, path }) {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Link
      sx={{
        color: theme.palette.primary.main,
        margin:'0px 2px',
        textDecoration: "none",
        "&:hover": {
          textDecoration: "underline",
        },
      }}
      component="button"
      variant="caption"
      onClick={() => navigate(path)}>
      {children}
    </Link>
  );
}
