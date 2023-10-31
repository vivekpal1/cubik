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

import ModalDialog from '../components/ModalDialog';
import WalletModal from '../components/WalletModal';
import { shortenAddress } from '../utils';
import { TranslationProvider } from './TranslationProvider';
import WalletConnectionProvider, {
  IWalletConfig,
} from './WalletConnectionProvider';
import {
  UseWallet,
  useWalletContext,
  WALLET_VALUE_DEFAULT_CONTEXT,
  WalletContext,
  WalletValueContext,
} from './WalletContext';

export type IWalletProps = Omit<
  WalletContextState,
  | 'autoConnect'
  | 'disconnecting'
  | 'sendTransaction'
  | 'signTransaction'
  | 'signAllTransactions'
  | 'signMessage'
>;

const WalletValueProvider = ({ children }: { children: React.ReactNode }) => {
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
    <WalletValueContext.Provider value={value}>
      {children}
    </WalletValueContext.Provider>
  );
};

const WalletContextProvider: React.FC<
  {
    config: IWalletConfig;
  } & PropsWithChildren
> = ({ config, children }) => {
  const { publicKey, wallet, select, connect } = UseWallet();
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
  }, [nonAutoConnectAttempt, wallet?.adapter.name]);

  const [showModal, setShowModal] = useState(false);

  const handleConnectClick = useCallback(
    async (
      event: React.MouseEvent<HTMLElement, globalThis.MouseEvent>,
      adapter: Adapter,
    ) => {
      event.preventDefault();

      try {
        setShowModal(false);

        // Connecting
        config.notificationCallback?.onConnecting({
          publicKey: '',
          shortAddress: '',
          walletName: adapter.name,
          metadata: {
            name: adapter.name,
            url: adapter.url,
            icon: adapter.icon,
            supportedTransactionVersions: adapter.supportedTransactionVersions,
          },
        });

        // Might throw WalletReadyState.WalletNotReady
        select(adapter.name);

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
        config.notificationCallback?.onNotInstalled({
          publicKey: '',
          shortAddress: '',
          walletName: adapter.name,
          metadata: {
            name: adapter.name,
            url: adapter.url,
            icon: adapter.icon,
            supportedTransactionVersions: adapter.supportedTransactionVersions,
          },
        });
      }
    },
    [select, connect, wallet?.adapter.name],
  );

  useEffect(() => {
    // Disconnected
    if (previousWallet && !wallet) {
      config.notificationCallback?.onDisconnect({
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
      return;
    }

    // Connected
    if (publicKey && wallet) {
      config.notificationCallback?.onConnect({
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
      return;
    }
  }, [wallet, publicKey, previousWallet]);

  return (
    <WalletContext.Provider
      value={{
        walletPrecedence: config.walletPrecedence || [],
        handleConnectClick,
        showModal,
        setShowModal,
        walletlistExplanation: config.walletlistExplanation,
        theme: config.theme || 'light',
      }}
    >
      <ModalDialog open={showModal} onClose={() => setShowModal(false)}>
        <WalletModal onClose={() => setShowModal(false)} />
      </ModalDialog>

      {children}
    </WalletContext.Provider>
  );
};

const CubikWalletProvider = ({
  wallets,
  config,
  children,
}: {
  wallets: Adapter[];
  config: IWalletConfig;
  children: React.ReactNode;
}) => {
  return (
    <TranslationProvider lang={config.lang}>
      <WalletConnectionProvider wallets={wallets} config={config}>
        <WalletValueProvider>
          <WalletContextProvider config={config}>
            {children}
          </WalletContextProvider>
        </WalletValueProvider>
      </WalletConnectionProvider>
    </TranslationProvider>
  );
};

export { CubikWalletProvider, UseWallet, useWalletContext };
