import { Box, Grid, Link, Paper, Stack, Typography } from "@mui/material";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import React from "react";
import { useTheme } from "@mui/material/styles";

export default function Quote() {
  const theme = useTheme();

  return (
    <Paper elevation={4} sx={{ minHeight: "350px", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Stack justifyContent="space-between" alignItems="center" sx={{ minHeight: "200px" }}>
        <Box mb={4}>
          <FormatQuoteIcon sx={{ rotate: "180deg", color: theme.palette.primary.main, width: "30px", height: "30px", marginBottom: "-5px" }} />
          <Box component="span" sx={{ color: theme.palette.secondary.main, fontWeight: "900" }}>
            Discipline makes today harder, but makes tomorrow easier
          </Box>
          <FormatQuoteIcon sx={{ color: theme.palette.primary.main, width: "30px", height: "30px", marginBottom: "-5px" }} />
        </Box>

        <Grid container gap={4}>
          <Grid item xs={12}>
            <Typography
              variant="body2"
              sx={{
                "::before": {
                  content: '"---"',
                  color: theme.palette.primary.main,
                  paddingRight: "10px",
                },
              }}
              noWrap
              display="block"
              gutterBottom>
              Humza Shaikh
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="caption" display="block" gutterBottom>
              Submit a <Link href="/">Quote</Link>
            </Typography>
          </Grid>
        </Grid>
      </Stack>
    </Paper>
  );
}
