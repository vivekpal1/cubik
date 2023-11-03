/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import BN from 'bn.js';

import { WRAPPED_SOL_MINT } from '../libs/constants';
import { fromLamports } from '../libs/utils';

export interface IAccountsBalance {
  balance: number;
  balanceLamports: BN;
  hasBalance: boolean;
  decimals: number;
}

interface IAccountContext {
  accounts: Record<string, IAccountsBalance>;
  loading: boolean;
  refresh: () => void;
}

interface ParsedTokenData {
  account: {
    data: {
      parsed: {
        info: {
          isNative: boolean;
          mint: string;
          owner: string;
          state: string;
          tokenAmount: {
            amount: string;
            decimals: number;
            uiAmount: number;
            uiAmountString: string;
          };
        };
        type: string;
      };
      program: string;
      space: number;
    };
    executable: boolean;
    lamports: number;
    owner: PublicKey;
    rentEpoch?: number;
  };
  pubkey: PublicKey;
}

const AccountContext = React.createContext<IAccountContext>({
  accounts: {},
  loading: true,
  refresh: () => {},
});

const AccountsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { publicKey, connected } = useWallet();
  const { connection } = useConnection();

  const [loading, setLoading] = useState(false);
  const [accounts, setAccounts] = useState<Record<string, IAccountsBalance>>(
    {},
  );

  const fetchNative = async () => {
    if (!publicKey || !connected) return null;

    const response = await connection.getAccountInfo(publicKey);
    if (response) {
      return {
        balance: fromLamports(response?.lamports || 0, 9),
        balanceLamports: new BN(response?.lamports || 0),
        hasBalance: response?.lamports ? response?.lamports > 0 : false,
        decimals: 9,
      };
    }
  };

  const fetchAllTokens = async () => {
    if (!publicKey || !connected) return {};

    const response = await connection.getParsedTokenAccountsByOwner(
      publicKey,
      { programId: TOKEN_PROGRAM_ID },
      'confirmed',
    );

    const reducedResult = response.value.reduce(
      (acc, item: ParsedTokenData) => {
        acc[item.account.data.parsed.info.mint] = {
          balance: item.account.data.parsed.info.tokenAmount.uiAmount,
          balanceLamports: new BN(0),
          hasBalance: item.account.data.parsed.info.tokenAmount.uiAmount > 0,
          decimals: item.account.data.parsed.info.tokenAmount.decimals,
        };
        return acc;
      },
      {} as Record<string, IAccountsBalance>,
    );

    return reducedResult;
  };

  const refresh = async () => {
    if (!publicKey) return;

    // Fetch all tokens balance
    const [nativeAccount, accounts] = await Promise.all([
      fetchNative(),
      fetchAllTokens(),
    ]);

    setAccounts({
      ...accounts,
      ...(nativeAccount
        ? { [WRAPPED_SOL_MINT.toString()]: nativeAccount }
        : {}),
    });
    setLoading(false);
  };

  // Fetch all accounts for the current wallet
  useEffect(() => {
    refresh();
  }, [publicKey, connected]);

  return (
    <AccountContext.Provider value={{ accounts, loading, refresh }}>
      {children}
    </AccountContext.Provider>
  );
};

const useAccounts = () => {
  return useContext(AccountContext);
};

export { AccountsProvider, useAccounts };
