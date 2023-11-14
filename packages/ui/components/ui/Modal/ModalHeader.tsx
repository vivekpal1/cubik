import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';

import { Icon } from '../../../icons/icon';
import { cn } from '../../../lib/utils';

export const HeadingSizeStyles = {
  lg: 'text-[22px]',
  md: 'text-[20px]',
  sm: 'text-[18px]',
  xs: 'text-[14px]',
};

interface Props {
  heading: string;
  headingSize: keyof typeof HeadingSizeStyles;
  onClose: () => void;
  // Icon component for heading
  IconComponent?: React.JSX.Element;

  // Ring SVG background for header
  RingSVG?: JSX.Element;
}
export const ModalHeader = ({
  IconComponent,
  heading,
  headingSize,
  onClose,
  RingSVG,
}: Props) => {
  return (
    <>
      <Dialog.Title className=" relative bg-[var(--color-surface-tertiary)] flex justify-between items-center p-2 md:p-4 m-0 text-[17px] rounded-t-[12px] font-medium">
        <div className="flex justify-center items-center gap-3">
          <div className="absolute left-0"></div>
          {IconComponent ? (
            IconComponent
          ) : (
            <div className="ml-2">
              <Icon name="danger" />
            </div>
          )}
          <p
            className={cn(
              'text-[var(--color-fg-primary)]',
              HeadingSizeStyles[headingSize],
            )}
          >
            {heading}
          </p>
        </div>
        <button onClick={onClose}>
          <Icon name="cross" width={16} height={16} />
        </button>
      </Dialog.Title>
    </>
  );
};
