'use client';

import { ChakraProvider } from '@chakra-ui/react';
import dynamic from 'next/dynamic';

import { Container } from '../utils/chakra';
import theme from '~/config/chakra.config';

const WalletContext: any = dynamic(() => import('../context/wallet-context'), {
  ssr: false,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <WalletContext>
          <ChakraProvider theme={theme}>
            <Container maxW="full" w="100%" h="100vh" p="0">
              {children}
            </Container>
          </ChakraProvider>
        </WalletContext>
      </body>
    </html>
  );
}
