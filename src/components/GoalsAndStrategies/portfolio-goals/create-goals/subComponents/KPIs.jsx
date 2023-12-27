import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
  Tooltip,
} from "@mui/material";
import React, { memo, useState } from "react";
import CustomLabelTextField from "../../../subComponents/CustomLabelTextField";
import CustomMultilineTextField from "../../../subComponents/CustomMultilineTextField";
import { RemoveCircle } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../../../redux/action/userSlice";
import { useDispatch } from "react-redux";
import { closeModal } from "../../../../../redux/action/modalSlice";
import { InsertStrategiesData } from "../../../../../api/modules/goalkpiModule";
import { toast } from "react-toastify";

const KPIs = ({
  individual,
  inputFields,
  setInputFields,
  handleAddClick,
  passGID,
  passGDEPT,
}) => {
  const dispatch = useDispatch();
  //get user id
  const user = useSelector(selectUserDetails);
  const user_id = user?.reg_id;
  //get user id

  const storedPorfolioId = JSON.parse(localStorage.getItem("portfolioId"));

  const handleInputChange = (event, index) => {
    const values = [...inputFields];
    values[index][event.target.name] = event.target.value;
    setInputFields(values);
  };

  const handleRemoveClick = (currentIndex) => {
    const values = [...inputFields];
    values.splice(currentIndex, 1);
    setInputFields(values);
  };

  //Only KPIs Create Part
  const handleOnlyKpiCreate = async () => {
    const oktemp = () => ({
      screated_by: user_id,
      portfolio_id: storedPorfolioId,
      kpiArray: inputFields,
      gdept_id: passGDEPT,
      gid: passGID,
    });
    const okdata = oktemp();
    const isSnameEmpty = okdata.kpiArray.some((kpi) => kpi.sname.trim() === "");
    if (isSnameEmpty) {
      toast.error("Please fill in all required fields");
      return;
    }
    try {
      const response = await InsertStrategiesData(okdata);
      dispatch(closeModal("create-kpis"));
      toast.success(`${response.message}`);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      // Handling error
      toast.error(`${error.response?.error}`);
      console.error("Error updating:", error);
    }
  };
  //Only KPIs Create Part

  return (
    <>
      {individual ? (
        <>
          <DialogContent dividers>
            <Grid container>
              {inputFields.map((inputField, index) => (
                <Grid container key={index} sx={{ p: 1, my: 1 }}>
                  {inputFields.length > 1 && (
                    <Grid
                      item
                      xs={12}
                      lg={12}
                      sx={{ borderTop: "1px solid #000" }}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "end",
                        }}
                      >
                        <Tooltip title="Remove KPI">
                          <IconButton onClick={() => handleRemoveClick(index)}>
                            <RemoveCircle sx={{ fontSize: "20px" }} />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Grid>
                  )}
                  <CustomLabelTextField
                    label="KPI"
                    name="sname"
                    required={true}
                    placeholder="Enter KPi..."
                    onChange={(event) => handleInputChange(event, index)}
                  />
                  <CustomMultilineTextField
                    label="Description"
                    name="sdes"
                    required={false}
                    placeholder="Enter Description..."
                    onChange={(event) => handleInputChange(event, index)}
                  />
                </Grid>
              ))}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" size="small" onClick={handleAddClick}>
              Add More KPI's
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button
              variant="contained"
              size="small"
              onClick={handleOnlyKpiCreate}
            >
              Create
            </Button>
          </DialogActions>
        </>
      ) : (
        <Grid container>
          {inputFields.map((inputField, index) => (
            <Grid container key={index} sx={{ p: 1, my: 1 }}>
              {inputFields.length > 1 && (
                <Grid item xs={12} lg={12} sx={{ borderTop: "1px solid #000" }}>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "end",
                    }}
                  >
                    <Tooltip title="Remove KPI">
                      <IconButton onClick={() => handleRemoveClick(index)}>
                        <RemoveCircle sx={{ fontSize: "20px" }} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Grid>
              )}
              <CustomLabelTextField
                label="KPI"
                name="sname"
                required={true}
                placeholder="Enter KPi..."
                onChange={(event) => handleInputChange(event, index)}
              />
              <CustomMultilineTextField
                label="Description"
                name="sdes"
                required={false}
                placeholder="Enter Description..."
                onChange={(event) => handleInputChange(event, index)}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default memo(KPIs);
