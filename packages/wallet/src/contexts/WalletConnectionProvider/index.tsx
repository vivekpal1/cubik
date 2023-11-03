/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, PropsWithChildren, useMemo } from 'react';
import {
  createDefaultAddressSelector,
  createDefaultAuthorizationResultCache,
  createDefaultWalletNotFoundHandler,
  SolanaMobileWalletAdapter,
} from '@solana-mobile/wallet-adapter-mobile';
import {
  Adapter,
  SupportedTransactionVersions,
  WalletError,
  WalletName,
} from '@solana/wallet-adapter-base';
import { WalletProvider } from '@solana/wallet-adapter-react';
import { Cluster } from '@solana/web3.js';

import { ICubikTheme } from '../CubikWalletContext';
import { AllLanguage } from '../TranslationProvider/i18n';
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

export interface ICubikWalletConfig {
  autoConnect: boolean;
  metadata?: any;
  env?: any;
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
  theme: string;
  lang?: AllLanguage;
}

export interface ICubikWalletMetadata {
  name: string;
  url: string;
  description: string;
  iconUrls: string[]; // full uri, first icon will be used as main icon (png, jpg, svg)
  additionalInfo?: string;
}

const WalletConnectionProvider: FC<
  PropsWithChildren & {
    wallets: Adapter[];
    config: ICubikWalletConfig;
  }
> = ({ wallets: passedWallets, config, children }) => {
  const wallets = useMemo(() => {
    return [
      new SolanaMobileWalletAdapter({
        addressSelector: createDefaultAddressSelector(),
        appIdentity: {
          uri: config.metadata.url,
          // TODO: Icon support looks flaky
          icon: '',
          name: config.metadata.name,
        },
        authorizationResultCache: createDefaultAuthorizationResultCache(),
        cluster: config.env,
        // TODO: Check if MWA still redirects aggressively.
        onWalletNotFound: createDefaultWalletNotFoundHandler(),
      }),
      ...passedWallets,
      ...(config.hardcodedWallets || []).map(
        (item) => new HardcodedWalletStandardAdapter(item),
      ),
    ];
  }, [
    config.env,
    config.hardcodedWallets,
    config.metadata.name,
    config.metadata.url,
    passedWallets,
  ]);

  return (
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
