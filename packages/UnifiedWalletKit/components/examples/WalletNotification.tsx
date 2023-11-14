/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IUnifiedWalletConfig,
  IWalletNotification,
} from '../../contexts/WalletConnectionProvider';

const WalletNotification: IUnifiedWalletConfig['notificationCallback'] = {
  onConnect: (props: IWalletNotification) => {
    // todo: add toast from toast component here
  },
  onConnecting: (props: IWalletNotification) => {
    // todo: add toast from toast component here
  },
  onDisconnect: (props: IWalletNotification) => {
    // todo: add toast from toast component here
  },
  onNotInstalled: (props: IWalletNotification) => {
    // todo: add toast from toast component here
  },
};

export default WalletNotification;
