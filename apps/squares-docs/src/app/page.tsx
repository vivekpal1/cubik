import React from 'react';
import { Metadata } from 'next/types';

import PageHOC from './home-page-components/components/pageHOC';

export const metadata: Metadata = {
  title: 'Squares Design System',
  description: 'The Design System that powers Cubik',
  applicationName: 'Squares',
  //manifest: './manifest.json',
  themeColor: '#141414',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Squares',
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    images: [
      'https://imagedelivery.net/rWTckr21FEHs39XCNFz7Yw/ea3795f8-3c4a-4b75-ed4e-5cd423cf0300/public',
    ],
  },
  twitter: {
    title: 'Squares Design System',
    card: 'summary_large_image',
    images: [
      'https://imagedelivery.net/rWTckr21FEHs39XCNFz7Yw/ea3795f8-3c4a-4b75-ed4e-5cd423cf0300/public',
    ],
  },
};

export default function OthersPage() {
  return (
    <PageHOC
      pages={[{ name: 'Others', href: '/others', current: true }]}
      heading={'Others'}
      description={
        'Squares provides prebuilt components to help you build faster. Here is an overview of the component categories'
      }
    >
      <div className="flex flex-row flex-wrap gap-8">others</div>
    </PageHOC>
  );
}
