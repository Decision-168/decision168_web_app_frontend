import {createSlice} from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: null, // Use null to represent no active modals
  reducers: {
    openModal: (state, action) => action.payload,
    closeModal: () => null,
  },
});

export const {openModal, closeModal} = modalSlice.actions;
export const selectModal = state => state.modal;

export default modalSlice.reducer;
