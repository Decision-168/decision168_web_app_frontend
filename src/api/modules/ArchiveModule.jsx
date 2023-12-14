import axios from "axios";
import api from "../endpoints";
const apiUrl = import.meta.env.VITE_API_URL;

export const patchArchivePortfolio = async (portfolio_id, user_id) => {
    try {
      const response = await axios.patch(`${apiUrl}${api.archivePortfolio}${portfolio_id}/${user_id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
};

export const patchArchiveGoal = async (goal_id, user_id) => {
    try {
      const response = await axios.patch(`${apiUrl}${api.archiveGoal}${goal_id}/${user_id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
};

export const patchArchiveKpi = async (kpi_id, user_id) => {
    try {
      const response = await axios.patch(`${apiUrl}${api.archiveKpi}${kpi_id}/${user_id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
};

export const patchArchiveProject = async (project_id, user_id) => {
    try {
      const response = await axios.patch(`${apiUrl}${api.archiveProject}${project_id}/${user_id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
};

export const patchArchiveTask = async (task_id, user_id) => {
    try {
      const response = await axios.patch(`${apiUrl}${api.archiveTask}${task_id}/${user_id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
};

export const patchArchiveSubtask = async (subtask_id, user_id) => {
    try {
      const response = await axios.patch(`${apiUrl}${api.archiveSubtask}${subtask_id}/${user_id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
};

export const getAllArchiveData = async (regId, portId) => {
  try {
    const response = await axios.get(`${apiUrl}${api.allArchiveData}${regId}/${portId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getgoalArchiveData = async (regId, portId) => {
  try {
    const response = await axios.get(`${apiUrl}${api.goalArchiveData}${regId}/${portId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getkpiArchiveData = async (regId, portId) => {
  try {
    const response = await axios.get(`${apiUrl}${api.kpiArchiveData}${regId}/${portId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getprojectArchiveData = async (regId, portId) => {
  try {
    const response = await axios.get(`${apiUrl}${api.projectArchiveData}${regId}/${portId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const gettaskArchiveData = async (regId, portId) => {
  try {
    const response = await axios.get(`${apiUrl}${api.taskArchiveData}${regId}/${portId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const patchUnArchivePortfolio = async (portfolio_id, user_id) => {
  try {
    const response = await axios.patch(`${apiUrl}${api.unarchivePortfolio}${portfolio_id}/${user_id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const patchUnArchiveGoal = async (goal_id, portfolio_id, user_id) => {
  try {
    const response = await axios.patch(`${apiUrl}${api.unarchiveGoal}${goal_id}/${portfolio_id}/${user_id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const patchUnArchiveKpi = async (kpi_id, portfolio_id, user_id) => {
  try {
    const response = await axios.patch(`${apiUrl}${api.unarchiveKpi}${kpi_id}/${portfolio_id}/${user_id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const patchUnArchiveProject = async (project_id, portfolio_id, user_id) => {
  try {
    const response = await axios.patch(`${apiUrl}${api.unarchiveProject}${project_id}/${portfolio_id}/${user_id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const patchUnArchiveTask = async (task_id, portfolio_id, user_id) => {
  try {
    const response = await axios.patch(`${apiUrl}${api.unarchiveTask}${task_id}/${portfolio_id}/${user_id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const patchUnArchiveSubtask = async (subtask_id, user_id) => {
  try {
    const response = await axios.patch(`${apiUrl}${api.unarchiveSubtask}${subtask_id}/${user_id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};