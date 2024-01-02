import { Box, Grid, Button } from '@mui/material';
import BasicBreadcrumbs from '../common/BasicBreadcrumbs';
import AdSettingTable from './subComponents/ReactTable/AdSettingTable';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';
import { openModal } from '../../redux/action/modalSlice';
import ReduxDialog from '../common/ReduxDialog';
import UploadAdForm from './subComponents/ReactTable/UploadAdForm';

const Index = () => {
  const dispatch = useDispatch();

  return (
    <Box sx={{ flexGrow: 1 }} mt="-20px" mb={2}>
      <Grid container>
        <Grid item xs={12} lg={12} mb={1}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}>
            <BasicBreadcrumbs currentPage="ad's" />
            <Button sx={{ ml: 2, fontSize: '12px' }} size="small" variant="contained" onClick={() => dispatch(openModal('addAd'))}>
              <AddIcon sx={{ fontSize: '14px', mr: '2px' }} />
              Add New
            </Button>
            <ReduxDialog value={'addAd'} modalTitle={'Upload an Ad'} showModalButton={false} modalSize={'xs'}>
              <UploadAdForm />
            </ReduxDialog>
          </Box>
        </Grid>
        <Grid item xs={12} lg={12}>
          <AdSettingTable />
        </Grid>
      </Grid>
    </Box>
  );
};
export default Index;
