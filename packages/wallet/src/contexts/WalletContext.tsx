import { createContext, useContext } from 'react';
import type {
  Adapter,
  SendTransactionOptions,
  WalletName,
} from '@solana/wallet-adapter-base';
import type { WalletContextState } from '@solana/wallet-adapter-react';
import type {
  Connection,
  Transaction,
  VersionedTransaction,
} from '@solana/web3.js';

import { IWalletConfig } from './WalletConnectionProvider';

export const MWA_NOT_FOUND_ERROR = 'MWA_NOT_FOUND_ERROR';
export type ITheme = 'light' | 'dark' | 'cubik';

export interface IWalletContext {
  walletPrecedence: IWalletConfig['walletPrecedence'];
  handleConnectClick: (
    event: React.MouseEvent<HTMLElement, globalThis.MouseEvent>,
    wallet: Adapter,
  ) => Promise<void>;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  walletlistExplanation: IWalletConfig['walletlistExplanation'];
  theme: ITheme;
}

export const WalletContext = createContext<IWalletContext>({
  walletPrecedence: [],
  handleConnectClick: async (
    event: React.MouseEvent<HTMLElement, globalThis.MouseEvent>,
    wallet: Adapter,
  ) => {},
  showModal: false,
  setShowModal: (showModal: boolean) => {},
  walletlistExplanation: undefined,
  theme: 'light',
});

// Copied from @solana/wallet-adapter-react
function constructMissingProviderErrorMessage(
  action: string,
  valueName: string,
) {
  return (
    'You have tried to ' +
    ` ${action} "${valueName}"` +
    ' on a WalletContext without providing one.' +
    ' Make sure to render a WalletProvider' +
    ' as an ancestor of the component that uses ' +
    'WalletContext'
  );
}

export const WALLET_VALUE_DEFAULT_CONTEXT = {
  autoConnect: false,
  connecting: false,
  connected: false,
  disconnecting: false,
  select(_name: WalletName | null) {
    console.error(constructMissingProviderErrorMessage('get', 'select'));
  },
  connect() {
    return Promise.reject(
      console.error(constructMissingProviderErrorMessage('get', 'connect')),
    );
  },
  disconnect() {
    return Promise.reject(
      console.error(constructMissingProviderErrorMessage('get', 'disconnect')),
    );
  },
  sendTransaction(
    _transaction: VersionedTransaction | Transaction,
    _connection: Connection,
    _options?: SendTransactionOptions,
  ) {
    return Promise.reject(
      console.error(
        constructMissingProviderErrorMessage('get', 'sendTransaction'),
      ),
    );
  },
  signTransaction(_transaction: Transaction) {
    return Promise.reject(
      console.error(
        constructMissingProviderErrorMessage('get', 'signTransaction'),
      ),
    );
  },
  signAllTransactions(_transaction: Transaction[]) {
    return Promise.reject(
      console.error(
        constructMissingProviderErrorMessage('get', 'signAllTransactions'),
      ),
    );
  },
  signMessage(_message: Uint8Array) {
    return Promise.reject(
      console.error(constructMissingProviderErrorMessage('get', 'signMessage')),
    );
  },
} as WalletContextState;

export const WalletValueContext = createContext<WalletContextState>(
  WALLET_VALUE_DEFAULT_CONTEXT,
);

// Interal context for use within the library
export const useWalletContext = (): IWalletContext => {
  return useContext(WalletContext);
};

export const UseWallet = (): WalletContextState => {
  return useContext(WalletValueContext);
};
