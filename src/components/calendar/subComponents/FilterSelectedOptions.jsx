import React, { memo } from "react";
import { Grid, InputLabel, TextField, Autocomplete } from "@mui/material";
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
      <Grid item xs={12}>
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
