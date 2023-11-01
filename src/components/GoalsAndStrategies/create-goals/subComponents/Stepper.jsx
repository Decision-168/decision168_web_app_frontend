import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar, Grid } from "@mui/material";
import KPIs from "./KPIs";
import Goal from "./Goal";

const steps = ["Goal", "KPIs"];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSave = () => {
    // Logic to save the Goal data
    console.log("Goal data saved!");
    handleNext(); // Proceed to the next step (KPIs)
  };

  const handleCreate = () => {
    // Logic to create KPIs
    console.log("KPIs created!");
  };

  const activeAvatar = {
    backgroundColor: "#c7df19",
    color: "#fff",
    display: "inline-block",
    width: "38px",
    height: "38px",
    lineHeight: "34px",
    border: "2px solid #c7df19",
    textAlign: "center",
    borderRadius: "50%",
    marginRight: "0.5rem",
  };
  const inActiveAvatar = {
    display: "inline-block",
    width: "38px",
    height: "38px",
    lineHeight: "34px",
    border: "2px solid #c7df19",
    color: "#c7df19",
    textAlign: "center",
    borderRadius: "50%",
    marginRight: "0.5rem",
    backgroundColor: "transparent",
  };

  return (
    <Box sx={{ width: "100%", background: "white", p: 3, borderRadius: 1 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        {steps.map((label, index) => {
          return (
            <Box
              key={label}
              sx={{
                background: activeStep === index ? "#EEF5BA" : "#F6FADA",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                flexDirection: "row",
                width: "50%",
                pl: 2,
                pt: 1,
                pb: 1,
              }}
            >
              <Avatar
                variant="circular"
                sx={activeStep === index ? activeAvatar : inActiveAvatar}
              >
                {index + 1}
              </Avatar>
              <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
                {label}
              </Typography>
            </Box>
          );
        })}
      </Box>
      {activeStep === 0 ? (
        <Box sx={{ p: 2 }}>
          <Goal />
          <Box sx={{ display: "flex", flexDirection: "row", pt: 10 }}>
            <Button
              disabled
              variant="contained"
              size="small"
              sx={{ background: "#383838", color: "#fff", ml: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button variant="contained" size="small" onClick={handleSave}>
              Save & Next
            </Button>
          </Box>
        </Box>
      ) : (
        <Box sx={{ p: 2 }}>
          <KPIs />
          <Box sx={{ display: "flex", flexDirection: "row", pt: 10 }}>
            <Button
              variant="contained"
              size="small"
              sx={{ background: "#383838", color: "#fff", ml: 1 }}
              onClick={handleBack}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button variant="contained" size="small" onClick={handleCreate}>
              Create
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}
