import React, { useRef, useState } from 'react';

import { Icon } from '@cubik/ui';

import { HARDCODED_WALLET_STANDARDS } from '../constants';
import { useTranslation } from '../contexts/TranslationProvider';
import { ITheme, useWalletContext } from '../contexts/WalletContext';

const styles: Record<string, { [key in ITheme]: string }> = {
  subtitle: {
    light: 'text-black/70',
    dark: 'text-white/50',
    cubik: 'text-white/50',
  },
  button: {
    light: 'bg-[#31333B] text-white hover:bg-black',
    dark: 'bg-[#31333B] hover:bg-black/30',
    cubik: 'bg-black hover:bg-black/50',
  },
  walletButton: {
    light: 'bg-[#F9FAFB] hover:bg-black/5',
    dark: 'bg-white/10 hover:bg-white/20 border border-white/10 shadow-lg',
    cubik: 'bg-white/5 hover:bg-white/20 border border-white/10 shadow-lg',
  },
  Icon: {
    light: 'text-black/30',
    dark: 'text-white/30',
    cubik: 'text-white/30',
  },
};

export const OnboardingIntro: React.FC<{
  flow: IOnboardingFlow;
  setFlow: (flow: IOnboardingFlow) => void;
  onClose: () => void;
  showBack: boolean;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
}> = ({ flow, setFlow, onClose, showBack }) => {
  const { theme } = useWalletContext();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col justify-center items-center p-10">
      <img
        src={'https://unified.jup.ag/new_user_onboarding.png'}
        width={160}
        height={160}
      />

      <div className="mt-4 flex flex-col justify-center items-center text-center">
        <span className="text-lg font-semibold">{t(`New here?`)}</span>
        <span className={`mt-3 text-sm ${styles.subtitle[theme]}`}>
          {t(`Welcome to DeFi! Create a crypto wallet to get started!`)}
        </span>
      </div>

      <div className="mt-6 w-full">
        <button
          type="button"
          className={`text-white font-semibold text-base w-full rounded-lg border border-white/10 py-5 leading-none ${styles.button[theme]}`}
          onClick={() => setFlow('Get Wallet')}
        >
          {t(`Get Started`)}
        </button>
      </div>
      {showBack && (
        <button
          type="button"
          className={`mt-3 text-xs text-white/50 font-semibold ${styles.subtitle[theme]}`}
          onClick={() => onClose()}
        >
          {'← ' + t(`Go back`)}
        </button>
      )}
    </div>
  );
};

export const OnboardingGetWallets: React.FC<{
  flow: IOnboardingFlow;
  setFlow: (flow: IOnboardingFlow) => void;
}> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  flow,
  setFlow,
}) => {
  const { theme } = useWalletContext();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col justify-center py-3 px-10">
      <span className="text-base font-semibold">
        {t(`Popular wallets to get started`)}
      </span>
      <div className="mt-4 w-full space-y-2">
        {HARDCODED_WALLET_STANDARDS.map((item, idx) => {
          return (
            <a
              href={item.url}
              key={idx}
              target="_blank"
              className={`px-5 py-4 flex space-x-4 w-full rounded-lg text-sm font-semibold items-center ${styles.walletButton[theme]}`}
            >
              <img src={item.icon} width={20} height={20} alt={item.name} />
              <span>{item.name}</span>
            </a>
          );
        })}

        <a
          href={'https://station.jup.ag/partners?category=Wallets'}
          target="_blank"
          className={`px-5 py-4 flex space-x-4 w-full rounded-lg text-sm font-semibold items-center ${styles.walletButton[theme]}`}
        >
          <div
            className={`fill-current w-5 h-5 flex items-center p-0.5 ${styles.externalIcon[theme]}`}
          >
            <Icon name="externalLink2" width={16} height={16} />
          </div>
          <span>{t(`More wallets`)}</span>
        </a>
      </div>

      <span className={`mt-3 text-center text-xs ${styles.subtitle[theme]}`}>
        {t(`Once installed, refresh this page`)}
      </span>
      <button
        type="button"
        className={`mt-3 text-xs text-white/50 font-semibold ${styles.subtitle[theme]}`}
        onClick={() => setFlow('Onboarding')}
      >
        {'← ' + t(`Go back`)}
      </button>
    </div>
  );
};

export type IOnboardingFlow = 'Onboarding' | 'Get Wallet';
export const OnboardingFlow = ({
  onClose,
  showBack,
}: {
  onClose: () => void;
  showBack: boolean;
}) => {
  const [flow, setFlow] = useState<IOnboardingFlow>('Onboarding');
  const [animateOut, setAnimateOut] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const setFlowAnimated = (flow: IOnboardingFlow) => {
    setAnimateOut(true);

    setTimeout(() => {
      contentRef.current?.scrollTo(0, 0);
      setAnimateOut(false);
      setFlow(flow);
    }, 200);
  };

  return (
    <div
      ref={contentRef}
      className={`duration-500 animate-fade-in overflow-y-scroll ${
        animateOut ? 'animate-fade-out opacity-0' : ''
      } hideScrollbar`}
    >
      {flow === 'Onboarding' ? (
        <OnboardingIntro
          showBack={showBack}
          flow={flow}
          setFlow={setFlowAnimated}
          onClose={onClose}
        />
      ) : null}
      {flow === 'Get Wallet' ? (
        <OnboardingGetWallets flow={flow} setFlow={setFlowAnimated} />
      ) : null}
    </div>
  );
};

export default OnboardingFlow;
