import axios from "axios";
import api from "../endpoints";
const apiUrl = import.meta.env.VITE_API_URL;

export const getAllPack = async (user_id) => {
  try {
    const response = await axios.get(`${apiUrl}${api.AllPack}${user_id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getActiveCoupons = async () => {
  try {
    const response = await axios.get(`${apiUrl}${api.ActiveCoupons}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const AddFreeTrialAccountAccess = async (data) => {
  try {
    const response = await axios.post(
      `${apiUrl}${api.FreeTrialAccountAccess}`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const AddContactSales = async (data) => {
  try {
    const response = await axios.post(
      `${apiUrl}${api.InsertContactSales}`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const CheckoutPaymentSessionCreate = async (data) => {
  try {
    const response = await axios.post(
      `${apiUrl}${api.CheckoutPaymentSessionInitialize}`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const InsertCheckoutPayment = async (data) => {
  try {
    const response = await axios.post(
      `${apiUrl}${api.InsertCheckoutPaymentData}`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const UpgradeSubscription = async (data) => {
  try {
    const response = await axios.post(
      `${apiUrl}${api.UpdateSubscription}`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const DowngradePackage = async (data) => {
  try {
    const response = await axios.post(`${apiUrl}${api.DowngradePlan}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const UpdateAllUsersPackageData = async () => {
  try {
    const response = await axios.post(
      `${apiUrl}${api.UpdateAllUsersPackageDetails}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
