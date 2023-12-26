import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

let hasTokenBeenDecoded = false;
export const decodeToken = () => {
  if (hasTokenBeenDecoded) {
    return null;
  }
  try {
    const token = localStorage.getItem("token");

    if (token) {
      const parsedToken = JSON.parse(token);
      const decoded = jwtDecode(parsedToken);
      hasTokenBeenDecoded = true;
      return decoded;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};
