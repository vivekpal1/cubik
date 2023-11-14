import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { SolanaMobileWalletAdapterWalletName } from '@solana-mobile/wallet-adapter-mobile';
import {
  Adapter,
  WalletName,
  WalletReadyState,
} from '@solana/wallet-adapter-base';
import { useToggle } from 'react-use';

import {
  useUnifiedWallet,
  useUnifiedWalletContext,
} from '../../contexts/UnifiedWalletContext';
import { usePreviouslyConnected } from '../../contexts/WalletConnectionProvider/previouslyConnectedProvider';
import { isMobile, useOutsideClick } from '../../misc/utils';
import { OnboardingFlow } from './Onboarding';
import { WalletIcon, WalletListItem } from './WalletListItem';

const ListOfWallets: React.FC<{
  list: {
    highlightedBy: HIGHLIGHTED_BY;
    highlight: Adapter[];
    others: Adapter[];
  };
  onToggle: (nextValue?: any) => void;
  isOpen: boolean;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
}> = ({ list, onToggle, isOpen }) => {
  const { handleConnectClick, walletlistExplanation } =
    useUnifiedWalletContext();
  const [showOnboarding, setShowOnboarding] = useState(false);

  // remaining wallet list which opens when button is clicked
  const renderWalletList = useMemo(
    () => (
      <>
        <div>
          {list.others.map((adapter, index) => {
            return (
              <ul key={index}>
                <WalletListItem
                  handleClick={(event) => handleConnectClick(event, adapter)}
                  wallet={adapter}
                />
              </ul>
            );
          })}
        </div>
        {list.highlightedBy !== 'Onboarding' && walletlistExplanation ? (
          <div>
            <a
              href={walletlistExplanation.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span> Cant find your wallet? </span>
            </a>
          </div>
        ) : null}
      </>
    ),
    [handleConnectClick, list.others],
  );
  console.log('renerwalletlist - ', renderWalletList);
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
      <>
        {/* <span>
          {list.highlightedBy === 'PreviouslyConnected'
            ? 'Recently used'
            : null}
          {list.highlightedBy === 'Installed' ? 'Installed wallets' : null}
          {list.highlightedBy === 'TopWallet' ? 'Popular wallets' : null}
        </span> */}
        {/* top wallets */}
        <div className="flex overflow-x-scroll flex-row px-[24px]">
          {list.highlight.map((adapter, idx) => {
            const adapterName = (() => {
              if (adapter.name === SolanaMobileWalletAdapterWalletName)
                return `Mobile`;
              return adapter.name;
            })();
            console.log('adapter name - ', adapterName);
            return (
              <div
                key={idx}
                onClick={(event) => handleConnectClick(event, adapter)}
              >
                {isMobile() ? (
                  <WalletIcon wallet={adapter} width={48} height={48} />
                ) : (
                  <WalletIcon wallet={adapter} width={60} height={30} />
                )}
              </div>
            );
          })}
          {list.others.map((adapter, idx) => {
            return (
              <div
                key={idx}
                onClick={(event) => handleConnectClick(event, adapter)}
              >
                {isMobile() ? (
                  <WalletIcon wallet={adapter} width={48} height={48} />
                ) : (
                  <WalletIcon wallet={adapter} width={60} height={30} />
                )}
              </div>
            );
          })}
        </div>

        {walletlistExplanation && list.others.length === 0 ? (
          <div>
            <a
              href={walletlistExplanation.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span> Cant find your wallet </span>
            </a>
          </div>
        ) : null}
        {/* collapse */}
        {/* {list.others.length > 0 ? (
          <>
            <div className="h-1 overflow-hidden">
              <span>
                <span> More wallets</span>
              </span>
              <div>
                <span>{isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}</span>
              </div>
            </div>

            <Collapse height={0} maxHeight={'auto'} expanded={isOpen}>
              {renderWalletList}
            </Collapse>
          </>
        ) : null} */}
      </>
      {/* <div className="px-[24px]">
        <a onClick={() => setShowOnboarding(true)}>
          <span className="text-red-400"> I dont have a wallet </span>
        </a>
      </div> */}
      {/* Bottom Shades */}
      {isOpen && list.others.length > 6 ? (
        <>
          <div />
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
  'Glow' as WalletName<'Glow'>,
  'Phantom' as WalletName<'Phantom'>,
  'Solflare' as WalletName<'Solflare'>,
  'Backpack' as WalletName<'Backpack'>,
  'Coinbase Wallet' as WalletName<'Coinbase Wallet'>,
];

interface IUnifiedWalletModal {
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

const UnifiedWalletModal: React.FC<IUnifiedWalletModal> = ({ onClose }) => {
  const { wallets } = useUnifiedWallet();
  const { walletPrecedence } = useUnifiedWalletContext();
  const [isOpen, onToggle] = useToggle(false);
  const previouslyConnected = usePreviouslyConnected();

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
      console.log('previously connected wallet -', previouslyConnected);
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
      console.log('installed wallets - ', installed);
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
  }, [wallets, previouslyConnected]);

  const contentRef = useRef<HTMLDivElement>(null);
  useOutsideClick(contentRef, onClose);
  console.log(list);
  return (
    <div className="py-4" ref={contentRef}>
      <ListOfWallets list={list} onToggle={onToggle} isOpen={isOpen} />
    </div>
  );
};

export default UnifiedWalletModal;
