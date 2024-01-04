/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { createRefresh } from "react-auth-kit";
import RefreshTokenModel from "../models/refresh-token-model";
import { AuthStateUserObject } from "react-auth-kit/dist/types";

interface RefreshTokenCallbackResponse {
  isSuccess: boolean;
  newAuthToken: string;
  newAuthTokenExpireIn?: number;
  newRefreshTokenExpiresIn?: number;
  newAuthUserState?: AuthStateUserObject | null;
  newRefreshToken: string;
}

const refreshApiService = axios.create({
  baseURL: import.meta.env.VITE_DDT_API,
  timeout: 5000,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

const refreshApi = createRefresh({
  interval: 0.1,
  refreshApiCallback: async ({
    authToken,
    refreshToken,
    authUserState,
  }): Promise<RefreshTokenCallbackResponse> => {
    try {
      const encodedToken = encodeURIComponent(refreshToken ?? "");
      const response = await refreshApiService.post<RefreshTokenModel>(
        `/Account/RefreshToken?authenticationToken=${authToken}&refreshToken=${encodedToken}`
      );

      return {
        isSuccess: true,
        newAuthToken: response.data.authenticationToken,
        newAuthTokenExpireIn: 10,
        newRefreshTokenExpiresIn: 60,
        newRefreshToken: response.data.refreshToken,
        newAuthUserState: authUserState,
      };
    } catch (error) {
      console.error(error);
      return {
        isSuccess: false,
        newAuthToken: authToken?.toString() ?? "",
        newRefreshToken: refreshToken?.toString() ?? "",
      };
    }
  },
});

export default refreshApi;
