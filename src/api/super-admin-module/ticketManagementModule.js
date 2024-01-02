import axios from "axios";
import superAdminApi from "../superAdminEndpoints";
const apiUrl = import.meta.env.VITE_API_URL;

export const getAllTickets = async () => {
  const response = await axios.get(`${apiUrl}${superAdminApi.allTickets}`);
  return response.data;
};

export const getUser = async (reg_id) => {
  const response = await axios.get(`${apiUrl}${superAdminApi.user}${reg_id}`);
  return response.data;
};

export const getAllSupporter = async () => {
  const response = await axios.get(`${apiUrl}${superAdminApi.allSupporter}`);
  return response.data;
};

export const getTicketDetail = async (ticket_id) => {
  const response = await axios.get(
    `${apiUrl}${superAdminApi.ticketDetail}${ticket_id}`
  );
  return response.data;
};

export const assignTicket = async (formData) => {
  const response = await axios.patch(
    `${apiUrl}${superAdminApi.assignTicket}`,
    formData
  );
  return response.data;
};

export const deleteTicket = async (formData) => {
  const response = await axios.delete(
    `${apiUrl}${superAdminApi.deleteTicket}`,
    formData
  );
  return response.data;
};

export const updateTicketChatNotify = async (formData) => {
  const response = await axios.patch(
    `${apiUrl}${superAdminApi.updateTicketChatNotify}`,
    formData
  );
  return response.data;
};

export const getTicketMessages = async (formData) => {
  const response = await axios.get(
    `${apiUrl}${superAdminApi.ticketMessages}`,
    formData
  );
  return response.data;
};

export const addTicketChat = async (formData) => {
  const response = await axios.post(
    `${apiUrl}${superAdminApi.addTicketChat}`,
    formData
  );
  return response.data;
};
