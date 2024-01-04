import { useContext } from "react";
import { ThrobbingContext } from "./throbbing-context";
export const useLoading = () => useContext(ThrobbingContext);
