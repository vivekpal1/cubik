'use client';

import React, { Dispatch, SetStateAction } from 'react';

import { Icon } from '@cubik/ui';

import { useTheme } from './../home-page-components/utils';

interface Props {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
}
const HeaderButtons = (props: Props) => {
  const { toggleTheme, theme } = useTheme();
  return (
    <div className="flex h-fit flex-row items-center justify-center gap-4">
      <button onClick={toggleTheme}>
        {theme === 'dark' ? (
          <Icon
            name="bulbOff"
            strokeWidth={2}
            width={24}
            height={24}
            stroke="var(--color-fg-primary)"
            fill="transparent"
          />
        ) : (
          <Icon
            name="bulbOn"
            strokeWidth={2}
            width={24}
            height={24}
            stroke="var(--color-fg-primary)"
            fill="transparent"
          />
        )}
      </button>
      <button
        className="md:hidden"
        onClick={() => props.setIsOpen(!props.isOpen)}
      >
        {props.isOpen ? (
          <Icon
            name="cross"
            strokeWidth={2}
            width={24}
            height={24}
            stroke="var(--color-fg-primary)"
            fill="transparent"
          />
        ) : (
          <Icon
            name="menu2Bars"
            strokeWidth={2}
            width={24}
            height={24}
            stroke="var(--color-fg-primary)"
            fill="transparent"
          />
        )}
      </button>
      {/* <Icon
        name={'github'}
        stroke={'var(--color-fg-primary)'}
        strokeWidth={2}
        fill="none"
        height={26}
        width={26}
      />
      <Icon
        name={'figma'}
        stroke={'var(--color-fg-primary)'}
        strokeWidth={2}
        fill="none"
        height={26}
        width={26}
      /> */}
    </div>
  );
};

export default HeaderButtons;
