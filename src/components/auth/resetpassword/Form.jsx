import React from "react";
import { useForm } from "react-hook-form";
import { Box, Button, Alert } from "@mui/material";
import CustomTextField from "../../common/CustomTextField";
import { authValidations } from "../authValidations";
import Navigation from "../subComponents/Navigation";

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
    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
      <Box mb={2}>
        <Alert icon={false} severity="error" color="error">
          Enter your Email, and instructions will be sent to you!
        </Alert>
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

      <Button type="submit" fullWidth variant="contained" sx={{ my: 2, borderRadius: "3px" }}>
        Reset
      </Button>

      {/* Navigation */}
      <Navigation question="Remember It?" linkLabel="Sign In here" path="/login" />
    </Box>
  );
}
