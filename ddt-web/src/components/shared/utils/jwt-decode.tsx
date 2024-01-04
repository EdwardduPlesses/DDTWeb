import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

export interface DecodedToken {
  DDT_UserRole: string;
  sub: string[];
}

export const decodeToken = (): DecodedToken => {
  const token = Cookies.get("_auth");
  if (token) {
    try {
      return jwt_decode(token);
    } catch (e) {
      console.error("Error decoding token", e);
    }
  }
  return { DDT_UserRole: "", sub: [""] };
};
