import './globals.css';
import '@cubik/presets/styles/style.css';
import '@cubik/presets/styles/lightColor.style.css';
import '@cubik/presets/styles/darkColors.styles.css';
import '@cubik/presets/styles/component.style.css';

import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import Header from '@/app/components/layout/header';
import WalletContext from '@/app/components/wallet/context';
import { AxiomWebVitals } from 'next-axiom';
import { Toaster } from 'sonner';

import { AuthProvider } from './context/user';

import './globals.css';

import { cn } from '@ui/lib/utils';

const PlusJakartaSans = Inter({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="dark" lang="en">
      {/* @todo update the colors */}
      <body className={cn(`${PlusJakartaSans.className}`, 'bg-black')}>
        <WalletContext>
          <AuthProvider>
            <Header />
            <AxiomWebVitals />
            {children}
            <Toaster />
          </AuthProvider>
        </WalletContext>
      </body>
    </html>
  );
}
