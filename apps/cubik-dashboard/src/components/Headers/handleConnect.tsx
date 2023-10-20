import { Button } from "@/utils/ui";

import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import React from "react";

export const HandleConnect = () => {
  const { setVisible } = useWalletModal();
  const { publicKey } = useWallet();
  return (
    <>
      <Button onClick={() => setVisible(true)}>
        {publicKey ? publicKey?.toBase58() : "Connect Wallet"}
      </Button>
    </>
  );
};
