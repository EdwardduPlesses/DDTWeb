import axios, { AxiosError, AxiosResponse } from "axios";
import LoginModel from "./models/login-model";
import _AuthInterface from "./models/auth-interface";

declare module "axios" {
  export interface AxiosInstance {
    login(email: string, password: string): Promise<AxiosResponse>;
    refreshToken(): Promise<AxiosResponse>;
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
    // Here we catch the error and return a rejected promise
    if (error && (error as AxiosError).response) {
      // If the error is from Axios and has a response, we can use it
      return Promise.reject((error as AxiosError).response);
    }
    // If it's an error without a response, we can reject with a custom message or object
    return Promise.reject(new Error("An error occurred during login"));
  }
};

LoginService.refreshToken = async (): Promise<AxiosResponse> => {
  try {
    // const loginModel: LoginModel = { email: email, password: password };

    const response = await LoginService.post<_AuthInterface>(
      "/Account/RefreshToken"
    );

    return response;
  } catch (error) {
    // Here we catch the error and return a rejected promise
    if (error && (error as AxiosError).response) {
      // If the error is from Axios and has a response, we can use it
      return Promise.reject((error as AxiosError).response);
    }
    // If it's an error without a response, we can reject with a custom message or object
    return Promise.reject(new Error("An error occurred during login"));
  }
};
export default LoginService;
