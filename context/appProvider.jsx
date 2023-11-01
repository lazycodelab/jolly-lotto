"use client";

import React, { useState, useContext, useEffect, useRef } from "react";
import { getSingleProducts } from '@../../lib/api'
import { useAuth } from '@/../hooks/auth'
import { usePathname } from 'next/navigation'
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const { user } = useAuth()
  const pathname = usePathname();
  const [walletBalance, setWalletBalance] = useState('');
  const [lotteryProducts, setLotteryProducts] = useState([]);
  const fetchInProgressRef = useRef(false);
  // Fetch Lottery Products
  const fetchSingleProducts = async () => {
    let products = await getSingleProducts()
    products = products.filter(prod => !prod.name.includes('test')).sort((a, b) => b.price - a.price)
    setLotteryProducts(products)
  }
  // Email Verification
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isResetBtnDisable , setIsResetBtnDisable] = useState(false)
  const [isEmailVerified, setIsEmailVerified] = useState(true)
  // useEffect(() => {
	// 	if (isModalOpen === true) {
	// 		setTimeout(() => {
	// 			setIsResetBtnDisable(false);
	// 		}, 300000); // 5mins
	// 	}
	// }, [isModalOpen])

  useEffect(() => {
    setTimeout(() => {
      if (user) {
        setWalletBalance(user.wallet.withDrawal)
        setIsEmailVerified(user.status.isEmailConfirmed)
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

  useEffect(() => {
    if (isEmailVerified === false) {
      setIsModalOpen(true)
    } else {
      setIsModalOpen(false)
    }
  }, [isEmailVerified,pathname])
  
  return (
    <AppContext.Provider
      value={{
        walletBalance,
        setWalletBalance,
        lotteryProducts,
        setLotteryProducts,
        isModalOpen,
        setIsModalOpen,
        isResetBtnDisable,
        setIsResetBtnDisable,
        isEmailVerified
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