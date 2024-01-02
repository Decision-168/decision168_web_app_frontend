import axios from "axios";
import superAdminApi from "../superAdminEndpoints";
const apiUrl = import.meta.env.VITE_API_URL;

export const getRegisteredUsersCount = async () => {
  const response = await axios.get(
    `${apiUrl}${superAdminApi.registeredUsersCount}`
  );
  return response.data;
};
