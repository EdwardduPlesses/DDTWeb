import React, { createContext, useState, useEffect } from "react";
import { DecodedToken, decodeToken } from "../jwt-decode";

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

  const login = (userData: DecodedToken) => {
    setClaims(userData.DDT_UserRole);
    setIsLoggedIn(true);
    setUserName(userData.sub);
  };

  const logout = () => {
    setClaims(undefined);
    setIsLoggedIn(false);
    setUserName("");
    // Clear token from storage or cookies
  };

  useEffect(() => {
    // Initial check for authentication status
    const userData: DecodedToken = decodeToken();
    console.log(
      "🚀 ~ file: auth-context.tsx:45 ~ useEffect ~ userData:",
      userData
    );
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
