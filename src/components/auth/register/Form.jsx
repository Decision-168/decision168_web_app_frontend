import {
  Box,
  Button,
  FormControlLabel,
  Checkbox,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import CustomPasswordField from "../subComponents/CustomPasswordField";
import CustomLink from "../../common/CustomLink";
import { useForm } from "react-hook-form";
import { authValidations } from "../authValidations";
import CustomTextField from "../subComponents/CustomTextField";

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
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={{ mt: 1 }}
    >
      <CustomTextField
        name="fullName"
        placeholder="Full Name"
        register={register}
        errors={errors}
        validation={authValidations.fullName} // Pass the validation rules as a prop
      />

      <CustomTextField
        name="email"
        placeholder="Email Address"
        register={register}
        errors={errors}
        validation={authValidations.email} // Pass the validation rules as a prop
      />

      <CustomPasswordField
        showTooltip={true}
        name="password"
        placeholder="Password"
        register={register}
        errors={errors}
        validation={authValidations.password} // Pass the validation rules as a prop
      />
      <FormControlLabel
        control={<Checkbox value="remember" size="small" />}
        label={
          <Typography component="p" variant="caption">
            By signing up you agree to Decision 168's
            <CustomLink path="/">Terms </CustomLink>&
            <CustomLink path="/">Privacy Policy.</CustomLink>
          </Typography>
        }
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ my: 2, borderRadius: "3px" }}
      >
        Register
      </Button>
    </Box>
  );
}
