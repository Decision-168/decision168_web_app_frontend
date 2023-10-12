import React from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { useTheme } from "@mui/material/styles";

export default function Copyright() {
  const theme = useTheme();
  return (
    <>
      <Typography variant="body2" color="text.secondary" align="center" sx={{ p: 2, backgroundColor: theme.palette.secondary.light, color: theme.palette.primary.contrastText }}>
        {"Copyright © "}
        <Link href="https://mui.com/">Your Website</Link>
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </>
  );
}
