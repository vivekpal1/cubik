import './globals.css';
import '@cubik/presets/styles/style.css';
import '@cubik/presets/styles/lightColor.style.css';
import '@cubik/presets/styles/darkColors.styles.css';
import '@cubik/presets/styles/component.style.css';

import { Inter } from 'next/font/google';
import Header from '@/app/components/layout/header';
import WalletContext from '@/app/components/wallet/context';
import { AxiomWebVitals } from 'next-axiom';
import { Toaster } from 'sonner';

import { AuthProvider } from './context/user';

import './globals.css';
import { Metadata, Viewport } from "next";
import { Providers } from '@/app/provider';
import { cn } from '@ui/lib/utils';

const PlusJakartaSans = Inter({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
});


const APP_NAME = 'CUBIK';
const APP_DEFAULT_TITLE = 'CUBIK';
const APP_TITLE_TEMPLATE = '%s - PWA App';
const APP_DESCRIPTION = 'The genesis for leading Solana initiatives';

export const viewport: Viewport = {
  themeColor: '#141414',
};

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: 'summary',
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  }
}

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
            <Providers>
              <Header />
              <AxiomWebVitals />
              {children}
              <Toaster />
            </Providers>
          </AuthProvider>
        </WalletContext>
      </body>
    </html>
  );
}
