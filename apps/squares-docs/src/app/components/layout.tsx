import React from 'react';

import LayoutHOC from '../home-page-components/components/layoutHOC';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <LayoutHOC>{children}</LayoutHOC>;
}
