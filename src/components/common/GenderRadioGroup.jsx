import React, { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useTheme } from "@mui/material/styles";
import { TextField, Grid } from "@mui/material";

export default function GenderRadioGroup({ formValues, setFormValues }) {
  const theme = useTheme();
  const [gender, setGender] = useState("");
  const [otherGender, setOtherGender] = useState("");

  useEffect(() => {
    setGender(formValues?.gender);
    setOtherGender(formValues?.gender_other);
  }, [formValues?.gender, formValues?.gender_other]);

  const handleGenderChange = (event) => {
    setGender(event.target.value);
    setOtherGender(""); // Reset otherGender field when the gender changes
    setFormValues({
      ...formValues,
      gender: event.target.value,
      gender_other: "", // Reset gender_other when the gender changes
    });
  };

  const handleOtherGenderChange = (event) => {
    setOtherGender(event.target.value);
    setFormValues({
      ...formValues,
      gender_other: event.target.value,
    });
  };

  return (
    <FormControl
      fullWidth
      sx={{
        textAlign: "left",
        height: "100%",
      }}>
      <FormLabel id="gender">Gender</FormLabel>
      <Grid container>
        <Grid xs={12} md={6}>
          <RadioGroup
            row
            aria-labelledby="gender"
            name="gender"
            value={gender}
            onChange={handleGenderChange}>
            <FormControlLabel
              value="male"
              control={<Radio size="small" />}
              label="Male"
              sx={{ color: theme.palette.secondary.main }}
            />
            <FormControlLabel
              value="female"
              control={<Radio size="small" />}
              label="Female"
              sx={{ color: theme.palette.secondary.main }}
            />
            <FormControlLabel
              value="prefer not to say"
              control={<Radio size="small" />}
              label="Prefer not to say"
              sx={{ color: theme.palette.secondary.main }}
            />
            <FormControlLabel
              value="other"
              control={<Radio size="small" />}
              label="Other"
              sx={{ color: theme.palette.secondary.main }}
            />
          </RadioGroup>
        </Grid>
        <Grid xs={12} md={6}>
          {gender === "other" && (
            <TextField
              id="other-gender"
              variant="outlined"
              fullWidth
              placeholder="Enter other gender"
              value={otherGender}
              onChange={handleOtherGenderChange}
            />
          )}
        </Grid>
      </Grid>
    </FormControl>
  );
}
