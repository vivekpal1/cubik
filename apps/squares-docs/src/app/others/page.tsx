import React from 'react';

import PageHOC from '../home-page-components/components/pageHOC';

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
