"use client";
import { Button } from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useState } from "react";
import VerifyWallet from "./verify-wallet";

const Header = () => {
  const { setVisible } = useWalletModal();
  const { publicKey } = useWallet();

  const [user, setUser] = useState();

  return (
    <>
      {!publicKey ? (
        <Button
          onClick={() => {
            setVisible(true);
          }}
        >
          Connect Wallet
        </Button>
      ) : (
        <> {!user && <VerifyWallet />} </>
      )}
    </>
  );
};

export default Header;
