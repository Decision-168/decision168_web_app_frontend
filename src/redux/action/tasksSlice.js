import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTaskDetails, getTaskslist } from "../../api/modules/taskModule";


const initialState = {
    tasksList: null,
    taskDetails: null,
    status: "idle",
    error: null,
};

export const getTaskslistAsync = createAsyncThunk("tasks/getTaskslist", async ({ portfolioId, regId }) => {
    try {
        const response = await getTaskslist(portfolioId, regId);
        return response;  // Return the response data directly
    } catch (error) {
        throw error;
    }
});

export const getTaskDetailsAsync = createAsyncThunk("tasks/getTaskDetails", async (taskId) => {
    const response = await getTaskDetails(taskId)
    return response;
});


export const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTaskslistAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getTaskslistAsync.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.tasksList = action.payload;
            })
            .addCase(getTaskslistAsync.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error;
            })
            .addCase(getTaskDetailsAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getTaskDetailsAsync.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.taskDetails = action.payload;
            })
            .addCase(getTaskDetailsAsync.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error;
            })
    },
});

export const selectTasksList = (state) => state.tasks.tasksList;
export const selectTaskDetails = (state) => state.tasks.taskDetails;

export default tasksSlice.reducer;
