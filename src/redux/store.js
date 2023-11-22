import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './action/modalSlice';
import confirmModalReducer from './action/confirmationModalSlice';
import popupReducer from './action/confirmationModalSlice';
import userReducer from './action/userSlice';

export default configureStore({
  reducer: {
    modal: modalReducer,
    confirmation_modal: confirmModalReducer,
    popup: popupReducer,
    user: userReducer,
  },
});
