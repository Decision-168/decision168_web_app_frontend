import axios from "axios";
import api from "../endpoints";
const apiUrl = import.meta.env.VITE_API_URL;



export const Register = async (formData) => {
  try {
    const response = await axios.post(`${apiUrl}${api.userRegister}`, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
