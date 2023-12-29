import {
  Box,
  Button,
  FormControlLabel,
  Checkbox,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CustomPasswordField from "../subComponents/CustomPasswordField";
import CustomLink from "../../common/CustomLink";
import { useForm } from "react-hook-form";
import { authValidations } from "../authValidations";
import CustomTextField from "../../common/CustomTextField";
import ReCAPTCHA from "react-google-recaptcha";
import {
  RecaptchaVerification,
  registerUser,
} from "../../../api/modules/authModule";
import { toast } from "react-toastify";
import AuthButton from "../subComponents/AuthButton";
export default function Form() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [isCaptchaVerified, setCaptchaVerified] = useState(false);
  const [recaptchaKey, setRecaptchaKey] = useState(1);
  const [recaptchaKeyError, setRecaptchaKeyError] = useState(null);
  const [agreeTermsPrivacy, setAgreeTermsPrivacy] = useState("no");
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

  const handleCheckboxChange = (event) => {
    setAgreeTermsPrivacy(event.target.checked ? "yes" : "no");
  };

  const onSubmit = async (data) => {
    const formData = { ...data, agree_terms_privacy: agreeTermsPrivacy };
    try {
      setLoading(true);
      const response = await registerUser(formData);
      toast.success(`${response?.message}`);
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
          name="full_name"
          placeholder="Full Name"
          register={register}
          errors={errors}
          validation={authValidations.fullName} // Pass the validation rules as a prop
        />
      </Box>

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
          showTooltip={true}
          name="password"
          placeholder="Password"
          register={register}
          errors={errors}
          validation={authValidations.password} // Pass the validation rules as a prop
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

      <FormControlLabel
        control={
          <Checkbox
            value={agreeTermsPrivacy === "yes"}
            onChange={handleCheckboxChange}
            size="small"
          />
        }
        label={
          <Typography component="p" variant="caption" textAlign="left">
            By signing up you agree to Decision 168's
            <CustomLink path={"https://www.decision168.com/terms-conditions/"}>
              Terms{" "}
            </CustomLink>
            &
            <CustomLink path={"https://www.decision168.com/privacy-policy/"}>
              Privacy Policy.
            </CustomLink>
          </Typography>
        }
      />

      <AuthButton
        loading={loading}
        buttonText="Register"
        disabled={!isCaptchaVerified}
      />
    </Box>
  );
}
