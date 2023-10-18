import React from "react";
import Box from "@mui/material/Box";
import Header from "../subComponents/Header";
import Form from "../register/Form";
import Brand from "../subComponents/Brand";
import SocialMedia from "../subComponents/SocialMedia";
import Navigation from "../subComponents/Navigation";
import Copyright from "../subComponents/Copyright";
import AuthLayout from "../../layouts/authLayout";

export default function Register() {
  return (
    <AuthLayout>
      {/* Decision-168 logo */}
      <Box mb={7}>
        <Brand />
      </Box>

      {/* Welcome and text */}
      <Header title="Register account" text="Get your free Decision168 account now." />

      {/* Form */}
      <Form />

      {/* Social Media platforms */}
      <SocialMedia title="Sign up using" />

      {/* Navigation */}
      <Navigation question="Already have an accoun" linkLabel="Login" path="/login" />

      {/* Copyright */}
      <Copyright />
    </AuthLayout>
  );
}
