import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Button, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

export default function BasicBreadcrumbs({ currentPage, showBackButton }) {
  const theme = useTheme();
  const navigate = useNavigate();

  function handleGoBack() {
    navigate(-1);
  }

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" py={2}>
      <Breadcrumbs aria-label="breadcrumb">
        <Typography component="h6" variant="subtitle2" sx={{ color: theme.palette.secondary.dark, textTransform: "uppercase", fontWeight: "bold" }}>
          {currentPage}
        </Typography>
      </Breadcrumbs>

      {showBackButton && (
        <Button startIcon={<ArrowBackIcon />} size="small" variant="contained" sx={{ backgroundColor: theme.palette.secondary.main, color: theme.palette.secondary.light, "&:hover": { backgroundColor: theme.palette.secondary.dark } }} onClick={handleGoBack}>
          Back
        </Button>
      )}
    </Stack>
  );
}
