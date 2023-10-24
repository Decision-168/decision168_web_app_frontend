import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function BasicBreadcrumbs({ currentPage }) {
  const navigate = useNavigate();
  const theme = useTheme();

  function handleGoBack() {
    navigate(-1);
  }

  return (
    <div role="presentation" onClick={handleClick} style={{ padding: "10px", marginBottom: "1rem" }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Typography component="h6" variant="subtitle2" sx={{ color: theme.palette.secondary.dark, textTransform: "uppercase", fontWeight: "bold" }}>
          {currentPage}
        </Typography>
        <Button size="small" variant="contained" sx={{ backgroundColor: theme.palette.secondary.main, color: theme.palette.secondary.light, "&:hover": { backgroundColor: theme.palette.secondary.dark } }} onClick={handleGoBack}>
          Back
        </Button>
      </Breadcrumbs>
    </div>
  );
}
