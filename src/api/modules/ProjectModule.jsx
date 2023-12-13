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

export const getProjectDetail = async (project_id) => {
    try {
      const response = await axios.get(`${apiUrl}${api.getProjectById}${project_id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
};

export const PendingProjectListByPortfolioRegular = async (user_id, portfolio_id) => {
    try {
      const response = await axios.get(`${apiUrl}${api.getPendingProjectListByPortfolioRegular}${user_id}/${portfolio_id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
};

export const ReadMoreProjectListByPortfolioRegular = async (user_id, portfolio_id) => {
    try {
      const response = await axios.get(`${apiUrl}${api.getReadMoreProjectListByPortfolioRegulart}${user_id}/${portfolio_id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
};