import { Grid, Stack, Typography, IconButton, Box } from "@mui/material";
import React from "react";
import CustomAutocomplete from "./CustomAutocomplete";
import CustomLabelTextField from "./CustomLabelTextField";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { globalValidations } from "../../utils/GlobalValidation";
import { useForm } from "react-hook-form";
import { useTheme } from "@mui/material/styles";

const icons = [{ label: "Facebook" }, { label: "Instagram" }, { label: "LinkedIn" }, { label: "Pinterest" }];

export default function AddSocialMediaLinks() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const theme = useTheme();

  return (
    <Grid container>
      <Grid item xs={12} sm={12} px={2} py={1}>
        <Stack direction="row" justifyContent="start" alignItems="center" color={theme.palette.secondary.main}>
          <Typography>Add Social Media Links : </Typography>
          <IconButton>
            <AddCircleIcon />
          </IconButton>
        </Stack>
      </Grid>

      <Grid item xs={12} sm={5.5} px={2} py={1}>
        <CustomAutocomplete label="Select Icon" options={icons} />
      </Grid>

      <Grid item xs={12} sm={5.5} px={2} py={1}>
        <CustomLabelTextField
          label="Link"
          name="link"
          required={false}
          placeholder="Enter Link"
          register={register}
          errors={errors}
          validation={globalValidations.link} // Pass the validation rules as a prop
        />
      </Grid>

      <Grid item xs={12} sm={1} px={2} py={1}>
        <Box sx={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <IconButton>
            <RemoveCircleIcon />
          </IconButton>
        </Box>
      </Grid>
    </Grid>
  );
}
