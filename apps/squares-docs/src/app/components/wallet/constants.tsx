import { BaseWalletAdapter } from '@solana/wallet-adapter-base';

export const metadata = {
  name: 'CubikWallet',
  description: 'CubikWallet',
  url: 'https://cubik.so',
  iconUrls: ['https://cubik.so/favicon.ico'],
  additionalInfo: '',
  walletConnectProjectId: '4a4e231c4004ef7b77076a87094fba61',
};

export type WalletAdapterWithMutableSupportedTransactionVersions<T> = Omit<
  T,
  'supportedTransactionVersions'
> & {
  supportedTransactionVersions: BaseWalletAdapter['supportedTransactionVersions'];
};
