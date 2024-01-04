import React, { createContext, useState, useEffect } from "react";
import { DecodedToken, decodeToken } from "./jwt-decode";

interface AuthContextValue {
  user: {
    DDT_UserRole: string | undefined;
    isLoggedIn: boolean;
    userName: string;
  };
}

export const AuthContext = createContext<AuthContextValue>({
  user: { DDT_UserRole: undefined, isLoggedIn: false, userName: "" },
});

export const AuthProviderStatus = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [claims, setClaims] = useState<string | undefined>("");
  const [userName, setUserName] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const checkAuthStatus = () => {
      const userData: DecodedToken = decodeToken();
      setClaims(userData.DDT_UserRole);
      if (userData.DDT_UserRole === "") {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
        setUserName(userData.sub);
      }
    };

    checkAuthStatus();
    window.addEventListener("authChange", checkAuthStatus);

    return () => {
      window.removeEventListener("authChange", checkAuthStatus);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: { DDT_UserRole: claims, isLoggedIn, userName: userName } }}
    >
      {children}
    </AuthContext.Provider>
  );
};
