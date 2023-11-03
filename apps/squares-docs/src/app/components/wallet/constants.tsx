import { BaseWalletAdapter } from '@solana/wallet-adapter-base';

export const metadata = {
  name: 'CubikWallet',
  description: 'CubikWallet',
  url: 'https://cubik.so',
  iconUrls: ['https://cubik.so/favicon.ico'],
  additionalInfo: '',
  walletConnectProjectId: 'a1ff171476359193e707245dedb0a333',
};

export type WalletAdapterWithMutableSupportedTransactionVersions<T> = Omit<
  T,
  'supportedTransactionVersions'
> & {
  supportedTransactionVersions: BaseWalletAdapter['supportedTransactionVersions'];
};
