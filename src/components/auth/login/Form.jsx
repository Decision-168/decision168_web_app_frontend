import { Box, FormControlLabel, Checkbox, Stack } from "@mui/material";
import React, { useState, useEffect } from "react";
import CustomPasswordField from "../subComponents/CustomPasswordField";
import CustomLink from "../../common/CustomLink";
import CustomTextField from "../../common/CustomTextField";
import { useForm } from "react-hook-form";
import { authValidations } from "../authValidations";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../api/modules/authModule";
import AuthButton from "../subComponents/AuthButton";
import { toast } from "react-toastify";

export default function Form() {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [isCaptchaVerified, setCaptchaVerified] = useState(false);
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

  const handleCaptchaChange = (response) => {
    if (response) {
      setCaptchaVerified(true);
    }
  };

  const onSubmit = async (formData) => {
    try {
      setLoading(true);
      const response = await loginUser(formData);
      localStorage.setItem("token", response.token);

      if (rememberMe) {
        localStorage.setItem("rememberedUser", JSON.stringify(formData));
      } else {
        // If "Remember Me" is not checked, remove the remembered user data
        localStorage.removeItem("rememberedUser");
      }

      navigate("/dashboard");
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

      <Box mb={1}>
        <ReCAPTCHA
          sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
          onChange={handleCaptchaChange}
        />
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
        disabled={!isCaptchaVerified}
      />
    </Box>
  );
}
