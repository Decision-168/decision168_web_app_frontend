import axios from "axios";
import superAdminApi from "../superAdminEndpoints";
const apiUrl = import.meta.env.VITE_API_URL;

export const getContactedSalesList = async () => {
  const response = await axios.get(
    `${apiUrl}${superAdminApi.contactedSalesList}`
  );
  return response.data;
};

export const getContactedCompanyAndItsPackageDetail = async (cid) => {
  const response = await axios.get(
    `${apiUrl}${superAdminApi.contactedCompanyAndItsPackageDetail}${cid}`
  );
  return response.data;
};

export const updateContactedCompanyStatus = async (formData) => {
  const response = await axios.patch(
    `${apiUrl}${superAdminApi.updateContactedCompanyStatus}`,
    formData
  );
  return response.data;
};

export const deleteContactSalesRequest = async (cid) => {
  const response = await axios.patch(
    `${apiUrl}${superAdminApi.deleteContactSalesRequest}${cid}`
  );
  return response.data;
};
