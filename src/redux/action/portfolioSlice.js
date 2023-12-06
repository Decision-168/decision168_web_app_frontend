import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPortfolioDetails, getPortfolioTeamMembers, getProjectAndTaskCount, getPorfolioDepartments } from "../../api/modules/porfolioModule";

const initialState = {
  count: {},
  members: null,
  departments: null,
  details: {},
  status: "idle",
  error: null,
};

export const getProjectAndTaskCountAsync = createAsyncThunk("portfolio/getProjectAndTaskCount", async (portfolioId) => {
  const response = await getProjectAndTaskCount(portfolioId);
  return response;
});

export const getPortfolioTeamMembersAsync = createAsyncThunk("portfolio/getPortfolioTeamMembers ", async (portfolioId) => {
  const response = await getPortfolioTeamMembers(portfolioId)
  return response;
});

export const getPortfolioDetailsAsync = createAsyncThunk("portfolio/getPortfolioDetails", async (portfolioId) => {
  const response = await getPortfolioDetails(portfolioId);
  return response;
});


export const getPortfolioDeparmentsAsync = createAsyncThunk("portfolio/getPortfolioDeparments", async (portfolioId) => {
  const response = await getPorfolioDepartments(portfolioId);
  return response;
});


export const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProjectAndTaskCountAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProjectAndTaskCountAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.count = action.payload;
      })
      .addCase(getProjectAndTaskCountAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(getPortfolioTeamMembersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPortfolioTeamMembersAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.members = action.payload;
      })
      .addCase(getPortfolioTeamMembersAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(getPortfolioDetailsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPortfolioDetailsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.details = action.payload;
      })
      .addCase(getPortfolioDetailsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })

      .addCase(getPortfolioDeparmentsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPortfolioDeparmentsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.departments = action.payload;
      })
      .addCase(getPortfolioDeparmentsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
  },
});

export const selectProjectAndTaskCount = (state) => state.portfolio.count;
export const selectPorfolioTeamMembers = (state) => state.portfolio.members;
export const selectPorfolioDetails = (state) => state.portfolio.details;
export const selectPorfolioDepartments = (state) => state.portfolio.departments;
export default portfolioSlice.reducer;
