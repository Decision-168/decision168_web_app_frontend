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
import { Register } from "../../../api/modules/authModule";

export default function Form() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [isCaptchaVerified, setCaptchaVerified] = useState(false);
  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  const handleCaptchaChange = (response) => {
    if (response) {
      setCaptchaVerified(true);
    }
  };

  const handleClick = async () => {
    const FormData = {
      full_name: "Mohammad Alim",
      email_address: "mohdalim619@gmail.com",
      password: "Alim@123",
      agree_terms_privacy: "yes",
    };
    try {
      const result = await Register(FormData);
    } catch (error) {
      console.error("Error fetching data:", error);
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
          name="fullName"
          placeholder="Full Name"
          register={register}
          errors={errors}
          validation={authValidations.fullName} // Pass the validation rules as a prop
        />
      </Box>

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
      <Box mb={1}>
        <ReCAPTCHA
          sitekey="6LeGztMcAAAAAP6yPwVYpzxL2qPnmdK2nVgFb1Dp"
          onChange={handleCaptchaChange}
        />
      </Box>

      <FormControlLabel
        control={<Checkbox value="remember" size="small" />}
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

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ my: 2, borderRadius: "3px" }}
        onClick={handleClick}
      >
        Register
      </Button>
    </Box>
  );
}
