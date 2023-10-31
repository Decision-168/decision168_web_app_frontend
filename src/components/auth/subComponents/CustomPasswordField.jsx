import React, { useState } from "react";
import { TextField, InputAdornment, IconButton, Tooltip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PriorityHighRoundedIcon from "@mui/icons-material/PriorityHighRounded";
import { useTheme } from "@mui/material/styles";
import { useLocation } from "react-router-dom";

export default function CustomPasswordField({ name, placeholder, register, errors, validation, showTooltip }) {
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();
  const location = useLocation();

  // Define custom CSS styles for the placeholder
  const placeholderStyles = {
    fontSize: "14px",
    color: theme.palette.secondary.dark,
  };

  return (
    <TextField
      placeholder={placeholder}
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
          <>
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </InputAdornment>

            {showTooltip ? (
              <InputAdornment position="end">
                <Tooltip title="Password must be at least 5 characters with at least one uppercase letter, one lowercase letter, one number, and can contain special characters." arrow placement="bottom-start">
                  <IconButton edge="end">
                    <PriorityHighRoundedIcon />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ) : null}
          </>
        ),
      }}
    />
  );
}
