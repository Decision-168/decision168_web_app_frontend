import React, { useState, useEffect } from "react";
import { Box, Button, Grid, Link, Paper, Stack, Typography } from "@mui/material";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import { useTheme } from "@mui/material/styles";
import QuoteDailog from "./QuoteDialog";
import { getMotivator } from "../../../api/modules/dashboardModule";

export default function Quote() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(true);
  const [motivationQuote, setMotivationQuote] = useState({});

  useEffect(() => {
    const motivator = async () => {
      try {
        const response = await getMotivator();
        console.log("quote", response);
        setMotivationQuote(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    motivator();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Paper elevation={0} sx={{ minHeight: "350px", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: theme.palette.secondary.light }}>
      <Stack justifyContent="space-between" alignItems="center" sx={{ minHeight: "200px" }}>
        <Box mb={4}>
          <FormatQuoteIcon sx={{ rotate: "180deg", color: theme.palette.primary.main, width: "30px", height: "30px", marginBottom: "-5px" }} />
          <Box component="span" sx={{ color: theme.palette.secondary.main, fontWeight: "900" }}>
            {motivationQuote.quote}
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
              {motivationQuote.writer}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography component="div" variant="caption" display="block" gutterBottom>
              Submit a
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
