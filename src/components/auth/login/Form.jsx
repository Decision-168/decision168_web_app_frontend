import { Box, Button, FormControlLabel, Checkbox, Stack } from "@mui/material";
import React, { useState } from "react";
import CustomPasswordField from "../subComponents/CustomPasswordField";
import CustomLink from "../../common/CustomLink";
import CustomTextField from "../subComponents/CustomTextField";
import { useForm } from "react-hook-form";
import { authValidations } from "../authValidations";
import ReCAPTCHA from "react-google-recaptcha";

export default function Form() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [isCaptchaVerified, setCaptchaVerified] = useState(false);

  const handleCaptchaChange = (response) => {
    if (response) {
      setCaptchaVerified(true);
    }
  };
  const onSubmit = (data) => {
    if (isCaptchaVerified) {
      alert(JSON.stringify(data));
    } else {
      alert("Please verify that you are not a robot.");
    }
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={{ mt: 1 }}
    >
      <CustomTextField
        name="email"
        placeholder="Email Address"
        register={register}
        errors={errors}
        validation={authValidations.email} // Pass the validation rules as a prop
      />

      <CustomPasswordField
        name="password"
        placeholder="Password"
        register={register}
        errors={errors}
        validation={authValidations.password} // Pass the validation rules as a prop
      />
      {/* <ReCAPTCHA
        sitekey="6LeGztMcAAAAAP6yPwVYpzxL2qPnmdK2nVgFb1Dp"
        onChange={handleCaptchaChange}
      /> */}

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <FormControlLabel
          control={<Checkbox value="remember" size="small" />}
          label="Remember me"
        />
        <CustomLink path="/reset-password">Forgot password?</CustomLink>
      </Stack>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ my: 2, borderRadius: "3px" }}
      >
        Log In
      </Button>
    </Box>
  );
}
