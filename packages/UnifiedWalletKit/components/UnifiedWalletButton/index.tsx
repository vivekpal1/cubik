import React, { ReactNode, useCallback } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { SolanaMobileWalletAdapterWalletName } from '@solana-mobile/wallet-adapter-mobile';

import { MWA_NOT_FOUND_ERROR } from '../../contexts/UnifiedWalletContext';
import {
  useUnifiedWallet,
  useUnifiedWalletContext,
} from '../../contexts/UnifiedWalletProvider';
import { CurrentUserBadge } from '../CurrentUserBadge';

export const UnifiedWalletButton: React.FC<{
  overrideContent?: ReactNode;
  buttonClassName?: string;
  currentUserClassName?: string;
}> = ({
  overrideContent,
  buttonClassName: className,
  currentUserClassName,
}) => {
  const { setShowModal } = useUnifiedWalletContext();
  const { disconnect, connect, connecting, wallet } = useUnifiedWallet();

  const content = (
    <>
      {connecting && (
        <span>
          <span>Connecting...</span>
        </span>
      )}
      {/* Mobile */}
      {!connecting && (
        <span>
          <span>Connect</span>
        </span>
      )}
      {/* Desktop */}
      {!connecting && (
        <span>
          <span>Connect Wallet</span>
        </span>
      )}
    </>
  );

  const handleClick = useCallback(async () => {
    try {
      if (wallet?.adapter?.name === SolanaMobileWalletAdapterWalletName) {
        await connect();
        return;
      } else {
        setShowModal(true);
      }
    } catch (error) {
      if (error instanceof Error && error.message === MWA_NOT_FOUND_ERROR) {
        setShowModal(true);
      }
    }
  }, [wallet, connect]);

  return (
    <>
      {!wallet?.adapter.connected ? (
        <div
          className={`${className} border border-red-500`}
          onClick={handleClick}
        >
          {overrideContent || content}
        </div>
      ) : (
        <CurrentUserBadge
          onClick={disconnect}
          className={currentUserClassName}
        />
      )}
    </>
  );
};
