import React from 'react';
import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '../../../lib/utils';

const headingVariant = cva('', {
  variants: {
    color: {
      primary: 'text-[var(--color-fg-primary-depth)]',
      secondary: 'text-[var(--color-fg-primary-subdued)]',
    },
  },
  defaultVariants: {
    color: 'primary',
  },
});

interface TextProps extends VariantProps<typeof headingVariant> {
  label: string;
  as: string;
  variant?: string;
  className?: string;
}

const Text: React.FC<TextProps> = ({
  label,
  as,
  color,
  variant,
  className,
}) => {
  return (
    <p
      className={cn(
        headingVariant({ color }),
        variant ? `${as}-primary-${variant}` : `${as}-${color}`,
        className,
      )}
    >
      {label}
    </p>
  );
};

export { Text };
