import { Box, Button, Grid, InputLabel} from "@mui/material";
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
            label="Company Website"
            name="companyWebsite"
            required={false}
            placeholder="Enter Website"
            register={register}
            errors={errors}
            validation={globalValidations.link} // Pass the validation rules as a prop
          />
        </Grid>

        <Grid item xs={12} sm={12} px={2} py={1}>
          <CustomMultilineTextField
            label="About Company"
            name="AboutCompoany"
            required={false}
            placeholder="About Company"
            register={register}
            errors={errors}
            validation={globalValidations.aboutMe} // Pass the validation rules as a prop
          />
        </Grid>

        <Grid item xs={12} sm={4} px={2} py={1}>
          <CustomLabelTextField
            label="Contact Person First Name"
            name="contactPersonFirstName"
            required={true}
            placeholder="Enter First Name"
            register={register}
            errors={errors}
            validation={globalValidations.firstName} // Pass the validation rules as a prop
          />
        </Grid>

        <Grid item xs={12} sm={4} px={2} py={1}>
          <CustomLabelTextField
            label="Contact Person Middle Name"
            name="contactPersonMiddleName"
            required={false}
            placeholder="Enter middle name"
            register={register}
            errors={errors}
            validation={globalValidations.middleName} // Pass the validation rules as a prop
          />
        </Grid>

        <Grid item xs={12} sm={4} px={2} py={1}>
          <CustomLabelTextField
            label="Contact Person Last Name"
            name="contactPersonlastName"
            required={true}
            placeholder="Enter last name"
            register={register}
            errors={errors}
            validation={globalValidations.lastName} // Pass the validation rules as a prop
          />
        </Grid>

        <Grid item xs={12} sm={4} px={2} py={1}>
          <CustomNumberField
            label="Contact Person Phone Number"
            name="contactPersonPhoneNo"
            required={false}
            placeholder="Enter phone no"
            register={register}
            errors={errors}
            validation={globalValidations.phoneNo} // Pass the validation rules as a prop
          />
        </Grid>

        <Grid item xs={12} sm={4} px={2} py={1}>
          <CustomLabelTextField
            label="Company Email Address"
            name="companyEmail"
            required={true}
            placeholder="Enter email address"
            register={register}
            errors={errors}
            validation={globalValidations.email} // Pass the validation rules as a prop
          />
        </Grid>

        <Grid item xs={12} sm={4} px={2} py={1}>
          <CustomNumberField
            label="Company Phone Number"
            name="companyPhoneNo"
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
          <InputLabel sx={{ fontSize: "14px", textAlign: "left" }}>Add Company Logo</InputLabel>
          <Button fullWidth variant="outlined" startIcon={<CameraAltIcon />} size="medium" sx={{ mt: 1, backgroundColor: "white" }}>
            Add Company Logo
          </Button>
        </Grid>

        <Grid item xs={12} sm={4} px={2} py={1} textAlign="center">
          <InputLabel sx={{ fontSize: "14px", textAlign: "left" }}>Add Cover Picture</InputLabel>
          <Button fullWidth variant="outlined" startIcon={<CameraAltIcon />} size="medium" sx={{ mt: 1, backgroundColor: "white" }}>
            Add Cover Picture
          </Button>
        </Grid>

        <Grid item xs={12} sm={4} px={2} py={1}>
          <CustomAutocomplete label="Add Department" options={departments} />
        </Grid>

        <Grid item xs={12} sm={4} px={2} py={1}>
          <InputLabel sx={{ fontSize: "14px", textAlign: "left" }}>Add Custom Department</InputLabel>
          <Button fullWidth variant="contained" startIcon={<DashboardCustomizeIcon />} size="medium" sx={{ mt: 1 }}>
            Add Custom Department
          </Button>
        </Grid>

        <Grid item xs={12} sm={12} py={1}>
          <AddSocialMediaLinks />
        </Grid>

        <Grid item xs={12} sm={12} px={2} py={2} textAlign="left">
          <Button size="small" type="submit" variant="contained" sx={{ mr: 1 }}>
            Create
          </Button>
          <Button size="small" variant="contained" sx={{ backgroundColor: theme.palette.secondary.main, color: theme.palette.secondary.light, "&:hover": { backgroundColor: theme.palette.secondary.dark } }} onClick={handleGoBack}>
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}