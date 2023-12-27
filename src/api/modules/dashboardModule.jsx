import axios from "../axios";
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
    const response = await axios.get(
      `${apiUrl}${api.userAllCounts}${email}/${id}`
    );
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
    const response = await axios.get(
      `${apiUrl}${api.userRecentNotifications}${id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

//update profile by user id
export const updateUserProfile = async (userId, data) => {
  try {
    const response = await axios.patch(
      `${apiUrl}${api.updateProfile}${userId}`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAlertsAndNotifications = async (userId) => {
  try {
    const response = await axios.get(
      `${apiUrl}${api.userAlertsAndNotifications}${userId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

//update dashboard + bell icon clear alert notifications by different id's, user id and type
export const updateAlertsAndNotifications = async (id, userId, type) => {
  try {
    const response = await axios.patch(`${apiUrl}${api.updateAlertsAndNotifications}${id}/${userId}`, { type: type });
    return response;
  } catch (error) {
    throw error;
  }
};

//update bell icon clear all alert notifications by user_id
export const clearAllNotificaions = async (user_id) => {
  try {
    const response = await axios.patch(`${apiUrl}${api.clearAllNotificaions}${user_id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getPackageDetails = async (package_id) => {
  try {
    const response = await axios.get(
      `${apiUrl}${api.userPackage}${package_id}`
    );
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

export const getCountry = async (code) => {
  try {
    const response = await axios.get(`${apiUrl}${api.country}${code}`);
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
