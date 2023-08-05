"use client";
import { Box } from "@/utils/chakra";
import React from "react";
import { useWallet } from "@solana/wallet-adapter-react";

interface Props {
  children: React.JSX.Element | React.JSX.Element[];
}
const ProfileLayout = ({ children }: Props) => {
  const { publicKey } = useWallet();
  return <>{publicKey ? <Box mt={10}>{children}</Box> : <>Connect Wallet</>}</>; // update to wallet connet button
};

export default ProfileLayout;
