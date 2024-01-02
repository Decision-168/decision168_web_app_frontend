/* eslint-disable react/prop-types */
import { Box, Typography } from '@mui/material';

export default function Client({ clientName }) {
  return (
    <Box>
      <Typography component="h6" variant="h6">
        {clientName}
      </Typography>
      {/* <Typography component="p" variant="caption" color={theme.palette.secondary.main} display="block" gutterBottom>
        {clientPosition}
      </Typography> */}
    </Box>
  );
}
