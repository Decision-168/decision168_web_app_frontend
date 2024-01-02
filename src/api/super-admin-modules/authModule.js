import axios from "axios";
import superAdminApi from "../superAdminEndpoints";
const apiUrl = import.meta.env.VITE_API_URL;

export const loginSuperadmin = async (formData) => {
  const response = await axios.post(
    `${apiUrl}${superAdminApi.superadminLogin}`,
    formData
  );
  return response.data;
};
