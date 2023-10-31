import { Avatar, Box, Button, Grid, InputLabel } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import CustomLabelTextField from "../../../common/CustomLabelTextField";
import { globalValidations } from "../../../../utils/GlobalValidation";
import { useTheme } from "@mui/material/styles";
import CustomAutocomplete from "../../../common/CustomAutocomplete";
import { useNavigate } from "react-router-dom";
import AddSocialMediaLinks from "../../../common/AddSocialMediaLinks";
import CustomNumberField from "../../../common/CustomNumberField";
import CustomMultilineTextField from "../../../common/CustomMultilineTextField";
import CustomSelect from "../../../common/CustomSelect";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import RowRadioButtonsGroup from "../../../common/RowRadioButtonsGroup";
import CoverImage from "../../../../assets/images/cover-image.png";
const countries = [{ label: "India" }, { label: "China" }, { label: "Pakistan" }, { label: "Afganistan" }, { label: "Russia" }, { label: "Bangladesh" }];

const items = [
  { value: "company", text: "Company", selected: true },
  { value: "individual", text: "Individual", selected: false },
];

const departments = ["Admnistration", "Accounting & Finanace", "Customer Service", "Human Resources", "Marketing", "Sales", "Research & Development"];

export default function CreatePortfolioForm() {
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
          <CustomSelect items={items} label="Portfolio Type" labelColor="" required={true} />
        </Grid>

        <Grid item xs={12} sm={4} px={2} py={1}>
          <CustomLabelTextField
            label="Company Name"
            name="companyName"
            required={true}
            placeholder="Enter Company Name"
            register={register}
            errors={errors}
            validation={globalValidations.company} // Pass the validation rules as a prop
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

        <Grid item xs={12} sm={12} px={2} py={1}>
          <CustomMultilineTextField
            label="About Individual"
            name="AboutIndividual"
            required={false}
            placeholder="About Individual"
            register={register}
            errors={errors}
            validation={globalValidations.aboutMe} // Pass the validation rules as a prop
          />
        </Grid>

        <Grid item xs={12} sm={4} px={2} py={1}>
          <CustomLabelTextField
            label="First Name"
            name="firstName"
            required={true}
            placeholder="Enter First Name"
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
          <CustomNumberField
            label="Phone Number"
            name="phoneNo"
            required={true}
            placeholder="Enter phone no"
            register={register}
            errors={errors}
            validation={globalValidations.phoneNo} // Pass the validation rules as a prop
          />
        </Grid>

        <Grid item xs={12} sm={4} px={2} py={1}>
          <CustomLabelTextField
            label="Street"
            name="street"
            required={false}
            placeholder="Enter Street"
            register={register}
            errors={errors}
            validation={globalValidations.company} // Pass the validation rules as a prop
          />
        </Grid>

        <Grid item xs={12} sm={4} px={2} py={1}>
          <CustomLabelTextField
            label="City"
            name="city"
            required={false}
            placeholder="Enter City"
            register={register}
            errors={errors}
            validation={globalValidations.company} // Pass the validation rules as a prop
          />
        </Grid>

        <Grid item xs={12} sm={4} px={2} py={1}>
          <CustomLabelTextField
            label="State"
            name="state"
            required={false}
            placeholder="Enter State"
            register={register}
            errors={errors}
            validation={globalValidations.company} // Pass the validation rules as a prop
          />
        </Grid>

        <Grid item xs={12} sm={4} px={2} py={1}>
          <CustomAutocomplete label="Select a country" options={countries} />
        </Grid>

        <Grid item xs={12} sm={4} px={2} py={1} textAlign="center">
          {/* <InputLabel sx={{ fontSize: "14px", textAlign: "left" }}>Add Company Logo</InputLabel> */}
          <Button fullWidth variant="outlined" startIcon={<CameraAltIcon />} size="medium" sx={{ mt: 1, backgroundColor: "white" }}>
            Add / Change Profile Picture
          </Button>
        </Grid>

        <Grid item xs={12} sm={8} px={2} py={1} textAlign="center">
          <Box sx={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Avatar src="" sx={{ width: "100px", height: "100px" }} />
          </Box>
        </Grid>

        <Grid item xs={12} sm={4} px={2} py={1} textAlign="center">
          {/* <InputLabel sx={{ fontSize: "14px", textAlign: "left" }}>Add Cover Picture</InputLabel> */}
          <Button fullWidth variant="outlined" startIcon={<CameraAltIcon />} size="medium" sx={{ mt: 1, backgroundColor: "white" }}>
            Add / Change Cover Picture
          </Button>
        </Grid>

        <Grid item xs={12} sm={8} px={2} py={1} textAlign="center">
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <img src={CoverImage} alt="" width="100%" height="250px" />
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} py={1}>
          <AddSocialMediaLinks />
        </Grid>

        <Grid item xs={12} sm={12} px={2} py={2} textAlign="left">
          <Button size="small" type="submit" variant="contained" sx={{ mr: 1 }}>
            Save Changes
          </Button>
          <Button size="small" variant="contained" sx={{ backgroundColor: theme.palette.secondary.main, color: theme.palette.secondary.light, "&:hover": { backgroundColor: theme.palette.secondary.dark } }} onClick={handleGoBack}>
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
