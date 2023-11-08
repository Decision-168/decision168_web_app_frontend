import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  useTheme,
} from "@mui/material";
import React, { memo } from "react";

const RadioSection = ({ handleChange, value,data }) => {
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
          {data.map((item,index)=>{
            return (
              <FormControlLabel
                key={index}
                value={item.value}
                control={<Radio />}
                label={item.label}
                sx={{ color: theme.palette.secondary.main }}
              />
            );
          })}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default memo(RadioSection);
