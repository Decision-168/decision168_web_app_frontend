import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function BasicBreadcrumbs({ currentPage }) {
  const theme = useTheme();
  const navigate = useNavigate();

  function handleGoBack() {
    navigate(-1);
  }

  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        <Typography component="h6" variant="subtitle2" sx={{ color: theme.palette.secondary.dark, textTransform: "uppercase", fontWeight: "bold" }}>
          {currentPage}
        </Typography>
        {/* <Button startIcon={<ArrowBackIcon />} size="small" variant="contained" sx={{ backgroundColor: theme.palette.secondary.main, color: theme.palette.secondary.light, "&:hover": { backgroundColor: theme.palette.secondary.dark } }} onClick={handleGoBack}>
          Back
        </Button> */}
      </Breadcrumbs>
    </div>
  );
}
