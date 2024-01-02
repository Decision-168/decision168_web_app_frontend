import axios from "axios";
import superAdminApi from "../superAdminEndpoints";
const apiUrl = import.meta.env.VITE_API_URL;

export const getAllRegisteredUsers = async () => {
  const response = await axios.get(
    `${apiUrl}${superAdminApi.allRegisteredUsers}`
  );
  return response.data;
};

export const getUserDetail = async (reg_id) => {
  const response = await axios.get(
    `${apiUrl}${superAdminApi.userDetail}${reg_id}`
  );
  return response.data;
};

export const getAllDeactivatedUsers = async () => {
  const response = await axios.get(
    `${apiUrl}${superAdminApi.allDeactivatedUsers}`
  );
  return response.data;
};

export const getRefundList = async () => {
  const response = await axios.get(`${apiUrl}${superAdminApi.refundList}`);
  return response.data;
};

export const updateRefundStatus = async (reg_id, formData) => {
  const response = await axios.patch(
    `${apiUrl}${superAdminApi.updateRefundStatus}${reg_id}`,
    formData
  );
  return response.data;
};
