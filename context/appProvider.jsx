"use client";

import React, { useState, useContext, useEffect } from "react";
import { getSingleProducts } from '@../../lib/api'
import { useAuth } from '@/../hooks/auth'
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const { user } = useAuth()
  const [walletBalance, setWalletBalance] = useState('');
  const [lotteryProducts, setLotteryProducts] = useState([]);
  // Fetch Lottery Products
  const fetchSingleProducts = async () => {
    let products = await getSingleProducts()
    products = products.filter(prod => !prod.name.includes('test')).sort((a, b) => b.price - a.price)
    setLotteryProducts(products)
  }

  useEffect(() => {
    if(walletBalance === '') fetchSingleProducts()
    setTimeout(() => {
      if (user) {
        setWalletBalance(user.wallet.withDrawal)
			}
    }, 500);
  }, [user]);
  
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