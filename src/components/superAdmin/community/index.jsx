import { Box, Grid } from '@mui/material';
import DecisionMakersTable from './subComponents/ReactTable/DecisionMakersTable';
import BasicBreadcrumbs from './../common/BasicBreadcrumbs';

const Index = () => {
  return (
    <Box sx={{ flexGrow: 1 }} mt="-20px" mb={2}>
      <Grid container>
        <Grid item xs={12} lg={12} mb={1}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}>
            <BasicBreadcrumbs currentPage="decision makers" />
          </Box>
        </Grid>
        <Grid item xs={12} lg={12}>
          <DecisionMakersTable />
        </Grid>
      </Grid>
    </Box>
  );
};
export default Index;
