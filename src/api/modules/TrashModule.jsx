import axios from "../axios";
import api from "../endpoints";
const apiUrl = import.meta.env.VITE_API_URL;

export const patchDeletePortfolio = async (portfolio_id, user_id) => {
  try {
    const response = await axios.patch(
      `${apiUrl}${api.deletePortfolio}${portfolio_id}/${user_id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const patchDeleteGoal = async (goal_id, user_id) => {
  try {
    const response = await axios.patch(
      `${apiUrl}${api.deleteGoal}${goal_id}/${user_id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const patchDeleteKpi = async (kpi_id, user_id) => {
  try {
    const response = await axios.patch(
      `${apiUrl}${api.deleteKpi}${kpi_id}/${user_id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const patchDeleteProject = async (project_id, user_id) => {
  try {
    const response = await axios.patch(
      `${apiUrl}${api.deleteProject}${project_id}/${user_id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const patchDeleteTask = async (task_id, user_id) => {
  try {
    const response = await axios.patch(
      `${apiUrl}${api.deleteTask}${task_id}/${user_id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const patchDeleteSubtask = async (subtask_id, user_id) => {
  try {
    const response = await axios.patch(
      `${apiUrl}${api.deleteSubtask}${subtask_id}/${user_id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const patchDeleteProjectFile = async (pid, pfile_id, user_id) => {
  try {
    const response = await axios.patch(
      `${apiUrl}${api.deleteProjectFile}${pid}/${pfile_id}/${user_id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const patchDeleteTaskFile = async (tid, tfile, user_id) => {
  try {
    const response = await axios.patch(
      `${apiUrl}${api.deleteTaskFile}${tid}/${tfile}/${user_id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const patchDeleteSubtaskFile = async (stid, stfile, user_id) => {
  try {
    const response = await axios.patch(
      `${apiUrl}${api.deleteSubtaskFile}${stid}/${stfile}/${user_id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllDeleteData = async (regId, portId) => {
  try {
    const response = await axios.get(
      `${apiUrl}${api.allDeleteData}${regId}/${portId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getgoalDeleteData = async (regId, portId) => {
  try {
    const response = await axios.get(
      `${apiUrl}${api.goalDeleteData}${regId}/${portId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getkpiDeleteData = async (regId, portId) => {
  try {
    const response = await axios.get(
      `${apiUrl}${api.kpiDeleteData}${regId}/${portId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getprojectDeleteData = async (regId, portId) => {
  try {
    const response = await axios.get(
      `${apiUrl}${api.projectDeleteData}${regId}/${portId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const gettaskDeleteData = async (regId, portId) => {
  try {
    const response = await axios.get(
      `${apiUrl}${api.taskDeleteData}${regId}/${portId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getFilesDeleteData = async (regId, portId) => {
  try {
    const response = await axios.get(
      `${apiUrl}${api.filesDeleteData}${regId}/${portId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const patchRetrievePortfolio = async (portfolio_id, user_id) => {
  try {
    const response = await axios.patch(
      `${apiUrl}${api.retrievePortfolio}${portfolio_id}/${user_id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const patchRetrieveGoal = async (goal_id, portfolio_id, user_id) => {
  try {
    const response = await axios.patch(
      `${apiUrl}${api.retrieveGoal}${goal_id}/${portfolio_id}/${user_id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const patchRetrieveKpi = async (kpi_id, portfolio_id, user_id) => {
  try {
    const response = await axios.patch(
      `${apiUrl}${api.retrieveKpi}${kpi_id}/${portfolio_id}/${user_id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const patchRetrieveProject = async (
  project_id,
  portfolio_id,
  user_id
) => {
  try {
    const response = await axios.patch(
      `${apiUrl}${api.retrieveProject}${project_id}/${portfolio_id}/${user_id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const patchRetrieveTask = async (task_id, portfolio_id, user_id) => {
  try {
    const response = await axios.patch(
      `${apiUrl}${api.retrieveTask}${task_id}/${portfolio_id}/${user_id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const patchRetrieveSubtask = async (subtask_id, user_id) => {
  try {
    const response = await axios.patch(
      `${apiUrl}${api.retrieveSubtask}${subtask_id}/${user_id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const patchRetrieveProjectFile = async (pid, pfile_id, user_id) => {
  try {
    const response = await axios.patch(
      `${apiUrl}${api.retrieveProjectFile}${pid}/${pfile_id}/${user_id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const patchRetrieveTaskFile = async (tid, tfile, trash_id, user_id) => {
  try {
    const response = await axios.patch(
      `${apiUrl}${api.retrieveTaskFile}${tid}/${tfile}/${trash_id}/${user_id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const patchRetrieveSubtaskFile = async (
  stid,
  stfile,
  strash_id,
  user_id
) => {
  try {
    const response = await axios.patch(
      `${apiUrl}${api.retrieveSubtaskFile}${stid}/${stfile}/${strash_id}/${user_id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const patchDeleteForeverGoal = async (goal_id, user_id) => {
  try {
    const response = await axios.patch(
      `${apiUrl}${api.deleteForeverGoal}${goal_id}/${user_id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const patchDeleteForeverKpi = async (kpi_id, user_id) => {
  try {
    const response = await axios.patch(
      `${apiUrl}${api.deleteForeverKpi}${kpi_id}/${user_id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const patchDeleteForeverProject = async (project_id, user_id) => {
  try {
    const response = await axios.patch(
      `${apiUrl}${api.deleteForeverProject}${project_id}/${user_id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const patchDeleteForeverTask = async (task_id) => {
  try {
    const response = await axios.patch(
      `${apiUrl}${api.deleteForeverTask}${task_id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const patchDeleteForeverSubtask = async (subtask_id) => {
  try {
    const response = await axios.patch(
      `${apiUrl}${api.deleteForeverSubtask}${subtask_id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const patchDeleteForeverProjectFile = async (pfile_id) => {
  try {
    const response = await axios.patch(
      `${apiUrl}${api.deleteForeverProjectFile}${pfile_id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const patchDeleteForeverTaskFile = async (tid, trash_id, user_id) => {
  try {
    const response = await axios.patch(
      `${apiUrl}${api.deleteForeverTaskFile}${tid}/${trash_id}/${user_id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const patchDeleteForeverSubtaskFile = async (
  stid,
  strash_id,
  user_id
) => {
  try {
    const response = await axios.patch(
      `${apiUrl}${api.deleteForeverSubtaskFile}${stid}/${strash_id}/${user_id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
