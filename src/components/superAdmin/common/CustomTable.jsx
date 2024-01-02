import { Container } from '@mui/material';
import { MaterialReactTable } from 'material-react-table';
import { memo } from 'react';

const CustomTable = ({ table }) => {
  return (
    <Container
      maxWidth="xl"
      fixed
      sx={{
        '&.MuiContainer-root': {
          paddingLeft: '0px',
          paddingRight: '0px',
        },
      }}>
      <MaterialReactTable table={table} />
    </Container>
  );
};

export default memo(CustomTable);
