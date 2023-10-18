import { FormControl, IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function PasswordField() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <FormControl sx={{ width: "100%", marginBottom: "10px" }} variant="outlined">
      <OutlinedInput
        required
        fullWidth
        name="password"
        autoComplete="password"
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end" sx={{ m: 2 }}>
            <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </InputAdornment>
        }
        placeholder="Password"
      />
    </FormControl>
  );
}
