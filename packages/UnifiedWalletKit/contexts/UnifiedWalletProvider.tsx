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

import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
} from '@cubik/ui';

import { ModalHeader } from '../../ui/components/ui/Modal';
import { Icon } from '../../ui/icons/icon';
//import ModalDialog from '../components/ModalDialog';
import UnifiedWalletModal from '../components/UnifiedWalletModal';
import { shortenAddress } from '../misc/utils';
import {
  UnifiedWalletContext,
  UnifiedWalletValueContext,
  useUnifiedWallet,
  useUnifiedWalletContext,
} from './UnifiedWalletContext';
import WalletConnectionProvider, {
  IUnifiedWalletConfig,
} from './WalletConnectionProvider';

export type IWalletProps = Omit<
  WalletContextState,
  | 'autoConnect'
  | 'disconnecting'
  | 'sendTransaction'
  | 'signTransaction'
  | 'signAllTransactions'
  | 'signMessage'
>;

const UnifiedWalletValueProvider = ({
  children,
}: {
  children: React.ReactNode;
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
    <UnifiedWalletValueContext.Provider value={value}>
      {children}
    </UnifiedWalletValueContext.Provider>
  );
};

const UnifiedWalletContextProvider = ({
  config,
  children,
}: {
  config: IUnifiedWalletConfig;
} & PropsWithChildren) => {
  const { publicKey, wallet, select, connect } = useUnifiedWallet();
  const previousPublicKey = usePrevious<PublicKey | null>(publicKey);
  const previousWallet = usePrevious<Wallet | null>(wallet);
  console.log('wallet from unified wallet context provider ', wallet);
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
    <UnifiedWalletContext.Provider
      value={{
        walletPrecedence: config.walletPrecedence || [],
        handleConnectClick,
        showModal,
        setShowModal,
        walletlistExplanation: config.walletlistExplanation,
      }}
    >
      <>
        <Drawer
          //  snapPoints={['200px']}
          //  activeSnapPoint={'200px'}
          open={showModal}
          onOpenChange={setShowModal}
        >
          <DrawerOverlay />
          <DrawerPortal>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerHeader>
                <ModalHeader
                  heading={'Connect Wallet'}
                  headingSize={'xs'}
                  onClose={() => setShowModal(false)}
                />
              </DrawerHeader>
              <DrawerBody>
                <UnifiedWalletModal onClose={() => setShowModal(false)} />
              </DrawerBody>
              <div className="w-full h-[1px] bg-[var(--color-border-primary)]" />
              <DrawerFooter>
                <div className="flex flex-col px-6 py-4">
                  <div className="flex item-start space-x-3">
                    <Icon
                      name="eyeClose2"
                      strokeWidth={1.5}
                      className="min-w-[18px]"
                      stroke="var(--color-fg-tertiary)"
                      fill="none"
                      width={18}
                      height={18}
                    />
                    <span className="text-[12px] text-[var(--color-fg-tertiary)]">
                      View only permissions. We will never do anything without
                      your approval.
                    </span>
                  </div>
                  <div className="flex item-start space-x-3 mt-4">
                    <Icon
                      name="shieldCheck"
                      strokeWidth={1.5}
                      stroke="var(--color-fg-tertiary)"
                      fill="none"
                      width={18}
                      height={18}
                    />
                    <span className="text-[12px] text-[var(--color-fg-tertiary)]">
                      Audited Smart Contracts
                    </span>
                  </div>
                  <div className="flex item-start space-x-3 mt-4">
                    <Icon
                      name="userSecurity"
                      strokeWidth={1.5}
                      stroke="var(--color-fg-tertiary)"
                      fill="none"
                      width={18}
                      height={18}
                    />
                    <span className="text-[12px] text-[var(--color-fg-tertiary)]">
                      Trusted by 1,568 Users
                    </span>
                  </div>
                </div>
              </DrawerFooter>
            </DrawerContent>
          </DrawerPortal>
        </Drawer>
        {children}
      </>
    </UnifiedWalletContext.Provider>
  );
};

const UnifiedWalletProvider = ({
  wallets,
  config,
  children,
}: {
  wallets: Adapter[];
  config: IUnifiedWalletConfig;
  children: React.ReactNode;
}) => {
  return (
    <>
      <WalletConnectionProvider wallets={wallets} config={config}>
        <UnifiedWalletValueProvider>
          <UnifiedWalletContextProvider config={config}>
            {children}
          </UnifiedWalletContextProvider>
        </UnifiedWalletValueProvider>
      </WalletConnectionProvider>
    </>
  );
};

export { UnifiedWalletProvider, useUnifiedWallet, useUnifiedWalletContext };
