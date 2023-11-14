import React from 'react';

import { IWalletProps } from '../contexts/UnifiedWalletProvider';

const PreviewFunctionality = ({
  title,
  walletProps,
}: {
  title: string;
  walletProps?: IWalletProps;
}) => {
  return (
    <div>
      <p>{title}</p>

      <div>
        <div>
          <div>Wallet:</div>
          <div>{walletProps?.wallet?.adapter.name}</div>
        </div>

        <div>
          <div>PublicKey:</div>
          <div>{walletProps?.publicKey?.toString()}</div>
        </div>
      </div>
    </div>
  );
};

export default PreviewFunctionality;
