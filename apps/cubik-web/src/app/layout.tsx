"use client";

import { Box, ChakraProvider } from "@chakra-ui/react";
import dynamic from "next/dynamic";

import { Container, VStack } from "@/utils/chakra";
import theme from "@/config/chakra.config";

import { Plus_Jakarta_Sans } from "next/font/google";
import Header from "@/app/components/layout/header";
import WalletContext from "@/app/components/wallet/context";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${jakarta.className}`}>
        <WalletContext>
          <ChakraProvider theme={theme}>
            <VStack maxW="full" w="100%" h="100vh" p="0" bg="black">
              <Header />
              <Box w="full" pt={10}>
                {children}
              </Box>
            </VStack>
          </ChakraProvider>
        </WalletContext>
      </body>
    </html>
  );
}
