/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { SolanaMobileWalletAdapterWalletName } from '@solana-mobile/wallet-adapter-mobile';
import {
  Adapter,
  WalletName,
  WalletReadyState,
} from '@solana/wallet-adapter-base';
import { useToggle } from 'react-use';

import { Icon, Modal, ModalHeader } from '@cubik/ui';

import {
  ICubikTheme,
  useCubikWallet,
  useCubikWalletContext,
} from '../../contexts/CubikWalletContext';
import { useTranslation } from '../../contexts/TranslationProvider';
import { usePreviouslyConnected } from '../../contexts/WalletConnectionProvider/previouslyConnectedProvider';
import { isMobile, useOutsideClick } from '../../libs/utils';
import Collapse from '../Collapse';
import { OnboardingFlow } from './OnboardingFlow';
import { WalletIcon, WalletListItem } from './WalletListItem';

const themeClasses = {
  container: {
    light: 'text-black bg-transparent shadow-xl',
    dark: 'text-gray-200 bg-[#3A3B43] border border-white/10',
    cubik: 'text-white bg-[rgb(49, 62, 76)]',
  },
  shades: {
    light: 'bg-gradient-to-t from-white to-transparent pointer-events-none',
    dark: 'bg-gradient-to-t from-[#3A3B43] to-transparent pointer-events-none',
    cubik:
      'bg-gradient-to-t from-[rgb(49, 62, 76)] to-transparent pointer-events-none',
  },
  walletItem: {
    light: 'bg-gray-50 hover:shadow-lg hover:border-black/10',
    dark: 'hover:shadow-2xl hover:bg-white/10',
    cubik: 'hover:shadow-2xl hover:bg-white/10',
  },
  subtitle: {
    light: 'text-black/50',
    dark: 'text-white/50',
    cubik: 'text-white/50',
  },
  header: {
    light: 'border-b',
    dark: '',
    cubik: '',
  },
};

type HeaderProps = {
  onClose: () => void;
  theme: ICubikTheme;
};

const Header: React.FC<HeaderProps> = ({ onClose, theme }) => {
  const { t } = useTranslation();

  return (
    <div
      className={`px-5 py-6 flex justify-between items-center ${
        theme === 'light' ? 'border-b' : ''
      }`}
    >
      <div>
        <div className="font-semibold">
          <span>{t(`Connect Wallet`)}</span>
        </div>
        <div
          className={`text-xs mt-1 ${
            theme === 'light'
              ? 'text-black/50'
              : theme === 'dark'
              ? 'text-white/50'
              : 'text-white/50'
          }`}
        >
          <span>{t(`You need to connect a Solana wallet.`)}</span>
        </div>
      </div>

      <button className="absolute top-4 right-4" onClick={onClose}>
        <Icon name="cross" fill="none" width={12} height={12} />
      </button>
    </div>
  );
};

const ListOfWallets: React.FC<{
  list: {
    highlightedBy: HIGHLIGHTED_BY;
    highlight: Adapter[];
    others: Adapter[];
  };
  onToggle: (nextValue?: any) => void;
  isOpen: boolean;
}> = ({ list, onToggle, isOpen }) => {
  const { handleConnectClick, walletlistExplanation, theme } =
    useCubikWalletContext();
  const { t } = useTranslation();
  const [showOnboarding, setShowOnboarding] = useState(false);

  const renderWalletList = useMemo(
    () => (
      <div>
        <div className="mt-4 grid gap-2 grid-cols-2 pb-4" translate="no">
          {list.others.map((adapter, index) => (
            <ul key={index}>
              <WalletListItem
                handleClick={(event) => handleConnectClick(event, adapter)}
                wallet={adapter}
              />
            </ul>
          ))}
        </div>
        {list.highlightedBy !== 'Onboarding' && walletlistExplanation ? (
          <div
            className={`text-xs font-semibold underline ${
              list.others.length > 6 ? 'mb-8' : ''
            }`}
          >
            <a
              href={walletlistExplanation.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{t(`Can't find your wallet?`)}</span>
            </a>
          </div>
        ) : null}
      </div>
    ),
    [
      handleConnectClick,
      list.highlightedBy,
      list.others,
      t,
      walletlistExplanation,
    ],
  );

  const hasNoWallets = useMemo(() => {
    return list.highlight.length === 0 && list.others.length === 0;
  }, [list]);

  useEffect(() => {
    if (hasNoWallets) {
      setShowOnboarding(true);
    }
  }, [hasNoWallets]);

  if (showOnboarding) {
    return (
      <OnboardingFlow
        showBack={!hasNoWallets}
        onClose={() => setShowOnboarding(false)}
      />
    );
  }

  return (
    <>
      <div
        className={`hideScrollbar h-full overflow-y-auto pt-3 pb-8 px-5 relative ${
          isOpen ? 'mb-7' : ''
        }`}
      >
        <span className="mt-6 text-xs font-semibold">
          {list.highlightedBy === 'PreviouslyConnected'
            ? t(`Recently used`)
            : null}
          {list.highlightedBy === 'Installed' ? t(`Installed wallets`) : null}
          {list.highlightedBy === 'TopWallet' ? t(`Popular wallets`) : null}
        </span>
        <div className="mt-4 flex flex-col lg:flex-row lg:space-x-2 space-y-2 lg:space-y-0">
          {list.highlight.map((adapter, idx) => {
            const adapterName =
              adapter.name === SolanaMobileWalletAdapterWalletName
                ? t(`Mobile`)
                : adapter.name;

            return (
              <div
                key={idx}
                onClick={(event) => handleConnectClick(event, adapter)}
                className={`p-4 lg:p-5 border border-white/10 rounded-lg flex lg:flex-col items-center lg:justify-center cursor-pointer flex-1 lg:max-w-[33%] hover:backdrop-blur-xl transition-all ${themeClasses.walletItem[theme]}`}
              >
                <WalletIcon
                  wallet={adapter}
                  width={isMobile() ? 24 : 30}
                  height={isMobile() ? 24 : 30}
                />
                <span className="font-semibold text-xs ml-4 lg:ml-0 lg:mt-3">
                  {adapterName}
                </span>
              </div>
            );
          })}
        </div>

        {walletlistExplanation && list.others.length === 0 ? (
          <div className="text-xs font-semibold mt-4 -mb-2 text-white/80 underline cursor-pointer">
            <a
              href={walletlistExplanation.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{t(`Can't find your wallet?`)}</span>
            </a>
          </div>
        ) : null}

        {list.others.length > 0 ? (
          <>
            <div
              className="mt-5 flex justify-between cursor-pointer"
              onClick={onToggle}
            >
              <span className="text-xs font-semibold">
                <span>{t(`More wallets`)}</span>
              </span>

              <div className="flex items-center">
                <span className="w-[10px] h-[6px]">
                  {isOpen ? (
                    <Icon name="chevronUp" fill="none" />
                  ) : (
                    <Icon name="chevronDown" fill="none" />
                  )}
                </span>
              </div>
            </div>

            <Collapse height={0} maxHeight={'auto'} expanded={isOpen}>
              {renderWalletList}
            </Collapse>
          </>
        ) : null}
        <div className="text-xs font-semibold mt-4 -mb-2 text-white/80 underline cursor-pointer">
          <a onClick={() => setShowOnboarding(true)}>
            <span>{t(`I don't have a wallet`)}</span>
          </a>
        </div>
      </div>

      {/* Bottom Shades */}
      {isOpen && list.others.length > 6 ? (
        <>
          <div
            className={`block w-full h-20 absolute left-0 bottom-7 z-50 ${themeClasses.shades[theme]}`}
          />
        </>
      ) : null}
    </>
  );
};

const PRIORITISE: {
  [value in WalletReadyState]: number;
} = {
  [WalletReadyState.Installed]: 1,
  [WalletReadyState.Loadable]: 2,
  [WalletReadyState.NotDetected]: 3,
  [WalletReadyState.Unsupported]: 3,
};
export interface WalletModalProps {
  className?: string;
  logo?: ReactNode;
  container?: string;
}

type HIGHLIGHTED_BY =
  | 'PreviouslyConnected'
  | 'Installed'
  | 'TopWallet'
  | 'Onboarding';
const TOP_WALLETS: WalletName[] = [
  'Phantom' as WalletName<'Phantom'>,
  'Solflare' as WalletName<'Solflare'>,
  'Backpack' as WalletName<'Backpack'>,
];

interface ICubikWalletModal {
  onClose: () => void;
}

const sortByPrecedence =
  (walletPrecedence: WalletName[]) => (a: Adapter, b: Adapter) => {
    if (!walletPrecedence) return 0;

    const aIndex = walletPrecedence.indexOf(a.name);
    const bIndex = walletPrecedence.indexOf(b.name);

    if (aIndex === -1 && bIndex === -1) return 0;
    if (aIndex >= 0) {
      if (bIndex === -1) return -1;
      return aIndex - bIndex;
    }

    if (bIndex >= 0) {
      if (aIndex === -1) return 1;
      return bIndex - aIndex;
    }
    return 0;
  };

const CubikWalletModal: React.FC<ICubikWalletModal> = ({ onClose }) => {
  const { t } = useTranslation();
  const { wallets } = useCubikWallet();
  const { walletPrecedence, handleConnectClick, walletlistExplanation, theme } =
    useCubikWalletContext();
  const [isOpen, onToggle] = useToggle(false);
  const previouslyConnected = usePreviouslyConnected();

  const headingSize = 'md';

  const list: {
    highlightedBy: HIGHLIGHTED_BY;
    highlight: Adapter[];
    others: Adapter[];
  } = useMemo(() => {
    // Then, Installed, Top 3, Loadable, NotDetected
    const filteredAdapters = wallets.reduce<{
      previouslyConnected: Adapter[];
      installed: Adapter[];
      top3: Adapter[];
      loadable: Adapter[];
      notDetected: Adapter[];
    }>(
      (acc, wallet) => {
        const adapterName = wallet.adapter.name;

        // Previously connected takes highest
        const previouslyConnectedIndex =
          previouslyConnected.indexOf(adapterName);
        if (previouslyConnectedIndex >= 0) {
          acc.previouslyConnected[previouslyConnectedIndex] = wallet.adapter;
          return acc;
        }
        // Then Installed
        if (wallet.readyState === WalletReadyState.Installed) {
          acc.installed.push(wallet.adapter);
          return acc;
        }
        // Top 3
        const topWalletsIndex = TOP_WALLETS.indexOf(adapterName);
        if (topWalletsIndex >= 0) {
          acc.top3[topWalletsIndex] = wallet.adapter;
          return acc;
        }
        // Loadable
        if (wallet.readyState === WalletReadyState.Loadable) {
          acc.loadable.push(wallet.adapter);
          return acc;
        }
        // NotDetected
        if (wallet.readyState === WalletReadyState.NotDetected) {
          acc.loadable.push(wallet.adapter);
          return acc;
        }
        return acc;
      },
      {
        previouslyConnected: [],
        installed: [],
        top3: [],
        loadable: [],
        notDetected: [],
      },
    );

    if (filteredAdapters.previouslyConnected.length > 0) {
      const { previouslyConnected, ...rest } = filteredAdapters;

      const highlight = filteredAdapters.previouslyConnected.slice(0, 3);
      let others = Object.values(rest)
        .flat()
        .sort((a, b) => PRIORITISE[a.readyState] - PRIORITISE[b.readyState])
        .sort(sortByPrecedence(walletPrecedence || []));
      others.unshift(
        ...filteredAdapters.previouslyConnected.slice(
          3,
          filteredAdapters.previouslyConnected.length,
        ),
      );
      others = others.filter(Boolean);

      return {
        highlightedBy: 'PreviouslyConnected',
        highlight,
        others,
      };
    }

    if (filteredAdapters.installed.length > 0) {
      const { installed, ...rest } = filteredAdapters;
      const highlight = filteredAdapters.installed.slice(0, 3);
      const others = Object.values(rest)
        .flat()
        .sort((a, b) => PRIORITISE[a.readyState] - PRIORITISE[b.readyState])
        .sort(sortByPrecedence(walletPrecedence || []));
      others.unshift(
        ...filteredAdapters.installed.slice(
          3,
          filteredAdapters.installed.length,
        ),
      );

      return { highlightedBy: 'Installed', highlight, others };
    }

    if (filteredAdapters.loadable.length === 0) {
      return { highlightedBy: 'Onboarding', highlight: [], others: [] };
    }

    const { top3, ...rest } = filteredAdapters;
    const others = Object.values(rest)
      .flat()
      .sort((a, b) => PRIORITISE[a.readyState] - PRIORITISE[b.readyState])
      .sort(sortByPrecedence(walletPrecedence || []));
    return { highlightedBy: 'TopWallet', highlight: top3, others };
  }, [wallets, walletPrecedence, previouslyConnected]);

  const contentRef = useRef<HTMLDivElement>(null);
  useOutsideClick(contentRef, onClose);

  return (
    <div className="z-500">
      <Modal
        open={true}
        onClose={onClose}
        heading={t('Connect Wallet')}
        headingSize={headingSize}
        dialogSize="md"
        IconComponent={<Icon name={'wallet'} fill="none" />}
        // RingSVG={<YourRingSVG />}
      >
        {/* <Header onClose={onClose} theme={theme} /> */}
        <div className="border-t-[1px] border-white/10" />
        <ListOfWallets list={list} onToggle={onToggle} isOpen={isOpen} />
      </Modal>
    </div>
  );
};

export default CubikWalletModal;
