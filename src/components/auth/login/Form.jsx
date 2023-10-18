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
      <TextField placeholder="Email Address" margin="normal" required fullWidth name="email" autoComplete="email" autoFocus />

      <PasswordField />

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <FormControlLabel control={<Checkbox value="remember" />} label="Remember me" />
        <Link href="#" variant="body2">
          Forgot password?
        </Link>
      </Stack>

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, borderRadius: "3px" }}>
        Login
      </Button>
    </Box>
  );
}
