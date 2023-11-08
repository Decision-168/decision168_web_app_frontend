import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const confirmationModalSlice = createSlice({
  name: "confirmation_modal",
  initialState,
  reducers: {
    openCnfModal: (state, action) => {
      const { modalName, title, description } = action.payload;
      state[modalName] = {
        isOpen: true,
        title,
        description,
      };
    },
    closeCnfModal: (state, action) => {
      const { modalName } = action.payload;
      state[modalName] = {
        isOpen: false,
        title: "",
        description: "",
      };
    },
  },
});

export const { openCnfModal, closeCnfModal } = confirmationModalSlice.actions;
export const selectCnfModal = (state) => state.confirmation_modal;

export default confirmationModalSlice.reducer;
