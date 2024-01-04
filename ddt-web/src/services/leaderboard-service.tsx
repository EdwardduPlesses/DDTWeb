import { api } from "./config/axiosConfig";
import _LeaderboardInterface from "./models/leaderboard-interface";

export const LeaderboardService = {
  getLeaderboard: async function (): Promise<_LeaderboardInterface[]> {
    const response = await api.request<_LeaderboardInterface[]>({
      url: `/Leaderboards/data`,
      method: "GET",
    });

    return response.data;
  },
};
