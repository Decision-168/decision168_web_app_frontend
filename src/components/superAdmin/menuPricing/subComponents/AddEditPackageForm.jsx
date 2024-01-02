/* eslint-disable react/prop-types */
import { Box, Button, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { globalValidations } from "../../../../utils/GlobalValidation";
import CustomLabelTextField from "../../common/CustomLabelTextField";
import { useState } from "react";
import CustomSelect from "../../common/CustomSelect";
import { InfoOutlined } from "@mui/icons-material";
import { closeModal } from "../../../../redux/action/modalSlice";
import { useDispatch } from "react-redux";

const items = [
  { value: "choose", text: "Choose", selected: true },
  { value: "yes", text: "Yes", selected: false },
  { value: "no", text: "No", selected: false },
];

export default function AddEditPackageForm({ editMode }) {
  const [value, setValue] = useState("choose");
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setValue(event.target.value);
  };

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
      <Grid item xs={12} pt={2}>
        <CustomSelect
          items={items}
          label="Link with Stripe"
          labelColor=""
          required={true}
          handleChange={handleChange}
          value={value}
        />
      </Grid>
      <Grid item xs={12} pt={2} display="flex" gap={3} alignItems="center">
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
      </Grid>

      <Grid item xs={12} pt="12px" display="flex" gap={3}>
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
      </Grid>
      <Grid item xs={12} pt="12px" display="flex" gap={3}>
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
      </Grid>
      <Grid item xs={12} pt="12px" display="flex" gap={3}>
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
      </Grid>
      <Grid item xs={12} pt="12px" display="flex" gap={3}>
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

      <Box textAlign="right" padding="16px 0 20px 0">
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
