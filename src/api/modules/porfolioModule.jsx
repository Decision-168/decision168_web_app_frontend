import axios from "axios";
import api from "../endpoints";
const apiUrl = import.meta.env.VITE_API_URL;

export const getPortfolios = async ({email}) => {
  try {
    const response = await axios.get(`${apiUrl}${api.porfolios}${email}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProjectAndTaskCount = async (portfolioId) => {
  try {
    const response = await axios.get(`${apiUrl}${api.projectAndTaskCount}${portfolioId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPortfolioTeamMembers = async (portfolioId) => {
  try {
    const response = await axios.get(`${apiUrl}${api.portfolioTeamMembers}${portfolioId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPortfolioTeamMemberName = async (email_address) => {
  try {
    const response = await axios.get(`${apiUrl}${api.portfolioTeamMemberName}${email_address}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updatePortfolioMemberStatus = async (primaryId, portfolioId, status) => {
  try {
    const response = await axios.patch(
      `${apiUrl}${api.portfolioMemberStatus}${primaryId}/${portfolioId}`,
      { status }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const assignOpenWorkToMember = async (
  userRegId,
  newMemberRegId,
  oldMemberRegId,
  oldMemberPrimaryId,
  portfolioId
) => {
  try {
    const response = await axios.patch(
      `${apiUrl}${api.assignOpenWorkToMember}${userRegId}/${newMemberRegId}/${oldMemberRegId}/${oldMemberPrimaryId}/${portfolioId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPortfolioDetails = async (portfolio_id) => {
  try {
    const response = await axios.get(`${apiUrl}${api.portfolioDetails}${portfolio_id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPorfolioDepartments = async (portfolioId) => {
  try {
    const response = await axios.get(`${apiUrl}${api.portfolioDepartments}${portfolioId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updatePortfolioDepartment = async (departmentId, data) => {
  try {
    const response = await axios.patch(
      `${apiUrl}${api.portfolioDepartmentUpdate}${departmentId}`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const insertProjectPortfolioMember = async (data) => {
  try {
    const response = await axios.post(`${apiUrl}${api.insertPortfolioMember}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPorfolioInviteRequest = async (portfolioId, primaryId, flag) => {
  try {
    const response = await axios.get(
      `${apiUrl}${api.portfolioInviteRequest}${portfolioId}/${primaryId}/${flag}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const insertProjectPortfolioDepartment = async (data) => {
  try {
    const response = await axios.post(`${apiUrl}${api.insertPortfolioDepartment}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const insertPortfolio = async (data) => {
  try {
    const response = await axios.post(`${apiUrl}${api.insertPortfolio}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updatePortfolio = async (portfolioId, data) => {
  try {
    const response = await axios.patch(`${apiUrl}${api.updatePortfolio}${portfolioId}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPorfolioCount = async (portfolioId) => {
  try {
    const response = await axios.get(`${apiUrl}${api.getPortfolioCount}${portfolioId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
