import { Box } from "@mui/material";
import React, { useState } from "react";
import CustomPasswordField from "../subComponents/CustomPasswordField";
import { useForm } from "react-hook-form";
import { authValidations } from "../authValidations";
import Navigation from "../subComponents/Navigation";
import ReCAPTCHA from "react-google-recaptcha";
import {
  RecaptchaVerification,
  changePassword,
} from "../../../api/modules/authModule";
import AuthButton from "../subComponents/AuthButton";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

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
  const navigate = useNavigate();
  const { id } = useParams();

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
      const password = formData.password;
      setLoading(true);
      const response = await changePassword(password, id);
      navigate("/");
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
      // sx={{ mt: 1 }}
    >
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

      <Box mb={1} sx={{maxWidth:"100%", overflow:"hidden", bgcolor:"#FFF", borderRadius:"3px"}}>
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
        buttonText="Change Password"
        disabled={!isCaptchaVerified}
      />

      <Navigation question="Remember It?" linkLabel="Sign In Here" path="/" />
    </Box>
  );
}
