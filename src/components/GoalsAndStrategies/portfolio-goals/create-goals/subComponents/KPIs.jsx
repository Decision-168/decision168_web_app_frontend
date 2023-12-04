import { Box, Button, DialogActions, DialogContent, Grid, IconButton, Tooltip } from "@mui/material";
import React from "react";
import CustomLabelTextField from "../../../subComponents/CustomLabelTextField";
import CustomMultilineTextField from "../../../subComponents/CustomMultilineTextField";
import { RemoveCircle } from "@mui/icons-material";
const KPIs = ({ individual, handleAddClick, inputFields, setInputFields }) => {

  const handleRemoveClick = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const CommonForm = ({}) => {
    return (
      <Grid container>
        <CustomLabelTextField label="KPI" name="KPI" required={true} placeholder="Enter KPi..." />
        <CustomMultilineTextField label="Description" name="Description" required={false} placeholder="Enter Description..." />

        {inputFields.map((inputField, index) => (
          <Grid container key={index} sx={{ background: "#F5F5F5", p: 1, my: 1 }}>
            <Grid item xs={12} lg={12}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "end",
                }}>
                <Tooltip title="Remove KPI">
                  <IconButton onClick={() => handleRemoveClick(index)}>
                    <RemoveCircle sx={{ fontSize: "20px" }} />
                  </IconButton>
                </Tooltip>
              </Box>
            </Grid>
            <CustomLabelTextField label="KPI" name="KPI" required={true} placeholder="Enter KPi..." />
            <CustomMultilineTextField label="Description" name="Description" required={false} placeholder="Enter Description..." />
          </Grid>
        ))}
      </Grid>
    );
  };
  return (
    <>
      {individual ? (
        <>
          <DialogContent dividers>
            <CommonForm />
          </DialogContent>
          <DialogActions>
            <Button variant="contained" size="small" onClick={handleAddClick}>
              Add More KPI's
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button variant="contained" size="small">
              Create
            </Button>
          </DialogActions>
        </>
      ) : (
        <CommonForm />
      )}
    </>
  );
};

export default KPIs;
