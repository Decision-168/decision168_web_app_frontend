import axios from "axios";
import api from "../endpoints";
const apiUrl = import.meta.env.VITE_API_URL;

export const getProjectList = async (user_id, portfolio_id) => {
    try {
      const response = await axios.get(`${apiUrl}${api.getProjectList}${user_id}/${portfolio_id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
};

export const getPortfolioProjectList = async (user_id, portfolio_id) => {
  try {
    const response = await axios.get(
      `${apiUrl}${api.getPortfolioProjectList}${user_id}/${portfolio_id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDashboardProjectList = async (user_id, portfolio_id) => {
  try {
    const response = await axios.get(
      `${apiUrl}${api.getDashboardProjectList}${user_id}/${portfolio_id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProjectDetail = async (project_id) => {
    try {
      const response = await axios.get(`${apiUrl}${api.getProjectById}${project_id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
};

export const getTaskLinks = async (project_id) => {
    try {
      const response = await axios.get(`${apiUrl}${api.getProjectTaskLinks}${project_id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
};

export const getSubtaskLinks = async (project_id) => {
    try {
      const response = await axios.get(`${apiUrl}${api.getProjectSubtaskLinks}${project_id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
};

export const getTaskAssignees = async (project_id) => {
    try {
      const response = await axios.get(`${apiUrl}${api.getProjectTaskAssignees}${project_id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
};

export const getProjectFiles = async (project_id) => {
    try {
      const response = await axios.get(`${apiUrl}${api.getProjectFiles}${project_id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
};

export const getViewHistoryDateProject = async (project_id) => {
  try {
    const response = await axios.get(
      `${apiUrl}${api.ViewHistoryDateProject}${project_id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getViewHistoryDateWiseProject = async (project_id, hdate) => {
  try {
    const response = await axios.get(
      `${apiUrl}${api.ViewHistoryDateWiseProject}${project_id}/${hdate}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getViewHistoryDateRangeProject = async (
  project_id,
  start_date,
  end_date
) => {
  try {
    const response = await axios.get(
      `${apiUrl}${api.ViewHistoryDateRangeProject}${project_id}`,
      {
        start_date: start_date,
        end_date: end_date,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getViewAllHistoryProject = async (project_id) => {
  try {
    const response = await axios.get(
      `${apiUrl}${api.ViewAllHistoryProject}${project_id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProjectComments = async (project_id, user_id) => {
    try {
      const response = await axios.get(`${apiUrl}${api.getProjectComments}${project_id}/${user_id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
};

export const getMentionList = async (project_id) => {
    try {
      const response = await axios.get(`${apiUrl}${api.getProjectMentionList}${project_id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
};

export const fileItProject = async (project_id, user_id) => {
    try {
      const response = await axios.patch(`${apiUrl}${api.fileCabinetFileitProject}${project_id}/${user_id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
};

export const copyProject = async (formData) => {
    try {
      const response = await axios.post(`${apiUrl}${api.postCopyProject}`, formData);
      return response.data;
    } catch (error) {
      throw error;
    }
};

export const insertComments = async (user_id, formData) => {
    try {
      const response = await axios.post(`${apiUrl}${api.insertProjectComment}${user_id}`, formData);
      return response.data;
    } catch (error) {
      throw error;
    }
};

export const deleteComment = async (user_id, comment_id) => {
    try {
      const response = await axios.get(`${apiUrl}${api.deleteProjectComment}${user_id}/${comment_id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
};

export const getProjectMemberData = async (project_id, user_id) => {
    try {
      const response = await axios.get(`${apiUrl}${api.projectMemberData}${project_id}/${user_id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
};

export const patchProjectRequest = async (project_id, memberId, flag) => {
    try {
      const response = await axios.patch(`${apiUrl}${api.projectRequest}${project_id}/${memberId}/${flag}`);
      return response.data;
    } catch (error) {
      throw error;
    }
};

export const insertFiles = async (formData) => {
    try {
      const response = await axios.post(`${apiUrl}${api.insertProjectFiles}`, formData);
      return response.data;
    } catch (error) {
      throw error;
    }
};

export const AddProjectManager = async (pid, pmember_id) => {
  try {
    const response = await axios.patch(
      `${apiUrl}${api.AssignProjectManager}${pid}/${pmember_id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const RemoveProjectMember = async (pmid) => {
  try {
    const response = await axios.patch(`${apiUrl}${api.DeleteProjectMember}${pmid}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const RemoveInvitedProjectMember = async (formdata) => {
  try {
    const response = await axios.patch(
      `${apiUrl}${api.DeleteInvitedProjectMember}`,
      formdata
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const InsertSuggestedProjectMember = async (user_id, pid, suggest_id) => {
  try {
    const response = await axios.patch(
      `${apiUrl}${api.AddSuggestedProjectMember}${user_id}/${pid}/${suggest_id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const InsertSuggestedInvitedProjectMember = async (user_id, pid, suggest_id) => {
  try {
    const response = await axios.patch(
      `${apiUrl}${api.AddSuggestedInvitedProjectMember}${user_id}/${pid}/${suggest_id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const DirectlyRemoveProjectManager = async (pid, pmember_id) => {
  try {
    const response = await axios.patch(
      `${apiUrl}${api.DirectRemoveProjectManager}${pid}/${pmember_id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAccepted_PortTM_ProjectList = async (portfolio_id, pid) => {
  try {
    const response = await axios.get(
      `${apiUrl}${api.Accepted_PortTM_ProjectList}${portfolio_id}/${pid}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAccepted_GoalTM_ProjectList = async (gid, pid) => {
  try {
    const response = await axios.get(`${apiUrl}${api.Accepted_GoalTM_ProjectList}${gid}/${pid}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const AddProjectMember = async (formData) => {
  try {
    const response = await axios.post(`${apiUrl}${api.InsertProjectMember}`, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const AddProjectSuggestTMember = async (formData) => {
  try {
    const response = await axios.post(
      `${apiUrl}${api.InsertProjectSuggestTMember}`,
      formData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const UpdateProjectOpenWorkNewAssignee = async (formdata) => {
  try {
    const response = await axios.patch(
      `${apiUrl}${api.ProjectOpenWorkNewAssignee}`,
      formdata
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};