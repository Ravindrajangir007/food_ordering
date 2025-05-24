import React, { createContext, useState, useEffect, useContext } from "react";
import { fetchWalletBalance } from "../service/homeService";

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [walletBalance, setWalletBalance] = useState(0);

  const loadWalletBalance = async () => {
    try {
      const data = await fetchWalletBalance();
      setWalletBalance(data.balance);
    } catch (error) {
      console.error("Failed to fetch wallet balance", error);
    }
  };

  useEffect(() => {
    loadWalletBalance();
  }, []);

  return (
    <WalletContext.Provider
      value={{
        walletBalance,
        setWalletBalance,
        reloadWalletBalance: loadWalletBalance,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
