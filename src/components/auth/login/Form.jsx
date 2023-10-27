import { Box, Button, FormControlLabel, Checkbox, Stack } from "@mui/material";
import React from "react";
import CustomPasswordField from "../subComponents/CustomPasswordField";
import CustomLink from "../../common/CustomLink";
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
        name="email"
        placeholder="Email Address"
        register={register}
        errors={errors}
        validation={authValidations.email} // Pass the validation rules as a prop
      />

      <CustomPasswordField
        showTooltip={false}
        name="password"
        placeholder="Password"
        register={register}
        errors={errors}
        validation={authValidations.password} // Pass the validation rules as a prop
      />

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <FormControlLabel control={<Checkbox value="remember" size="small" />} label="Remember me" />
        <CustomLink path="/reset-password">Forgot password?</CustomLink>
      </Stack>

      <Button type="submit" fullWidth variant="contained" sx={{ my: 2, borderRadius: "3px" }}>
        Login
      </Button>

      {/* Navigation */}
      <Navigation question="Don't have an account?" linkLabel="Sign Up Now" path="/register" />
    </Box>
  );
}
