/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useContext } from "react";
import { SnackbarType } from "./models/snackbar-interface";

const SnackbarContext = createContext({
  openSnackbar: (_message: string, _type: SnackbarType) => {},
});

export function useSnackbar() {
  return useContext(SnackbarContext);
}

export default SnackbarContext;
