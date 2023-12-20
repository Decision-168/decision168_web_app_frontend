import axios from "axios";
import api from "../endpoints";
const apiUrl = import.meta.env.VITE_API_URL;

//Dashboard All Tasks (List View)
export const getDashboardAlltaskListView = async (regId) => {
  try {
    const response = await axios.get(`${apiUrl}${api.getDashboardAlltaskListView}${regId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//Dashboard All Tasks (Grid View)
export const getDashboardAlltaskGridView = async (regId) => {
  try {
    const response = await axios.get(`${apiUrl}${api.getDashboardAlltaskGridView}${regId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//Portfolio Tasks
export const getPortfolioTasksListView = async (portfolioId) => {
  try {
    const response = await axios.get(`${apiUrl}${api.getPortfolioTasksListView}${portfolioId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//Portfolio Tasks List (LIST VIEW)
export const getPortfolioTasksSubtasksListView = async (portfolioId, regId) => {
  try {
    const response = await axios.get(
      `${apiUrl}${api.getPortfolioTasksSubtasksListView}${portfolioId}/${regId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

//Portfolio Tasks List (Grid VIEW)
export const getPortfolioTasksSubtasksGridView = async (portfolioId, regId) => {
  try {
    const response = await axios.get(
      `${apiUrl}${api.getPortfolioTasksSubtasksGridView}${portfolioId}/${regId}`
    );
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

// Change task Status on checkbox by user id
export const changeTaskStatusCheckox = async (regId, data) => {
  try {
    const response = await axios.patch(`${apiUrl}${api.changeTaskStatusCheckox}${regId}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Change Subtask Status on checkbox by user id
export const changeSubTaskStatusCheckox = async (regId, data) => {
  try {
    const response = await axios.patch(`${apiUrl}${api.changeSubTaskStatusCheckox}${regId}`, data);
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

// Change Subtask Status by user id
export const changeSubTaskStatus = async (regId, data) => {
  try {
    const response = await axios.patch(`${apiUrl}${api.changeSubTaskStatus}${regId}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//Task Details by task_id
export const getTaskDetails = async (taskId) => {
  try {
    const response = await axios.get(`${apiUrl}${api.getTaskDetails}${taskId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//Subtask Details by subtask_id
export const getSubTaskDetails = async (subtaskId) => {
  try {
    const response = await axios.get(`${apiUrl}${api.getSubTaskDetails}${subtaskId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//File it task by task_id and user_id
export const fileItTask = async (task_id, user_id) => {
  try {
    const response = await axios.patch(`${apiUrl}${api.fileItTask}${task_id}/${user_id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//File it Subtask by subtask_id and user_id
export const fileItSubTask = async (subtask_id, user_id) => {
  try {
    const response = await axios.patch(`${apiUrl}${api.fileItSubTask}${subtask_id}/${user_id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Insert Task by user id and portfolio id
export const insertTask = async ({ regId, data }) => {
  try {
    const response = await axios.post(`${apiUrl}${api.insertTask}${regId}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Insert Task by user id and portfolio id
export const updateTask = async ({ user_id, data }) => {
  try {
    const response = await axios.patch(`${apiUrl}${api.updateTask}${user_id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Insert Subtask by portfolio id user id
export const insertSubtask = async ({ user_id, portfolio_id, data }) => {
  try {
    const response = await axios.post(
      `${apiUrl}${api.insertSubtask}${user_id}/${portfolio_id}`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Insert Task by user id and portfolio id
export const updateSubtask = async ({ user_id, portfolio_id, data }) => {
  try {
    const response = await axios.post(
      `${apiUrl}${api.updateSubtask}${user_id}/${portfolio_id}`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

//Projects by portfolio_id and user_id
export const getProjectsForSelectMenu = async ({ portfolio_id, user_id }) => {
  try {
    const response = await axios.get(
      `${apiUrl}${api.getProjectsForSelectMenu}${portfolio_id}/${user_id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

//Project team members by pid
export const getProjectTeamMembers = async ({ pid }) => {
  try {
    const response = await axios.get(`${apiUrl}${api.getProjectTeamMembers}${pid}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//Duplicate Task
export const duplicateTask = async (data) => {
  try {
    const response = await axios.post(`${apiUrl}${api.duplicateTask}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//Duplicate Subtask
export const duplicateSubtask = async (data) => {
  try {
    const response = await axios.post(`${apiUrl}${api.duplicateSubtask}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//Change Task status DND
export const changeTaskStatusDND = async ({ user_id, data }) => {
  try {
    const response = await axios.patch(`${apiUrl}${api.changeTaskStatusDND}${user_id}`, data);
    return response;
  } catch (error) {
    throw error;
  }
};

//Change Subtask status DND
export const changeSubtaskStatusDND = async ({ user_id, data }) => {
  try {
    const response = await axios.patch(`${apiUrl}${api.changeSubtaskStatusDND}${user_id}`, data);
    return response;
  } catch (error) {
    throw error;
  }
};
