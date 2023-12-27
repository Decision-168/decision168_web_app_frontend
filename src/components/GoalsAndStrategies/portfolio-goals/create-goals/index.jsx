import React, { memo, useEffect, useState } from "react";
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
import { toast } from "react-toastify";
import {
  InsertGoalData,
  InsertStrategiesData,
} from "../../../../api/modules/goalkpiModule";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../../redux/action/userSlice";
import { useDispatch } from "react-redux";
import { closeModal } from "../../../../redux/action/modalSlice";

const steps = ["Goal", "KPIs"];
const CreateGoal = ({ fetchAllData }) => {
  const dispatch = useDispatch();
  //get user id
  const user = useSelector(selectUserDetails);
  const user_id = user?.reg_id;
  //get user id

  const storedPorfolioId = JSON.parse(localStorage.getItem("portfolioId"));

  const [activeStep, setActiveStep] = useState(0);
  const [inputFields, setInputFields] = useState([{ sname: "", sdes: "" }]);
  const [getInsertedGID, setInsertedGID] = useState("");
  const [getInsertedGDept, setInsertedGDept] = useState("");
  const [childFormValues, setChildFormValues] = useState({});

  const [formKPIValues, setFormKPIValues] = useState({
    kpiArray: [],
    gdept_id: "",
    gid: "",
    screated_by: user_id, 
    portfolio_id: storedPorfolioId, 
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleChildUpdate = (formValues) => {
    setChildFormValues(formValues);
  };

  const handleSave = async () => {
    const requiredFields = ["gname", "gdept", "gstart_date", "gend_date"];

    const areAllFieldsFilled = requiredFields.every(
      (field) => childFormValues[field]
    );

    if (!areAllFieldsFilled) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const { imemail } = childFormValues;
      const data = {
        ...childFormValues,
        imemail: imemail.map((item) => item.email),
      };

      const response = await InsertGoalData(data);
      setInsertedGID(response.gid);
      setInsertedGDept(response.gdept);
      toast.success(`${response.message}`);
      setChildFormValues({});
      handleNext(); // Proceed to the next step (KPIs)
    } catch (error) {
      // Handling error
      console.log(error);
      toast.error(`${error.response?.error}`);
      console.error("Error updating:", error);
    }
  };

  const handleCreate = async () => {
    const temp = () => ({
      ...formKPIValues,
      kpiArray: inputFields,
      gdept_id: getInsertedGDept,
      gid: getInsertedGID,
    });

    const kdata = temp();

    const isSnameEmpty = kdata.kpiArray.some((kpi) => kpi.sname.trim() === "");

    if (isSnameEmpty) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const response = await InsertStrategiesData(kdata);
      fetchAllData();
      dispatch(closeModal("create-goals-kpis"));
      toast.success(`${response.message}`);      
    } catch (error) {
      // Handling error
      toast.error(`${error.response?.error}`);
      console.error("Error updating:", error);
    }
  };

  const handleAddClick = () => {
    setInputFields([...inputFields, { sname: "", sdes: "" }]);
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
              <Goal onUpdate={handleChildUpdate} />
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
