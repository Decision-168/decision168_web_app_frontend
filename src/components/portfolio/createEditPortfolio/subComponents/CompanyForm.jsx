import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  InputLabel,
  Avatar,
  TextField,
  Stack,
  IconButton,
} from "@mui/material";
import CustomLabelTextField from "../../../common/CustomLabelTextField";
import CustomNumberField from "../../../common/CustomNumberField";
import CustomMultilineTextField from "../../../common/CustomMultilineTextField";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import CircularLoader from "../../../common/CircularLoader";
import AddSocialMediaLinks from "../../../common/AddSocialMediaLinks";
import FilterSelectedOptions from "../../../common/FilterSelectedOptions";
import CoverImage from "../../../../assets/images/cover-image.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../../redux/action/userSlice";
import {
  insertPortfolio,
  insertProjectPortfolioDepartment,
  updatePortfolio,
} from "../../../../api/modules/porfolioModule";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  getPortfolioDetailsAsync,
  selectPorfolioDetails,
} from "../../../../redux/action/portfolioSlice";
import SelectOption from "../../../common/SelectOption";
import { getCountries } from "../../../../api/modules/dashboardModule";

export default function CompanyForm({ isEditPath, depts }) {
  const storedPortfolioId = JSON.parse(localStorage.getItem("portfolioId"));
  const user = useSelector(selectUserDetails);
  const details = useSelector(selectPorfolioDetails);
  const dispatch = useDispatch();
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState([
    {
      social_media_icon: "",
      social_media: "",
    },
  ]);
  const [inputFields, setInputFields] = useState([
    // {
    //   cus_department: "",
    //   error: false,
    // },
  ]);

  useEffect(() => {
    dispatch(getPortfolioDetailsAsync(storedPortfolioId));
  }, [isEditPath]);

  const [formValues, setFormValues] = useState({
    portfolio_createdby: user?.reg_id,
    portfolio_user: "company",
    portfolio_name: "",
    company_website: "",
    email_address: "",
    about_portfolio: "",
    phone_number: "",
    contact_fname: "",
    contact_mname: "",
    contact_lname: "",
    contact_phone_number: 0,
    street: "",
    city: "",
    state: "",
    country: "",
    social_media_icon: "",
    social_media: "",
    photo: "",
    cover_photo: "",
  });

  useEffect(() => {
    setFormValues({
      ...formValues,
      portfolio_createdby: user?.reg_id,
      portfolio_user: details?.portfolio_user,
      portfolio_name: details?.portfolio_name,
      company_website: details?.company_website,
      email_address: details?.email_address,
      about_portfolio: details?.about_portfolio,
      phone_number: details?.phone_number,
      contact_fname: details?.contact_fname,
      contact_mname: details?.contact_mname,
      contact_lname: details?.contact_lname,
      contact_phone_number: details?.contact_phone_number,
      street: details?.street,
      city: details?.city,
      state: details?.state,
      country: details?.country,
      social_media_icon: details?.social_media_icon,
      social_media: details?.social_media,
      photo: "",
      cover_photo: "",
    });
  }, [details]);

  useEffect(() => {
    // Split the comma-separated strings into arrays
    const iconsArray = formValues.social_media_icon?.split(",");
    const linksArray = formValues.social_media?.split(",");

    // Combine the arrays into an array of objects
    const resultArray =
      iconsArray?.map((social_media_icon, index) => ({
        social_media_icon,
        social_media: linksArray[index],
      })) || [];

    setFields(resultArray);
  }, [isEditPath, formValues.social_media_icon, formValues.social_media]);

  const handleChange = (fieldName) => (event) => {
    setFormValues({
      ...formValues,
      [fieldName]: event.target.value,
    });
  };

  // setMembersIds([...getMembersIds, ...memberIdArray]);

  const handleDepartmentChange = (selectedOptions) => {
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

  const isDepartmentValid = (department) => {
    const departmentPattern = /^[A-Za-z ]+$/;
    return departmentPattern.test(department);
  };

  const handleSubmit = async (event) => {
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

    const customDepartmentArray = updatedFields.map(
      (item) => item.cus_department
    );
    const departmentData = {
      portfolio_id: JSON.parse(localStorage.getItem("portfolioId")),
      departments: departments,
      cus_departments: customDepartmentArray,
      createdby: user?.reg_id,
    };

    try {
      const icons = fields?.map((item) => item.social_media_icon).join(",");
      const links = fields?.map((item) => item.social_media).join(",");
      const data = {
        ...formValues,
        social_media_icon: icons,
        social_media: links,
      };
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
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Grid container>
        <Grid item xs={12} sm={4} px={2} py={1}>
          <CustomLabelTextField
            label="Company Name"
            required={true}
            placeholder="Enter Company Name"
            name="portfolio_name"
            value={formValues.portfolio_name}
            onChange={handleChange("portfolio_name")}
          />
        </Grid>

        <Grid item xs={12} sm={4} px={2} py={1}>
          <CustomLabelTextField
            label="Company Website"
            required={false}
            placeholder="Enter Website"
            name="company_website"
            value={formValues.company_website}
            onChange={handleChange("company_website")}
          />
        </Grid>

        <Grid item xs={12} sm={4} px={2} py={1}>
          <CustomLabelTextField
            label="Company Email Address"
            required={true}
            placeholder="Enter email address"
            name="email_address"
            value={formValues.email_address}
            onChange={handleChange("email_address")}
          />
        </Grid>

        <Grid item xs={12} sm={12} px={2} py={1}>
          <CustomMultilineTextField
            label="About Company"
            required={false}
            placeholder="About Company"
            name="about_portfolio"
            value={formValues.about_portfolio}
            onChange={handleChange("about_portfolio")}
          />
        </Grid>

        <Grid item xs={12} sm={4} px={2} py={1}>
          <CustomNumberField
            label="Company Phone Number"
            required={true}
            placeholder="Enter phone no"
            name="phone_number"
            value={formValues.phone_number}
            onChange={handleChange("phone_number")}
          />
        </Grid>

        <Grid item xs={12} sm={4} px={2} py={1}>
          <CustomLabelTextField
            label="Contact Person First Name"
            required={true}
            placeholder="Enter First Name"
            name="contact_fname"
            value={formValues.contact_fname}
            onChange={handleChange("contact_fname")}
          />
        </Grid>

        <Grid item xs={12} sm={4} px={2} py={1}>
          <CustomLabelTextField
            label="Contact Person Middle Name"
            required={false}
            placeholder="Enter middle name"
            name="contact_mname"
            value={formValues.contact_mname}
            onChange={handleChange("contact_mname")}
          />
        </Grid>

        <Grid item xs={12} sm={4} px={2} py={1}>
          <CustomLabelTextField
            label="Contact Person Last Name"
            required={true}
            placeholder="Enter last name"
            name="contact_lname"
            value={formValues.contact_lname}
            onChange={handleChange("contact_lname")}
          />
        </Grid>

        <Grid item xs={12} sm={4} px={2} py={1}>
          <CustomNumberField
            label="Contact Person Phone Number"
            required={false}
            placeholder="Enter phone no"
            name="contact_phone_number"
            value={formValues.contact_phone_number}
            onChange={handleChange("contact_phone_number")}
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

        <Grid item xs={12} sm={4} px={2} py={1} textAlign="center">
          <InputLabel sx={{ fontSize: "14px", textAlign: "left" }}>
            Add Company Logo
          </InputLabel>
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
          <InputLabel sx={{ fontSize: "14px", textAlign: "left" }}>
            Add Cover Picture
          </InputLabel>
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
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img src={CoverImage} alt="" width="100%" height="250px" />
            </Box>
          ) : null}
        </Grid>

        {!isEditPath && (
          <>
            <Grid item xs={12} sm={12} px={2} py={2}>
              <FilterSelectedOptions
                label="Add Department(s)"
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
                <Grid
                  container
                  key={index}
                  my={1}
                  px={1}
                  spacing={2}
                  bgcolor="#F7F7F7"
                >
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
                    <Stack
                      direction="row"
                      justifyContent="end"
                      alignItems="center"
                    >
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

        <Grid item xs={12} sm={12} py={2} textAlign="end">
          <Button size="small" type="submit" variant="contained" sx={{ ml: 1 }}>
            {loading ? (
              <CircularLoader />
            ) : isEditPath ? (
              "Save Changes"
            ) : (
              "Create"
            )}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
