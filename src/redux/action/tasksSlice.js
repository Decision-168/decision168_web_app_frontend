import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPortfolioTasksSubtasksListView } from "../../api/modules/taskModule";


const initialState = {
    listViewTasks: null,
    status: "idle",
    error: null,
};

export const getPortfolioTasksSubtasksListViewAsync = createAsyncThunk("tasks/getPortfolioTasksSubtasksListView", async ({ portfolioId, regId }) => {
    const response = await getPortfolioTasksSubtasksListView(portfolioId, regId)
    return response;
});

export const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPortfolioTasksSubtasksListViewAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getPortfolioTasksSubtasksListViewAsync.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.listViewTasks = action.payload;
            })
            .addCase(getPortfolioTasksSubtasksListViewAsync.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error;
            })
    },
});

export const selectListViewTasks = (state) => state.tasks.listViewTasks;

export default tasksSlice.reducer;
