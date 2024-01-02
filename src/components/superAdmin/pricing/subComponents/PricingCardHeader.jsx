import { memo } from 'react';
import { Stack, Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const PricingCardHeader = ({ name, icon, description }) => {
  const theme = useTheme();
  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography component="h6" sx={{ fontSize: '20px', fontWeight: 900, textAlign: 'left', opacity: 0.8 }}>
            {name}
          </Typography>
        </Box>
        <Box>{icon}</Box>
      </Stack>
      <Typography component="p" sx={{ fontSize: '13px', textAlign: 'left', marginTop: '7px', opacity: 0.7, minHeight: '80px' }}>
        {description}
      </Typography>
    </>
  );
};

export default memo(PricingCardHeader);
