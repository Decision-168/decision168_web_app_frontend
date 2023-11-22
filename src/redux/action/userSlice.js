import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserDetails } from "../../api/modules/dashboardModule";

const initialState = {
  userDetails: null, //contains detailed information of user
  status: "idle",
  error: null,
};


export const getUserDetailsAsync = createAsyncThunk("user/getUserDetails", async (id) => {
  const response = await getUserDetails(id);
  // The value we return becomes the `fulfilled` action payload
  return response;
});


export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserDetailsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserDetailsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userDetails = action.payload;
      })
      .addCase(getUserDetailsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
  },
});

export const selectUserDetails = (state) => state.user.userDetails;

export default userSlice.reducer;
