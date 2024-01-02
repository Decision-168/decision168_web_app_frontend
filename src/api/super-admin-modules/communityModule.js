import axios from "axios";
import superAdminApi from "../superAdminEndpoints";
const apiUrl = import.meta.env.VITE_API_URL;

export const getDecisionMakers = async () => {
  const response = await axios.get(`${apiUrl}${superAdminApi.decisionMakers}`);
  return response.data;
};

export const updateExpertStatus = async (formData) => {
  const response = await axios.patch(
    `${apiUrl}${superAdminApi.updateExpertStatus}`,
    formData
  );
  return response.data;
};

export const getDecisionMakerDetail = async (id) => {
  const response = await axios.get(
    `${apiUrl}${superAdminApi.decisionMakerDetail}${id}`
  );
  return response.data;
};

export const getDecisionMakerCallRateDetail = async () => {
  const response = await axios.get(
    `${apiUrl}${superAdminApi.decisionMakerCallRateDetail}`
  );
  return response.data;
};

export const getDecisionMakerCategory = async () => {
  const response = await axios.get(
    `${apiUrl}${superAdminApi.decisionMakerCategory}`
  );
  return response.data;
};

export const addCategory = async (formData) => {
  const response = await axios.post(
    `${apiUrl}${superAdminApi.addCategory}`,
    formData
  );
  return response.data;
};

export const updateCategoryStatus = async (formData) => {
  const response = await axios.patch(
    `${apiUrl}${superAdminApi.updateCategoryStatus}`,
    formData
  );
  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await axios.delete(
    `${apiUrl}${superAdminApi.deleteCategory}${id}`
  );
  return response.data;
};

export const getDecisionMakerCategoryDetail = async (cat_id) => {
  const response = await axios.get(
    `${apiUrl}${superAdminApi.decisionMakerCategoryDetail}${cat_id}`
  );
  return response.data;
};

export const editCategory = async (formData) => {
  const response = await axios.patch(
    `${apiUrl}${superAdminApi.editCategory}`,
    formData
  );
  return response.data;
};

export const getDecisionMakerAgreement = async () => {
  const response = await axios.get(
    `${apiUrl}${superAdminApi.decisionMakerAgreement}`
  );
  return response.data;
};

export const addAgreement = async (formData) => {
  const response = await axios.post(
    `${apiUrl}${superAdminApi.addAgreement}`,
    formData
  );
  return response.data;
};

export const updateAgreementStatus = async (formData) => {
  const response = await axios.patch(
    `${apiUrl}${superAdminApi.updateAgreementStatus}`,
    formData
  );
  return response.data;
};

export const deleteAgreement = async (id) => {
  const response = await axios.delete(
    `${apiUrl}${superAdminApi.deleteAgreement}${id}`
  );
  return response.data;
};

export const getDecisionMakerAgreementDetail = async (agree_id) => {
  const response = await axios.get(
    `${apiUrl}${superAdminApi.decisionMakerAgreementDetail}${agree_id}`
  );
  return response.data;
};

export const editAgreement = async (formData) => {
  const response = await axios.patch(
    `${apiUrl}${superAdminApi.editAgreement}`,
    formData
  );
  return response.data;
};
