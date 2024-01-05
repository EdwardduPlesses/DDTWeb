import { api } from "./config/axiosConfig";
import { _Actual } from "./models/actual-interface";
import { _Guess } from "./models/guess-interface";

export const TimeEntryService = {
  postGuess: async function (guess: _Guess): Promise<boolean> {
    const response = await api.request<boolean>({
      url: `/time-entries/guess`,
      method: "POST",
      data: guess,
    });
    return response.data !== null;
  },
  postActual: async function (actual: _Actual): Promise<boolean> {
    const response = await api.request<boolean>({
      url: `/time-entries/actual`,
      method: "POST",
      data: actual,
    });
    return response.data !== null;
  },
};
