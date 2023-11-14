'use client';

import React from 'react';
import CodeComponent from '@/app/home-page-components/code-component';

import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@cubik/ui';

import PageHOC from '../../../home-page-components/components/pageHOC';

const page = () => {
  return (
    <PageHOC
      pages={[
        { name: 'Component', href: '/components', current: false },
        { name: 'Tabs', href: '/component/tabs', current: true },
      ]}
      heading={'Tabs'}
      description={
        'Use the tabs component to display multiple panels of content.'
      }
    >
      <div className="">
        <CodeComponent codeString='import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@cubik/ui";' />
        <div className="mt-8">
          <Tabs defaultValue={2} size="xxs" className="">
            <TabList>
              <Tab value={0}>
                <div className="p-2">TabItem1</div>
              </Tab>
              <Tab value={1}>
                {' '}
                <div className="p-2">TabItem2</div>
              </Tab>
              <Tab value={2}>
                {' '}
                <div className="p-2">Tabitem3</div>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel value={0}>
                <p>one!</p>
              </TabPanel>
              <TabPanel value={1}>
                <p>two!</p>
              </TabPanel>
              <TabPanel value={2}>
                <p>three!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>

          <Tabs defaultValue={2} size="xs">
            <TabList>
              <Tab value={0}>
                <div className="p-2">TabItem1</div>
              </Tab>
              <Tab value={1}>
                {' '}
                <div className="p-2">TabItem2</div>
              </Tab>
              <Tab value={2}>
                {' '}
                <div className="p-2">Tabitem3</div>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel value={0}>
                <p>one!</p>
              </TabPanel>
              <TabPanel value={1}>
                <p>two!</p>
              </TabPanel>
              <TabPanel value={2}>
                <p>three!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>

          <Tabs defaultValue={2} size="sm">
            <TabList>
              <Tab value={0}>
                <div className="p-2">TabItem1</div>
              </Tab>
              <Tab value={1}>
                {' '}
                <div className="p-2">TabItem2</div>
              </Tab>
              <Tab value={2}>
                {' '}
                <div className="p-2">Tabitem3</div>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel value={0}>
                <p>one!</p>
              </TabPanel>
              <TabPanel value={1}>
                <p>two!</p>
              </TabPanel>
              <TabPanel value={2}>
                <p>three!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>

          <Tabs defaultValue={2} size="md">
            <TabList>
              <Tab value={0}>
                <div className="p-2">TabItem1</div>
              </Tab>
              <Tab value={1}>
                {' '}
                <div className="p-2">TabItem2</div>
              </Tab>
              <Tab value={2}>
                {' '}
                <div className="p-2">Tabitem3</div>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel value={0}>
                <p>one!</p>
              </TabPanel>
              <TabPanel value={1}>
                <p>two!</p>
              </TabPanel>
              <TabPanel value={2}>
                <p>three!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>

          <Tabs defaultValue={2} size="lg">
            <TabList>
              <Tab value={0}>
                <div className="p-2">TabItem1</div>
              </Tab>
              <Tab value={1}>
                {' '}
                <div className="p-2">TabItem2</div>
              </Tab>
              <Tab value={2}>
                {' '}
                <div className="p-2">Tabitem3</div>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel value={0}>
                <p>one!</p>
              </TabPanel>
              <TabPanel value={1}>
                <p>two!</p>
              </TabPanel>
              <TabPanel value={2}>
                <p>three!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>
    </PageHOC>
  );
};

export default page;
