"use client";
import { Center, Text } from "@/utils/chakra";
import Sidebar from "./sidebar";
import User from "./user";
import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import ConnectWallet from "./connect-wallet";
import VerifyWallet from "./verify-wallet";
import { setCookie, deleteCookie } from "cookies-next";
import { usePathname } from "next/navigation";

export interface User {
  username: string;
  profilePicture: string;
  mainWallet: string;
}

const CTA = () => {
  // user data for the dropdown
  const [user, setUser] = useState<User>();
  const { publicKey, connected, disconnect } = useWallet();
  const { setVisible } = useWalletModal();

  const path = usePathname();
  const isCreateProfilePage = path === "/create/profile";

  useEffect(() => {
    if (user) {
      // logout user on wallet change
      if (publicKey?.toString() !== user.mainWallet) {
        disconnect();
        deleteCookie("publicKey");
        setUser(undefined);
        window.location.reload();
      } else {
        setCookie("publicKey", publicKey.toString());
      }
    }
  }, [publicKey, user]);

  return (
    <Center
      h={{ base: "2rem", md: "2.6rem" }}
      justifyContent="flex-end"
      alignItems="end"
      w="full"
      zIndex="99"
    >
      {!isCreateProfilePage && (
        <Center w="fit-content">
          {!user ? (
            <ConnectWallet setUser={setUser} />
          ) : (
            <Text>hello, {user.username}</Text>
          )}
        </Center>
      )}
      <Sidebar />
    </Center>
  );
};

export default CTA;
