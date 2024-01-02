import axios from "axios";
import superAdminApi from "../superAdminEndpoints";
const apiUrl = import.meta.env.VITE_API_URL;

export const getPricingList = async () => {
  const response = await axios.get(`${apiUrl}${superAdminApi.pricingList}`);
  return response.data;
};

export const getPackageDetail = async (pack_id) => {
  const response = await axios.get(
    `${apiUrl}${superAdminApi.packageDetail}${pack_id}`
  );
  return response.data;
};

export const updatePackageStatus = async (formData) => {
  const response = await axios.patch(
    `${apiUrl}${superAdminApi.updatePackageStatus}`,
    formData
  );
  return response.data;
};
