import React, { useRef, useState } from 'react';

import { HARDCODED_WALLET_STANDARDS } from '../../misc/constants';
import ExternalIcon from '../icons/ExternalIcon';

export const OnboardingIntro: React.FC<{
  flow: IOnboardingFlow;
  setFlow: (flow: IOnboardingFlow) => void;
  onClose: () => void;
  showBack: boolean;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
}> = ({ flow, setFlow, onClose, showBack }) => {
  return (
    <div>
      <img
        src={'https://unified.jup.ag/new_user_onboarding.png'}
        width={160}
        height={160}
      />

      <div>
        <span> New here? </span>
        <span>Welcome to DeFi! Create a crypto wallet to get started!</span>
      </div>

      <div>
        <button type="button" onClick={() => setFlow('Get Wallet')}>
          Get Started
        </button>
      </div>
      {showBack && (
        <button type="button" onClick={() => onClose()}>
          ← Go back
        </button>
      )}
    </div>
  );
};

export const OnboardingGetWallets: React.FC<{
  flow: IOnboardingFlow;
  setFlow: (flow: IOnboardingFlow) => void;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
}> = ({ flow, setFlow }) => {
  return (
    <div>
      <span>Popular wallets to get started</span>
      <div>
        {HARDCODED_WALLET_STANDARDS.map((item, idx) => {
          return (
            <a href={item.url} key={idx} target="_blank">
              <img src={item.icon} width={20} height={20} alt={item.name} />
              <span>{item.name}</span>
            </a>
          );
        })}

        <a href={'https://sdfsdf'} target="_blank">
          <div>
            <ExternalIcon width={16} height={16} />
          </div>
          <span>More wallets</span>
        </a>
      </div>

      <span>Once installed, refresh this page</span>
      <button type="button" onClick={() => setFlow('Onboarding')}>
        ← Go back
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    <div ref={contentRef} className="hideScrollbar">
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
