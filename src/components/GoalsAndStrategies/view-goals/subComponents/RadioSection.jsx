import { Box, FormControl, FormControlLabel, Radio, RadioGroup, useTheme } from '@mui/material';
import React, { memo, useState } from 'react'

const RadioSection = ({}) => {
      const theme = useTheme();
      const [value, setValue] = useState("all");

      const handleChange = (event) => {
        setValue(event.target.value);
      };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
      }}
    >
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel
            value="all"
            control={<Radio />}
            label="All"
            sx={{ color: theme.palette.secondary.main }}
          />
          <FormControlLabel
            value="created-goals"
            control={<Radio />}
            label=" Created Goals
"
            sx={{ color: theme.palette.secondary.main }}
          />
          <FormControlLabel
            value="accepted-goals"
            control={<Radio />}
            label="Accepted Goals"
            sx={{ color: theme.palette.secondary.main }}
          />
          <FormControlLabel
            value="pending-requests"
            control={<Radio />}
            label="Pending Requests"
            sx={{ color: theme.palette.secondary.main }}
          />
          <FormControlLabel
            value="more-info-requests"
            control={<Radio />}
            label="More Info Requests"
            sx={{ color: theme.palette.secondary.main }}
          />
        </RadioGroup>
      </FormControl>
    </Box>
  );
}

export default memo(RadioSection)