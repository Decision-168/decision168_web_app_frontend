import { Box, Grid } from '@mui/material';
import BasicBreadcrumbs from '../common/BasicBreadcrumbs';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PricingTable from './subComponents/ReactTable/PricingTable';
import ReduxDialog from '../common/ReduxDialog';
import { useDispatch } from 'react-redux';
import { openModal } from '../../redux/action/modalSlice';
import AddEditPackageForm from './subComponents/AddEditPackageForm';

const Index = () => {
  const dispatch = useDispatch();
  return (
    <Box sx={{ flexGrow: 1 }} mt="-20px" mb={2}>
      <Grid container maxWidth="1220px">
        <Grid item xs={12} lg={12} mb={2}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              flexDirection: 'row',
            }}>
            <BasicBreadcrumbs currentPage="pricing" />
            <Button sx={{ fontSize: '12px', marginLeft: '20px' }} size="small" variant="contained" onClick={() => dispatch(openModal('addPackage'))}>
              <AddIcon sx={{ fontSize: '14px', mr: '2px' }} />
              Add Package
            </Button>
            <ReduxDialog value={'addPackage'} modalTitle={'Add Package'} showModalButton={false} modalSize={'sm'}>
              <AddEditPackageForm editMode={false} />
            </ReduxDialog>
          </Box>
        </Grid>
        <Grid item xs={12} lg={12}>
          <PricingTable />
        </Grid>
      </Grid>
    </Box>
  );
};
export default Index;
