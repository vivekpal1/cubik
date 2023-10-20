"use client";
import { VerifyModal } from "@/components/modals/verifyModal";
import { Button, Input } from "@cubik/ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useEffect, useState } from "react";
export default function Home() {
  const { setVisible } = useWalletModal();
  const { publicKey } = useWallet();
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleLogin = () => {
      try {
        if (publicKey) {
          setOpen(true);
        } else {
          throw new Error("Pubkey not found");
        }
      } catch (error) {
        console.log(error);
      }
    };
    handleLogin();
  }, [publicKey]);

  return (
    <>
      <VerifyModal open={open} setOpen={setOpen} />
      <Button onClick={() => setVisible(true)} variant={"link"}>
        {publicKey ? publicKey.toBase58() : "Connect Wallet"}
      </Button>
    </>
  );
}
