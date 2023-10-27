import { Box, Button, Grid } from "@mui/material";
import React from "react";
import CustomPasswordField from "../../auth/subComponents/CustomPasswordField";
import { useForm } from "react-hook-form";
import { authValidations } from "../../auth/authValidations";
import { useTheme } from "@mui/material/styles";

export default function ChangePasswordForm({ handleClose }) {
  const theme = useTheme();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
      <CustomPasswordField
        showTooltip={false}
        name="currentPassword"
        placeholder="Current Password"
        register={register}
        errors={errors}
        validation={authValidations.currentPassword} // Pass the validation rules as a prop
      />

      <CustomPasswordField
        showTooltip={true}
        name="newPassword"
        placeholder="New Password"
        register={register}
        errors={errors}
        validation={authValidations.newPassword} // Pass the validation rules as a prop
      />

      <CustomPasswordField
        showTooltip={false}
        name="confirmPassword"
        placeholder="Confirm Password"
        register={register}
        errors={errors}
        validation={authValidations.confirmPassword} // Pass the validation rules as a prop
      />

      <Grid item xs={12} sm={12} py={2} textAlign="left">
        <Button size="small" type="submit" variant="contained" sx={{ mr: 1 }}>
          Change Password
        </Button>
        <Button onClick={handleClose} size="small" variant="contained" sx={{ backgroundColor: theme.palette.secondary.main, color: theme.palette.secondary.light, "&:hover": { backgroundColor: theme.palette.secondary.dark } }}>
          Cancel
        </Button>
      </Grid>
    </Box>
  );
}
