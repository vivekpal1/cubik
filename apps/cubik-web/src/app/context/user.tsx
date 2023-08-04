import { publicKey } from "@coral-xyz/anchor/dist/cjs/utils";
import { useWallet } from "@solana/wallet-adapter-react";
import React, { createContext, useContext, useEffect, useState } from "react";

export interface User {
  username: string;
  profilePicture: string;
  mainWallet: string;
}

interface UserContextType {
  user: User | null;
  setUser: (userData: User | null) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  logout: () => {},
});

export const useUser = () => useContext(UserContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const { publicKey, disconnect } = useWallet();

  const logout = () => {
    setUser(null);
    disconnect();
  };

  useEffect(() => {
    if (user) {
      if (!publicKey) {
        setUser(null);
        return;
      }
      if (publicKey!.toString() !== user.mainWallet) {
        disconnect();
        setUser(null);
        return;
      }
    }
  }, [publicKey, user]);

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
