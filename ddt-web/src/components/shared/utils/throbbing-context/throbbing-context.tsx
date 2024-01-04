import React, { createContext, useCallback, useState } from "react";

export const ThrobbingContext = createContext({
  isLoading: false,
  showLoading: () => {},
  hideLoading: () => {},
});

export const ThrobbingContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const showLoading = useCallback(() => setIsLoading(true), []);
  const hideLoading = useCallback(() => setIsLoading(false), []);

  return (
    <ThrobbingContext.Provider value={{ isLoading, showLoading, hideLoading }}>
      {children}
    </ThrobbingContext.Provider>
  );
};
