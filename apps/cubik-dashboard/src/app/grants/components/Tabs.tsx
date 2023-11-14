'use client';

import React from 'react';

import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@cubik/ui';

import { MultisigSection } from './sections/multisig-section/Multisigs';
import { RegistrationsSection } from './sections/registration-section/Registrations';

export const TabsSection = () => {
  return (
    <div className="mx-auto w-full  text-white">
      <Tabs size="sm" defaultValue={0}>
        <TabList className="w-full  overflow-x-auto whitespace-nowrap bg-neutral-800">
          <div className="mx-auto flex w-full  max-w-7xl justify-start gap-4">
            <Tab value={0}>Details</Tab>
            <Tab value={1}>Registrations</Tab>
            <Tab value={2}>Multi</Tab>
            <Tab value={3}>Analytics</Tab>
            <Tab value={4}>Settings</Tab>
          </div>
        </TabList>
        <TabPanels className="mx-auto w-full max-w-7xl">
          <TabPanel value={0}>Make changes to your account here.</TabPanel>
          <TabPanel value={1}>
            <RegistrationsSection />
          </TabPanel>
          <TabPanel value={2}>
            <MultisigSection />
          </TabPanel>
          <TabPanel value={3}>Change your password here.</TabPanel>
          <TabPanel value={4}>Change your password here.</TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};
