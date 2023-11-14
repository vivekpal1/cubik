import './globals.css';
import '@cubik/presets/styles/style.css';
import '@cubik/presets/styles/lightColor.style.css';
import '@cubik/presets/styles/darkColors.styles.css';
import '@cubik/presets/styles/component.style.css';

import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/components/Headers';
import { AxiomWebVitals } from 'next-axiom';

import { Provider } from './provider';

const inter = Inter({ subsets: ['latin'] });

const APP_NAME = 'CUBIK Dashboard';
const APP_DEFAULT_TITLE = 'Dashboard for CUBIK';
const APP_TITLE_TEMPLATE = '%s - PWA App';
const APP_DESCRIPTION =
  'Control center for CUBIK, a PWA app for managing your projects.';

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

export default function RootLayout({ children }: { children: JSX.Element }) {
  return (
    <html className="dark" lang="en">
      <body className={`bg-[var(--color-neutral-920)] ${inter.className}`}>
        <Provider>
          <>
            <AxiomWebVitals />
            <Header />
            {children}
          </>
        </Provider>
      </body>
    </html>
  );
}
