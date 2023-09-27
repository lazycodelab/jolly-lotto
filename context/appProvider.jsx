"use client";

import React, { useState, useContext, useEffect } from "react";
import { getSingleProducts } from '@../../lib/api'
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [walletBalance, setWalletBalance] = useState(0);
  const [lotteryProducts, setLotteryProducts] = useState([]);
  // Fetch Lottery Products
  const fetchSingleProducts = async () => {
    let products = await getSingleProducts()
    products = products.filter(prod => !prod.name.includes('test')).sort((a, b) => b.price - a.price)
    setLotteryProducts(products)
  }

  useEffect(() => {
    setWalletBalance(localStorage.getItem('walletBalance') || 0)
    if(walletBalance === 0) fetchSingleProducts()
  }, [walletBalance]);
  
  return (
    <AppContext.Provider
      value={{
        walletBalance,
        setWalletBalance,
        lotteryProducts,
        setLotteryProducts
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