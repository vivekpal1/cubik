'use client';

import React, {
  createContext,
  ReactNode,
  useContext,
  useRef,
  useState,
} from 'react';
import * as RadixTabs from '@radix-ui/react-tabs';
import { cva } from 'class-variance-authority';

import { cn } from '../../../lib/utils';
import { useTabMeasurements } from './useTabMeasurements';

export type TabContextType = {
  size: 'xxs' | 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
};

export const TabContext = createContext<TabContextType>({
  size: 'lg',
  className: '',
});
//border-b-[2px] data-[state=active]:border-b-[2px] data-[state=active]:border-[var(--tab-border-active)] font-normal border-b-transparent
const tabVariants = cva(
  ' leading-loose text-lg text-[var(--tab-fg-inactive)]   data-[state=active]:text-[var(--tab-fg-active)] font-medium ',
  {
    variants: {
      size: {
        xxs: 'text-xs leading-3 pb-[0.375rem]',
        xs: 'text-sm leading-4 pb-[0.375rem]',
        sm: 'text-base leading-5 pb-2',
        md: 'text-lg leading-6 pb-4',
        lg: 'text-xl leading-7 pb-4',
      },
    },
    defaultVariants: {
      size: 'lg',
    },
  },
);
const tabListVariants = cva('', {
  variants: {
    size: {
      xxs: '',
      xs: 'flex flex-row gap-4',
      sm: 'flex flex-row gap-4',
      md: 'flex flex-row gap-4',
      lg: '',
    },
  },
  defaultVariants: {
    size: 'lg',
  },
});

interface TabsProps {
  children: ReactNode;
  defaultValue?: number;
  size: 'xxs' | 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}

type TabListProps = {
  children: ReactNode;
  className?: string;
};

type TabProps = {
  children: ReactNode;
  value: number;
  className?: string;
};

type TabPanelsProps = {
  children: ReactNode;
  className?: string;
};

type TabPanelProps = {
  children: ReactNode;
  value: number;
};

export type SelectedTabContextType = {
  selectedTab: number;
  setSelectedTab: React.Dispatch<React.SetStateAction<number>>;
};

const SelectedTabContext = createContext<SelectedTabContextType | undefined>(
  undefined,
);

const Tabs: React.FC<TabsProps> = ({
  children,
  defaultValue,
  size,
  className,
}) => {
  const [selectedTab, setSelectedTab] = useState<number>(defaultValue ?? 0);

  return (
    <SelectedTabContext.Provider value={{ selectedTab, setSelectedTab }}>
      <TabContext.Provider value={{ size, className }}>
        <RadixTabs.Root
          defaultValue={selectedTab.toString()}
          onValueChange={(value) => setSelectedTab(Number(value))}
          className={cn(tabVariants({ size }), className)}
        >
          {children}
        </RadixTabs.Root>
      </TabContext.Provider>
    </SelectedTabContext.Provider>
  );
};

const TabList: React.FC<TabListProps> = ({ children, className }) => {
  const { size } = useContext(TabContext);
  const tabListContainerRef = useRef<HTMLDivElement>(null);
  const context = useContext(SelectedTabContext);
  if (!context) {
    throw new Error(
      'TabList must be used within a SelectedTabContext.Provider',
    );
  }
  const { selectedTab } = context;
  const tabListStyles = cn(tabListVariants({ size }));
  const tabsRef = useRef<(HTMLElement | null)[]>([]);

  // Use the measurements from the useTabMeasurements hook
  const measurements = useTabMeasurements(
    tabsRef.current,
    tabListContainerRef.current,
  );

  // Use the selectedTab index and measurements to set the indicator style
  const indicatorStyle: React.CSSProperties = {
    left: `${measurements[selectedTab]?.left}px`,
    width: `${measurements[selectedTab]?.width}px`,
    position: 'absolute',
    bottom: 0,
    height: '2px',
    borderRadius: '2px',
    transform: 'translateY(1px)',
    transition:
      'left 200ms cubic-bezier(0, 0, 0.2, 1), width 200ms cubic-bezier(0, 0, 0.2, 1)',
  };

  return (
    <RadixTabs.List
      className={cn(tabListStyles, className)}
      style={{ position: 'relative' }}
      ref={tabListContainerRef}
    >
      <>
        {React.Children.map(children, (child, index) => {
          return React.cloneElement(child as any, {
            ref: (el: HTMLElement | null) => (tabsRef.current[index] = el),
          });
        })}
      </>
      <div className={`bg-[var(--tab-fg-active)]`} style={indicatorStyle} />
    </RadixTabs.List>
  );
};

const Tab: React.FC<TabProps> = React.forwardRef<HTMLDivElement, TabProps>(
  ({ children, value, className }, ref: any) => {
    const { size } = useContext(TabContext);

    const tabStyles = cn(tabVariants({ size }));

    return (
      <RadixTabs.Trigger
        value={value.toString()}
        className={`${tabStyles} ${className}`}
        ref={ref}
      >
        {children}
      </RadixTabs.Trigger>
    );
  },
);

const TabPanels: React.FC<TabPanelsProps> = ({ children, className }) => (
  <div className={cn('p-4', className)}>{children}</div>
);

const TabPanel: React.FC<TabPanelProps> = ({ children, value }) => (
  <RadixTabs.Content value={value.toString()} className="w-full">
    {children}
  </RadixTabs.Content>
);

Tab.displayName = 'Tab';

export { Tabs, Tab, TabList, TabPanels, TabPanel };
