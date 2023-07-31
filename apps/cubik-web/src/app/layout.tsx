"use client";
import { ChakraProvider } from "@chakra-ui/react";
import dynamic from "next/dynamic";

import { Container, VStack } from "@/utils/chakra";
import theme from "@/config/chakra.config";

import { Plus_Jakarta_Sans } from "next/font/google";
import Header from "@/app/components/layout/header";
import WalletContext from "@/app/components/wallet/context";
import { useWallet } from "@solana/wallet-adapter-react";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const { publicKey } = useWallet();

  return (
    <html lang="en">
      <body className={`${jakarta.className}`}>
        <ChakraProvider theme={theme}>
          <WalletContext>
            <VStack maxW="full" w="100%" h="100vh" p="0" bg="black">
              <Header />
              {children}
            </VStack>
          </WalletContext>
        </ChakraProvider>
      </body>
    </html>
  );
}
