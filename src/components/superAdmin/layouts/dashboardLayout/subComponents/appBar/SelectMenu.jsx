import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AddIcon from '@mui/icons-material/Add';
import { Avatar, Stack, Typography } from '@mui/material';
import { stringAvatar } from '../../../../../helpers/stringAvatar';

export default function SelectSmall() {
  const [portfolio, setPortfolio] = React.useState('portfolio Main');

  const handleChange = (event) => {
    setPortfolio(event.target.value);
  };

  const items = [
    { value: 'portfolio Main', label: 'Portfolio', text: 'Porfolio', imageUrl: '' },
    { value: 'Arshad Khan', label: 'Arshad Khan', text: 'Arshad Khan Kohinoor', imageUrl: '' },
    { value: 'Alim Mohd', label: 'Alim Mohd', text: 'Alim Mohd', imageUrl: '' },
  ];

  return (
    <FormControl sx={{ m: 1, minWidth: '200px' }} size="small">
      <Select id="demo-select-small" value={portfolio} onChange={handleChange}>
        {items.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            <Stack direction="row" justifyContent="start" alignItems="center" spacing={1}>
              <Avatar alt={item.label} src={item.imageUrl}>
                {item.imageUrl ? null : stringAvatar(item.text)}
              </Avatar>
              <Typography component="h6" variant="subtitle2" sx={{ textTransform: 'capitalize' }}>
                {item.label}
              </Typography>
            </Stack>
          </MenuItem>
        ))}
        <MenuItem>
          <AddIcon />
          Create New Portfolio
        </MenuItem>
      </Select>
    </FormControl>
  );
}
