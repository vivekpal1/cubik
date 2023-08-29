"use client";
import { AuthCheckReturn, AuthVerifyReturn } from "@/types/auth";
import { Box, Button, Center, Spinner, useDisclosure } from "@/utils/chakra";
import { createMessage } from "@/utils/helpers/getSignatureMessage";
import { utils } from "@coral-xyz/anchor";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { VerifyModal } from "./verifyModal";
import { decodeToken, handleLogout } from "@/utils/helpers/auth";
import { useUser } from "@/app/context/user";
import UserNavbarMenuButton from "../cta/user-navbar-menu";

export const WalletConnect = () => {
  const { connected, publicKey, disconnect, signMessage } = useWallet();
  const { setVisible } = useWalletModal();
  const [modalStatus, setModalStatus] = useState<"NEW_USER" | "EXISTING_USER">(
    "NEW_USER"
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { setUser, user } = useUser();
  const { isOpen, onClose, onOpen } = useDisclosure();
  useEffect(() => {
    const connect = async () => {
      if (connected && publicKey && !user) {
        try {
          setIsLoading(true);
          const res = await fetch("/api/auth/check", {
            method: "POST",
            body: JSON.stringify({
              wallet: publicKey.toBase58(),
            }),
            cache: "no-cache",
          });
          const checkResponse = (await res.json()) as AuthCheckReturn;

          if (checkResponse.data?.type === "USER_FOUND") {
            // ********* Create token with verify message *********
            setModalStatus("EXISTING_USER");
            onOpen();
            return;
          }
          if (
            checkResponse.data?.type === "AUTHENTICATED_USER" &&
            checkResponse.data.accessToken
          ) {
            // ********* Set User *********
            const user = await decodeToken(checkResponse.data.accessToken);
            if (user) {
              setUser({
                id: user.id,
                mainWallet: user.mainWallet,
                profilePicture: user.profilePicture,
                username: user.username,
              });
              setIsLoading(false);
            } else {
              disconnect();
              await handleLogout();
              throw new Error("Failed to decode token");
            }
            return;
          }

          if (
            checkResponse.data?.type === "NEW_WALLET" ||
            checkResponse.data?.type === "EXISTING_WALLET"
          ) {
            // ********* Take sign message &&  Create User flow ************
            setModalStatus("NEW_USER");
            onOpen();
            return;
          }

          throw new Error("Failed to connect");
        } catch (error) {
          console.log(error);
          return setIsLoading(false);
        }
      }
    };
    connect();
  }, [publicKey]);

  if (!connected && !publicKey && !user) {
    return (
      <Center
        h={{ base: "2rem", md: "2.6rem" }}
        justifyContent="flex-end"
        alignItems="end"
        w="max"
        zIndex="99"
      >
        <Button
          onClick={() => setVisible(true)}
          variant="cubikFilled"
          size={{ base: "cubikMini", md: "cubikSmall" }}
        >
          Connect Wallet
        </Button>
      </Center>
    );
  }
  if (connected && publicKey && !user && isLoading) {
    return (
      <>
        <VerifyModal
          setUser={setUser}
          router={router}
          signMessage={signMessage}
          disconnect={disconnect}
          isOpen={isOpen}
          onClose={onClose}
          status={modalStatus}
          publicKey={publicKey.toBase58()}
        />
        <Spinner
          onClick={() => disconnect()}
          thickness="2px"
          speed="0.65s"
          emptyColor="gray.200"
          color="cubik"
          size="sm"
        />
      </>
    );
  }

  return (
    <>
      <UserNavbarMenuButton />
    </>
  );
};