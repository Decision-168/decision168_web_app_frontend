import {configureStore} from '@reduxjs/toolkit';
import modalReducer from './action/modalSlice';
import confirmModalReducer from './action/confirmationModalSlice';

export default configureStore({
  reducer: {
    modal: modalReducer,
    confirmation_modal: confirmModalReducer,
  },
});
