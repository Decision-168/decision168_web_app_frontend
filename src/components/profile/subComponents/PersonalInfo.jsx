import { Box, Paper, Typography, Grid, Stack, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import LinkedInIcon from "@mui/icons-material/LinkedIn";


export default function PersonalInfo() {
  const theme = useTheme();

  return (
    <Paper elevation={0}>
      <Box p={2}>
        <Typography variant="subtitle1" sx={{ color: theme.palette.secondary.dark, fontWeight: "700" }} textAlign="left">
          Personal Information
        </Typography>

        <Grid container mt={2}>
          <Grid xs={12} item>
            <Grid container p={1} borderBottom={1} borderColor={theme.palette.secondary.light} color={theme.palette.secondary.main}>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle2" textAlign="left">
                  Full Name :
                </Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography variant="caption" display="block" gutterBottom textAlign="left">
                  Uzma A Karjikar
                </Typography>
              </Grid>
            </Grid>

            <Grid container p={1} borderBottom={1} borderColor={theme.palette.secondary.light} color={theme.palette.secondary.main}>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle2" textAlign="left">
                  E-mail Address :
                </Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography variant="caption" display="block" gutterBottom textAlign="left">
                  uzmakarjikar@gmail.com
                </Typography>
              </Grid>
            </Grid>

            <Grid container p={1} borderBottom={1} borderColor={theme.palette.secondary.light} color={theme.palette.secondary.main}>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle2" textAlign="left">
                  Gender :
                </Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography variant="caption" display="block" gutterBottom textAlign="left">
                  uzmakarjikar@gmail.com
                </Typography>
              </Grid>
            </Grid>

            <Grid container p={1} borderBottom={1} borderColor={theme.palette.secondary.light} color={theme.palette.secondary.main}>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle2" textAlign="left">
                  Date of Birth :
                </Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography variant="caption" display="block" gutterBottom textAlign="left">
                  27 Jul, 1996
                </Typography>
              </Grid>
            </Grid>

            <Grid container p={1} borderBottom={1} borderColor={theme.palette.secondary.light} color={theme.palette.secondary.main}>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle2" textAlign="left">
                  Social Media Link(s) :
                </Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Stack direction="row" justifyContent="start" alignItems="center" spacing={1}>
                  <IconButton aria-label="facebook">
                    <FacebookRoundedIcon sx={{ color: theme.palette.primary.main }} />
                  </IconButton>

                  <IconButton aria-label="linkedIn">
                    <LinkedInIcon sx={{ color: theme.palette.primary.main }} />
                  </IconButton>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
