import { Box, Button } from "@mui/material";
import React from "react";
import CustomPasswordField from "../subComponents/CustomPasswordField";
import CustomTextField from "../subComponents/CustomTextField";
import { useForm } from "react-hook-form";
import { authValidations } from "../authValidations";

export default function Form() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
      <CustomTextField
        name="email"
        placeholder="Email Address"
        register={register}
        errors={errors}
        validation={authValidations.email} // Pass the validation rules as a prop
      />

      <CustomPasswordField
        name="password"
        placeholder="New Password"
        register={register}
        errors={errors}
        validation={authValidations.password} // Pass the validation rules as a prop
      />

      <CustomPasswordField
        name="confirmPassword"
        placeholder="Confirm Password"
        register={register}
        errors={errors}
        validation={authValidations.confirmPassword} // Pass the validation rules as a prop
      />

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, borderRadius: "3px" }}>
        Change Password
      </Button>
    </Box>
  );
}
