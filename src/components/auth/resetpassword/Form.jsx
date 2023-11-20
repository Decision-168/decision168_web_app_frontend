import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Alert } from "@mui/material";
import CustomTextField from "../../common/CustomTextField";
import { authValidations } from "../authValidations";
import Navigation from "../subComponents/Navigation";
import ReCAPTCHA from "react-google-recaptcha";
import AuthButton from "../subComponents/AuthButton";
import { forgotPassword } from "../../../api/modules/authModule";

import { toast } from "react-toastify";
export default function Form() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [isCaptchaVerified, setCaptchaVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCaptchaChange = (response) => {
    if (response) {
      setCaptchaVerified(true);
    }
  };

  const onSubmit = async (formData) => {
    try {
      setLoading(true);
      const response = await forgotPassword(formData);
      toast.success(response.message);
    } catch (error) {
      console.error(error);
      toast.error(`${error.response?.data?.error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
      {/* <Box mb={2}>
        <Alert icon={false} severity="error" color="error">
          Enter your Email, and instructions will be sent to you!
        </Alert>
      </Box> */}

      <Box sx={{ height: "65px" }}>
        <CustomTextField
          name="email_address"
          placeholder="Email Address"
          register={register}
          errors={errors}
          validation={authValidations.email} // Pass the validation rules as a prop
        />
      </Box>

      <Box mb={1}>
        <ReCAPTCHA sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" onChange={handleCaptchaChange} />
      </Box>

      <AuthButton loading={loading} buttonText="Reset" disabled={!isCaptchaVerified} />

      {/* Navigation */}
      <Navigation question="Remember It?" linkLabel="Sign In here" path="/" />
    </Box>
  );
}
