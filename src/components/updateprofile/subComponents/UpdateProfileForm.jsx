import { Box, Button, Grid } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import CustomLabelTextField from "../../common/CustomLabelTextField";
import { globalValidations } from "../../../utils/GlobalValidation";
import CustomLabelTextArea from "../../common/CustomLabelTextArea";
import RowRadioButtonsGroup from "../../common/RowRadioButtonsGroup";
import CustomDataPicker from "../../common/CustomDataPicker";
import { useTheme } from "@mui/material/styles";
import CustomAutocomplete from "../../common/CustomAutocomplete";
import { useNavigate } from "react-router-dom";

const countries = [
  { label: "India", year: 1994 },
  { label: "China", year: 1972 },
  { label: "Pakistan", year: 1974 },
  { label: "Afganistan", year: 2008 },
  { label: "Russia", year: 1957 },
  { label: "Bangladesh", year: 1993 },
];

export default function UpdateProfileForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const theme = useTheme();

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  const navigate = useNavigate();

  function handleGoBack() {
    navigate(-1);
  }

  return (
    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
      <Grid container>
        <Grid item xs={12} sm={4} px={2} py={1}>
          <CustomLabelTextField
            label="First Name"
            name="firstName"
            required={true}
            placeholder="Enter first name"
            register={register}
            errors={errors}
            validation={globalValidations.firstName} // Pass the validation rules as a prop
          />
        </Grid>

        <Grid item xs={12} sm={4} px={2} py={1}>
          <CustomLabelTextField
            label="Middle Name"
            name="middleName"
            required={true}
            placeholder="Enter middle name"
            register={register}
            errors={errors}
            validation={globalValidations.middleName} // Pass the validation rules as a prop
          />
        </Grid>

        <Grid item xs={12} sm={4} px={2} py={1}>
          <CustomLabelTextField
            label="Last Name"
            name="lastName"
            required={true}
            placeholder="Enter last name"
            register={register}
            errors={errors}
            validation={globalValidations.lastName} // Pass the validation rules as a prop
          />
        </Grid>

        <Grid item xs={12} sm={12} px={2} py={1}>
          <CustomLabelTextArea
            label="About me"
            name="AboutMe"
            required={true}
            placeholder="About me"
            register={register}
            errors={errors}
            validation={globalValidations.aboutMe} // Pass the validation rules as a prop
          />
        </Grid>

        <Grid item xs={12} sm={4} px={2} py={1}>
          <CustomLabelTextField
            label="Email Address"
            name="email"
            required={true}
            placeholder="Enter email address"
            register={register}
            errors={errors}
            validation={globalValidations.email} // Pass the validation rules as a prop
          />
        </Grid>

        <Grid item xs={12} sm={4} px={2} py={1}>
          <CustomLabelTextField
            label="Designation"
            name="designation"
            required={true}
            placeholder="Enter designation"
            register={register}
            errors={errors}
            validation={globalValidations.designation} // Pass the validation rules as a prop
          />
        </Grid>

        <Grid item xs={12} sm={4} px={2} py={1}>
          <CustomLabelTextField
            label="Company"
            name="company"
            required={true}
            placeholder="Enter company"
            register={register}
            errors={errors}
            validation={globalValidations.company} // Pass the validation rules as a prop
          />
        </Grid>

        <Grid item xs={12} sm={12} px={2} py={1}>
          <Box sx={{ display: "flex", justifyContent: "start", alignItems: "center", width: "100%" }}>
            <RowRadioButtonsGroup />
          </Box>
        </Grid>

        <Grid item xs={12} sm={4} px={2} py={1}>
          <CustomAutocomplete label="Select a country" options={countries} />
        </Grid>

        <Grid item xs={12} sm={4} px={2} py={1}>
          <CustomLabelTextField
            label="Phone Number (only numbers)"
            name="phoneNo"
            required={true}
            placeholder="Enter phone no"
            register={register}
            errors={errors}
            validation={globalValidations.email} // Pass the validation rules as a prop
          />
        </Grid>

        <Grid item xs={12} sm={4} px={2} py={1}>
          <CustomDataPicker label="DOB" />
        </Grid>

        <Grid item xs={12} sm={12} md={4} px={2} py={1} textAlign="left">
          <Button size="small" type="submit" variant="contained" sx={{ mr: 1 }}>
            Save changes
          </Button>
          <Button size="small" variant="contained" sx={{ backgroundColor: theme.palette.secondary.main, color: theme.palette.secondary.light, "&:hover": { backgroundColor: theme.palette.secondary.dark } }} onClick={handleGoBack}>
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
