"use client";

import React, { useState, useContext, useEffect } from "react";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [walletBalance, setWalletBalance] = useState(0);

  useEffect(() => {
    setWalletBalance(localStorage.getItem('walletBalance') || 0)
  }, [walletBalance]);
  
  return (
    <AppContext.Provider
      value={{
        walletBalance,
        setWalletBalance
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };