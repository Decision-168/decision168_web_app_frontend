import React, { memo } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Grid, InputLabel } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const FilterSelectedOptions = ({
  label,
  labelColor,
  required,
  placeholder,
  items,
}) => {
  const theme = useTheme();
  return (
    <>
      <Grid item xs={12} lg={2} alignSelf={"center"}>
        <InputLabel sx={{ fontSize: "14px", color: labelColor }}>
          {label}
          {required && (
            <span style={{ color: theme.palette.error.main }}> *</span>
          )}
        </InputLabel>
      </Grid>
      <Grid item xs={12} md={7} lg={7}>
        <Autocomplete
          sx={{ height: "100%" }}
          multiple
          id="tags-outlined"
          options={items}
          getOptionLabel={(option) => option.title}
          defaultValue={[items[1]]}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField {...params} placeholder={placeholder} />
          )}
        />
      </Grid>
    </>
  );
};

export default memo(FilterSelectedOptions);
