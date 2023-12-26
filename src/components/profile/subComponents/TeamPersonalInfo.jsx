import { Box, Paper, Typography, Grid, Stack, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";

export default function TeamPersonalInfo({ memberDetail }) {
  const theme = useTheme();

  const fullName = `${memberDetail?.first_name} ${memberDetail?.middle_name} ${memberDetail?.last_name} `;
  return (
    <Paper elevation={0}>
      <Box p={2}>
        <Typography
          variant="subtitle1"
          sx={{ color: theme.palette.secondary.dark, fontWeight: "700" }}
          textAlign="left"
        >
          Personal Information
        </Typography>

        <Grid container mt={2}>
          <Grid xs={12} item>
            <Grid
              container
              p={1}
              borderBottom={1}
              borderColor={theme.palette.secondary.light}
              color={theme.palette.secondary.main}
            >
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle2" textAlign="left">
                  Full Name :
                </Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography
                  variant="caption"
                  display="block"
                  gutterBottom
                  textAlign="left"
                >
                  {fullName}
                </Typography>
              </Grid>
            </Grid>

            <Grid
              container
              p={1}
              borderBottom={1}
              borderColor={theme.palette.secondary.light}
              color={theme.palette.secondary.main}
            >
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle2" textAlign="left">
                  E-mail Address :
                </Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography
                  variant="caption"
                  display="block"
                  gutterBottom
                  textAlign="left"
                >
                  {memberDetail?.email_address}
                </Typography>
              </Grid>
            </Grid>

            <Grid
              container
              p={1}
              borderBottom={1}
              borderColor={theme.palette.secondary.light}
              color={theme.palette.secondary.main}
            >
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle2" textAlign="left">
                  Social Media Link(s) :
                </Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Stack
                  direction="row"
                  justifyContent="start"
                  alignItems="center"
                  spacing={1}
                >
                  {memberDetail?.social_media_icon?.includes("YouTube") && (
                    <IconButton aria-label="youTube">
                      <YouTubeIcon sx={{ color: theme.palette.primary.main }} />
                    </IconButton>
                  )}

                  {memberDetail?.social_media_icon?.includes("LinkedIn") && (
                    <IconButton aria-label="linkedIn">
                      <LinkedInIcon
                        sx={{ color: theme.palette.primary.main }}
                      />
                    </IconButton>
                  )}

                  {memberDetail?.social_media_icon?.includes("Instagram") && (
                    <IconButton aria-label="instagram">
                      <InstagramIcon
                        sx={{ color: theme.palette.primary.main }}
                      />
                    </IconButton>
                  )}

                  {memberDetail?.social_media_icon?.includes("Facebook") && (
                    <IconButton aria-label="facebook">
                      <FacebookIcon
                        sx={{ color: theme.palette.primary.main }}
                      />
                    </IconButton>
                  )}
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
