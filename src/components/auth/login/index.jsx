import React from "react";
import Box from "@mui/material/Box";
import Header from "../../auth/subComponents/Header";
import Form from "../login/Form";
import Brand from "../../auth/subComponents/Brand";
import SocialMedia from "../../auth/subComponents/SocialMedia";
import Navigation from "../../auth/subComponents/Navigation";
import Copyright from "../../auth/subComponents/Copyright";
import AuthLayout from "../../layouts/authLayout";

export default function Login() {
  return (
    <AuthLayout>
      {/* Decision-168 logo */}
      <Box mb={8}>
        <Brand />
      </Box>

      {/* Welcome and text */}

      <Header title=" Welcome Back!" text="Sign in to continue to Decision 168" />

      {/* Form */}
      <Form />

      {/* Social Media platforms */}
      <SocialMedia title="Sign in With" />

      {/* Navigation */}
      <Navigation question="Don't have an account?" linkLabel="Sign Up Now" path="/register" />

      {/* Copyright */}
      <Copyright />
    </AuthLayout>
  );
}
