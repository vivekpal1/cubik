import React, { FC, PropsWithChildren, useMemo } from 'react';
import {
  Adapter,
  SupportedTransactionVersions,
  WalletError,
  WalletName,
} from '@solana/wallet-adapter-base';
import { WalletProvider } from '@solana/wallet-adapter-react';
import { Cluster } from '@solana/web3.js';

import { IUnifiedTheme } from '../UnifiedWalletContext';
import HardcodedWalletStandardAdapter, {
  IHardcodedWalletStandardAdapter,
} from './HardcodedWalletStandardAdapter';
import { PreviouslyConnectedProvider } from './previouslyConnectedProvider';

const noop = (error: WalletError, adapter?: Adapter) => {
  console.log({ error, adapter });
};

export interface IWalletNotification {
  publicKey: string;
  shortAddress: string;
  walletName: string;
  metadata: {
    name: string;
    url: string;
    icon: string;
    supportedTransactionVersions?: SupportedTransactionVersions;
  };
}

export interface IUnifiedWalletConfig {
  autoConnect: boolean;
  metadata: IUnifiedWalletMetadata;
  env: Cluster;
  walletPrecedence?: WalletName[];
  hardcodedWallets?: IHardcodedWalletStandardAdapter[];
  notificationCallback?: {
    onConnect: (props: IWalletNotification) => void;
    onConnecting: (props: IWalletNotification) => void;
    onDisconnect: (props: IWalletNotification) => void;
    onNotInstalled: (props: IWalletNotification) => void;
    // TODO: Support wallet account change
    // onChangeAccount: (props: IWalletNotification) => void,
  };
  walletlistExplanation?: {
    href: string;
  };
  // Default to light
  theme?: IUnifiedTheme;
}

export interface IUnifiedWalletMetadata {
  name: string;
  url: string;
  description: string;
  iconUrls: string[]; // full uri, first icon will be used as main icon (png, jpg, svg)
  additionalInfo?: string;
}

const WalletConnectionProvider: FC<
  PropsWithChildren & {
    wallets: Adapter[];
    config: IUnifiedWalletConfig;
  }
> = ({ wallets: passedWallets, config, children }) => {
  const wallets = useMemo(() => {
    return [
      ...passedWallets,
      ...(config.hardcodedWallets || []).map(
        (item) => new HardcodedWalletStandardAdapter(item),
      ),
    ];
  }, []);

  return (
    //  WalletProvider is responsible for handling wallet connections and events (connect, disconnect, error)
    <WalletProvider
      wallets={wallets}
      autoConnect={config.autoConnect}
      onError={noop}
    >
      <PreviouslyConnectedProvider>{children}</PreviouslyConnectedProvider>
    </WalletProvider>
  );
};

export default WalletConnectionProvider;
