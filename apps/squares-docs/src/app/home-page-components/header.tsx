'use client';

import React from 'react';
import Drawer from '@/app/home-page-components/drawer';
import NavigationItems from '@/app/home-page-components/navigationItems';
import { SideMenuMobile } from '@/app/home-page-components/sidebar';

import { Button, Icon } from '@cubik/ui';

import HeaderButtons from './header-buttons';
import Logo from './logo';

export default function Header() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <header className="flex h-[70px] w-screen content-center items-center border-b border-b-[var(--color-border-primary)] bg-[var(--color-surface-secondary)] py-4 lg:static lg:overflow-y-visible">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex shrink-0 items-center">
              <a href="#">
                <Logo />
              </a>
            </div>
            <div className="hidden min-w-0 max-w-2xl flex-1 sm:block md:px-8 lg:px-0 xl:col-span-6">
              <div className="flex items-center px-6 md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none xl:px-0">
                <div className="w-full">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Icon
                        name="search"
                        strokeWidth={1}
                        width={18}
                        height={18}
                        stroke="var(--color-fg-tertiary)"
                        fill="transparent"
                      />
                    </div>
                    <input
                      id="search"
                      name="search"
                      className="block w-full rounded border-0 bg-[var(--color-surface-secondary)] py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-[var(--color-border-secondary)] placeholder:text-[var(--color-fg-tertiary)] focus:ring-1 focus:ring-inset focus:ring-[var(--color-purple-500)] sm:text-sm sm:leading-6"
                      placeholder="Search"
                      type="search"
                    />
                  </div>
                </div>
              </div>
            </div>
            <HeaderButtons isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
        </div>
      </header>
      <div className="w-full bg-black/30 ">
        <SideMenuMobile isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </>
  );
}
