import { api } from "./config/axiosConfig";

export const LogoutService = {
  logout: async function (): Promise<void> {
    await api.request({
      url: `/Account/Logout`,
      method: "POST",
    });
  },
};
