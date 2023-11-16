import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import CustomPasswordField from "../subComponents/CustomPasswordField";
import CustomTextField from "../subComponents/CustomTextField";
import { useForm } from "react-hook-form";
import { authValidations } from "../authValidations";
import Navigation from "../subComponents/Navigation";
import ReCAPTCHA from "react-google-recaptcha";

export default function Form() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };
  const [isCaptchaVerified, setCaptchaVerified] = useState(false);

  const handleCaptchaChange = (response) => {
    if (response) {
      setCaptchaVerified(true);
    }
  };
  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={{ mt: 1 }}
    >
      <Box sx={{ height: "65px" }}>
        <CustomTextField
          name="email"
          placeholder="Email Address"
          register={register}
          errors={errors}
          validation={authValidations.email} // Pass the validation rules as a prop
        />
      </Box>

      <Box sx={{ height: "65px" }}>
        <CustomPasswordField
          showTooltip={true}
          name="password"
          placeholder="Password"
          register={register}
          errors={errors}
          validation={authValidations.password} // Pass the validation rules as a prop
        />
      </Box>
      <Box sx={{ height: "65px" }}>
        <CustomPasswordField
          showTooltip={false}
          name="confirmPassword"
          placeholder="Confirm Password"
          register={register}
          errors={errors}
          validation={authValidations.confirmPassword} // Pass the validation rules as a prop
        />
      </Box>
      <Box
        mb={1}
      >
        <ReCAPTCHA
          sitekey="6LeGztMcAAAAAP6yPwVYpzxL2qPnmdK2nVgFb1Dp"
          onChange={handleCaptchaChange}
        />
      </Box>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ my: 2, borderRadius: "3px" }}
      >
        Change Password
      </Button>

      <Navigation question="Remember It?" linkLabel="Sign In Here" path="/" />
    </Box>
  );
}
