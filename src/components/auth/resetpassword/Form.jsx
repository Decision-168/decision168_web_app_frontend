import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Box } from "@mui/material";
import CustomTextField from "../../common/CustomTextField";
import { authValidations } from "../authValidations";
import Navigation from "../subComponents/Navigation";
import ReCAPTCHA from "react-google-recaptcha";
import AuthButton from "../subComponents/AuthButton";
import {
  RecaptchaVerification,
  forgotPassword,
} from "../../../api/modules/authModule";

import { toast } from "react-toastify";
export default function Form() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [isCaptchaVerified, setCaptchaVerified] = useState(false);
  const [recaptchaKey, setRecaptchaKey] = useState(1);
  const [recaptchaKeyError, setRecaptchaKeyError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCaptchaChange = async (token) => {
    if (token) {
      try {
        const passData = {
          recaptchaToken: token,
        };
        const response = await RecaptchaVerification(passData);
        if (response.success === true) {
          setCaptchaVerified(true);
          setRecaptchaKeyError(null);
        } else {
          setCaptchaVerified(false);
          setRecaptchaKey((prevKey) => prevKey + 1);
          setRecaptchaKeyError(
            "ReCAPTCHA verification failed. Please try again."
          );
        }
      } catch (error) {
        setCaptchaVerified(false);
        setRecaptchaKey((prevKey) => prevKey + 1);
        setRecaptchaKeyError(
          "ReCAPTCHA verification failed. Please try again."
        );
      }
    }
  };

  const onSubmit = async (formData) => {
    try {
      setLoading(true);
      const response = await forgotPassword(formData);
      toast.success(response.message);
    } catch (error) {
      toast.error(`${error.response?.data?.error}`);
    } finally {
      setLoading(false);
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
          name="email_address"
          placeholder="Email Address"
          register={register}
          errors={errors}
          validation={authValidations.email} // Pass the validation rules as a prop
        />
      </Box>

      <Box mb={1}>
        <ReCAPTCHA
          key={recaptchaKey}
          sitekey="6Lcljz4pAAAAAHq2EuMksbFq3ZM7AceT5527GkFT"
          onChange={handleCaptchaChange}
        />
        {recaptchaKeyError && (
          <div style={{ color: "red", marginTop: "10px", fontSize: "12px" }}>
            <span>{recaptchaKeyError}</span>
          </div>
        )}
      </Box>

      <AuthButton
        loading={loading}
        buttonText="Reset"
        disabled={!isCaptchaVerified}
      />

      <Navigation question="Remember It?" linkLabel="Sign In here" path="/" />
    </Box>
  );
}
