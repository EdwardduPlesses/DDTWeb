import { useState, useCallback } from "react";
import Snackbar from "./snackbar";
import { SnackbarType } from "./models/snackbar-interface";
import SnackbarContext from "./snackbar-context";

export function SnackbarProvider({ children }: { children: React.ReactNode }) {
  const [snackbar, setSnackbar] = useState({
    message: "",
    type: SnackbarType.INFO,
  });

  const openSnackbar = useCallback((message: string, type: SnackbarType) => {
    setSnackbar({ message: message, type: type });
  }, []);

  return (
    <SnackbarContext.Provider value={{ openSnackbar }}>
      {children}
      {snackbar.message != "" && (
        <Snackbar message={snackbar.message} type={snackbar.type} />
      )}
    </SnackbarContext.Provider>
  );
}
