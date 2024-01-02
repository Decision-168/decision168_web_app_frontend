import axios from "axios";
import superAdminApi from "../superAdminEndpoints";
const apiUrl = import.meta.env.VITE_API_URL;

export const getCouponList = async () => {
  const response = await axios.get(`${apiUrl}${superAdminApi.couponList}`);
  return response.data;
};

export const getCouponAndPackageDetail = async (co_id) => {
  const response = await axios.get(
    `${apiUrl}${superAdminApi.couponAndPackageDetail}${co_id}`
  );
  return response.data;
};

export const updateCouponStatus = async (formData) => {
  const response = await axios.patch(
    `${apiUrl}${superAdminApi.updateCouponStatus}`,
    formData
  );
  return response.data;
};
