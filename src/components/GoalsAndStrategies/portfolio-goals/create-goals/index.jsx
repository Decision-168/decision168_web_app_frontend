import React, { memo, useState } from "react";
import {
  Avatar,
  DialogActions,
  DialogContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import Goal from "./subComponents/Goal";
import KPIs from "./subComponents/KPIs";

const steps = ["Goal", "KPIs"];
const CreateGoal = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [inputFields, setInputFields] = useState([]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const [childFormValues, setChildFormValues] = useState({});

  const handleChildUpdate = (formValues) => {
    setChildFormValues(formValues);
  };

  const handleSave = () => {
    // Logic to save the Goal data    
    console.log("formValues",childFormValues);
    console.log("Goal data saved!");
    handleNext(); // Proceed to the next step (KPIs)
  };

  const handleCreate = () => {
    // Logic to create KPIs
    console.log("KPIs created!");
    console.log(inputFields);
  };

  const handleAddClick = () => {
    setInputFields([...inputFields, { KPI: "", Description: "" }]);
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
    <>
      <DialogContent dividers>
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
            <Box>
              <Goal onUpdate={handleChildUpdate}/>
            </Box>
          ) : (
            <Box sx={{ pt: 1 }}>
              <KPIs
                individual={false}
                inputFields={inputFields}
                setInputFields={setInputFields}
                handleAddClick={handleAddClick}
              />
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        {activeStep === 0 ? (
          <Button variant="contained" size="small" onClick={handleSave}>
            Save & Next
          </Button>
        ) : (
          <>
            <>
              <Button
                variant="contained"
                size="small"
                sx={{ background: "#383838", color: "#fff", mr: 1 }}
                onClick={handleBack}
              >
                Back
              </Button>
              <Button variant="contained" size="small" onClick={handleAddClick}>
                Add More KPI's
              </Button>
            </>

            <Box sx={{ flex: "1 1 auto" }} />
            <Button variant="contained" size="small" onClick={handleCreate}>
              Create
            </Button>
          </>
        )}
      </DialogActions>
    </>
  );
};

export default memo(CreateGoal);
