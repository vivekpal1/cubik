/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useState } from 'react';

import { Icon } from '@cubik/ui';

import {
  ICubikTheme,
  useCubikWalletContext,
} from '../../contexts/CubikWalletContext';
import { useTranslation } from '../../contexts/TranslationProvider';
import { HARDCODED_WALLET_STANDARDS } from '../../libs/constants';

const themeClasses = {
  subtitle: {
    light: ['text-color-light', 'other-light-styles'],
    dark: ['text-color-dark', 'other-dark-styles'],
    cubik: ['text-color-cubik', 'other-cubik-styles'],
  },
  button: {
    light: ['button-styles-light', 'other-button-styles'],
    dark: ['button-styles-dark', 'other-button-styles'],
    cubik: ['button-styles-cubik', 'other-cubik-styles'],
  },
  walletButton: {
    light: ['wallet-button-styles-light', 'other-wallet-button-styles'],
    dark: ['wallet-button-styles-dark', 'other-wallet-button-styles'],
    cubik: ['wallet-button-styles-cubik', 'other-cubik-styles'],
  },
  externalIcon: {
    light: ['external-icon-styles-light', 'other-external-icon-styles'],
    dark: ['external-icon-styles-dark', 'other-external-icon-styles'],
    cubik: ['external-icon-styles-cubik', 'other-cubik-styles'],
  },
};

type OnboardingIntroProps = {
  flow: IOnboardingFlow;
  setFlow: (flow: IOnboardingFlow) => void;
  onClose: () => void;
  showBack: boolean;
};

export const OnboardingIntro = ({
  flow,
  setFlow,
  onClose,
  showBack,
}: OnboardingIntroProps) => {
  const { theme } = useCubikWalletContext();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col justify-center items-center p-10">
      <img
        src={'https://Cubik.jup.ag/new_user_onboarding.png'}
        width={160}
        height={160}
      />

      <div className="mt-4 flex flex-col justify-center items-center text-center">
        <span className="text-lg font-semibold">{t(`New here?`)}</span>
        <span
          className={`mt-3 text-sm ${themeClasses.subtitle[theme].join(' ')}`}
        >
          {t(`Welcome to DeFi! Create a crypto wallet to get started!`)}
        </span>
      </div>

      <div className="mt-6 w-full">
        <button
          type="button"
          className={`text-white font-semibold text-base w-full rounded-lg border border-white/10 py-5 leading-none ${themeClasses.button[
            theme
          ].join(' ')}`}
          onClick={() => setFlow('Get Wallet')}
        >
          {t(`Get Started`)}
        </button>
      </div>
      {showBack && (
        <button
          type="button"
          className={`mt-3 text-xs text-white/50 font-semibold ${themeClasses.subtitle[
            theme
          ].join(' ')}`}
          onClick={onClose}
        >
          {'← ' + t(`Go back`)}
        </button>
      )}
    </div>
  );
};

const OnboardingGetWallets: React.FC<{
  flow: IOnboardingFlow;
  setFlow: (flow: IOnboardingFlow) => void;
}> = ({ flow, setFlow }) => {
  const { theme } = useCubikWalletContext();
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
              className={`px-5 py-4 flex space-x-4 w-full rounded-lg text-sm font-semibold items-center ${themeClasses.walletButton[
                theme
              ].join(' ')}`}
            >
              <img src={item.icon} width={20} height={20} alt={item.name} />
              <span>{item.name}</span>
            </a>
          );
        })}

        <a
          href={'https://station.jup.ag/partners?category=Wallets'}
          target="_blank"
          className={`px-5 py-4 flex space-x-4 w-full rounded-lg text-sm font-semibold items-center ${themeClasses.walletButton[
            theme
          ].join(' ')}`}
        >
          <div
            className={`fill-current w-5 h-5 flex items-center p-0.5 ${themeClasses.externalIcon[
              theme
            ].join(' ')}`}
          >
            <Icon name="externalLink2" width={16} height={16} />
          </div>
          <span>{t(`More wallets`)}</span>
        </a>
      </div>

      <span
        className={`mt-3 text-center text-xs ${themeClasses.subtitle[
          theme
        ].join(' ')}`}
      >
        {t(`Once installed, refresh this page`)}
      </span>
      <button
        type="button"
        className={`mt-3 text-xs text-white/50 font-semibold ${themeClasses.subtitle[
          theme
        ].join(' ')}`}
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
      className={`duration-500 overflow-y-scroll ${
        animateOut ? 'animate-fade-out opacity-0' : 'animate-fade-in'
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
