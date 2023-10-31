import React, { ReactNode, useCallback } from 'react';
import { SolanaMobileWalletAdapterWalletName } from '@solana-mobile/wallet-adapter-mobile';

import { CurrentUserBadge } from './components/CurrentUserBadge';
import { UseWallet, useWalletContext } from './contexts/CubikWalletProvider';
import { useTranslation } from './contexts/TranslationProvider';
import { ITheme, MWA_NOT_FOUND_ERROR } from './contexts/WalletContext';

const styles: Record<string, { [key in ITheme]: string }> = {
  container: {
    light: 'bg-white text-black',
    dark: 'bg-[#31333B] text-white',
    cubik: 'bg-v3-bg text-white',
  },
};

export const ConnectWalletButton: React.FC<{
  overrideContent?: ReactNode;
  buttonClassName?: string;
  currentUserClassName?: string;
}> = ({ overrideContent, buttonClassName: currentUserClassName }) => {
  const { setShowModal, theme } = useWalletContext();
  const { disconnect, connect, connecting, wallet } = UseWallet();
  const { t } = useTranslation();

  const content = (
    <>
      {connecting && (
        <span className="text-xs">
          <span>{t(`Connecting...`)}</span>
        </span>
      )}
      {/* Mobile */}
      {!connecting && (
        <span className="block md:hidden">
          <span>{t(`Connect`)}</span>
        </span>
      )}
      {/* Desktop */}
      {!connecting && (
        <span className="hidden md:block">
          <span>{t(`Connect Wallet`)}</span>
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
          className={`${
            overrideContent
              ? ''
              : 'rounded-lg text-xs py-3 px-5 font-semibold cursor-pointer text-center w-auto'
          } ${styles.container[theme]} ${buttonClassName}`}
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

export default ConnectWalletButton;
