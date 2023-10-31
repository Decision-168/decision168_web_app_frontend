import { Box, Paper, Typography, Grid, Stack, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import YouTubeIcon from "@mui/icons-material/YouTube";
import PinterestIcon from "@mui/icons-material/Pinterest";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";

const PortfolioDetails = {
  contactPersonName: "John Doe",
  createdBy: "John Doe",
  type: "company",
  email: "johnDoe@decision168.com",
  website: "www.decision168.com",
  country: "United States",
  socialMedia: [
    {
      icon: <YouTubeIcon sx={{ color: (theme) => theme.palette.primary.main }} />,
      name: "YouTube",
    },
    {
      icon: <PinterestIcon sx={{ color: (theme) => theme.palette.primary.main }} />,
      name: "Pinterest",
    },
    {
      icon: <InstagramIcon sx={{ color: (theme) => theme.palette.primary.main }} />,
      name: "Instagram",
    },
    {
      icon: <LinkedInIcon sx={{ color: (theme) => theme.palette.primary.main }} />,
      name: "linkedIn",
    },
    {
      icon: <TwitterIcon sx={{ color: (theme) => theme.palette.primary.main }} />,
      name: "Twitter",
    },
    {
      icon: <FacebookRoundedIcon sx={{ color: (theme) => theme.palette.primary.main }} />,
      name: "Facebook",
    },
  ],
  departments: ["Marketing", "Implementation", "Marketing & Sales"],
};

export default function PersonalInfo() {
  const theme = useTheme();

  return (
    <Paper elevation={0}>
      <Box p={2} textAlign="left">
        <Typography variant="subtitle1" sx={{ color: theme.palette.secondary.dark, fontWeight: "700" }} textAlign="left">
          Information
        </Typography>

        <Box py={2}>
          <Typography component="p" variant="body2" my={2}>
            Visualize, Plan, Implement…Repeat! Reclaim your time, focus on what’s important, & make informed DECISIONS (24x7 = 168).
          </Typography>
          <Typography component="p" variant="body2" my={2}>
            Use this platform to reclaim time, gain brand exposure, & focus on what’s important for you to build an innovative business and manage your personal or professional life – or both. (24×7=168)
          </Typography>
          <Typography component="p" variant="body2" my={2}>
            DECISION 168 is on a mission to Empower Small Businesses, Entrepreneurs, and Individuals. Through the relationships and experience of our network, we will make a difference together.
          </Typography>
          <Typography component="p" variant="body2" my={2}>
            Our goal is to help people across the world perform and function at their highest levels and utilize their unique talents, so that they may make an impact within their communities and beyond.
          </Typography>
        </Box>

        <Grid container mt={2}>
          <Grid xs={12} item>
            <Grid container p={1} borderBottom={1} borderColor={theme.palette.secondary.light} color={theme.palette.secondary.main}>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle2" textAlign="left">
                  Contact Person Name :
                </Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography variant="caption" display="block" gutterBottom textAlign="left">
                  {PortfolioDetails.contactPersonName}
                </Typography>
              </Grid>
            </Grid>

            <Grid container p={1} borderBottom={1} borderColor={theme.palette.secondary.light} color={theme.palette.secondary.main}>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle2" textAlign="left">
                  Created By :
                </Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography variant="caption" display="block" gutterBottom textAlign="left">
                  {PortfolioDetails.createdBy}
                </Typography>
              </Grid>
            </Grid>

            <Grid container p={1} borderBottom={1} borderColor={theme.palette.secondary.light} color={theme.palette.secondary.main}>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle2" textAlign="left">
                  Type :
                </Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography variant="caption" display="block" gutterBottom textAlign="left">
                  {PortfolioDetails.type}
                </Typography>
              </Grid>
            </Grid>

            <Grid container p={1} borderBottom={1} borderColor={theme.palette.secondary.light} color={theme.palette.secondary.main}>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle2" textAlign="left">
                  Email Address :
                </Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography variant="caption" display="block" gutterBottom textAlign="left">
                  {PortfolioDetails.email}
                </Typography>
              </Grid>
            </Grid>

            <Grid container p={1} borderBottom={1} borderColor={theme.palette.secondary.light} color={theme.palette.secondary.main}>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle2" textAlign="left">
                  Company Website :
                </Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography variant="caption" display="block" gutterBottom textAlign="left">
                  {PortfolioDetails.website}
                </Typography>
              </Grid>
            </Grid>

            <Grid container p={1} borderBottom={1} borderColor={theme.palette.secondary.light} color={theme.palette.secondary.main}>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle2" textAlign="left">
                  Country :
                </Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography variant="caption" display="block" gutterBottom textAlign="left">
                  {PortfolioDetails.country}
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
                  {PortfolioDetails.socialMedia.map((item, index) => (
                    <IconButton aria-label="facebook" key={index}>
                      {item.icon}
                    </IconButton>
                  ))}
                </Stack>
              </Grid>
            </Grid>

            <Grid container p={1} borderBottom={1} borderColor={theme.palette.secondary.light} color={theme.palette.secondary.main}>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle2" textAlign="left">
                  Department(s) :
                </Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Stack direction="row" spacing={2}>
                  {PortfolioDetails.departments.map((item, index) => (
                    <Box key={index} sx={{ bgcolor: "#DADBDD", color: "black" , fontSize:"12px" , padding:"3px 5px", borderRadius:"5px"}}>
                      {item}
                    </Box>
                  ))}
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
