import { FilterAlt } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Popover,
  Radio,
  RadioGroup,
  useTheme,
} from "@mui/material";
import React, { memo } from "react";

const CustomFilter = ({ handleChange, value, data }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
      }}
    >
      <Button
        aria-describedby={id}
        variant="contained"
        startIcon={<FilterAlt />}
        size="small"
        onClick={handleClick}
      >
        Open Popover
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <FormControl sx={{ p: 1 }}>
          <RadioGroup
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={value}
            onChange={handleChange}
          >
            {data.map((item, index) => {
              return (
                <FormControlLabel
                  key={index}
                  value={item.value}
                  control={<Radio size="small" />}
                  label={item.label}
                  sx={{ color: theme.palette.secondary.main, fontSize: 13 }}
                />
              );
            })}
          </RadioGroup>
        </FormControl>
      </Popover>
    </Box>
  );
};

export default memo(CustomFilter);
