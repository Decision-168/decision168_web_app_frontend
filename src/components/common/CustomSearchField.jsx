import React, { memo, useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Clear, SearchRounded } from "@mui/icons-material";
const CustomSearchField = ({ query, setQuery }) => {
  const handleSearch = ({ currentTarget = [] }) => {
    setQuery(currentTarget.value);
  };

  return (
    <TextField
      placeholder={"Search..."}
      fullWidth
      type={"text"}
      value={query}
      onChange={handleSearch}
      InputProps={{
        endAdornment: (
          <>
            <InputAdornment position="end">
              <IconButton onClick={() => setQuery("")} edge="end">
                {query ? <Clear /> : <SearchRounded />}
              </IconButton>
            </InputAdornment>
          </>
        ),
      }}
    />
  );
};

export default memo(CustomSearchField);
