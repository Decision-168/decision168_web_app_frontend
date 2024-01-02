import { Box, Button, Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import { openModal } from '../../../../redux/action/modalSlice';
import AddIcon from '@mui/icons-material/Add';
import ReduxDialog from '../../../common/ReduxDialog';
import BasicBreadcrumbs from './../../../common/BasicBreadcrumbs';
import AgreementTable from './subComponents/ReactTable/AgreementTable';
import AddEditAgreementForm from './subComponents/AddEditAgreementForm';

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
            <BasicBreadcrumbs currentPage="agreement" />
            <Button sx={{ ml: 2, fontSize: '12px' }} size="small" variant="contained" onClick={() => dispatch(openModal('addAgreement'))}>
              <AddIcon sx={{ fontSize: '14px', mr: '2px' }} />
              Add Agreement
            </Button>
            <ReduxDialog value={'addAgreement'} modalTitle={'Add Agreement'} showModalButton={false} modalSize={'md'}>
              <AddEditAgreementForm />
            </ReduxDialog>
          </Box>
        </Grid>
        <Grid item xs={12} lg={12}>
          <AgreementTable />
        </Grid>
      </Grid>
    </Box>
  );
};
export default Index;
