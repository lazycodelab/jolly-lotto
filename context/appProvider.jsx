"use client";

import React, { useState, useContext, useEffect, useRef } from "react";
import { getSingleProducts } from '@../../lib/api'
import { useAuth } from '@/../hooks/auth'
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const { user } = useAuth()
  const [walletBalance, setWalletBalance] = useState('');
  const [lotteryProducts, setLotteryProducts] = useState([]);
  const fetchInProgressRef = useRef(false);
  // Fetch Lottery Products
  const fetchSingleProducts = async () => {
    let products = await getSingleProducts()
    products = products.filter(prod => !prod.name.includes('test')).sort((a, b) => b.price - a.price)
    setLotteryProducts(products)
  }

  useEffect(() => {
    setTimeout(() => {
      if (user) {
        setWalletBalance(user.wallet.withDrawal)
			}
    }, 500);

    if (!fetchInProgressRef.current) {
      fetchInProgressRef.current = true;
      fetchSingleProducts().then(() => {
        fetchInProgressRef.current = false;
      })
      .catch((error) => {
        fetchInProgressRef.current = false;
      });
    }
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