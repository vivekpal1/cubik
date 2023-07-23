'use client';

import { ChakraProvider } from '@chakra-ui/react';
import dynamic from 'next/dynamic';

import { Container } from '../utils/chakra';
import theme from '~/config/chakra.config';
import Head from 'next/head';

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
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
          rel="stylesheet"
        />
      </Head>
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
