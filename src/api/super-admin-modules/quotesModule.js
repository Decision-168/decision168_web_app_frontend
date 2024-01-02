import axios from "axios";
import superAdminApi from "../superAdminEndpoints";
const apiUrl = import.meta.env.VITE_API_URL;

export const getAllQuotes = async () => {
  const response = await axios.get(`${apiUrl}${superAdminApi.allQuotes}`);
  return response.data;
};

export const addQuote = async (formData) => {
  const response = await axios.post(
    `${apiUrl}${superAdminApi.addQuote}`,
    formData
  );
  return response.data;
};

export const getQuoteDetail = async (id) => {
  const response = await axios.get(
    `${apiUrl}${superAdminApi.quoteDetail}${id}`
  );
  return response.data;
};

export const editQuote = async (id, formData) => {
  const response = await axios.patch(
    `${apiUrl}${superAdminApi.editQuote}${id}`,
    formData
  );
  return response.data;
};

export const deleteQuote = async (id) => {
  const response = await axios.delete(
    `${apiUrl}${superAdminApi.deleteQuote}${id}`
  );
  return response.data;
};
