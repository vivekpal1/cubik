import './globals.css';
import '@cubik/presets/styles/style.css';
import '@cubik/presets/styles/lightColor.style.css';
import '@cubik/presets/styles/darkColors.styles.css';
import '@cubik/presets/styles/component.style.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/components/Headers';

import { Provider } from './provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CUBIK',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: JSX.Element }) {
  return (
    <html className="dark" lang="en">
      <body
        className={`bg-[var(--color-fg-alert-secondary)] ${inter.className}`}
      >
        <Provider>
          <>
            <Header />
            {children}
          </>
        </Provider>
      </body>
    </html>
  );
}