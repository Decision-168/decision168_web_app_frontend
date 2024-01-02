/* eslint-disable react/prop-types */
import { Box, Button, Grid, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { globalValidations } from "../../../../utils/GlobalValidation";
import CustomLabelTextField from "../../common/CustomLabelTextField";
import { InfoOutlined } from "@mui/icons-material";
import { closeModal } from "../../../../redux/action/modalSlice";
import { useDispatch } from "react-redux";

export default function CreateEditCustomPackageForm({ editMode }) {
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      px={2}
      borderTop="1px solid #dadada"
    >
      <Grid item xs={12} py={2} borderBottom="1px solid #dadada">
        <Typography
          component="h5"
          variant="h5"
          fontSize="16px"
          textAlign="left"
          fontWeight="600"
        >
          Company Details
        </Typography>
        <Grid item xs={12} pt={1} display="flex" gap={3} alignItems="center">
          <CustomLabelTextField
            label="Company Name"
            labelColor=""
            name="CompanyName"
            required={true}
            placeholder="Enter Company Name..."
            register={register}
            errors={errors}
            validation={globalValidations.companyName} // Pass the validation rules as a prop
          />
          <CustomLabelTextField
            label="Exact No of Users"
            labelColor=""
            name="ExactNoofUsers"
            required={true}
            placeholder="Enter Total Users..."
            register={register}
            errors={errors}
            validation={globalValidations.number} // Pass the validation rules as a prop
          />
        </Grid>
        {!editMode && (
          <Grid item xs={12} pt={1} display="flex" gap={3} alignItems="center">
            <CustomLabelTextField
              label="Company Username"
              labelColor=""
              name="CompanyUsername"
              required={true}
              placeholder="Create Company Username..."
              register={register}
              errors={errors}
              validation={globalValidations.companyName} // Pass the validation rules as a prop
            />
          </Grid>
        )}
      </Grid>

      <Grid item xs={12} py={2}>
        <Typography
          component="h5"
          variant="h5"
          fontSize="16px"
          textAlign="left"
          fontWeight="600"
        >
          Package Detail
        </Typography>
        <Grid item xs={12} pt={1} display="flex" gap={3} alignItems="center">
          <CustomLabelTextField
            label="Package Name"
            labelColor=""
            name="PackageName"
            required={true}
            placeholder="Enter Package Name..."
            register={register}
            errors={errors}
            validation={globalValidations.packageName} // Pass the validation rules as a prop
          />
          <CustomLabelTextField
            label="Package Validity"
            labelColor=""
            labelDesc="in Days"
            infoIcon={<InfoOutlined />}
            name="PackageValidity"
            required={true}
            placeholder="Enter Package Validity..."
            register={register}
            errors={errors}
            validation={globalValidations.number} // Pass the validation rules as a prop
          />
        </Grid>
        <Grid item xs={12} pt={1} display="flex" gap={3}>
          <CustomLabelTextField
            label="Validity Period"
            labelColor=""
            name="ValidityPeriod"
            required={true}
            placeholder="Enter Validity Period..."
            register={register}
            errors={errors}
            validation={globalValidations.number} // Pass the validation rules as a prop
          />
          <CustomLabelTextField
            label="Package Price"
            labelColor=""
            labelDesc="in $"
            name="PackagePrice"
            required={true}
            placeholder="Enter Package Price..."
            register={register}
            errors={errors}
            validation={globalValidations.number} // Pass the validation rules as a prop
          />
        </Grid>
        <Grid item xs={12} pt="12px" display="flex" gap={3}>
          <CustomLabelTextField
            label="Total Portfolio"
            labelColor=""
            name="TotalPortfolio"
            required={true}
            placeholder="Enter Total Portfolio..."
            register={register}
            errors={errors}
            validation={globalValidations.number} // Pass the validation rules as a prop
          />
          <CustomLabelTextField
            label="Total Goals"
            labelColor=""
            name="TotalGoals"
            required={true}
            placeholder="Enter Total Goals..."
            register={register}
            errors={errors}
            validation={globalValidations.number} // Pass the validation rules as a prop
          />
        </Grid>
        <Grid item xs={12} pt="12px" display="flex" gap={3}>
          <CustomLabelTextField
            label="Total KPIs"
            labelColor=""
            labelDesc="per goal"
            name="TotalKPIs"
            required={true}
            placeholder="Enter Total KPIs..."
            register={register}
            errors={errors}
            validation={globalValidations.number} // Pass the validation rules as a prop
          />
          <CustomLabelTextField
            label="Total Projects"
            labelColor=""
            labelDesc="per portfolio"
            name="TotalProjects"
            required={true}
            placeholder="Enter Total Projects..."
            register={register}
            errors={errors}
            validation={globalValidations.number} // Pass the validation rules as a prop
          />
        </Grid>
        <Grid item xs={12} pt="12px" display="flex" gap={3}>
          <CustomLabelTextField
            label="Total Team Members"
            labelColor=""
            labelDesc="per portfolio"
            name="TotalTeamMembers"
            required={true}
            placeholder="Enter Total Team Members..."
            register={register}
            errors={errors}
            validation={globalValidations.number} // Pass the validation rules as a prop
          />
          <CustomLabelTextField
            label="Total Tasks"
            labelColor=""
            labelDesc="per project"
            name="TotalTasks"
            required={true}
            placeholder="Enter Total Tasks..."
            register={register}
            errors={errors}
            validation={globalValidations.number} // Pass the validation rules as a prop
          />
        </Grid>
        <Grid item xs={12} pt="12px" display="flex" gap={3}>
          <CustomLabelTextField
            label="Total Storage"
            labelColor=""
            name="TotalStorage"
            required={true}
            placeholder="Enter Total Storage..."
            register={register}
            errors={errors}
            validation={globalValidations.totalStorage} // Pass the validation rules as a prop
          />
          <CustomLabelTextField
            label="Total Content Planner"
            labelColor=""
            labelDesc="portfolio posts / mo"
            name="TotalContentPlanner"
            required={true}
            placeholder="Enter Total Content Planner..."
            register={register}
            errors={errors}
            validation={globalValidations.number} // Pass the validation rules as a prop
          />
        </Grid>
        <Grid item xs={12} pt="12px">
          <CustomLabelTextField
            label="Package Tagline"
            labelColor=""
            name="PackageTagline"
            required={true}
            placeholder="Enter Package Tagline..."
            register={register}
            errors={errors}
            validation={globalValidations.packageTagline} // Pass the validation rules as a prop
          />
        </Grid>
      </Grid>

      <Box textAlign="right" padding="0 20px 20px 0">
        <Button
          size="small"
          type="button"
          variant="contained"
          color="secondary"
          onClick={() => dispatch(closeModal())}
          sx={{ mr: 1, color: "#fff" }}
        >
          Close
        </Button>
        <Button size="small" type="submit" variant="contained">
          {editMode ? "Save Changes" : "Add"}
        </Button>
      </Box>
    </Box>
  );
}
