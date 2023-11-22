import axios from "axios";
import api from "../endpoints";
const apiUrl = import.meta.env.VITE_API_URL;

export const getUserDetails = async (id) => {
  try {
    const response = await axios.get(`${apiUrl}${api.userDetails}${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllCounts = async (email, id) => {
  try {
    const response = await axios.get(`${apiUrl}${api.userAllCounts}${email}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMotivator = async () => {
  try {
    const response = await axios.get(`${apiUrl}${api.userMotivator}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getRecentNotifications = async (id) => {
  try {
    const response = await axios.get(`${apiUrl}${api.userRecentNotifications}${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPackageDetails = async (package_id) => {
  try {
    const response = await axios.get(`${apiUrl}${api.userPackage}${package_id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCountries = async () => {
  try {
    const response = await axios.get(`${apiUrl}${api.countries}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// export const loginUser = async (formData) => {
//   try {
//     const response = await axios.post(`${apiUrl}${api.userLogin}`, formData);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const forgotPassword = async (formData) => {
//   try {
//     const response = await axios.post(`${apiUrl}${api.userForgotPass}`, formData);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const changePassword = async (password, id) => {
//   try {
//     const response = await axios.patch(`${apiUrl}${api.userChangePass}${id}`, {
//       password: password,
//     });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };
