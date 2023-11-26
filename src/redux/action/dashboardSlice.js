import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAlertsAndNotifications } from "../../api/modules/dashboardModule";

const initialState = {
  userAlertNotifications: null, //contains detailed information of user
  status: "idle",
  error: null,
};


export const getAlertNotificationsAsync = createAsyncThunk("dasboard/getAlertNotifications", async (id) => {
  const response = await getAlertsAndNotifications(id);
  // The value we return becomes the `fulfilled` action payload
  return response;
});


export const dashboardSlice = createSlice({
  name: "dasboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAlertNotificationsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAlertNotificationsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userAlertNotifications = action.payload;
      })
      .addCase(getAlertNotificationsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
  },
});

export const selectAlertNotifications = (state) => state.dashboard.userAlertNotifications;

export default dashboardSlice.reducer;
