import { Box, Button } from "@mui/material";
import React from "react";
import CustomPasswordField from "../subComponents/CustomPasswordField";
import CustomTextField from "../subComponents/CustomTextField";
import { useForm } from "react-hook-form";
import { authValidations } from "../authValidations";
import Navigation from "../subComponents/Navigation";

export default function Form() {
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
      <CustomTextField
        name="otp"
        placeholder="Enter OTP"
        register={register}
        errors={errors}
        validation={authValidations.otp} // Pass the validation rules as a prop
      />

      <CustomPasswordField
        showTooltip={false}
        name="password"
        placeholder="New Password"
        register={register}
        errors={errors}
        validation={authValidations.password} // Pass the validation rules as a prop
      />

      <CustomPasswordField
        showTooltip={false}
        name="confirmPassword"
        placeholder="Confirm Password"
        register={register}
        errors={errors}
        validation={authValidations.confirmPassword} // Pass the validation rules as a prop
      />

      <Button type="submit" fullWidth variant="contained" sx={{ my: 2, borderRadius: "3px" }}>
        Change Password
      </Button>

      <Navigation question="Remember It?" linkLabel="Sign In Here" path="/login" />
    </Box>
  );
}
