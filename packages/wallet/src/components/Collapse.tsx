'use client';

import React, { PropsWithChildren, useEffect, useState } from 'react';

const Collapse: React.FC<
  PropsWithChildren<{
    className?: string;
    height: string | number;
    maxHeight: string | number;
    expanded: boolean;
  }>
> = ({ children, className = '', height, maxHeight, expanded }) => {
  const [localHeight, setLocalHeight] = useState<string | number>(height);

  useEffect(() => {
    if (expanded) setLocalHeight(maxHeight);
    else setLocalHeight(height);
  }, [height, maxHeight, expanded]);

  // Define the animation classes based on whether the component is expanded or not
  const animationClass = expanded ? 'fade-in' : 'fade-out';

  return (
    <div
      className={`transition-all duration-200 overflow-hidden ${animationClass} ${className}`}
      style={{ height: localHeight, maxHeight }}
    >
      {children}
    </div>
  );
};

export default Collapse;
