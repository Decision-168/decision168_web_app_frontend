import React, { useState, useEffect } from "react";
import { Avatar, Box, Button, Grid, InputLabel, TextField, Stack, IconButton } from "@mui/material";
import { useForm } from "react-hook-form";
import CustomLabelTextField from "../../../common/CustomLabelTextField";
import { globalValidations } from "../../../../utils/GlobalValidation";
import { useTheme } from "@mui/material/styles";
import CustomAutocomplete from "../../../common/CustomAutocomplete";
import { useNavigate } from "react-router-dom";
import AddSocialMediaLinks from "../../../common/AddSocialMediaLinks";
import CustomNumberField from "../../../common/CustomNumberField";
import CustomMultilineTextField from "../../../common/CustomMultilineTextField";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import GenderRadioGroup from "../../../common/GenderRadioGroup";
import CoverImage from "../../../../assets/images/cover-image.png";
import FilterSelectedOptions from "../../../common/FilterSelectedOptions";
import CircularLoader from "../../../common/CircularLoader";
import { updatePortfolio } from "../../../../api/modules/porfolioModule";
import { useSelector } from "react-redux";
import { getPortfolioDetailsAsync, selectPorfolioDetails } from "../../../../redux/action/portfolioSlice";
import { selectUserDetails } from "../../../../redux/action/userSlice";
import SelectOption from "../../../common/SelectOption";
import { getCountries } from "../../../../api/modules/dashboardModule";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const countries = [
  { label: "India" },
  { label: "China" },
  { label: "Pakistan" },
  { label: "Afganistan" },
  { label: "Russia" },
  { label: "Bangladesh" },
];

export default function IndividualForm({ paramId, isEditPath, depts }) {
  const storedPortfolioId = JSON.parse(localStorage.getItem("portfolioId"));
  const details = useSelector(selectPorfolioDetails);
  const user = useSelector(selectUserDetails);
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({
    portfolio_createdby: user?.reg_id,
    portfolio_user: "individual",
    portfolio_name: "",
    portfolio_mname: "",
    portfolio_lname: "",
    about_portfolio: "",
    phone_number: 0,
    email_address: "",
    designation: "",
    gender: "",
    gender_other: "",
    company_individual: "",
    street: "",
    city: "",
    state: "",
    country: "",
    social_media_icon: "",
    social_media: "",
    photo: "",
    cover_photo: "",
  });
  const [loading, setLoading] = useState(false);
  const [inputFields, setInputFields] = useState([
    // {
    //   cus_department: "",
    //   error: false,
    // },
  ]);
  const [fields, setFields] = useState([
    {
      social_media_icon: "",
      social_media: "",
    },
  ]);

  useEffect(() => {
    // dispatch(getPortfolioDetailsAsync(storedPortfolioId));
    if(isEditPath){
      dispatch(getPortfolioDetailsAsync(paramId));
    }
  }, [isEditPath]);

  useEffect(() => {
    if(isEditPath){
      setFormValues({
        ...formValues,
        portfolio_createdby: user?.reg_id,
        portfolio_user: details?.portfolio_user,
        portfolio_name: details?.portfolio_name,
        portfolio_mname: details?.portfolio_mname,
        portfolio_lname: details?.portfolio_lname,
        about_portfolio: details?.about_portfolio,
        phone_number: details?.phone_number,
        email_address: details?.email_address,
        designation: details?.designation,
        gender: details?.gender,
        gender_other: details?.gender_other,
        company_individual: details?.company_individual,
        street: details?.street,
        city: details?.city,
        state: details?.state,
        country: details?.country,
        social_media_icon: details?.social_media_icon,
        social_media: details?.social_media,
        photo: "",
        cover_photo: "",
      });
    }else{
      setFormValues({});
    }
  }, [isEditPath]);

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

  const [departments, setDepartments] = React.useState([]);
  const handleDepartmentChange = (selectedOptions) => {
    console.log("Selected departments:", selectedOptions);
    const departmentsArray = selectedOptions?.map((item) => item.department);
    setDepartments(departmentsArray);
  };

  const handleInputChange = (event, index) => {
    const values = [...inputFields];
    values[index][event.target.name] = event.target.value;
    setInputFields(values);
  };

  const handleAddClick = () => {
    setInputFields([...inputFields, { cus_department: "", error: false }]);
  };

  const handleRemoveClick = (index) => {
    const values = [...inputFields];

    if (inputFields.length >= 1) {
      values.splice(index, 1);
      setInputFields(values);
    }
  };

  const handleSubmit = async (event) => {
    alert(`${JSON.stringify(formValues)}`)
    event.preventDefault();
    setLoading(true);

    const updatedFields = inputFields.map((field) => ({
      ...field,
      error: !field.cus_department.trim()
        ? "Department cannot be empty"
        : !isDepartmentValid(field.cus_department)
        ? "Invalid department"
        : false,
    }));

    setInputFields(updatedFields);

    if (updatedFields.some((field) => field.error)) {
      setLoading(false);
      return;
    }

    const customDepartmentArray = updatedFields.map((item) => item.cus_department);
    const departmentData = {
      portfolio_id: JSON.parse(localStorage.getItem("portfolioId")),
      departments: departments,
      cus_departments: customDepartmentArray,
      createdby: user?.reg_id,
    };

    try {
      const icons = fields.map((item) => item.social_media_icon).join(",");
      const links = fields.map((item) => item.social_media).join(",");
      const data = { ...formValues, social_media_icon: icons, social_media: links };
      if (isEditPath) {
        const portfolioId = storedPortfolioId;
        const response = await updatePortfolio(portfolioId, data);
        toast.success(`${response.message}`);
      } else {
        const response = await insertPortfolio(data);
        await insertProjectPortfolioDepartment(departmentData);
        toast.success(`${response.message}`);
      }
    } catch (error) {
      toast.error(`${error.response?.data?.error}`);
      console.error("Error in inserting new portfolio:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <Grid container>
        <Grid item xs={12} sm={4} px={2} py={1}>
          <CustomLabelTextField
            label="First Name"
            required={true}
            placeholder="Enter First Name"
            name="portfolio_name"
            value={formValues.portfolio_name}
            onChange={handleChange("portfolio_name")}
          />
        </Grid>

        <Grid item xs={12} sm={4} px={2} py={1}>
          <CustomLabelTextField
            label="Middle Name"
            required={false}
            placeholder="Enter middle name"
            name="portfolio_mname"
            value={formValues.portfolio_mname}
            onChange={handleChange("portfolio_mname")}
          />
        </Grid>

        <Grid item xs={12} sm={4} px={2} py={1}>
          <CustomLabelTextField
            label="Last Name"
            required={true}
            placeholder="Enter last name"
            name="portfolio_lname"
            value={formValues.portfolio_lname}
            onChange={handleChange("portfolio_lname")}
          />
        </Grid>

        <Grid item xs={12} sm={12} px={2} py={1}>
          <CustomMultilineTextField
            label="About Individual"
            required={false}
            placeholder="About Individual"
            name="about_portfolio"
            value={formValues.about_portfolio}
            onChange={handleChange("about_portfolio")}
          />
        </Grid>

        <Grid item xs={12} sm={4} px={2} py={1}>
          <CustomNumberField
            label="Phone Number"
            required={true}
            placeholder="Enter phone no"
            name="phone_number"
            value={formValues.phone_number}
            onChange={handleChange("phone_number")}
          />
        </Grid>

        <Grid item xs={12} sm={4} px={2} py={1}>
          <CustomLabelTextField
            label="Email Address"
            required={true}
            placeholder="Enter email address"
            name="email_address"
            value={formValues.email_address}
            onChange={handleChange("email_address")}
          />
        </Grid>

        <Grid item xs={12} sm={4} px={2} py={1}>
          <CustomLabelTextField
            label="Designation"
            required={false}
            placeholder="Enter designation"
            name="designation"
            value={formValues.designation}
            onChange={handleChange("designation")}
          />
        </Grid>

        <Grid item xs={12} sm={12} px={2} py={1}>
          <GenderRadioGroup formValues={formValues} setFormValues={setFormValues} />
        </Grid>

        <Grid item xs={12} sm={4} px={2} py={1}>
          <CustomLabelTextField
            label="Company Name"
            required={true}
            placeholder="Enter Company Name"
            name="company_individual"
            value={formValues.company_individual}
            onChange={handleChange("company_individual")}
          />
        </Grid>

        <Grid item xs={12} sm={4} px={2} py={1}>
          <CustomLabelTextField
            label="Street"
            required={false}
            placeholder="Enter Street"
            name="street"
            value={formValues.street}
            onChange={handleChange("street")}
          />
        </Grid>

        <Grid item xs={12} sm={4} px={2} py={1}>
          <CustomLabelTextField
            label="City"
            required={false}
            placeholder="Enter City"
            name="city"
            value={formValues.city}
            onChange={handleChange("city")}
          />
        </Grid>

        <Grid item xs={12} sm={4} px={2} py={1}>
          <CustomLabelTextField
            label="State"
            required={false}
            placeholder="Enter State"
            name="state"
            value={formValues.state}
            onChange={handleChange("state")}
          />
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
          &nbsp;
        </Grid>

        <Grid item xs={12} sm={4} px={2} py={1} textAlign="center">
          <InputLabel sx={{ fontSize: "14px", textAlign: "left" }}>Add Company Logo</InputLabel>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<CameraAltIcon />}
            size="medium"
            sx={{ mt: 1, backgroundColor: "white" }}
          >
            {isEditPath ? "Add / Change Profile Picture" : " Add Company Logo"}
          </Button>
        </Grid>

        <Grid item xs={12} sm={8} px={2} py={1} textAlign="center">
          {/* For the preview during edit */}
          {isEditPath ? (
            <Box
              sx={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Avatar src="" sx={{ width: "100px", height: "100px" }} />
            </Box>
          ) : null}
        </Grid>

        <Grid item xs={12} sm={4} px={2} py={1} textAlign="center">
          <InputLabel sx={{ fontSize: "14px", textAlign: "left" }}>Add Cover Picture</InputLabel>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<CameraAltIcon />}
            size="medium"
            sx={{ mt: 1, backgroundColor: "white" }}
          >
            {isEditPath ? "Add / Change Cover Picture" : " Add Cover Picture"}
          </Button>
        </Grid>

        <Grid item xs={12} sm={8} px={2} py={1} textAlign="center">
          {/* For the preview during edit */}

          {isEditPath ? (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <img src={CoverImage} alt="" width="100%" height="250px" />
            </Box>
          ) : null}
        </Grid>

        <Grid item xs={12} sm={8} px={2} py={1}>
          &nbsp;
        </Grid>

        {!isEditPath && (
          <>
            {" "}
            <Grid item xs={12} px={2} py={1}>
              <FilterSelectedOptions
                label="Add Department"
                labelColor=""
                required={false}
                placeholder="Departments"
                items={depts}
                onSelectionChange={handleDepartmentChange}
                getOptionLabelFn={(option) => option.department}
              />
            </Grid>
            <Grid item xs={12} md={4} px={2} py={2}>
              <InputLabel sx={{ fontSize: "14px", textAlign: "left" }}>
                Add Custom Department(s)
              </InputLabel>
              <Button
                onClick={handleAddClick}
                fullWidth
                variant="contained"
                startIcon={<DashboardCustomizeIcon />}
                size="medium"
                sx={{ mt: 1 }}
              >
                Add Custom Department
              </Button>
            </Grid>
            <Grid item xs={12} md={8} pl={1} textAlign="start">
              {inputFields.map((inputField, index) => (
                <Grid container key={index} my={1} px={1} spacing={2} bgcolor="#F7F7F7">
                  <Grid item xs={10} py={2} mt={2.5} textAlign="start">
                    <TextField
                      fullWidth
                      name="cus_department"
                      onChange={(event) => handleInputChange(event, index)}
                      placeholder="Enter custom department"
                      variant="outlined"
                      error={inputField.error}
                      helperText={inputField.error}
                    />
                  </Grid>
                  <Grid item xs={2} py={2} mt={2.5}>
                    <Stack direction="row" justifyContent="end" alignItems="center">
                      {inputFields.length > 0 && (
                        <IconButton onClick={() => handleRemoveClick(index)}>
                          <RemoveCircleRoundedIcon />
                        </IconButton>
                      )}
                    </Stack>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </>
        )}

        <Grid item xs={12} sm={12} py={1}>
          <AddSocialMediaLinks fields={fields} setFields={setFields} />
        </Grid>

        <Grid item xs={12} sm={12} px={2} py={2} textAlign="end">
          <Button size="small" type="submit" variant="contained" sx={{ mr: 1 }}>
            {loading ? <CircularLoader /> : isEditPath ? "Save Changes" : "Create"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
