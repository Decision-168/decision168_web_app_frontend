import { Box, Typography, Button } from '@mui/material';
import chatImage from '../../../assets/images/chat.png';
import { openModal } from '../../../redux/action/modalSlice';
import ReduxDialog from '../../common/ReduxDialog';
import { useDispatch } from 'react-redux';
import ContactSaleForm from './ContactSaleForm';

export default function LetUsTalk() {
  const dispatch = useDispatch();

  return (
    <Box sx={{ height: '150px', my: 2, py: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography component="h6" sx={{ fontSize: '15px', fontWeight: 700, opacity: 0.9 }}>
        Let&apos;s Talk
      </Typography>
      <img src={chatImage} alt="chat-icon" />
      <Button fullWidth onClick={() => dispatch(openModal('contact-sales'))} size="small" variant="contained" sx={{ mt: 2 }}>
        Contact Sales
      </Button>

      <ReduxDialog value="contact-sales" modalTitle="Contact Sales" showModalButton={false} modalSize="xs">
        <ContactSaleForm />
      </ReduxDialog>
    </Box>
  );
}
