import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  useTheme,
} from "@mui/material";
import React, { memo } from "react";

const RadioSection = ({ handleChange, value }) => {
  const theme = useTheme();

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
            value="goal"
            control={<Radio />}
            label="Goals"
            sx={{ color: theme.palette.secondary.main }}
          />
          <FormControlLabel
            value="kpi"
            control={<Radio />}
            label="KPIs"
            sx={{ color: theme.palette.secondary.main }}
          />
          <FormControlLabel
            value="project"
            control={<Radio />}
            label="Projects"
            sx={{ color: theme.palette.secondary.main }}
          />
          <FormControlLabel
            value="task"
            control={<Radio />}
            label="Tasks & Subtasks"
            sx={{ color: theme.palette.secondary.main }}
          />
          <FormControlLabel
            value="file"
            control={<Radio />}
            label="Files"
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
};

export default memo(RadioSection);