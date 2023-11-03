import { Box, Button, Grid, useTheme } from "@mui/material";
import React, { Fragment, useState } from "react";
import { globalValidations } from "../../../../utils/GlobalValidation";
import { useForm } from "react-hook-form";
import CustomLabelTextField from "./CustomLabelTextField";
import CustomMultilineTextField from "./CustomMultilineTextField";
const KPIs = ({ individual }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [inputFields, setInputFields] = useState([]);

  const theme = useTheme();

  const handleAddClick = () => {
    setInputFields([...inputFields, { KPI: "", Description: "" }]);
  };

  const handleRemoveClick = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const CommonFields = ({ onClick, btnText, style }) => {
    return (
      <>
        <Grid item xs={12} lg={12}>
          <Box sx={{ width: "100%", display: "flex", justifyContent: "end" }}>
            <Button
              variant="contained"
              size="small"
              onClick={onClick}
              sx={style}
            >
              {btnText}
            </Button>
          </Box>
        </Grid>
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
      </>
    );
  };
  return (
    <>
      <Grid container>
        <CommonFields
          onClick={() => handleAddClick()}
          btnText={"Add More KPI's"}
        />

        {inputFields.map((inputField, index) => (
          <Grid container key={index}>
            <CommonFields
              onClick={() => handleRemoveClick(index)}
              btnText={"Remove KPI"}
              style={{ background: "#383838", color: "#fff", ml: 1 }}
            />
          </Grid>
        ))}
        {individual && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "end",
              pt: 1,
              width: "100%",
            }}
          >
            <Box sx={{ flex: "1 1 auto" }} />
            <Button variant="contained" size="small">
              Create
            </Button>
          </Box>
        )}
      </Grid>
    </>
  );
};

export default KPIs;
