/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

import { useAccounts } from '../contexts/accounts';
import { WRAPPED_SOL_MINT } from '../libs/constants';
import { shortenAddress } from '../libs/utils';

export const CurrentUserBadge: React.FC<{
  onClick?: () => void;
  className?: string;
}> = ({ onClick, className }) => {
  const { wallet, publicKey } = useWallet();
  const { accounts } = useAccounts();

  const solBalance = useMemo(() => {
    if (accounts[WRAPPED_SOL_MINT.toString()]) {
      return accounts[WRAPPED_SOL_MINT.toString()].balance;
    }
    return 0;
  }, [accounts]);

  if (!wallet || !publicKey) {
    return null;
  }

  return (
    <div
      onClick={onClick}
      className={`flex items-center bg-[#191B1F] py-2 px-3 rounded-2xl h-7 cursor-pointer ${className}`}
    >
      <div
        className="w-4 h-4 rounded-full bg-[#191B1F] dark:bg-white/10 flex justify-center items-center"
        style={{ position: 'relative' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Wallet logo"
          width={16}
          height={16}
          src={wallet?.adapter?.icon}
        />
      </div>

      <div className="ml-2">
        <div className="text-xs text-white">
          {shortenAddress(`${publicKey}`)}
        </div>
      </div>
    </div>
  );
};
