import {configureStore} from '@reduxjs/toolkit';
import modalReducer from './action/modalSlice';

export default configureStore({
  reducer: {
    modal: modalReducer,
    // ... other reducers
  },
});
