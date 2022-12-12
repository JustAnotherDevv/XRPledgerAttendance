import React, { useState } from "react";
//import { useAccountData } from "./hooks/useAccountData";

export const Context = React.createContext({
  publicKey: "",
  privateKey: "",
  classicAddress: "",
  seed: "",
});
export const ContextProvider = ({ children }) => {
  //const [localWallet, changeWallet] = useAccountData();
  const [localWallet, setLocalWallet] = useState({
    publicKey: "",
    privateKey: "",
    classicAddress: "",
    seed: "",
  });

  return (
    <Context.Provider value={{ localWallet, setLocalWallet }}>
      {children}
    </Context.Provider>
  );
};
