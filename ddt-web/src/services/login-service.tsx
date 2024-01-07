import axios, { AxiosError, AxiosResponse } from "axios";
import LoginModel from "./models/login-model";
import _AuthInterface from "./models/auth-interface";

declare module "axios" {
  export interface AxiosInstance {
    login(email: string, password: string): Promise<AxiosResponse>;
    refreshToken(): Promise<AxiosResponse>;
    register(email: string, password: string): Promise<AxiosResponse>;
  }
}

const LoginService = axios.create({
  baseURL: import.meta.env.VITE_DDT_API,
  timeout: 5000,
});

LoginService.login = async (
  email: string,
  password: string
): Promise<AxiosResponse> => {
  const loginModel: LoginModel = { email: email, password: password };
  try {
    const response = await LoginService.post<_AuthInterface>(
      "/Account/Login",
      loginModel
    );

    return response;
  } catch (error) {
    if (error && (error as AxiosError).response) {
      const errorResponse = new Error("Invalid email or password");

      return Promise.reject(errorResponse);
    }
    return Promise.reject(new Error("An error occurred during login"));
  }
};

LoginService.register = async (
  email: string,
  password: string
): Promise<AxiosResponse> => {
  const loginModel: LoginModel = { email: email, password: password };
  try {
    const response = await LoginService.post("/Account/Register", loginModel);

    return response;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (error && axiosError.response) {
      const errorResponse = new Error(
        (axiosError.response?.data as { [key: string]: string[] })[""][0]
      );

      return Promise.reject(errorResponse);
    }
    return Promise.reject(new Error("An error occurred during login"));
  }
};

LoginService.refreshToken = async (): Promise<AxiosResponse> => {
  try {
    const response = await LoginService.post<_AuthInterface>(
      "/Account/RefreshToken"
    );

    return response;
  } catch (error) {
    if (error && (error as AxiosError).response) {
      const errorResponse = new Error("Invalid bearer or refresh token");

      return Promise.reject(errorResponse);
    }
    return Promise.reject(new Error("An error occurred during refresh"));
  }
};
export default LoginService;
