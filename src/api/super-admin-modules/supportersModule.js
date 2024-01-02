import axios from "axios";
import superAdminApi from "../superAdminEndpoints";
const apiUrl = import.meta.env.VITE_API_URL;

export const getAllSupporters = async () => {
  const response = await axios.get(`${apiUrl}${superAdminApi.allSupporters}`);
  return response.data;
};

export const addSupporter = async (formData) => {
  const response = await axios.post(
    `${apiUrl}${superAdminApi.addSupporter}`,
    formData
  );
  return response.data;
};

export const updateSupporterInvitationStatus = async (status, reg_id) => {
  const response = await axios.patch(
    `${apiUrl}${superAdminApi.updateSupporterInvitationStatus}${status}/${reg_id}`
  );
  return response.data;
};

export const updateSupporterInvitationThroughEmailStatus = async (
  status,
  email_address
) => {
  const response = await axios.patch(
    `${apiUrl}${superAdminApi.updateSupporterInvitationThroughEmailStatus}${status}/${email_address}`
  );
  return response.data;
};

export const updateSupporterStatus = async (formData) => {
  const response = await axios.patch(
    `${apiUrl}${superAdminApi.updateSupporterStatus}`,
    formData
  );
  return response.data;
};

export const getSupporterDetail = async (reg_id) => {
  const response = await axios.get(
    `${apiUrl}${superAdminApi.supporterDetail}${reg_id}`
  );
  return response.data;
};

export const getAllInvitedEmailAddresses = async () => {
  const response = await axios.get(
    `${apiUrl}${superAdminApi.allInvitedEmailAddresses}`
  );
  return response.data;
};

export const deleteInvitedSupporter = async (formData) => {
  const response = await axios.delete(
    `${apiUrl}${superAdminApi.deleteInvitedSupporter}`,
    formData
  );
  return response.data;
};
