/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, {
  DetailedHTMLProps,
  FC,
  ImgHTMLAttributes,
  MouseEventHandler,
  useCallback,
  useMemo,
} from 'react';
import { SolanaMobileWalletAdapterWalletName } from '@solana-mobile/wallet-adapter-mobile';
import { Adapter } from '@solana/wallet-adapter-base';

import { Icon } from '@cubik/ui';

import {
  ICubikTheme,
  useCubikWalletContext,
} from '../../contexts/CubikWalletContext';
import { useTranslation } from '../../contexts/TranslationProvider';
import { isMobile } from '../../libs/utils';

export interface WalletIconProps
  extends DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  wallet: Adapter | null;
  width?: number;
  height?: number;
}

const styles = {
  container: {
    light: 'bg-gray-50 hover:shadow-lg hover:border-black/10',
    dark: 'hover:shadow-2xl hover:bg-white/10',
    cubik: 'hover:shadow-2xl hover:bg-white/10',
  },
};

export const WalletIcon: FC<WalletIconProps> = ({
  wallet,
  width = 24,
  height = 24,
}) => {
  const [hasError, setHasError] = React.useState(false);

  const onError = useCallback(() => setHasError(true), []);

  if (wallet && wallet.icon && !hasError) {
    return (
      <div style={{ minWidth: width, minHeight: height }}>
        {/* // eslint-disable-next-line @next/next/no-img-element */}
        <img
          width={width}
          height={height}
          src={wallet.icon}
          alt={`${wallet.name} icon`}
          tw="object-contain"
          onError={onError}
        />
      </div>
    );
  } else {
    return (
      <div style={{ minWidth: width, minHeight: height }}>
        <Icon name="question" width={width} height={height} />
      </div>
    );
  }
};

export interface WalletListItemProps {
  handleClick: MouseEventHandler<HTMLLIElement>;
  wallet: Adapter;
}

export const WalletListItem = ({
  handleClick,
  wallet,
}: WalletListItemProps) => {
  const { theme } = useCubikWalletContext();
  const { t } = useTranslation();

  const adapterName = useMemo(() => {
    if (!wallet) return '';
    if (wallet.name === SolanaMobileWalletAdapterWalletName) return t(`Mobile`);
    return wallet.name;
  }, [t, wallet]);

  return (
    <li
      onClick={handleClick}
      className={`flex items-center px-5 py-4 space-x-5 cursor-pointer border border-white/10 rounded-lg hover:bg-white/10 hover:backdrop-blur-xl hover:shadow-2xl transition-all ${
        theme === 'light'
          ? 'bg-gray-50 hover:shadow-lg hover:border-black/10'
          : theme === 'dark'
          ? 'hover:shadow-2xl hover:bg-white/10'
          : 'hover:shadow-2xl hover:bg-white/10' // assuming 'cubik' theme has the same style as 'dark'
      }`}
    >
      {isMobile() ? (
        <WalletIcon wallet={wallet} width={24} height={24} />
      ) : (
        <WalletIcon wallet={wallet} width={30} height={30} />
      )}
      <span className="font-semibold text-xs overflow-hidden text-ellipsis">
        {adapterName}
      </span>
    </li>
  );
};
