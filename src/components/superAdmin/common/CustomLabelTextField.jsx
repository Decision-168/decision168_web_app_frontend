/* eslint-disable react/prop-types */
import { TextField, InputLabel, Box, Tooltip, IconButton, tooltipClasses } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { useState } from "react";

export default function CustomLabelTextField({
  name,
  label,
  labelDesc,
  labelColor,
  infoIcon,
  placeholder,
  register,
  errors,
  validation,
  required,
  value,
}) {
  const theme = useTheme();
  const [inputValue, setInputValue] = useState(value);

  const inputProps = register(name, validation);

  //to style placeholder
  const placeholderStyles = {
    fontSize: "14px",
    color: theme.palette.secondary.dark,
  };

  const LightTooltip = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} />)(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: "rgba(0, 0, 0, 0.87)",
      boxShadow: theme.shadows[1],
      fontSize: 12,
      maxWidth: "120px",
      border: "1px solid",
    },
  }));

  const titleText = `
  30 - One Month 
  90 - 3 Months 
  180 - 6 Months 
  270 - 9 Months 
  365 - One Year
  `;

  return (
    <Box sx={{ textAlign: "left" }}>
      <InputLabel sx={{ fontSize: "14px", color: labelColor, whiteSpace: "normal" }}>
        {label}
        {required && <span style={{ color: theme.palette.error.main }}> * {labelDesc && <span>({labelDesc})</span>}</span>}
        {infoIcon && (
          <span style={{ marginLeft: "10px", cursor: "pointer" }}>
            <LightTooltip title={titleText} placement="right-start">
              <IconButton>{infoIcon}</IconButton>
            </LightTooltip>
          </span>
        )}
      </InputLabel>
      <TextField
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        margin="dense"
        required
        fullWidth
        name={name}
        sx={{ minWidth: 265 }}
        inputProps={{
          ...inputProps,
          sx: {
            "&::placeholder": placeholderStyles,
            fontSize: "14px",
          },
        }}
        error={!!errors[name]}
        helperText={errors[name]?.message}
      />
    </Box>
  );
}
