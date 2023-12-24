import { Box, Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomLabelTextField from "../../common/CustomLabelTextField";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import AddSocialMediaLinks from "../../../components/common/AddSocialMediaLinks";
import CustomNumberField from "../../common/CustomNumberField";
import CustomMultilineTextField from "../../common/CustomMultilineTextField";
import { getUserDetailsAsync, selectUserDetails } from "../../../redux/action/userSlice";
import { useSelector } from "react-redux";
import GenderRadioGroup from "../../common/GenderRadioGroup";
import CustomDatePicker from "../../common/CustomDatePicker";
import { getCountries, updateUserProfile } from "../../../api/modules/dashboardModule";
import { toast } from "react-toastify";
import CircularLoader from "../../common/CircularLoader";
import { useDispatch } from "react-redux";
import SelectOption from "../../common/SelectOption";

export default function UpdateProfileForm() {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUserDetails);

  const [formValues, setFormValues] = useState({});
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = React.useState([
    {
      social_media_icon: "",
      social_media: "",
    },
  ]);

  useEffect(() => {
    setFormValues({
      ...formValues,
      first_name: user?.first_name,
      middle_name: user?.middle_name,
      last_name: user?.last_name,
      about_me: user?.about_me,
      email_address: user?.email_address,
      designation: user?.designation,
      company: user?.company,
      phone_number: user?.phone_number,
      gender: user?.gender,
      gender_other: "",
      country: user?.country,
      social_media_icon: user?.social_media_icon,
      social_media: user?.social_media,
      dob: user?.dob ? new Date(user?.dob) : "",
    });
  }, [user]);

  useEffect(() => {
    // Split the comma-separated strings into arrays
    const iconsArray = formValues.social_media_icon?.split(",");
    const linksArray = formValues.social_media?.split(",");

    // Combine the arrays into an array of objects
    const resultArray = iconsArray?.map((social_media_icon, index) => ({
      social_media_icon,
      social_media: linksArray[index],
    }));
    setFields(resultArray);
  }, [formValues.social_media_icon, formValues.social_media]);

  const handleChange = (fieldName) => (event) => {
    setFormValues({
      ...formValues,
      [fieldName]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Define the required fields for the main form
    const requiredFields = ["first_name", "last_name", "email_address", "dob"];

    // Check for empty required fields in the main form
    const emptyFields = requiredFields.filter((field) => !formValues[field]);

    const fieldLabels = {
      first_name: "First Name",
      last_name: "Last Name",
      email_address: "Email Address",
      dob:"Date of Birth"
    };

    // Display a toast message for empty fields in the main form
    if (emptyFields.length > 0) {
      const errorFields = emptyFields.map((field) => fieldLabels[field]);
      toast.error(`Please fill in all required fields: ${errorFields.join(",")}`);
      return;
    }

    try {
      setLoading(true);
      const icons = fields.map((item) => item.social_media_icon).join(",");
      const links = fields.map((item) => item.social_media).join(",");
      const data = { ...formValues, social_media_icon: icons, social_media: links };
      const userId = user?.reg_id;
      const response = await updateUserProfile(userId, data);
      dispatch(getUserDetailsAsync(userId));
      toast.success(`${response.message}`);
    } catch (error) {
      toast.error(`${error.response?.error}`);
      console.error("Error updating user profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDob = (date) => {
    setFormValues({
      ...formValues,
      dob: date,
    });
  };

  function handleGoBack() {
    navigate(-1);
  }

  return (
    <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={12} sm={4} px={2} py={1}>
          <CustomLabelTextField label="First Name" name="first_name" required={true} placeholder="Enter first name" value={formValues.first_name} onChange={handleChange("first_name")} />
        </Grid>

        <Grid item xs={12} sm={4} px={2} py={1}>
          <CustomLabelTextField label="Middle Name" name="middle_name" required={false} placeholder="Enter middle name" value={formValues.middle_name} onChange={handleChange("middle_name")} />
        </Grid>

        <Grid item xs={12} sm={4} px={2} py={1}>
          <CustomLabelTextField label="Last Name" name="last_name" required={true} placeholder="Enter last name" value={formValues.last_name} onChange={handleChange("last_name")} />
        </Grid>

        <Grid item xs={12} sm={12} px={2} py={1}>
          <CustomMultilineTextField label="About me" name="about_me" required={false} placeholder="About me" value={formValues.about_me} onChange={handleChange("about_me")} />
        </Grid>

        <Grid item xs={12} sm={4} px={2} py={1}>
          <CustomLabelTextField label="Email Address" name="email_address" required={true} placeholder="Enter email address" value={formValues.email_address} onChange={handleChange("email_address")} isDisabled={true} />
        </Grid>

        <Grid item xs={12} sm={4} px={2} py={1}>
          <CustomLabelTextField label="Designation" name="designation" required={false} placeholder="Enter designation" value={formValues.designation} onChange={handleChange("designation")} />
        </Grid>

        <Grid item xs={12} sm={4} px={2} py={1}>
          <CustomLabelTextField label="Company" name="company" required={false} placeholder="Enter company" value={formValues.company} onChange={handleChange("company")} />
        </Grid>

        <Grid item xs={12} sm={12} px={2} py={1}>
          <GenderRadioGroup formValues={formValues} setFormValues={setFormValues} />
        </Grid>

        <Grid item xs={12} sm={4} px={2} py={1}>
          <SelectOption
            label="Country"
            required={false}
            field="country" // Unique identifier for this field
            idKey="country_code" // Key to identify each option
            getOptionLabel={(option) => option.country_name} // which want to display after select
            dynamicOptions={true} // true or false based on your condition
            loadOptions={getCountries} //pass only if dynamicOptions true
            staticOptions={null} // Your static options array
            formValues={formValues}
            setFormValues={setFormValues}
          />
        </Grid>

        <Grid item xs={12} sm={4} px={2} py={1}>
          <CustomNumberField label="Phone Number (only numbers)" name="phone_number" required={false} placeholder="Enter phone no" value={formValues.phone_number} onChange={handleChange("phone_number")} />
        </Grid>

        <Grid item xs={12} sm={4} px={2} py={1}>
          <CustomDatePicker
              label="DOB"
              required
              value={formValues.dob}
              onChange={handleDob}
            />
        </Grid>

        <Grid item xs={12} sm={12} py={1}>
          <AddSocialMediaLinks fields={fields} setFields={setFields} />
        </Grid>

        <Grid item xs={12} sm={12} md={12} px={2} py={2} textAlign="end">
          <Button
            size="small"
            variant="contained"
            sx={{
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.secondary.light,
              "&:hover": { backgroundColor: theme.palette.secondary.dark },
            }}
            onClick={handleGoBack}
          >
            Cancel
          </Button>
          <Button size="small" type="submit" variant="contained" sx={{ ml: 1, width: "130px" }}>
            {loading ? <CircularLoader /> : "Save changes"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
