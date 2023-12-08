import axios from "axios";
import api from "../endpoints";
const apiUrl = import.meta.env.VITE_API_URL;

//(LIST VIEW & GRID VIEW) All dashboard tasks and subtaks for dashboard  by regId
export const getAlltasksAndSubtasks = async (regId) => {
  try {
    const response = await axios.get(`${apiUrl}${api.getAlltasksAndSubtasks}${regId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Edit task and subtask fields by porfolio id
export const editTaskAndSubtask = async (portfolioId, data) => {
  try {
    const response = await axios.patch(`${apiUrl}${api.editTaskAndSubtask}${portfolioId}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Change task Status by user id
export const changeTaskStatus = async (regId, data) => {
  try {
    const response = await axios.patch(`${apiUrl}${api.changeTaskStatus}${regId}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//get Portfolio Task list by portfolio_id and reg_id
export const getTaskslist = async (portfolioId, regId) => {
  try {
    const response = await axios.get(`${apiUrl}${api.getTaskslist}${portfolioId}/${regId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//get Task Details by task_id
export const getTaskDetails = async (taskId) => {
  try {
    const response = await axios.get(`${apiUrl}${api.getTaskDetails}${taskId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Insert Task by user id and portfolio id
export const insertTask = async (regId, portfolioId, data) => {
  try {
    const response = await axios.post(`${apiUrl}${api.insertTask}${regId}/${portfolioId}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Change task Status on checkbox by user id
export const changeTaskStatusCheckox = async (regId, data) => {
  try {
    const response = await axios.patch(`${apiUrl}${api.changeTaskStatusCheckox}${regId}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
