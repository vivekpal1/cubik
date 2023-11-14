import React, { useMemo } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

import { useAccounts } from '../contexts/accounts';
import { WRAPPED_SOL_MINT } from '../misc/constants';
import { shortenAddress } from '../misc/utils';

export const CurrentUserBadge: React.FC<{
  onClick?: () => void;
  className?: string;
}> = ({ onClick, className }) => {
  const { wallet, publicKey } = useWallet();
  const { accounts } = useAccounts();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const solBalance = useMemo(() => {
    if (accounts[WRAPPED_SOL_MINT.toString()]) {
      return accounts[WRAPPED_SOL_MINT.toString()].balance;
    }
    return 0;
  }, [publicKey, accounts]);

  if (!wallet || !publicKey) {
    return null;
  }

  return (
    <div onClick={onClick} className={className}>
      <div style={{ position: 'relative' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Wallet logo"
          width={16}
          height={16}
          src={wallet?.adapter?.icon}
        />
      </div>

      <div>
        <div>{shortenAddress(`${publicKey}`)}</div>
      </div>
    </div>
  );
};
