/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useMemo } from 'react';
import CodeComponent from '@/app/home-page-components/code-component';
import PageHOC from '@/app/home-page-components/components/pageHOC';
import {
  CoinbaseWalletAdapter,
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TrustWalletAdapter,
  WalletConnectWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { TransactionVersion } from '@solana/web3.js';

import {
  Adapter,
  AllLanguage,
  BaseSignerWalletAdapter,
  ConnectWalletButton,
  CubikWalletProvider,
  ICubikTheme,
  WalletAdapterNetwork,
} from '@cubik/wallet';

import {
  metadata,
  WalletAdapterWithMutableSupportedTransactionVersions,
} from './constants';

const Page = () => {
  const wallets: Adapter[] = useMemo(() => {
    const walletConnectWalletAdapter: WalletAdapterWithMutableSupportedTransactionVersions<BaseSignerWalletAdapter> | null =
      (() => {
        const adapter: WalletAdapterWithMutableSupportedTransactionVersions<BaseSignerWalletAdapter> =
          new WalletConnectWalletAdapter({
            network: WalletAdapterNetwork.Mainnet,
            options: {
              relayUrl: 'wss://relay.walletconnect.com',
              projectId: metadata.walletConnectProjectId,
              metadata: {
                name: metadata.name,
                description: metadata.description,
                url: metadata.url,
                icons: metadata.iconUrls,
              },
            },
          });

        adapter.supportedTransactionVersions = new Set([
          'legacy',
        ] as TransactionVersion[]);
        return adapter;
      })();

    return [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new CoinbaseWalletAdapter(),
      new TrustWalletAdapter(),
      walletConnectWalletAdapter,
    ].filter((item) => item && item.name && item.icon) as Adapter[];
  }, []);

  const notificationCallback = {
    onConnect: (notification: any) => {
      console.log('Wallet connected:', notification);
    },
    onConnecting: (notification: any) => {
      console.log('Wallet connecting:', notification);
    },
    onDisconnect: (notification: any) => {
      console.log('Wallet disconnected:', notification);
    },
    onNotInstalled: (notification: any) => {
      console.log('Wallet not installed:', notification);
    },
  };

  const params: Omit<Parameters<typeof CubikWalletProvider>[0], 'children'> =
    useMemo(
      () => ({
        wallets: wallets,
        config: {
          autoConnect: false,
          env: 'mainnet-beta',
          metadata: {
            name: 'CubikWallet',
            description: 'Cubik Wallet',
            url: 'https://cubik.so',
            iconUrls: ['https://cubik.so/favicon.ico'],
          },
          notificationCallback: notificationCallback,
          walletlistExplanation: {
            href: 'https://squaredocs.cubik.so/wallet/wallet-list',
          },
          theme: 'cubik',
          lang: 'en',
        },
      }),
      [notificationCallback, wallets],
    );

  return (
    <>
      <PageHOC
        pages={[
          { name: 'Component', href: '/component', current: false },
          { name: 'Wallet', href: '/component/wallet', current: true },
        ]}
        heading={'Wallet'}
        description=""
      >
        <div tw="flex flex-col items-start">
          <div className="border-[var(--color-border-primary) overflow-hidden rounded-[8px] border bg-[var(--white)] px-6 py-4">
            <CodeComponent codeString='import { ConnectWalletButton, CubikWalletProvider, WalletAdapterNetwork } from "@cubik/wallet"' />
          </div>
          <CubikWalletProvider {...params}>
            <ConnectWalletButton />
          </CubikWalletProvider>
        </div>
      </PageHOC>
    </>
  );
};

export default Page;
