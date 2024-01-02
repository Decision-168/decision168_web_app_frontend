/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { FilterAlt } from '@mui/icons-material';
import { Box, Collapse, FormControl, FormControlLabel, IconButton, Popover, Radio, RadioGroup, Tooltip, useTheme } from '@mui/material';
import React, { memo } from 'react';

const CustomFilter = ({ handleChange, value, filterOption }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
      }}>
      <Tooltip arrow title="filter" placement="left">
        <IconButton aria-label="filter" onClick={handleClick}>
          <FilterAlt />
        </IconButton>
      </Tooltip>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}>
        <Collapse in={anchorEl} timeout={10000}>
          <FormControl sx={{ p: 1 }}>
            <RadioGroup aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" value={value} onChange={handleChange}>
              {filterOption.map((item, index) => {
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
        </Collapse>
      </Popover>
    </Box>
  );
};

export default memo(CustomFilter);
