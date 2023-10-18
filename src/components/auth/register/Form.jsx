import { Box, Button, FormControlLabel, Checkbox, Link, Stack, TextField } from "@mui/material";
import React from "react";
import PasswordField from "../subComponents/PasswordField";

export default function Form() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <TextField placeholder="Full Name" margin="normal" required fullWidth name="fullName" autoComplete="fullName" autoFocus />

      <TextField placeholder="Email Address" margin="normal" required fullWidth name="email" autoComplete="email" />

      <PasswordField />

      <Stack justifyContent="start" alignItems="start">
        <FormControlLabel
          sx={{
            "& .MuiTypography-root": {
              fontSize: 14, // Adjust the font size as per your preference
            },
          }}
          control={<Checkbox value="remember" />}
          label="By signing up you agree to Decision 168's"
        />

        <Link href="#" variant="body2">
          Terms & Privacy Policy.
        </Link>
      </Stack>

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, borderRadius: "3px" }}>
        Register
      </Button>
    </Box>
  );
}
