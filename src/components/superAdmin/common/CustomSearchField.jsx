/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import { memo, useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Clear, SearchRounded } from '@mui/icons-material';

const CustomSearchField = ({}) => {
  const [value, setValue] = useState('');

  return (
    <TextField
      placeholder={'Search...'}
      fullWidth
      type={'text'}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      InputProps={{
        endAdornment: (
          <>
            <InputAdornment position="end">
              <IconButton onClick={() => setValue('')} edge="end">
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
