import { Box, Button, Grid, TextField } from "@mui/material";
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

import AddSocialMediaLinks from "../../../components/common/AddSocialMediaLinks";
import CustomNumberField from "../../common/CustomNumberField";
import CustomMultilineTextField from "../../common/CustomMultilineTextField";

const countries = [{ label: "India" }, { label: "China" }, { label: "Pakistan" }, { label: "Afganistan" }, { label: "Russia" }, { label: "Bangladesh" }];

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
            required={false}
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
          <CustomMultilineTextField
            label="About me"
            name="AboutMe"
            required={false}
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
            required={false}
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
            required={false}
            placeholder="Enter company"
            register={register}
            errors={errors}
            validation={globalValidations.company} // Pass the validation rules as a prop
          />
        </Grid>

        <Grid item xs={12} sm={6} px={2} py={1}>
          <Box sx={{ display: "flex", justifyContent: "start", alignItems: "center", width: "100%" }}>
            <RowRadioButtonsGroup />
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} px={2} py={1}>
          <CustomLabelTextField
            label="Other Gender"
            name="otherGender"
            required={false}
            placeholder="Enter other gender"
            register={register}
            errors={errors}
            validation={globalValidations.otherGender} // Pass the validation rules as a prop
          />
        </Grid>

        <Grid item xs={12} sm={12} py={1}>
          <AddSocialMediaLinks />
        </Grid>

        <Grid item xs={12} sm={4} px={2} py={1}>
          <CustomAutocomplete label="Select a country" options={countries} />
        </Grid>

        <Grid item xs={12} sm={4} px={2} py={1}>
          <CustomNumberField
            label="Phone Number (only numbers)"
            name="phoneNo"
            required={false}
            placeholder="Enter phone no"
            register={register}
            errors={errors}
            validation={globalValidations.phoneNo} // Pass the validation rules as a prop
          />
        </Grid>

        <Grid item xs={12} sm={4} px={2} py={1}>
          <CustomDataPicker label="DOB" />
        </Grid>

        <Grid item xs={12} sm={12} md={4} px={2} py={2} textAlign="left">
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
