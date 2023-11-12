import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import { AxiomWebVitals } from 'next-axiom';

import { ClientCookiesProvider } from '../app/home-page-components/providers/cookies';

import './globals.css';
import '@cubik/presets/styles/style.css';
import '@cubik/presets/styles/lightColor.style.css';
import '@cubik/presets/styles/darkColors.styles.css';
import '@cubik/presets/styles/component.style.css';

import { Toaster } from 'sonner';

import Background from './home-page-components/components';
import Header from './home-page-components/header';
import Sidebar from './home-page-components/sidebar';
import { ThemeProvider } from './home-page-components/utils';

const inter = Inter({ subsets: ['latin'] });

const APP_NAME = 'Squares';
const APP_DEFAULT_TITLE = 'Squares Documentation';
const APP_TITLE_TEMPLATE = '%s - PWA App';
const APP_DESCRIPTION =
  'The component library designed and built for use @ CUBIK';

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
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="light" lang="en">
      <body className={`${inter.className}`}>
        <ClientCookiesProvider value={cookies().getAll()}>
          <ThemeProvider>
            <div className="min-h-screen">
              <Header />
              <AxiomWebVitals />
              <div className="z-0 mt-14 flex w-full flex-row bg-[var(--color-bg-secondary)] md:mt-0 ">
                <Toaster />
                <Sidebar />
                {children}
              </div>
            </div>
          </ThemeProvider>
        </ClientCookiesProvider>
      </body>
    </html>
  );
}
