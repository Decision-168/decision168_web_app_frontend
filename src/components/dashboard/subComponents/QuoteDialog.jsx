import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Grid, Stack, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import QuoteForm from "./QuoteForm";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function QuoteDialog({ handleClose, open }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // Adjust breakpoint as needed
  return (
    <Box>
      <Dialog
        PaperProps={{
          style: {
            backgroundColor: "transparent",
            boxShadow: "none",
          },
        }}
        fullWidth={true}
        maxWidth="md"
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description">
        <DialogContent sx={{ margin: "25px", padding: 0 }}>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              bgcolor: theme.palette.secondary.dark,
              color: theme.palette.secondary.light,
              zIndex: "2000",
              border: "4px solid white",
              "&:hover": {
                bgcolor: theme.palette.secondary.main,
                color: theme.palette.secondary.light,
              },
            }}>
            <CloseIcon />
          </IconButton>
          <DialogContentText id="alert-dialog-slide-description">
            <Grid container sx={{ height: "400px" }}>
              <Grid item xs={12} sm={6} bgcolor={theme.palette.secondary.main} py={2} px={3} sx={{ borderTopLeftRadius: isSmallScreen ? "0" : "5px", borderBottomLeftRadius: isSmallScreen ? "0" : "5px" }}>
                <QuoteForm />
              </Grid>

              <Grid item xs={12} sm={6} bgcolor={theme.palette.primary.main} py={2} px={3} sx={{ borderTopRightRadius: isSmallScreen ? "0" : "5px", borderBottomRightRadius: isSmallScreen ? "0" : "5px" }}>
                <Stack height="100%" direction="column" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography component="h5" sx={{ fontSize: "30px", textTransform: "uppercase", fontWeight: "500", color: theme.palette.secondary.main, textAlign: "left", lineHeight: "2.2rem" }}>
                      Got some inspiration or motivation to share?
                    </Typography>

                    <Typography mt={2} variant="body2" sx={{ color: theme.palette.secondary.light, textAlign: "left" }}>
                      You can submit a quote, once approved, we will add it to the motivator rotation on the dashboard.
                    </Typography>
                  </Box>

                  <Box textAlign="center" mt={4}>
                    <Button size="small" variant="contained" sx={{ backgroundColor: theme.palette.secondary.main, color: theme.palette.secondary.light, "&:hover": { backgroundColor: theme.palette.secondary.dark } }}>
                      No Thanks
                    </Button>
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
