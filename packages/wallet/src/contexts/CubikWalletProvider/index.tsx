/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Adapter, WalletReadyState } from '@solana/wallet-adapter-base';
import {
  useWallet,
  Wallet,
  WalletContextState,
} from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { usePrevious } from 'react-use';

import CubikWalletModal from '../../components/CubikWalletModal';
import ModalDialog from '../../components/ModalDialog';
import { shortenAddress } from '../../libs/utils';
import {
  CubikWalletContext,
  CubikWalletValueContext,
  ICubikTheme,
  useCubikWallet,
  useCubikWalletContext,
} from '../CubikWalletContext';
import { TranslationProvider } from '../TranslationProvider';
import WalletConnectionProvider, {
  ICubikWalletConfig,
} from '../WalletConnectionProvider';

type WalletName = string & { __brand__: 'WalletName' };

function toWalletName(name: string): WalletName {
  return name as unknown as WalletName;
}

export type IWalletProps = Omit<
  WalletContextState,
  | 'autoConnect'
  | 'disconnecting'
  | 'sendTransaction'
  | 'signTransaction'
  | 'signAllTransactions'
  | 'signMessage'
>;

type CubikWalletValueProviderProps = {
  children: React.ReactNode;
};

const CubikWalletValueProvider: React.FC<CubikWalletValueProviderProps> = ({
  children,
}) => {
  const defaultWalletContext = useWallet();

  const value = useMemo(() => {
    return {
      ...defaultWalletContext,
      connect: async () => {
        try {
          return await defaultWalletContext.connect();
        } catch (error) {
          // when wallet is not installed
        }
      },
    };
  }, [defaultWalletContext]);

  return (
    <CubikWalletValueContext.Provider value={value}>
      {children}
    </CubikWalletValueContext.Provider>
  );
};

interface CubikWalletConfig {
  notificationCallback?: any;
  walletlistExplanation?: { href: string };
  theme: string;
  autoConnect: boolean;
  walletPrecedence: WalletName[];
  metadata?: any;
  env?: any;
}

interface CubikWalletContextProviderProps {
  config: CubikWalletConfig;
  children: React.ReactNode;
}

const CubikWalletContextProvider: React.FC<CubikWalletContextProviderProps> = ({
  config,
  children,
}) => {
  const { publicKey, wallet, select, connect } = useCubikWallet();
  const previousPublicKey = usePrevious<PublicKey | null>(publicKey);
  const previousWallet = usePrevious<Wallet | null>(wallet);

  // Weird quirks for autoConnect to require select and connect
  const [nonAutoConnectAttempt, setNonAutoConnectAttempt] = useState(false);
  useEffect(() => {
    if (nonAutoConnectAttempt && !config.autoConnect && wallet?.adapter.name) {
      try {
        connect();
      } catch (error) {
        // when wallet is not installed
      }
      setNonAutoConnectAttempt(false);
    }
  }, [
    config.autoConnect,
    connect,
    nonAutoConnectAttempt,
    wallet?.adapter.name,
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showCubikWalletModal, setShowCubikWalletModal] = useState(false);

  interface Adapter {
    url: any;
    icon: any;
    supportedTransactionVersions?: any;
    readyState: WalletReadyState;
    name: string;
  }

  const handleConnectClick = useCallback(
    async (event: React.MouseEvent, adapter: Adapter) => {
      event.preventDefault();

      try {
        setShowModal(false);

        // Connecting
        if (typeof config.notificationCallback?.onConnecting === 'function') {
          config.notificationCallback.onConnecting({
            publicKey: '',
            shortAddress: '',
            walletName: adapter.name,
            metadata: {
              name: adapter.name,
              url: adapter.url,
              icon: adapter.icon,
              supportedTransactionVersions:
                adapter.supportedTransactionVersions,
            },
          });
        }

        // Might throw WalletReadyState.WalletNotReady
        select(adapter.name as WalletName);

        // Weird quirks for autoConnect to require select and connect
        if (!config.autoConnect) {
          setNonAutoConnectAttempt(true);
        }

        if (adapter.readyState === WalletReadyState.NotDetected) {
          throw WalletReadyState.NotDetected;
        }
      } catch (error) {
        console.log(error);

        // Not Installed
        if (typeof config.notificationCallback?.onNotInstalled === 'function') {
          config.notificationCallback.onNotInstalled({
            publicKey: '',
            shortAddress: '',
            walletName: adapter.name,
            metadata: {
              name: adapter.name,
              url: adapter.url,
              icon: adapter.icon,
              supportedTransactionVersions:
                adapter.supportedTransactionVersions,
            },
          });
        }
      }
    },
    [config.notificationCallback, config.autoConnect, select],
  );

  useEffect(() => {
    // Disconnected
    if (previousWallet && !wallet) {
      if (typeof config.notificationCallback?.onDisconnect === 'function') {
        config.notificationCallback.onDisconnect({
          publicKey: previousPublicKey?.toString() || '',
          shortAddress: shortenAddress(previousPublicKey?.toString() || ''),
          walletName: previousWallet?.adapter.name || '',
          metadata: {
            name: previousWallet?.adapter.name,
            url: previousWallet?.adapter.url,
            icon: previousWallet?.adapter.icon,
            supportedTransactionVersions:
              previousWallet?.adapter.supportedTransactionVersions,
          },
        });
      }
      return;
    }

    // Connected
    if (publicKey && wallet) {
      if (typeof config.notificationCallback?.onConnect === 'function') {
        config.notificationCallback.onConnect({
          publicKey: publicKey.toString(),
          shortAddress: shortenAddress(publicKey.toString()),
          walletName: wallet.adapter.name,
          metadata: {
            name: wallet.adapter.name,
            url: wallet.adapter.url,
            icon: wallet.adapter.icon,
            supportedTransactionVersions:
              wallet.adapter.supportedTransactionVersions,
          },
        });
      }
      return;
    }
  }, [
    wallet,
    publicKey,
    previousWallet,
    config.notificationCallback,
    previousPublicKey,
  ]);

  useEffect(() => {
    if (showModal) {
      setShowCubikWalletModal(true);
    }
  }, [showModal]);

  const handleCloseModal = () => {
    setShowModal(false);
    setShowCubikWalletModal(false);
  };

  return (
    <CubikWalletContext.Provider
      value={{
        handleConnectClick,
        showModal: showCubikWalletModal,
        setShowModal: setShowCubikWalletModal,
        walletlistExplanation: config.walletlistExplanation,
        theme: config.theme as ICubikTheme,
        walletPrecedence: config.walletPrecedence,
      }}
    >
      {/* <ModalDialog open={showModal} onClose={handleCloseModal}>
        {/* ModalDialog content would go here if needed */}
      {/* </ModalDialog> */}
      {showCubikWalletModal && <CubikWalletModal onClose={handleCloseModal} />}

      {children}
    </CubikWalletContext.Provider>
  );
};

const CubikWalletProvider = ({
  wallets,
  config: incomingConfig,
  children,
}: {
  wallets: Adapter[];
  config: ICubikWalletConfig;
  children: React.ReactNode;
}) => {
  const validatedTheme = incomingConfig.theme ?? 'cubik';

  const walletPrecedenceWithDefaults: WalletName[] =
    incomingConfig.walletPrecedence
      ? incomingConfig.walletPrecedence.map(toWalletName)
      : ['defaultWallet'].map(toWalletName);

  const configWithDefaults: CubikWalletConfig = {
    ...incomingConfig,
    theme: validatedTheme,
    notificationCallback: incomingConfig.notificationCallback || {
      onConnecting: () => {},
      onDisconnect: () => {},
      onConnect: () => {},
      onNotInstalled: () => {},
    },
    walletPrecedence: walletPrecedenceWithDefaults,
    metadata: incomingConfig.metadata || {},
    env: incomingConfig.env || 'production',
  };

  return (
    <TranslationProvider lang={incomingConfig.lang}>
      <WalletConnectionProvider wallets={wallets} config={configWithDefaults}>
        <CubikWalletValueProvider>
          <CubikWalletContextProvider config={configWithDefaults}>
            {children}
          </CubikWalletContextProvider>
        </CubikWalletValueProvider>
      </WalletConnectionProvider>
    </TranslationProvider>
  );
};

export { CubikWalletProvider, useCubikWallet, useCubikWalletContext };
