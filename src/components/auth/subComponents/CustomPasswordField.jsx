import React from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useTheme } from "@mui/material/styles";

export default function CustomPasswordField({ name, placeholder, register, errors, validation }) {
  const [showPassword, setShowPassword] = React.useState(false);
  const theme = useTheme();

  //to style placeholder
  const inputProps = register(name, validation);
  // Define custom CSS styles for the placeholder
  const placeholderStyles = {
    fontSize: "14px",
    color: theme.palette.secondary.dark,
  };

  return (
    <TextField
      placeholder={placeholder}
      margin="normal"
      required
      fullWidth
      name={name}
      type={showPassword ? "text" : "password"}
      inputProps={{
        ...register(name, validation),
        sx: {
          "&::placeholder": placeholderStyles,
        },
      }}
      error={!!errors[name]}
      helperText={errors[name]?.message}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}
