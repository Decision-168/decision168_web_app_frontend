import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Box, useMediaQuery, IconButton, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PinterestIcon from "@mui/icons-material/Pinterest";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import YouTubeIcon from "@mui/icons-material/YouTube";
import EmailIcon from "@mui/icons-material/Email";

const images = [
  {
    label: "Use this platform to reclaim time - Connect, Collaborate, Delegate to focus on what's important for you to build an innovative personal or professional life - or both. (24 x 7 = 168)",
  },
  {
    label: "DECISION 168 is on a mission to Empower Small Businesses, Enterpreneurs, and Individuals. Trough the relationships and experience of our network, we will make a diffrence together. Our goal is to help people across the world perform and function at their highest levels and utilize their unique talents, so that they may make an impact within their communities and beyond.",
  },
];

export default function ResponsiveCarousel() {
  const theme = useTheme();

  return (
    <Box sx={{ width: "100%", maxWidth: "600px", flexGrow: 1 }}>
      <Carousel showArrows={false} showStatus={false} showThumbs={false} infiniteLoop={true} autoPlay={true} interval={3000} stopOnHover={false} transitionTime={500} emulateTouch={true} swipeable={true} style={{ height: "100%" }}>
        {images.map((step, index) => (
          <Box
            key={index}
            sx={{
              height: "100%",
              display: "block",
              overflow: "hidden",
              width: "100%",
              textAlign: "center",
              backgroundColor: "transparent",
              padding: "10px 2px 30px",
            }}>
            <Stack sx={{ height: "100%", width: "100%" }} direction="column" justifyContent="space-between" alignItems="center">
              <Typography component="h6" variant="body2">
                {step.label}
              </Typography>

              <Box p={2}>
                <Typography component="h6" variant="body1" sx={{ color: theme.palette.primary.main }}>
                  #decision 168
                </Typography>
                <Typography component="h6" variant="body1">
                  #StrongerTogether #NowMoreThanEver
                </Typography>

                <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
                  <IconButton aria-label="facebook">
                    <FacebookRoundedIcon sx={{ color: "white" }} />
                  </IconButton>
                  <IconButton aria-label="facebook">
                    <TwitterIcon sx={{ color: "white" }} />
                  </IconButton>
                  <IconButton aria-label="instagram">
                    <InstagramIcon sx={{ color: "white" }} />
                  </IconButton>
                  <IconButton aria-label="linkedIn">
                    <LinkedInIcon sx={{ color: "white" }} />
                  </IconButton>
                  <IconButton aria-label="linkedIn">
                    <PinterestIcon sx={{ color: "white" }} />
                  </IconButton>
                  <IconButton aria-label="linkedIn">
                    <LibraryMusicIcon sx={{ color: "white" }} />
                  </IconButton>
                  <IconButton aria-label="linkedIn">
                    <YouTubeIcon sx={{ color: "white" }} />
                  </IconButton>
                  <IconButton aria-label="linkedIn">
                    <EmailIcon sx={{ color: "white" }} />
                  </IconButton>
                </Stack>
              </Box>
            </Stack>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
}
