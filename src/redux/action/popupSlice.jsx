// src/features/popupSlice.js
import { createSlice } from "@reduxjs/toolkit";

const popupSlice = createSlice({
  name: "popup",
  initialState: {
    isOpen: false,
    title: ''
  },
  reducers: {
    openPopup: (state, action) => {
      state.isOpen = true;
      state.title = action.payload;
    },
    closePopup: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openPopup, closePopup } = popupSlice.actions;
export const selectPopup = (state) => state.popup;

export default popupSlice.reducer;