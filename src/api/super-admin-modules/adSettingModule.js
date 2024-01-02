import axios from "axios";
import superAdminApi from "../superAdminEndpoints";
const apiUrl = import.meta.env.VITE_API_URL;

export const getAdList = async () => {
  const response = await axios.get(`${apiUrl}${superAdminApi.adList}`);
  return response.data;
};

export const uploadAd = async (formData) => {
  const response = await axios.post(
    `${apiUrl}${superAdminApi.uploadAd}`,
    formData
  );
  return response.data;
};

export const updateAdStatus = async (formData) => {
  const response = await axios.patch(
    `${apiUrl}${superAdminApi.updateAdStatus}`,
    formData
  );
  return response.data;
};

export const deleteAd = async (aid) => {
  const response = await axios.delete(
    `${apiUrl}${superAdminApi.deleteAd}${aid}`
  );
  return response.data;
};
