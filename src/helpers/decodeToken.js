import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

let hasTokenBeenDecoded = false;
export const decodeToken = () => {
    if (hasTokenBeenDecoded) {
        console.log("Token has already been decoded.");
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
            console.error("Token not found in local storage");
            return null;
        }
    } catch (error) {
        console.error("Error decoding or parsing token:", error);
        return null;
    }
}