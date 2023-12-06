import axios from "axios";
import api from "../endpoints";
const apiUrl = import.meta.env.VITE_API_URL;

export const getTreeData = async (portfolio_id,user_id) => {
  try {
    const response = await axios.get(`${apiUrl}${api.fileCabinetTreeData}${portfolio_id}/${user_id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getGoalData = async (goal_id) => {
  try {
    const response = await axios.get(`${apiUrl}${api.fileCabinetGoalData}${goal_id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDepartmentData = async (department_id) => {
  try {
    const response = await axios.get(`${apiUrl}${api.fileCabinetDepartmentData}${department_id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserData = async (user_id) => {
  try {
    const response = await axios.get(`${apiUrl}${api.fileCabinetUserData}${user_id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getGoalKPIData = async (gid, portfolio_dept_id, portfolio_id) => {
  try {
    const response = await axios.get(`${apiUrl}${api.fileCabinetGoalKPIData}${gid}/${portfolio_dept_id}/${portfolio_id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getKPIData = async (sid) => {
  try {
    const response = await axios.get(`${apiUrl}${api.fileCabinetKPIData}${sid}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getKpiProjectData = async (reg_id, sid, portfolio_dept_id, portfolio_id) => {
  try {
    const response = await axios.get(`${apiUrl}${api.fileCabinetKpiProjectData}${reg_id}/${sid}/${portfolio_dept_id}/${portfolio_id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProjectData = async (sid) => {
  try {
    const response = await axios.get(`${apiUrl}${api.fileCabinetProjectData}${sid}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTaskData = async (tid) => {
  try {
    const response = await axios.get(`${apiUrl}${api.fileCabinetTaskData}${tid}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTaskSubtaskData = async (reg_id, tid, portfolio_dept_id, portfolio_id) => {
  try {
    const response = await axios.get(`${apiUrl}${api.fileCabinetTaskSubtaskData}${reg_id}/${tid}/${portfolio_dept_id}/${portfolio_id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSubtaskData = async (stid) => {
  try {
    const response = await axios.get(`${apiUrl}${api.fileCabinetSubtaskData}${stid}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPortfolioData = async (portId) => {
  try {
    const response = await axios.get(`${apiUrl}${api.fileCabinetPortfolioData}${portId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getRecentFilesData = async (regId, portId) => {
  try {
    const response = await axios.get(`${apiUrl}${api.fileCabinetRecentFilesData}${regId}/${portId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const reopenGoal = async (goal_id, portId, regId) => {
  try {
    const response = await axios.patch(`${apiUrl}${api.fileCabinetReopenGoal}${goal_id}/${portId}/${regId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const reopenKpi = async (strategy_id, portId, regId) => {
  try {
    const response = await axios.patch(`${apiUrl}${api.fileCabinetReopenKpi}${strategy_id}/${portId}/${regId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const reopenProject = async (project_id, portId, regId) => {
  try {
    const response = await axios.patch(`${apiUrl}${api.fileCabinetReopenProject}${project_id}/${portId}/${regId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const reopenTask = async (task_id, portId, regId) => {
  try {
    const response = await axios.patch(`${apiUrl}${api.fileCabinetReopenTask}${task_id}/${portId}/${regId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const reopenSubtask = async (subtask_id, regId) => {
  try {
    const response = await axios.patch(`${apiUrl}${api.fileCabinetReopenSubtask}${subtask_id}/${regId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};