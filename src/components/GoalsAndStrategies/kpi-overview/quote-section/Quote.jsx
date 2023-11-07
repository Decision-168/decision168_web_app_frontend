import React from "react";
import { Box, Button, Grid, Link, Paper, Stack, Typography } from "@mui/material";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import { useTheme } from "@mui/material/styles";
import QuoteDailog from "./QuoteDialog";

export default function Quote() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Paper elevation={0} sx={{ minHeight: "340px", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: theme.palette.secondary.light }}>
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
            <Typography component="div" variant="caption" display="block" gutterBottom>
              Submit a{" "}
              <Box sx={{ cursor: "pointer", display: "inline", color: theme.palette.primary.main }} onClick={handleClickOpen}>
                Quote
              </Box>
              <QuoteDailog handleClose={handleClose} open={open} />
            </Typography>
          </Grid>
        </Grid>
      </Stack>
    </Paper>
  );
}
