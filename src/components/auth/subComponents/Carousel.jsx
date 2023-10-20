import React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { IconButton, Stack } from "@mui/material";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PinterestIcon from "@mui/icons-material/Pinterest";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import YouTubeIcon from "@mui/icons-material/YouTube";
import EmailIcon from "@mui/icons-material/Email";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: "Use this platform to reclaim time - Connect, Collaborate, Delegate to focus on what's important for you to build an innovative personal or professional life - or both. (24 x 7 = 168)",
  },
  {
    label: "DECISION 168 is on a mission to Empower Small Businesses, Enterpreneurs, and Individuals. Trough the relationships and experience of our network, we will make a diffrence together. Our goal is to help people across the world perform and function at their highest levels and utilize their unique talents, so that they may make an impact within their communities and beyond.",
  },
];

export default function Carousel() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ maxWidth: "600px", flexGrow: 1 }}>
      <AutoPlaySwipeableViews axis={theme.direction === "rtl" ? "x-reverse" : "x"} index={activeStep} onChangeIndex={handleStepChange} enableMouseEvents>
        {images.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                sx={{
                  height: "260px",
                  display: "block",
                  maxWidth: "600px",
                  overflow: "hidden",
                  width: "100%",
                  textAlign: "center",
                  backgroundColor: "transparent",
                  padding: "10px",
                }}>
                <Stack sx={{ height: "100%" }} direction="column" justifyContent="space-between" alignItems="center">
                  <Typography component="h6" variant="body2">
                    {step.label}
                  </Typography>

                  <Box>
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
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>

      <MobileStepper
        sx={{ backgroundColor: "transparent" }}
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1} sx={{ color: "white" }}>
            Next
            {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0} sx={{ color: "white" }}>
            {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </Button>
        }
      />
    </Box>
  );
}
