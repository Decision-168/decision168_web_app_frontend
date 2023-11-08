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
            value="goals"
            control={<Radio />}
            label="Goals"
            sx={{ color: theme.palette.secondary.main }}
          />
          <FormControlLabel
            value="kpis"
            control={<Radio />}
            label="KPIs"
            sx={{ color: theme.palette.secondary.main }}
          />
          <FormControlLabel
            value="projects"
            control={<Radio />}
            label="Projects"
            sx={{ color: theme.palette.secondary.main }}
          />
          <FormControlLabel
            value="tasks_subtasks"
            control={<Radio />}
            label="Tasks & Subtasks"
            sx={{ color: theme.palette.secondary.main }}
          />
          <FormControlLabel
            value="content"
            control={<Radio />}
            label="Content"
            sx={{ color: theme.palette.secondary.main }}
          />
        </RadioGroup>
      </FormControl>
    </Box>
  );
}

export default memo(RadioSection)