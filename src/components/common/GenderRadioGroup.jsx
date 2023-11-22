import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useTheme } from "@mui/material/styles";

export default function GenderRadioGroup({ selectedValue, onChange }) {
  const theme = useTheme();
  return (
    <FormControl sx={{ textAlign: "left", height: "100%" }}>
      <FormLabel id="gender">Gender</FormLabel>
      <RadioGroup row aria-labelledby="gender" name="gender" value={selectedValue} onChange={onChange}>
        <FormControlLabel value="male" control={<Radio size="small" />} label="Male" sx={{ color: theme.palette.secondary.main }} />
        <FormControlLabel value="female" control={<Radio size="small" />} label="Female" sx={{ color: theme.palette.secondary.main }} />
        <FormControlLabel value="other" control={<Radio size="small" />} label="Other" sx={{ color: theme.palette.secondary.main }} />
        <FormControlLabel value="prefer not to say" control={<Radio size="small" />} label="Prefer not to say" sx={{ color: theme.palette.secondary.main }} />
      </RadioGroup>
    </FormControl>
  );
}
