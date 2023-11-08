import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Grid,
} from "@mui/material";
import React, {  } from "react";
import { globalValidations } from "../../../../utils/GlobalValidation";
import { useForm } from "react-hook-form";
import CustomLabelTextField from "../../subComponents/CustomLabelTextField";
import CustomMultilineTextField from "../../subComponents/CustomMultilineTextField";
const KPIs = ({ individual, handleAddClick, inputFields, setInputFields }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const handleRemoveClick = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const CommonForm = ({}) => {
    return (
      <Grid container>
        <CustomLabelTextField
          label="KPI"
          name="KPI"
          required={true}
          placeholder="Enter KPi..."
          register={register}
          errors={errors}
          validation={globalValidations.KPI}
        />
        <CustomMultilineTextField
          label="Description"
          name="Description"
          required={false}
          placeholder="Enter Description..."
          register={register}
          errors={errors}
          validation={globalValidations.Description}
        />

        {inputFields.map((inputField, index) => (
          <Grid container key={index}>
            <CustomLabelTextField
              label="KPI"
              name="KPI"
              required={true}
              placeholder="Enter KPi..."
              register={register}
              errors={errors}
              validation={globalValidations.KPI}
            />
            <CustomMultilineTextField
              label="Description"
              name="Description"
              required={false}
              placeholder="Enter Description..."
              register={register}
              errors={errors}
              validation={globalValidations.Description}
            />
            <Grid item xs={12} lg={12}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "end",
                }}
              >
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleRemoveClick(index)}
                  sx={{ background: "#383838", color: "#fff", ml: 1 }}
                >
                  Remove KPI
                </Button>
              </Box>
            </Grid>
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
