import axios from "axios";
import superAdminApi from "../superAdminEndpoints";
const apiUrl = import.meta.env.VITE_API_URL;

export const getAlertNotifications = async () => {
  const response = await axios.get(
    `${apiUrl}${superAdminApi.allAlertNotifications}`
  );
  return response.data;
};

export const getAlertNotificationsByRegId = async (reg_id) => {
  const response = await axios.get(
    `${apiUrl}${superAdminApi.allAlertNotificationsByRegId}${reg_id}`
  );
  return response.data;
};
