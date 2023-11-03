'use client';

import React from 'react';
import { SolanaMobileWalletAdapterWalletName } from '@solana-mobile/wallet-adapter-mobile';

import { MWA_NOT_FOUND_ERROR } from '../contexts/CubikWalletContext';
import {
  useCubikWallet,
  useCubikWalletContext,
} from '../contexts/CubikWalletProvider';
import { useTranslation } from '../contexts/TranslationProvider';
import { CurrentUserBadge } from './CurrentUserBadge';

interface ConnectWalletButtonProps {
  overrideContent?: React.ReactNode;
  buttonClassName?: string;
  currentUserClassName?: string;
}

const ConnectWalletButton: React.FC<ConnectWalletButtonProps> = ({
  overrideContent,
  buttonClassName: className,
  currentUserClassName,
}) => {
  const { setShowModal, theme } = useCubikWalletContext();
  const { disconnect, connect, connecting, wallet } = useCubikWallet();
  const { t } = useTranslation();

  const content = (
    <>
      {connecting && <span className="text-xs">{t('Connecting...')}</span>}
      {!connecting && <span className="block md:hidden">{t('Connect')}</span>}
      {!connecting && (
        <span className="hidden md:block">{t('Connect Wallet')}</span>
      )}
    </>
  );

  const handleClick = async () => {
    try {
      if (wallet?.adapter?.name === SolanaMobileWalletAdapterWalletName) {
        await connect();
      } else {
        setShowModal(true);
      }
    } catch (error) {
      if (error instanceof Error && error.message === MWA_NOT_FOUND_ERROR) {
        setShowModal(true);
      }
    }
  };

  const themeClasses = {
    light: 'bg-white text-black',
    dark: 'bg-[#31333B] text-white',
    cubik: 'bg-v3-bg text-white',
  };

  return (
    <>
      {!wallet?.adapter.connected ? (
        <div
          className={`${
            overrideContent
              ? ''
              : 'rounded-lg text-xs py-3 px-5 font-semibold cursor-pointer text-center w-auto'
          } ${themeClasses[theme]} ${className}`}
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

export { ConnectWalletButton };
