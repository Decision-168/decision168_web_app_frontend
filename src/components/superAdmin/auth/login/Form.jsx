import { Box, FormControlLabel, Checkbox, Stack } from "@mui/material";
import React, { useState, useEffect } from "react";
import CustomPasswordField from "../subComponents/CustomPasswordField";
import CustomLink from "../../common/CustomLink";
import CustomTextField from "../../common/CustomTextField";
import { useForm } from "react-hook-form";
import { authValidations } from "../authValidations";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";
import { RecaptchaVerification } from "../../../../api/modules/authModule";
import { loginSuperadmin } from "../../../../api/super-admin-modules/authModule";
import AuthButton from "../subComponents/AuthButton";
import { toast } from "react-toastify";
import axiosInstance from "../../../../api/axios";
export default function Form() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [isCaptchaVerified, setCaptchaVerified] = useState(false);
  const [recaptchaKey, setRecaptchaKey] = useState(1);
  const [recaptchaKeyError, setRecaptchaKeyError] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  // Function to prefill form fields with remembered user data
  const prefillForm = () => {
    const rememberedUser = localStorage.getItem("rememberedUser");
    if (rememberedUser) {
      const { email_address, password } = JSON.parse(rememberedUser);
      setValue("email_address", email_address);
      setValue("password", password);
      setRememberMe(true);
    }
  };

  useEffect(() => {
    prefillForm();
  }, []);

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
      localStorage.setItem("userType", "Admin");
      setLoading(true);
      const response = await loginSuperadmin(formData);
      localStorage.setItem("token", response.token);

      axiosInstance.defaults.headers.Authorization = `Bearer ${response.token}`;
      if (rememberMe) {
        localStorage.setItem("rememberedUser", JSON.stringify(formData));
      } else {
        // If "Remember Me" is not checked, remove the remembered user data
        localStorage.removeItem("rememberedUser");
      }

      navigate("/super-admin/dashboard");
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
        <CustomTextField
          name="username"
          placeholder="Username"
          register={register}
          errors={errors}
          validation={authValidations.username} // Pass the validation rules as a prop
        />
      </Box>

      <Box sx={{ height: "65px" }}>
        <CustomPasswordField
          showTooltip={false}
          name="password"
          placeholder="Password"
          register={register}
          errors={errors}
          validation={authValidations.password} // Pass the validation rules as a prop
        />
      </Box>

      <Box
        mb={1}
        sx={{
          maxWidth: "100%",
          overflow: "hidden",
          bgcolor: "#FFF",
          borderRadius: "3px",
        }}
      >
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

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <FormControlLabel
          control={
            <Checkbox
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              size="small"
            />
          }
          label="Remember me"
        />
        <CustomLink path="/reset-password">Forgot password?</CustomLink>
      </Stack>

      <AuthButton
        loading={loading}
        buttonText="Log In"
        // disabled={!isCaptchaVerified}
      />
    </Box>
  );
}
