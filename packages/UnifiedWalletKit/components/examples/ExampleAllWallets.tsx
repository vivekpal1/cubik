import React, { useMemo } from 'react';
import {
  BaseSignerWalletAdapter,
  WalletAdapterNetwork,
  WalletName,
} from '@solana/wallet-adapter-base';
import * as AllWalletAdapters from '@solana/wallet-adapter-wallets';

import { UnifiedWalletButton } from '..';
import { UnifiedWalletProvider } from '../../contexts/UnifiedWalletProvider';
import { HARDCODED_WALLET_STANDARDS } from '../../misc/constants';
import {
  metadata,
  WalletAdapterWithMutableSupportedTransactionVersions,
} from './constants';
import WalletNotification from './WalletNotification';

export const MWA_NOT_FOUND_ERROR = 'MWA_NOT_FOUND_ERROR';

const ExampleAllWallets: React.FC = () => {
  const wallets = useMemo(() => {
    if (typeof window === 'undefined') {
      return [];
    }

    const {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      UnsafeBurnerWalletAdapter: _,
      WalletConnectWalletAdapter,
      ...allwalletAdapters
    } = AllWalletAdapters;

    const walletAdapters = Object.keys(allwalletAdapters)
      .filter((key) => key.includes('Adapter'))
      .map((key) => (allwalletAdapters as any)[key])
      .map((WalletAdapter: any) => new WalletAdapter()); // Intentional any, TS were being annoying

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

        // While sometimes supported, it mostly isn't. Should this be dynamic in the wallet-adapter instead?
        adapter.supportedTransactionVersions = new Set(['legacy']);
        return adapter;
      })();

    return [...walletAdapters, walletConnectWalletAdapter].filter(
      (item) => item && item.name && item.icon,
    );
  }, [metadata]);

  const params: Omit<Parameters<typeof UnifiedWalletProvider>[0], 'children'> =
    useMemo(
      () => ({
        wallets: wallets,
        config: {
          autoConnect: false, // should the wallet connect automatically
          env: 'mainnet-beta', // which Solana network should the wallet connect to
          metadata: {
            name: 'UnifiedWallet',
            description: 'UnifiedWallet',
            url: 'https://jup.ag',
            iconUrls: ['https://jup.ag/favicon.ico'],
          }, // metadata to include when a DApp connects
          notificationCallback: WalletNotification, // the callback to use when a wallet connects/disconnects ( this i think we should pass from the outside)
          walletPrecedence: [
            'OKX Wallet' as WalletName,
            'WalletConnect' as WalletName,
          ], // which wallet should be the first one to try and connect
          hardcodedWallets: HARDCODED_WALLET_STANDARDS, // hardcoded wallets to include, see below
          walletlistExplanation: {
            href: '',
          }, // explanation to show when a user clicks the "Why is my wallet not listed?" link
        },
      }),
      [wallets],
    );

  return (
    <div>
      <UnifiedWalletProvider {...params}>
        <UnifiedWalletButton />
      </UnifiedWalletProvider>
    </div>
  );
};

export default ExampleAllWallets;
