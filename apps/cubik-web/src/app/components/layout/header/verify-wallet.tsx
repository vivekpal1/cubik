"use client";

import {
  Box,
  Button,
  Center,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
} from "@/utils/chakra";
import { WalletAddress } from "../../common/wallet";
import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import {
  createMessage,
  verifyMessage,
} from "@/utils/helpers/getSignatureMessage";
import * as anchor from "@coral-xyz/anchor";
import { getOrCreateUser } from "./get-user";
import { useRouter } from "next/router";
import { redirect } from "next/navigation";
import { useTransition } from "react";

const VerifyWallet = () => {
  const { publicKey, disconnect, signMessage } = useWallet();
  const [isLoading, setIsLoading] = useState(false);

  const verify = async () => {
    if (!publicKey && !signMessage) return;

    try {
      setIsLoading(true);

      const msg = await createMessage();
      const sig = anchor.utils.bytes.bs58.encode(await signMessage!(msg));

      await verifyMessage(sig, publicKey!);
      const userExists = await getOrCreateUser(publicKey!.toString());

      console.log(userExists);

      if (!userExists) {
        window.location.href = "/create-profile";
      }
    } catch (error) {
      await disconnect();
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <Modal
      variant="cubik"
      isOpen={true}
      onClose={async () => {
        // await disconnect();
        // localStorage.removeItem("anon_sig");
        // localStorage.removeItem("wallet_auth");
        // setUser(null);
        // onClose();
        // FailureToast({
        //   toast,
        //   message: "Wallet Verification Failed",
        // });
        // localStorage.removeItem("walletName");
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <HStack>
            <Box
              as="p"
              textStyle={{ base: "title3", md: "title2" }}
              color="neutral.11"
            >
              Verify Wallet
            </Box>
            {publicKey && (
              <Center
                backgroundColor={"neutral.5"}
                p={{ base: "6px 10px", md: "8px 12px" }}
                rounded="8px"
              >
                <WalletAddress
                  size="xs"
                  walletAddress={publicKey?.toBase58()}
                />
              </Center>
            )}
          </HStack>
        </ModalHeader>
        <ModalBody>
          <VStack pt="16px" align={"start"} gap="16px">
            <Box
              as="p"
              textStyle={{ base: "body5", md: "body3" }}
              color="white"
            >
              Verify Wallet to prove ownership. No SOL will be charged
            </Box>{" "}
            {/* {verifyWalletError && (
              <Alert status="error" variant="cubik">
                <AlertIcon />
                <AlertDescription
                  fontSize={{ base: "10px", md: "11px", xl: "12px" }}
                  lineHeight={{ base: "14px", md: "14px", xl: "16px" }}
                >
                  {verifyWalletError}
                </AlertDescription>
              </Alert>
            )} */}
          </VStack>
        </ModalBody>

        <ModalFooter display="flex" justifyContent="space-between">
          <Button
            variant={"cubikOutlined"}
            onClick={async () => {
              await disconnect();
              //   localStorage.removeItem("anon_sig");
              //   localStorage.removeItem("wallet_auth");
              //   setUser(null);
              //   onClose();
              //   FailureToast({
              //     toast,
              //     message: "Wallet Verification Failed",
              //   });
              //   localStorage.removeItem("walletName");
            }}
          >
            Cancel
          </Button>

          <Button
            variant={"cubikFilled"}
            loadingText="Verifying"
            onClick={verify}
            isLoading={isLoading}
          >
            {"Verify Wallet"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default VerifyWallet;
