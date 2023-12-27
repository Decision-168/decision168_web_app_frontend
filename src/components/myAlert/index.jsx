import React from 'react'
import BasicBreadcrumbs from '../common/BasicBreadcrumbs';
import { Box, Grid } from '@mui/material';
import MyAlertDataTable from './subComponent/MyAlertDataTable';
import MyAlertTable from './subComponent/MyAlertTable';

const MyAlert = () => {
  return (
    <Box sx={{ flexGrow: 1 }} mb={2}>
      <BasicBreadcrumbs currentPage="ALERTS" showBackButton={true} />
      <Grid container spacing={2}>
        <Grid item xs={12} lg={12}>
        {/* <MyAlertDataTable/> */}
        <MyAlertTable/>
        </Grid>
      </Grid>
    </Box>
  );
}

export default MyAlert
