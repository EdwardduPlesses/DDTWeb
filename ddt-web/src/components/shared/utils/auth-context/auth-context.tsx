import React, { createContext, useState, useEffect } from "react";
import { DecodedToken, decodeToken } from "../jwt-decode";
import { LogoutService } from "../../../../services/logout-service";
import { useSignOut } from "react-auth-kit";
import { useSnackbar } from "../../snackbar/snackbar-context";
import { SnackbarType } from "../../snackbar/models/snackbar-interface";

interface AuthContextValue {
  user: {
    DDT_UserRole: string | undefined;
    isLoggedIn: boolean;
    userName: string;
  };
  login: (userData: DecodedToken) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue>({
  user: { DDT_UserRole: undefined, isLoggedIn: false, userName: "" },
  login: () => {},
  logout: () => {},
});

export const AuthProviderStatus = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [claims, setClaims] = useState<string | undefined>("");
  const [userName, setUserName] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const signOut = useSignOut();
  const snackbar = useSnackbar();

  const login = (userData: DecodedToken) => {
    setClaims(userData.DDT_UserRole);
    setIsLoggedIn(true);
    setUserName(userData.sub[0]);
  };

  const logout = () => {
    signOut();
    setClaims(undefined);
    setIsLoggedIn(false);
    setUserName("");
    LogoutService.logout()
      .then(() => {})
      .catch((error) => {
        console.log(error);
        snackbar.openSnackbar(error, SnackbarType.ERROR);
      });
  };

  useEffect(() => {
    const userData: DecodedToken = decodeToken();
    if (userData.DDT_UserRole !== "") {
      login(userData);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: {
          DDT_UserRole: claims,
          isLoggedIn: isLoggedIn,
          userName: userName,
        },
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
