import { Box, Button, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import QuotesTable from './subComponents/ReactTable/QuotesTable';
import { openModal } from '../../redux/action/modalSlice';
import { useDispatch } from 'react-redux';
import ReduxDialog from '../common/ReduxDialog';
import AddQuoteForm from './subComponents/AddQuoteForm';
import BasicBreadcrumbs from './../common/BasicBreadcrumbs';

const Index = () => {
  const dispatch = useDispatch();

  return (
    <Box sx={{ flexGrow: 1 }} mt="-20px" mb={2}>
      <Grid container>
        <Grid item xs={12} lg={12} mb={2}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}>
            <BasicBreadcrumbs currentPage="quotes" />
            <Button sx={{ ml: 2, fontSize: '12px' }} size="small" variant="contained" onClick={() => dispatch(openModal('addQuote'))}>
              <AddIcon sx={{ fontSize: '14px', mr: '2px' }} />
              Add New
            </Button>
            <ReduxDialog value={'addQuote'} modalTitle={'Add a Quote'} showModalButton={false} modalSize={'xs'}>
              <AddQuoteForm editMode={false} />
            </ReduxDialog>
          </Box>
        </Grid>
        <Grid item xs={12} lg={12}>
          <QuotesTable />
        </Grid>
      </Grid>
    </Box>
  );
};
export default Index;
