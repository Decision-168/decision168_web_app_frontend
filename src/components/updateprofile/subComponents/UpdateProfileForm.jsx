import { Box, Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CustomLabelTextField from "../../common/CustomLabelTextField";
import { globalValidations } from "../../../utils/GlobalValidation";
import CustomLabelTextArea from "../../common/CustomLabelTextArea";
import CustomDataPicker from "../../common/CustomDataPicker";
import { useTheme } from "@mui/material/styles";
import CustomAutocomplete from "../../common/CustomAutocomplete";
import { useNavigate } from "react-router-dom";
import AddSocialMediaLinks from "../../../components/common/AddSocialMediaLinks";
import CustomNumberField from "../../common/CustomNumberField";
import CustomMultilineTextField from "../../common/CustomMultilineTextField";
import { selectUserDetails } from "../../../redux/action/userSlice";
import { useSelector } from "react-redux";
import GenderRadioGroup from "../../common/GenderRadioGroup";
import { getCountries } from "../../../api/modules/dashboardModule";
import CustomDatePicker from "../../common/CustomDatePicker";

// const countries = [{ label: "India" }, { label: "China" }, { label: "Pakistan" }, { label: "Afganistan" }, { label: "Russia" }, { label: "Bangladesh" }];

export default function UpdateProfileForm() {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();
  const theme = useTheme();
  const navigate = useNavigate();
  const user = useSelector(selectUserDetails);
  const [selectedGender, setSelectedGender] = useState("prefer not to say");
  const [countries, setCountries] = React.useState([]);
  const [selectedCountryCode, setSelectedCountryCode] = React.useState(null);
  const [dob, setDob] = useState(null);

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };

  const handleCountryChange = (event, value) => {
    setSelectedCountryCode(value ? value.country_code : null);
  };

  const handleDob = (date) => {
    // Handle the date change in the parent component
    console.log("Selected date:", date);
  };

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  function handleGoBack() {
    navigate(-1);
  }

  const fetchCountries = async () => {
    try {
      const response = await getCountries();
      setCountries(response);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to prefill form fields with remembered user data
  const prefillForm = () => {
    setValue("first_name", user?.first_name);
    setValue("middle_name", user?.middle_name);
    setValue("last_name", user?.last_name);
    setValue("about_me", user?.about_me);
    setValue("email_address", user?.email_address);
    setValue("designation", user?.designation);
    setValue("company", user?.company);
    setSelectedGender(user?.gender);
    setSelectedCountryCode(user?.country); // not displaying
    setValue("phone_number", user?.phone_number);
    setDob(user?.dob);
  };

  useEffect(() => {
    prefillForm();
    fetchCountries();
  }, [user]);

  console.log("DOB", user?.dob);

  return (
    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
      <Grid container>
        <Grid item xs={12} sm={4} px={2} py={1}>
          <CustomLabelTextField
            label="First Name"
            name="first_name"
            required={true}
            placeholder="Enter first name"
            register={register}
            errors={errors}
            validation={globalValidations.first_name} // Pass the validation rules as a prop
          />
        </Grid>

        <Grid item xs={12} sm={4} px={2} py={1}>
          <CustomLabelTextField
            label="Middle Name"
            name="middle_name"
            required={false}
            placeholder="Enter middle name"
            register={register}
            errors={errors}
            validation={globalValidations.middle_name} // Pass the validation rules as a prop
          />
        </Grid>

        <Grid item xs={12} sm={4} px={2} py={1}>
          <CustomLabelTextField
            label="Last Name"
            name="last_name"
            required={true}
            placeholder="Enter last name"
            register={register}
            errors={errors}
            validation={globalValidations.last_name} // Pass the validation rules as a prop
          />
        </Grid>

        <Grid item xs={12} sm={12} px={2} py={1}>
          <CustomMultilineTextField
            label="About me"
            name="about_me"
            required={false}
            placeholder="About me"
            register={register}
            errors={errors}
            validation={globalValidations.about_me} // Pass the validation rules as a prop
          />
        </Grid>

        <Grid item xs={12} sm={4} px={2} py={1}>
          <CustomLabelTextField
            label="Email Address"
            name="email_address"
            required={true}
            placeholder="Enter email address"
            register={register}
            errors={errors}
            validation={globalValidations.email_address} // Pass the validation rules as a prop
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
            <GenderRadioGroup selectedValue={selectedGender} onChange={handleGenderChange} />
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
          <CustomAutocomplete label="Country" placeholder="Select a country" options={countries} getOptionLabelFn={(option) => option.country_name} required={false} handleOptionChange={handleCountryChange} />
        </Grid>

        <Grid item xs={12} sm={4} px={2} py={1}>
          <CustomNumberField
            label="Phone Number (only numbers)"
            name="phone_number"
            required={false}
            placeholder="Enter phone no"
            register={register}
            errors={errors}
            validation={globalValidations.phone_number} // Pass the validation rules as a prop
          />
        </Grid>

        <Grid item xs={12} sm={4} px={2} py={1}>
          <CustomDatePicker label="DOB" required onChange={handleDob} defaultDate={user?.dob} />
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
