import React, { memo, useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Clear, SearchRounded } from "@mui/icons-material";
const CustomSearchField = ({}) => {
  const [show, setShow] = useState(false);
  const theme = useTheme();
  const [value, setValue] = useState('')

  // Define custom CSS styles for the placeholder
  const placeholderStyles = {
    fontSize: "14px",
    color: theme.palette.secondary.dark,
  };

  return (
    <TextField
      placeholder={"Search..."}
      fullWidth
      type={"text"}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      InputProps={{
        endAdornment: (
          <>
            <InputAdornment position="end">
              <IconButton onClick={() => setValue("")} edge="end">
                {value ? <Clear /> : <SearchRounded />}
              </IconButton>
            </InputAdornment>
          </>
        ),
      }}
    />
  );
};

export default memo(CustomSearchField);
